"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Sparkles } from "lucide-react";
import { EXPERIENCE, METRICS } from "@/data/cv";

const MILESTONES: { year: string; title: string; detail: string; badge?: string }[] = [
  {
    year: "2009",
    title: "Started shipping software",
    detail: "First professional .NET role. Learned that working code beats perfect code.",
  },
  {
    year: "2012",
    title: "Joined NETSOL Technologies",
    detail: "Enterprise leasing platforms for global clients. Where I learned what 'production' actually means.",
  },
  {
    year: "2015",
    title: "Technical lead — TRG Tech",
    detail: "First leadership role. Built a real-time sentiment engine processing 100K+ posts/day.",
    badge: "Lead",
  },
  {
    year: "2018",
    title: "Moved to UAE — joined MoHRE",
    detail: "Led the Tasheel platform — 50+ services, 2M+ annual users. First government-scale system.",
    badge: "UAE",
  },
  {
    year: "2022",
    title: "Joined SCAD as Senior System Analyst",
    detail: "Pivoted toward AI. Started exploring LLMs for document research.",
  },
  {
    year: "2023",
    title: "Shipped first production LLM system",
    detail: "Conversational analytics platform — NL-to-SQL across 8 databases for 200+ analysts.",
    badge: "AI",
  },
  {
    year: "2024",
    title: "Shipped Vision AI pipeline",
    detail: "Document Intelligence + GPT-4 Vision saving 2K+ staff hours per month.",
  },
  {
    year: "2025",
    title: "Shipped enterprise RAG system",
    detail: "100K+ documents. 95% time reduction. 92% accuracy. Sub-2-second latency. Lives in production today.",
    badge: "Flagship",
  },
  {
    year: "2026",
    title: "Open to senior AI architecture roles",
    detail: "Looking for the next system to ship. Available June 2026.",
    badge: "Now",
  },
];

export default function TimelinePage() {
  return (
    <main className="min-h-screen bg-ink pt-24 pb-32">
      <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-paper-dim transition hover:text-signal"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Portfolio
        </Link>

        <header className="mt-10">
          <p className="meta">Career timeline</p>
          <h1 className="display-1 mt-4">
            From{" "}
            <span className="display-italic text-signal/90">first commit</span>{" "}
            to shipping AI at government scale.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper-muted">
            15+ years, 5 companies, 2 countries, hundreds of releases. Here&apos;s
            the abridged version — including the year I pivoted from full-stack
            to AI and never looked back.
          </p>
          <p className="mt-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-paper-dim">
            <MapPin className="h-3 w-3" />
            Pakistan → UAE · 2018
          </p>
        </header>

        {/* Big stats */}
        <section className="mt-12 grid grid-cols-2 gap-6 border-y border-ink-line py-10 sm:grid-cols-4">
          {METRICS.slice(0, 4).map((m) => (
            <div key={m.label}>
              <div className="font-display text-4xl text-paper">
                {m.value}
                {m.suffix}
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-paper-dim">
                {m.label}
              </div>
            </div>
          ))}
        </section>

        {/* Timeline */}
        <section className="mt-16">
          <ol className="relative space-y-12 border-l border-ink-line pl-10">
            {MILESTONES.map((m, i) => (
              <motion.li
                key={m.year}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                className="relative"
              >
                <span className="absolute -left-[47px] top-1 flex h-7 w-7 items-center justify-center rounded-full border border-signal/40 bg-ink shadow-signal-sm">
                  <Sparkles className="h-3 w-3 text-signal" />
                </span>
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="font-display text-3xl text-signal">
                    {m.year}
                  </span>
                  {m.badge && (
                    <span className="rounded-full border border-signal/30 bg-signal/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-signal">
                      {m.badge}
                    </span>
                  )}
                </div>
                <h3 className="mt-2 font-display text-xl text-paper">
                  {m.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-paper-muted">
                  {m.detail}
                </p>
              </motion.li>
            ))}
          </ol>
        </section>

        {/* Companies summary */}
        <section className="mt-20">
          <p className="meta mb-6">Companies along the way</p>
          <div className="grid gap-px overflow-hidden rounded-xl border border-ink-line bg-ink-line sm:grid-cols-2">
            {EXPERIENCE.map((exp) => (
              <div key={exp.company} className="bg-ink-card p-5">
                <p className="font-display text-lg text-paper">
                  {exp.company.split("—")[0]?.trim() ?? exp.company}
                </p>
                <p className="mt-1 text-sm text-paper-muted">{exp.role}</p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-paper-dim">
                  {exp.period} · {exp.location}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-2xl border border-signal/20 bg-signal/[0.04] p-8 text-center">
          <h2 className="display-2">What&apos;s next?</h2>
          <p className="mt-3 text-paper-muted">
            The next chapter is yours to start.
          </p>
          <Link href="/for-recruiters" className="btn-primary mt-5 inline-flex">
            For recruiters →
          </Link>
        </section>
      </div>
    </main>
  );
}
