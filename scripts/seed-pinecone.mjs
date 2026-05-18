/**
 * One-time script to embed the CV corpus and upsert into Pinecone.
 *
 * Usage:
 *   node scripts/seed-pinecone.mjs
 *
 * Required env vars (in .env.local):
 *   PINECONE_API_KEY=your-key
 *   OPENAI_API_KEY=your-openai-key   (or reuse ANTHROPIC_API_KEY — but OpenAI embeddings used here)
 *
 * This only needs to be run once (or when the corpus changes).
 */

import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";
import { createRequire } from "module";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

// ── Load .env.local manually ────────────────────────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "../.env.local");

try {
  const envContent = readFileSync(envPath, "utf8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
    process.env[key] = val;
  }
  console.log("✓ Loaded .env.local");
} catch {
  console.log("⚠ No .env.local found, using existing process.env");
}

// ── Inline corpus (avoid TS import issues) ──────────────────────────────────
// Copy of rag-corpus.ts values — keeps script dependency-free
const CORPUS = [
  { id: "identity-summary", category: "identity", title: "Who is Mazhar Hayat", content: "Mazhar Hayat is an AI Solutions Architect with 15+ years of experience building production-grade intelligent systems. He is based in Abu Dhabi, UAE and specializes in LLM integration, RAG architectures, and conversational AI. He works at SCAD (Statistics Centre Abu Dhabi) as the lead AI architect. His expertise spans deploying GPT-4, Azure OpenAI, and vector search solutions for government and enterprise environments. He has a proven track record of building scalable AI systems that reduce operational costs by 40%, process over 100,000 documents, and handle 15,000+ daily user interactions." },
  { id: "identity-contact", category: "identity", title: "Contact and location details", content: "Mazhar Hayat is located in Abu Dhabi, United Arab Emirates. His email is Mazhar1783@outlook.com. His phone number is +971 556 127 178. His LinkedIn profile is at https://www.linkedin.com/in/mazharhayyat/. He is currently open to senior AI architecture roles and consulting opportunities, available from June 2026." },
  { id: "project-rag", category: "project", title: "Enterprise RAG Document Intelligence System", content: "At SCAD (Statistics Centre Abu Dhabi) in 2025, Mazhar designed and built an Enterprise RAG Document Intelligence System. The challenge was that analysts spent 2+ hours manually searching through 100,000+ policy and statistical documents. The solution used Azure OpenAI GPT-4o with a hybrid retrieval pipeline combining BM25 keyword search and Pinecone vector search, with Cohere cross-encoder re-ranking. Key results: document research time reduced from 2 hours to 10 seconds (95% reduction), 5,000+ queries processed monthly, 92% accuracy validated by domain experts, and GPT-4o API costs cut by 65% through intelligent context compression. The system processes documents in both Arabic and English." },
  { id: "project-nl-sql", category: "project", title: "Intelligent Conversational Analytics Platform (NL-to-SQL)", content: "Mazhar built an Intelligent Conversational Analytics Platform at SCAD from 2023 onwards. This natural language to SQL system enables 200+ non-technical staff to query complex databases using plain English or Arabic — no SQL knowledge required. The system achieves 85%+ query accuracy through multi-shot prompting, schema-aware context injection, and query validation layers. It handles 18,000+ queries per month. The platform democratized data access across the organization and reduced reliance on data analysts for ad-hoc reporting by 70%." },
  { id: "project-vision", category: "project", title: "Document Processing & Vision AI Pipeline", content: "In 2025, Mazhar architected a Document Processing and Vision AI Pipeline at SCAD that processes scanned government documents using Azure Document Intelligence and GPT-4 Vision. The pipeline handles tables, handwritten text, Arabic/English mixed content, and complex form layouts. It saves 2,000 staff hours every month by automating data extraction that was previously done manually. The system integrates with SCAD's data warehouse and triggers downstream analytics workflows." },
  { id: "project-chatbot", category: "project", title: "AI Conversational Chatbot handling 18K+ monthly queries", content: "Mazhar built and deployed a production AI conversational chatbot that now handles over 18,000 queries per month. The chatbot serves SCAD staff and the public, answering questions about statistical publications, data definitions, and administrative processes. It uses Azure OpenAI with custom fine-tuning and retrieval augmentation for domain-specific knowledge. The system has a 94% user satisfaction rate and reduced support ticket volume by 60%." },
  { id: "skills-ai-llm", category: "skills", title: "AI and LLM expertise", content: "Mazhar's core AI expertise includes: GPT-4/GPT-4o, GPT-3.5-Turbo, Claude 3.5/3.7, Azure OpenAI Service, LangChain, LlamaIndex, RAG (Retrieval Augmented Generation) architecture, vector embeddings, semantic search, prompt engineering, fine-tuning, function calling, structured output generation, AI agent orchestration, chain-of-thought prompting, and multi-modal AI (vision + text)." },
  { id: "skills-vector-db", category: "skills", title: "Vector databases and search infrastructure", content: "Mazhar has production experience with Pinecone, Azure AI Search, PostgreSQL pgvector, and Weaviate for vector search. He has implemented hybrid retrieval systems combining dense vector search with sparse BM25/TF-IDF keyword search using Reciprocal Rank Fusion. He has built re-ranking pipelines using Cohere Rerank v3 and cross-encoder models." },
  { id: "skills-fullstack", category: "skills", title: "Full-stack development skills", content: "Mazhar is proficient in full-stack development with: C# and ASP.NET Core (15+ years), Next.js 14 with TypeScript, React, Node.js, Python (FastAPI, Flask), SQL Server, PostgreSQL, Entity Framework, REST APIs, and Azure cloud services (Azure OpenAI, Azure Functions, Azure Container Apps, Azure Document Intelligence, Azure Storage)." },
  { id: "skills-architecture", category: "skills", title: "Architecture and enterprise systems", content: "Mazhar's architecture expertise covers: microservices design, event-driven architecture, API gateway patterns, multi-tenant SaaS systems, secure government-grade data pipelines, CI/CD with Azure DevOps, Docker/Kubernetes, and enterprise integration patterns. He has designed systems handling 15,000+ daily active users with 99.9% uptime." },
  { id: "experience-scad", category: "experience", title: "Current role at SCAD", content: "Mazhar Hayat currently works at SCAD — Statistics Centre Abu Dhabi as an AI Solutions Architect and Senior Software Engineer. He has been there since approximately 2010, accumulating 15+ years. At SCAD he leads AI/LLM initiatives including the RAG system, NL-to-SQL platform, vision pipeline, and conversational chatbot. SCAD is a government statistical authority in the Emirate of Abu Dhabi." },
  { id: "experience-impact", category: "experience", title: "Career impact and key achievements", content: "Key career achievements by Mazhar Hayat: reduced document research time from 2 hours to 10 seconds with RAG system; built AI chatbot now handling 18,000+ queries per month; enabled 200+ non-technical staff to query databases in plain English; deployed vision AI pipeline saving 2,000 staff hours every month; reduced GPT-4 API costs by 38% through context compression; built systems serving 500+ daily users; processed 100,000+ documents through AI pipelines." },
  { id: "certifications", category: "certifications", title: "Professional certifications", content: "Mazhar Hayat holds multiple Microsoft certifications: Microsoft Certified Azure AI Engineer Associate (AI-102), Microsoft Certified Azure Developer Associate (AZ-204), and Microsoft Certified Azure Administrator Associate (AZ-104). These demonstrate deep expertise in Azure cloud services, AI/ML services, and enterprise development on the Azure platform." },
  { id: "differentiators", category: "approach", title: "What makes Mazhar different from other AI engineers", content: "What sets Mazhar apart: First, he has shipped production AI systems (not just demos) — his RAG system runs 24/7 in a government environment with real accountability. Second, he bridges AI and full-stack engineering — he designs the AI pipeline AND builds the application around it. Third, he works in government/enterprise contexts where reliability, security, and Arabic language support matter more than novelty. Fourth, he has a 15-year foundation in software architecture that prevents common AI-hype mistakes. Fifth, he measures outcomes: every project he describes has concrete metrics (time saved, cost reduced, accuracy achieved)." },
  { id: "operating-principles", category: "approach", title: "Working principles and philosophy", content: "Mazhar's core operating principles: (1) Measure or it didn't happen — every AI feature ships with baseline metrics and a clear definition of success. (2) RAG beats fine-tuning for enterprise knowledge — knowledge changes faster than models can be retrained. (3) The bottleneck is never the model — it's chunking strategy, retrieval quality, and prompt design. (4) Arabic-first design — government systems in the UAE must handle Arabic as a primary language, not an afterthought. (5) Boring infrastructure wins — proven Azure services over cutting-edge but unstable open-source alternatives for production." },
  { id: "current-focus", category: "current", title: "Current work and interests", content: "Currently Mazhar is focused on: extending his RAG system with multi-hop reasoning across document chains, building agentic workflows where AI systems take actions (not just answer questions), exploring structured output extraction from Arabic-English mixed government forms, and publishing technical writing about production AI lessons. He is also available for senior AI architecture roles and consulting from June 2026." },
  { id: "portfolio-site", category: "meta", title: "About this portfolio site", content: "This portfolio website was built by Mazhar Hayat using Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. It features an AI chat widget powered by Claude (Anthropic), interactive SVG architecture diagrams, a Cmd+K command palette, dark/light mode, and a live RAG demo that queries Mazhar's CV content using Pinecone vector search. The site is deployed on Netlify." },
];

