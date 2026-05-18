const ITEMS = [
  "GPT-4 · Azure OpenAI · LangChain · Semantic Kernel · LlamaIndex · Pinecone · FAISS · Azure Cognitive Search · Weaviate · RAG · NL-to-SQL · Vision AI · .NET Core 8 · Angular 17 · Kubernetes · Docker · Redis · Cosmos DB · Azure Functions · 15+ Years · 100K+ Docs Processed · 18K+ Monthly Queries · 95% Time Reduction",
];

const TRACK = [...ITEMS, ...ITEMS];

export default function V2Ticker() {
  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-y border-[#e0dfd8] bg-white py-3"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />

      <div className="ticker-track">
        {TRACK.map((text, i) => (
          <span
            key={i}
            className="mx-8 inline-block font-mono text-[11px] uppercase tracking-[0.18em] text-[#525251]"
          >
            {text}
            <span className="mx-8 text-[#3fb578]">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
