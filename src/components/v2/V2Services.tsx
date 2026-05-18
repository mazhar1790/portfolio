"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  Bot,
  Database,
  Microscope,
  Workflow,
  Sparkles,
} from "lucide-react";

const SERVICES = [
  {
    icon: Database,
    title: "Production RAG systems",
    body:
      "Retrieval pipelines that scale to millions of documents — chunking, hybrid search, reranking, citation-by-default prompting.",
    proof: "92% accuracy · 100K+ docs",
  },
  {
    icon: Bot,
    title: "Conversational AI",
    body:
      "NL-to-SQL, copilots, multi-turn agents. Schema injection, execution-aware repair loops, multilingual (Arabic + English).",
    proof: "85%+ SQL accuracy · 200+ users",
  },
  {
    icon: Workflow,
    title: "Document intelligence",
    body:
      "Computer-vision pipelines with confidence-gated human review. Type-aware routing to the cheapest extractor that works.",
    proof: "2,000+ hrs/month saved",
  },
  {
    icon: Microscope,
    title: "LLM evaluation harnesses",
    body:
      "Gold-set evaluation, regression tracking, cost-aware model routing. The boring stuff that turns demos into systems.",
    proof: "Evals are the new unit tests",
  },
  {
    icon: Sparkles,
    title: "Prompt + cost engineering",
    body:
      "Few-shot, chain-of-thought, function calling. Caching, model routing, token budgeting — without hurting quality.",
    proof: "38% GPT-4 cost cut",
  },
  {
    icon: BookOpen,
    title: "Technical leadership",
    body:
      "Mentor mid-level engineers, run AI architecture reviews, write the docs everyone actually reads.",
    proof: "15+ yrs, 5+ teams led",
  },
];

export default function V2Services() {
  return (
    <section id="services" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Header />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="group relative overflow-hidden rounded-3xl border border-cream-line bg-white p-7 transition hover:border-mint-300 hover:shadow-[0_18px_36px_-22px_rgba(45,153,97,0.30)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint-100 text-mint-700 transition group-hover:bg-mint-200">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-jakarta text-xl font-bold text-coal">
                {s.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-coal-muted">
                {s.body}
              </p>
              <p className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-mint-50 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-mint-700">
                <span className="h-1.5 w-1.5 rounded-full bg-mint-500" />
                {s.proof}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Header() {
  return (
    <div className="grid items-end gap-6 sm:grid-cols-[1fr_auto]">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-mint-700">
          / services
        </p>
        <h2 className="mt-4 font-jakarta text-4xl font-extrabold leading-tight tracking-tight text-coal sm:text-5xl">
          What I do, and{" "}
          <span className="font-hand text-mint-600">how I do it.</span>
        </h2>
      </div>
      <a
        href="#portfolio"
        className="group inline-flex items-center gap-2 self-end text-sm font-semibold text-coal-muted transition hover:text-coal"
      >
        See it in action
        <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}
