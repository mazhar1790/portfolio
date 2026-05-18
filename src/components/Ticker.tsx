const ITEMS = [
  "GPT-4 · Azure OpenAI · LangChain · Semantic Kernel · LlamaIndex · Pinecone · FAISS · Azure Cognitive Search · Weaviate · RAG · NL-to-SQL · Vision AI · .NET Core 8 · Angular 17 · Kubernetes · Docker · Redis · Cosmos DB · Azure Functions · 15+ Years · 100K+ Docs Processed · 18K+ Monthly Queries · 95% Time Reduction",
];

// Duplicate for seamless loop
const TRACK = [...ITEMS, ...ITEMS];

export default function Ticker() {
  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-y border-ink-line bg-ink-alt py-3"
    >
      {/* Fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-ink-alt to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-ink-alt to-transparent" />

      <div className="ticker-track">
        {TRACK.map((text, i) => (
          <span
            key={i}
            className="mx-8 inline-block font-mono text-[11px] uppercase tracking-[0.18em] text-paper-dim"
          >
            {text}
            <span className="mx-8 text-signal">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
