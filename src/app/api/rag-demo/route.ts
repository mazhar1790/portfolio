import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { CohereClient } from "cohere-ai";
import Groq from "groq-sdk";
import { CORPUS_NAMESPACE, PINECONE_INDEX_NAME } from "@/data/rag-corpus";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TOP_K_RETRIEVE = 10; // retrieve more, rerank down to 5
const TOP_K_RERANK = 5;

interface RetrievedChunk {
  id: string;
  title: string;
  content: string;
  category: string;
  score: number;
}

export async function POST(req: Request) {
  const pineconeKey = process.env.PINECONE_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;
  const groqKey = process.env.GROQ_API_KEY;

  if (!pineconeKey || !geminiKey || !groqKey) {
    const missing = !pineconeKey
      ? "PINECONE_API_KEY"
      : !geminiKey
        ? "GEMINI_API_KEY"
        : "GROQ_API_KEY";
    return new Response(JSON.stringify({ error: `RAG demo requires ${missing}.` }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  let query = "";
  try {
    const body = await req.json();
    query = (body.query ?? "").trim();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!query) {
    return new Response(JSON.stringify({ error: "Query is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const genAI = new GoogleGenerativeAI(geminiKey);
  const pc = new Pinecone({ apiKey: pineconeKey });
  const groq = new Groq({ apiKey: groqKey });
  const cohereKey = process.env.COHERE_API_KEY;

  // ── 1. Embed query with Gemini ─────────────────────────────────────────────
  const embModel = genAI.getGenerativeModel({ model: "models/gemini-embedding-001" });
  const embResult = await embModel.embedContent(query);
  const queryVector = embResult.embedding.values;

  // ── 2. Retrieve from Pinecone ──────────────────────────────────────────────
  const index = pc.index(PINECONE_INDEX_NAME);
  const queryResult = await (index.namespace(CORPUS_NAMESPACE).query as (opts: {
    vector: number[];
    topK: number;
    includeMetadata: boolean;
  }) => Promise<{ matches?: Array<{ id: string; score?: number; metadata?: Record<string, unknown> }> }>)({
    vector: queryVector,
    topK: cohereKey ? TOP_K_RETRIEVE : TOP_K_RERANK,
    includeMetadata: true,
  });

  let chunks: RetrievedChunk[] = (queryResult.matches ?? [])
    .filter((m) => (m.score ?? 0) > 0.2)
    .map((m) => ({
      id: m.id,
      title: String(m.metadata?.title ?? m.id),
      content: String(m.metadata?.content ?? ""),
      category: String(m.metadata?.category ?? ""),
      score: m.score ?? 0,
    }));

  // ── 3. Cohere rerank (if key available) ───────────────────────────────────
  let rerankScores: Record<string, number> = {};
  if (cohereKey && chunks.length > 1) {
    try {
      const cohere = new CohereClient({ token: cohereKey });
      const rerankResult = await cohere.rerank({
        model: "rerank-v3.5",
        query,
        documents: chunks.map((c) => `${c.title}\n${c.content}`),
        topN: TOP_K_RERANK,
      });

      // Build score map and reorder
      for (const r of rerankResult.results) {
        const chunk = chunks[r.index];
        if (chunk) rerankScores[chunk.id] = r.relevanceScore;
      }

      chunks = rerankResult.results
        .map((r) => ({ ...chunks[r.index]!, score: r.relevanceScore }))
        .filter(Boolean)
        .slice(0, TOP_K_RERANK);
    } catch {
      // Rerank failed — continue with vector scores
      chunks = chunks.slice(0, TOP_K_RERANK);
    }
  } else {
    chunks = chunks.slice(0, TOP_K_RERANK);
  }

  if (chunks.length === 0) {
    return new Response(
      JSON.stringify({
        answer: "I couldn't find relevant information about that in Mazhar's CV. Try asking about his projects, skills, experience, or background.",
        chunks: [],
      }),
      { headers: { "Content-Type": "application/json" } },
    );
  }

  // ── 4. Stream answer with Groq Llama 3.3 70B ─────────────────────────────
  const contextBlock = chunks
    .map((c, i) => `[SOURCE ${i + 1}: ${c.title}]\n${c.content}`)
    .join("\n\n---\n\n");

  const systemPrompt = `You are an AI assistant embedded in Mazhar Hayat's portfolio website. Answer questions about Mazhar using ONLY the provided source chunks. Be specific, cite sources by number (e.g. [1], [2]), and be concise (2-4 sentences unless detail is requested). Never make up information not in the sources.`;

  const userPrompt = `Sources:\n${contextBlock}\n\nQuestion: ${query}\n\nAnswer using the sources above and cite them by number:`;

  const encoder = new TextEncoder();
  const reranked = cohereKey && Object.keys(rerankScores).length > 0;

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const completion = await groq.chat.completions.create({
          model: "llama-3.3-70b-versatile",
          max_tokens: 512,
          stream: true,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        });

        for await (const chunk of completion) {
          const text = chunk.choices[0]?.delta?.content ?? "";
          if (text) controller.enqueue(encoder.encode(text));
        }

        // Append sources sentinel
        const sourcesPayload = chunks.map((c) => ({
          id: c.id,
          title: c.title,
          category: c.category,
          score: c.score,
          reranked,
        }));
        controller.enqueue(
          encoder.encode(`\n\n__SOURCES__${JSON.stringify(sourcesPayload)}`),
        );
        controller.close();
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unexpected error";
        controller.enqueue(encoder.encode(`\n\n[error] ${msg}`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
