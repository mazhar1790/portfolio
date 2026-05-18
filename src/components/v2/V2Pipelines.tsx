"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Boxes, Database, ScanLine } from "lucide-react";
import V2RagDiagram from "./diagrams/V2RagDiagram";
import V2NlSqlDiagram from "./diagrams/V2NlSqlDiagram";
import V2VisionDiagram from "./diagrams/V2VisionDiagram";

type TabId = "rag" | "nlsql" | "vision";

const TABS: {
  id: TabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  project: string;
  metrics: { label: string; value: string }[];
}[] = [
  {
    id: "rag",
    label: "RAG",
    icon: Boxes,
    title: "Retrieval-Augmented Generation",
    desc: "100K+ government documents → 10-second cited answers. Hybrid retrieval, cross-encoder rerank, citation-by-default prompting, and an eval harness on a 200-question gold set.",
    project: "/projects/rag-document-intelligence",
    metrics: [
      { label: "Accuracy", value: "92%" },
      { label: "Cost cut", value: "65%" },
      { label: "Queries / mo", value: "5K+" },
      { label: "p95 latency", value: "<2s" },
    ],
  },
  {
    id: "nlsql",
    label: "NL → SQL",
    icon: Database,
    title: "Conversational Analytics",
    desc: "Plain-English questions in EN or AR turn into validated SQL across 8 databases. Schema injection, few-shot synthesis, execution-aware repair loop, and row-level security.",
    project: "/projects/conversational-analytics",
    metrics: [
      { label: "Non-tech users", value: "200+" },
      { label: "Queries / mo", value: "18K+" },
      { label: "Accuracy", value: "85%" },
      { label: "Repair gain", value: "+13%" },
    ],
  },
  {
    id: "vision",
    label: "Vision AI",
    icon: ScanLine,
    title: "Document Vision Pipeline",
    desc: "1K+ documents a day routed to the right extractor: Form Recognizer for structured, GPT-4 Vision for handwriting and AR/EN, Tesseract for legacy scans. Per-field confidence gates human review.",
    project: "/projects/vision-ai-pipeline",
    metrics: [
      { label: "Automated", value: "80%" },
      { label: "Extraction", value: "94%" },
      { label: "Hrs saved / mo", value: "2K+" },
      { label: "Doc types", value: "14" },
    ],
  },
];

export default function V2Pipelines() {
  const [active, setActive] = useState<TabId>("rag");
  const tab = TABS.find((t) => t.id === active)!;

  return (
    <section id="pipelines" className="bg-[#fafaf7] py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="grid items-end gap-6 sm:grid-cols-[1fr_auto]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#2d9961]">
              / systems in production
            </p>
            <h2 className="mt-4 max-w-3xl font-jakarta text-4xl font-extrabold leading-[1.05] tracking-tight text-[#0e0e0d] sm:text-5xl">
              Three pipelines, drawn{" "}
              <span className="font-hand text-[#3fb578]">
                exactly how they run.
              </span>
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#525251]">
              Not marketing diagrams — these are the actual shapes of systems
              running today at government scale. Hover any node for what it
              really does.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12 flex flex-wrap items-center gap-2">
          {TABS.map((t) => {
            const Icon = t.icon;
            const isActive = t.id === active;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActive(t.id)}
                className={`group inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-jakarta text-sm font-semibold transition ${
                  isActive
                    ? "bg-[#0e0e0d] text-white shadow-[0_8px_20px_-12px_rgba(14,14,13,0.55)]"
                    : "border border-[#e0dfd8] bg-white text-[#525251] hover:border-[#6dcc99] hover:text-[#0e0e0d]"
                }`}
              >
                <Icon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}

          <span className="ml-auto hidden font-mono text-[11px] uppercase tracking-widest text-[#9a9a96] sm:inline">
            click a tab · hover nodes
          </span>
        </div>

        {/* Active pipeline */}
        <div className="mt-8 grid gap-10 lg:grid-cols-[2fr_1fr] lg:gap-12">
          {/* Diagram */}
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                {active === "rag" && <V2RagDiagram />}
                {active === "nlsql" && <V2NlSqlDiagram />}
                {active === "vision" && <V2VisionDiagram />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Side panel: title, copy, metrics, link */}
          <AnimatePresence mode="wait">
            <motion.aside
              key={active}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.35 }}
              className="lg:sticky lg:top-24 lg:self-start"
            >
              <h3 className="font-jakarta text-2xl font-bold leading-tight text-[#0e0e0d]">
                {tab.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-[#525251]">
                {tab.desc}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {tab.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-2xl border border-[#e0dfd8] bg-white px-4 py-3"
                  >
                    <p className="font-jakarta text-2xl font-extrabold leading-none text-[#0e0e0d]">
                      {m.value}
                    </p>
                    <p className="mt-1.5 font-mono text-[10px] uppercase tracking-widest text-[#9a9a96]">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href={tab.project}
                className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0e0e0d] px-5 py-3 font-jakarta text-sm font-semibold text-white transition hover:bg-[#2d9961]"
              >
                Open the full case study
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>

              <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-[#9a9a96]">
                ● live · running today
              </p>
            </motion.aside>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
