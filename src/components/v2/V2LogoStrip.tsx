"use client";

import { motion } from "framer-motion";

// Wordmark-style "logos" (text-based — looks intentional and avoids
// any trademark licensing complications).
const AFFILIATIONS = [
  { name: "SCAD", note: "Statistics Centre Abu Dhabi" },
  { name: "MoHRE", note: "UAE Government" },
  { name: "NETSOL", note: "Enterprise Leasing" },
  { name: "TRG Tech", note: "Sentiment Engine" },
  { name: "Microsoft", note: "Certified" },
];

const TECH = [
  { name: "Azure OpenAI" },
  { name: "Pinecone" },
  { name: "Anthropic" },
  { name: "Cohere" },
  { name: "Groq" },
  { name: "LangChain" },
];

export default function V2LogoStrip() {
  return (
    <section className="relative">
      <div className="bg-gradient-to-b from-mint-100 via-mint-50 to-cream">
        <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 sm:py-14">
          {/* Row 1: where I've worked */}
          <Row
            label="Where I've shipped"
            items={AFFILIATIONS}
            accent="emerald"
            delay={0}
          />
          <div className="mx-auto my-7 h-px max-w-3xl bg-mint-200" />
          {/* Row 2: what I build with */}
          <Row label="What I build with" items={TECH} accent="ink" delay={0.2} />
        </div>
      </div>
    </section>
  );
}

function Row({
  label,
  items,
  accent,
  delay,
}: {
  label: string;
  items: { name: string; note?: string }[];
  accent: "emerald" | "ink";
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center gap-5"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-coal-muted">
        {label}
      </p>
      <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 sm:gap-x-14">
        {items.map((it) => (
          <li key={it.name} className="flex items-center gap-2">
            <span
              className={`font-jakarta text-2xl font-bold tracking-tight transition sm:text-3xl ${
                accent === "emerald"
                  ? "text-coal hover:text-mint-700"
                  : "text-coal/80 hover:text-coal"
              }`}
            >
              {it.name}
            </span>
            {it.note && (
              <span className="hidden text-[10px] uppercase tracking-widest text-coal-dim sm:inline">
                · {it.note}
              </span>
            )}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