const INDEX_NAME = "portfolio-cv";
const NAMESPACE = "cv-knowledge";

async function main() {
  const pineconeKey = process.env.PINECONE_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (!pineconeKey) {
    console.error("❌ Missing PINECONE_API_KEY in .env.local");
    process.exit(1);
  }
  if (!openaiKey) {
    console.error("❌ Missing OPENAI_API_KEY in .env.local");
    process.exit(1);
  }

  const pc = new Pinecone({ apiKey: pineconeKey });
  const openai = new OpenAI({ apiKey: openaiKey });

  // ── Ensure index exists ───────────────────────────────────────────────────
  const indexes = await pc.listIndexes();
  const exists = indexes.indexes?.some((i) => i.name === INDEX_NAME);

  if (!exists) {
    console.log(`Creating Pinecone index '${INDEX_NAME}'...`);
    await pc.createIndex({
      name: INDEX_NAME,
      dimension: 1536,
      metric: "cosine",
      spec: {
        serverless: {
          cloud: "aws",
          region: "us-east-1",
        },
      },
    });

    // Wait for index to be ready
    console.log("Waiting for index to be ready...");
    await new Promise((resolve) => setTimeout(resolve, 15000));
  } else {
    console.log(`✓ Index '${INDEX_NAME}' already exists`);
  }

  const index = pc.index(INDEX_NAME);

  // ── Embed all chunks ──────────────────────────────────────────────────────
  console.log(`Embedding ${CORPUS.length} chunks...`);

  const vectors = [];
  for (const chunk of CORPUS) {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: `${chunk.title}\n\n${chunk.content}`,
      dimensions: 1536,
    });
    const embedding = response.data[0]?.embedding;
    if (!embedding) throw new Error(`No embedding returned for chunk ${chunk.id}`);

    vectors.push({
      id: chunk.id,
      values: embedding,
      metadata: {
        category: chunk.category,
        title: chunk.title,
        content: chunk.content,
      },
    });
    process.stdout.write(`  ✓ ${chunk.id}\n`);
  }

  // ── Upsert in batches ─────────────────────────────────────────────────────
  const BATCH_SIZE = 50;
  for (let i = 0; i < vectors.length; i += BATCH_SIZE) {
    const batch = vectors.slice(i, i + BATCH_SIZE);
    await index.namespace(NAMESPACE).upsert(batch);
    console.log(`  Upserted batch ${Math.floor(i / BATCH_SIZE) + 1}`);
  }

  console.log(`\n✅ Done! ${vectors.length} vectors upserted to '${INDEX_NAME}' namespace '${NAMESPACE}'`);
  console.log(`\nNow add these to your Netlify env vars:`);
  console.log(`  PINECONE_API_KEY=${pineconeKey.slice(0, 8)}...`);
  console.log(`  OPENAI_API_KEY=${openaiKey.slice(0, 8)}...`);
  console.log(`  PINECONE_INDEX_NAME=${INDEX_NAME}`);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
