import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";
import { CORPUS_NAMESPACE, PINECONE_INDEX_NAME } from "@/data/rag-corpus";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TOP_K = 5;

interface RetrievedChunk {
  id: string;
  title: string;
  content: string;
  category: string;
  score: number;
}

export async function POST(req: Request) {
  const pineconeKey = process.env.PINECONE_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (!pineconeKey || !openaiKey) {
    const missing = !pineconeKey ? "PINECONE_API_KEY" : "OPENAI_API_KEY";
    return new Response(
      JSON.stringify({
        error: `RAG demo requires ${missing}. Add it to your environment variables.`,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
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

  const openai = new OpenAI({ apiKey: openaiKey });
  const pc = new Pinecone({ apiKey: pineconeKey });

  // ── 1. Embed the query ────────────────────────────────────────────────────
  const embeddingResponse = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: query,
    dimensions: 1536,
  });
  const queryVector = embeddingResponse.data[0]?.embedding;
  if (!queryVector) {
    return new Response(JSON.stringify({ error: "Embedding failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  // ── 2. Retrieve from Pinecone ─────────────────────────────────────────────
  const index = pc.index(PINECONE_INDEX_NAME);
  const queryResult = await index.namespace(CORPUS_NAMESPACE).query({
    vector: queryVector,
    topK: TOP_K,
    includeMetadata: true,
  });

  const chunks: RetrievedChunk[] = (queryResult.matches ?? [])
    .filter((m) => m.score !== undefined && m.score > 0.3)
    .map((m) => ({
      id: m.id,
      title: String(m.metadata?.title ?? m.id),
      content: String(m.metadata?.content ?? ""),
      category: String(m.metadata?.category ?? ""),
      score: m.score ?? 0,
    }));

  if (chunks.length === 0) {
    return new Response(
      JSON.stringify({
        answer: "I couldn't find relevant information about that in Mazhar's CV. Try asking about his projects, skills, experience, or background.",
        chunks: [],
      }),
      { headers: { "Content-Type": "application/json" } },
    );
  }

  // ── 3. Build context + stream answer ─────────────────────────────────────
  const contextBlock = chunks
    .map((c, i) => `[SOURCE ${i + 1}: ${c.title}]\n${c.content}`)
    .join("\n\n---\n\n");

  const systemPrompt = `You are an AI assistant embedded in Mazhar Hayat's portfolio website. Answer questions about Mazhar using ONLY the provided source chunks. Be specific, cite your sources by number (e.g. [1], [2]), and be concise (2-4 sentences unless detail is requested). Never make up information not in the sources. If a question isn't answered by the sources, say so clearly.`;

  const userPrompt = `Question: ${query}\n\nSources:\n${contextBlock}\n\nAnswer using the sources above and cite them by number:`;

  const encoder = new TextEncoder();

  // Stream the answer + send sources as a JSON trailer
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          max_tokens: 512,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          stream: true,
        });

        for await (const chunk of completion) {
          const text = chunk.choices[0]?.delta?.content ?? "";
          if (text) controller.enqueue(encoder.encode(text));
        }

        // Send sources as a JSON line at the end, prefixed with a sentinel
        const sourcesLine = `\n\n__SOURCES__${JSON.stringify(
          chunks.map((c) => ({ id: c.id, title: c.title, category: c.category, score: c.score })),
        )}`;
        controller.enqueue(encoder.encode(sourcesLine));
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
