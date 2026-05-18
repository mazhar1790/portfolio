"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Database, Sparkles } from "lucide-react";

const STEPS = [
  {
    n: "01",
    title: "Embed",
    body: "Your question becomes a 3072-dim vector with Gemini Embedding 001.",
  },
  {
    n: "02",
    title: "Retrieve + Rerank",
    body: "Pinecone fetches top-10 candidates; Cohere rerank-v3.5 reorders them.",
  },
  {
    n: "03",
    title: "Cited generation",
    body: "Groq Llama 3.3 70B synthesises a cited answer from the top-5 chunks in ~1 s.",
  },
];

export default function V2RagSection() {
  return (
    <section id="rag-demo" className="bg-[#fafaf7] py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          {/* Left — explainer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#2d9961]">
              / live demo
            </p>
            <h2 className="mt-4 font-jakarta text-4xl font-extrabold leading-[1.05] tracking-tight text-[#0e0e0d] sm:text-5xl">
              This site runs{" "}
              <span className="font-hand text-[#3fb578]">RAG on itself.</span>
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#525251]">
              Ask anything about my CV and watch the full retrieval pipeline
              run in real time — embed, retrieve, rerank, generate with
              citations. All free-tier infrastructure.
            </p>

            <div className="mt-8 space-y-4">
              {STEPS.map((s) => (
                <div key={s.n} className="flex gap-4">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e3f6ec] font-mono text-[10px] font-bold text-[#2d9961]">
                    {s.n}
                  </span>
                  <div>
                    <p className="font-jakarta text-sm font-bold text-[#0e0e0d]">
                      {s.title}
                    </p>
                    <p className="mt-0.5 text-sm leading-relaxed text-[#525251]">
                      {s.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 inline-flex items-center gap-2 rounded-lg border border-[#b8e8ce] bg-[#f3fbf7] px-3 py-2">
              <Database className="h-4 w-4 shrink-0 text-[#2d9961]" />
              <p className="text-xs text-[#525251]">
                <span className="font-semibold text-[#0e0e0d]">16 chunks</span>{" "}
                · Pinecone serverless · Gemini · Cohere · Groq · $0/month
              </p>
            </div>
          </motion.div>

          {/* Right — preview card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="relative"
          >
            <div className="rounded-3xl border border-[#e0dfd8] bg-white p-7 shadow-[0_18px_36px_-22px_rgba(14,14,13,0.12)]">
              {/* Mock query */}
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#9a9a96]">
                Example query
              </p>
              <p className="mt-2 rounded-xl border border-[#e0dfd8] bg-[#fafaf7] px-4 py-3 font-jakarta text-[15px] text-[#0e0e0d]">
                What&apos;s his deepest production RAG experience?
              </p>

              {/* Mock retrieved chunks */}
              <p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-[#9a9a96]">
                Top retrieved · re-ranked
              </p>
              <ul className="mt-2 space-y-2">
                {[
                  { score: "0.94", text: "Built RAG over 100K+ govt documents at SCAD…" },
                  { score: "0.88", text: "92% accuracy on gold set, sub-2s p95 latency…" },
                  { score: "0.81", text: "Cohere rerank-v3.5 cut hallucinations by 41%…" },
                ].map((c) => (
                  <li
                    key={c.text}
                    className="flex items-center gap-3 rounded-lg bg-[#fafaf7] px-3 py-2"
                  >
                    <span className="rounded-md bg-[#e3f6ec] px-2 py-0.5 font-mono text-[10px] font-bold text-[#2d9961]">
                      {c.score}
                    </span>
                    <span className="truncate text-xs text-[#525251]">
                      {c.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Mock answer */}
              <p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-[#9a9a96]">
                Answer · grounded + cited
              </p>
              <div className="mt-2 rounded-xl bg-[#0e0e0d] p-4 font-mono text-[13px] leading-relaxed text-[#f3fbf7]">
                Mazhar shipped an enterprise RAG system at SCAD indexing 100K+
                government documents{" "}
                <span className="text-[#6dcc99]">[1]</span>, achieving 92%
                accuracy with sub-2s p95 latency{" "}
                <span className="text-[#6dcc99]">[2]</span>…
              </div>

              {/* CTA */}
              <Link
                href="/#rag-demo"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0e0e0d] px-5 py-3 font-jakarta text-sm font-semibold text-white transition hover:bg-[#2d9961]"
              >
                <Sparkles className="h-4 w-4" />
                Run the live demo
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <p className="mt-2 text-center text-[11px] text-[#9a9a96]">
                Opens the full interactive RAG sandbox
              </p>
            </div>

            {/* Decorative squiggle behind */}
            <svg
              aria-hidden
              viewBox="0 0 160 60"
              className="pointer-events-none absolute -bottom-6 -right-6 hidden w-40 text-[#6dcc99] lg:block"
              fill="none"
            >
              <path
                d="M 4 30 C 20 10, 40 50, 60 30 S 100 10, 120 30 S 148 50, 156 26"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
