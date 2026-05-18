"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Building2,
  GraduationCap,
  MapPin,
  Rocket,
  Sparkles,
} from "lucide-react";
import { EXPERIENCE, METRICS } from "@/data/cv";

interface Milestone {
  year: string;
  title: string;
  detail: string;
  highlight?: string;
  badge?: string;
  icon: "rocket" | "building" | "grad" | "sparkle";
}

const MILESTONES: Milestone[] = [
  {
    year: "2009",
    title: "First commit to production",
    detail:
      "Joined my first professional .NET role in Pakistan. Wrote my first line of code that actually ran in front of users. Learned the foundational lesson that compiles every senior engineer: working code beats perfect code.",
    icon: "rocket",
  },
  {
    year: "2012",
    title: "Joined NETSOL Technologies",
    detail:
      "Three years building enterprise leasing platforms for global financial institutions. Where I learned what 'production' actually means — uptime SLAs, audit trails, and the cost of a bug shipping at 2 a.m.",
    highlight: "Where production meant something",
    icon: "building",
  },
  {
    year: "2015",
    title: "Technical Lead — TRG Tech",
    detail:
      "First leadership role. Led a cross-functional team of 8. Built a real-time sentiment-analysis engine processing 100K+ social-media posts daily across Twitter, Facebook, and Instagram. First taste of pipelines at scale.",
    badge: "Lead",
    icon: "sparkle",
  },
  {
    year: "2018",
    title: "Moved to UAE — joined MoHRE",
    detail:
      "Relocated to the UAE. Led development of the Tasheel platform at the Ministry of Human Resources & Emiratisation — 50+ labour services serving 2M+ annual users. First experience of government-scale systems and the operational discipline they demand.",
    highlight: "Pakistan → UAE",
    badge: "UAE",
    icon: "building",
  },
  {
    year: "2022",
    title: "Joined SCAD as Senior System Analyst",
    detail:
      "Joined the Statistics Centre — Abu Dhabi. Started exploring LLMs for document research. ChatGPT had just dropped. I read every paper I could find for three months, then started prototyping.",
    icon: "building",
  },
  {
    year: "2023",
    title: "Shipped my first production LLM system",
    detail:
      "Conversational analytics platform — natural-language SQL across 8 government databases for 200+ analysts. Started with 60% accuracy. Iterated for 4 months with execution-aware repair loops. Crossed the 85% threshold and shipped. Still running today.",
    badge: "First AI ship",
    icon: "sparkle",
  },
  {
    year: "2024",
    title: "Shipped Vision AI pipeline",
    detail:
      "Document Intelligence + GPT-4 Vision for SCAD's census programme. Routes documents by type to the cheapest extractor that works. Confidence-gated human review. Saves 2,000 staff hours a month.",
    icon: "rocket",
  },
  {
    year: "2025",
    title: "Shipped enterprise RAG system",
    detail:
      "100K+ documents, 92% accuracy, sub-2-second latency, 65% cost reduction over six months. Hybrid retrieval, cross-encoder reranking, citation-by-default prompting. The flagship system — runs 24/7, owned by other engineers now, hasn't needed me in months.",
    badge: "Flagship",
    icon: "rocket",
  },
  {
    year: "2026",
    title: "Open to senior AI architecture roles",
    detail:
      "Available from June 2026 for senior IC, principal, or hands-on tech-lead positions. Remote, hybrid (Abu Dhabi / Dubai), or relocation for the right opportunity. Looking for the next system to ship.",
    badge: "Now",
    icon: "grad",
  },
];

const ICONS = {
  rocket: Rocket,
  building: Building2,
  grad: GraduationCap,
  sparkle: Sparkles,
};

export default function TimelinePage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    refs.current.forEach((node, i) => {
      if (!node) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIdx(i);
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
      );
      obs.observe(node);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const active = MILESTONES[activeIdx] ?? MILESTONES[0];
  const ActiveIcon = ICONS[active.icon];

  return (
    <main className="min-h-screen bg-ink pt-24 pb-32">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
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
            15+ years. 5 companies. 2 countries. Scroll through the abridged
            version — including the year I pivoted from full-stack to AI and
            never looked back.
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

        {/* Two-column scroll layout */}
        <section className="mt-20 grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
          {/* Sticky year + nav */}
          <aside className="hidden lg:block">
            <div className="sticky top-32">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper-dim">
                Now viewing
              </p>
              <motion.div
                key={active.year}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="mt-3"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-signal/30 bg-signal/10 text-signal">
                    <ActiveIcon className="h-4 w-4" />
                  </span>
                  <span className="font-display text-5xl text-signal">
                    {active.year}
                  </span>
                </div>
                {active.highlight && (
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-paper-muted">
                    {active.highlight}
                  </p>
                )}
              </motion.div>

              <nav className="mt-10 space-y-1">
                {MILESTONES.map((m, i) => (
                  <button
                    key={m.year}
                    type="button"
                    onClick={() =>
                      refs.current[i]?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      })
                    }
                    className={`group flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-left transition ${
                      i === activeIdx
                        ? "bg-signal/10 text-paper"
                        : "text-paper-dim hover:bg-ink-elev hover:text-paper"
                    }`}
                  >
                    <span
                      className={`font-mono text-[10px] ${
                        i === activeIdx ? "text-signal" : "text-paper-dim"
                      }`}
                    >
                      {m.year}
                    </span>
                    <span className="truncate text-xs">{m.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Scrollable milestones */}
          <ol className="relative space-y-24 border-l border-ink-line pl-8 lg:border-l-0 lg:pl-0">
            {MILESTONES.map((m, i) => {
              const Icon = ICONS[m.icon];
              return (
                <motion.li
                  key={m.year}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className="relative scroll-mt-32"
                >
                  <span className="absolute -left-[40px] top-1 flex h-7 w-7 items-center justify-center rounded-full border border-signal/40 bg-ink shadow-signal-sm lg:hidden">
                    <Icon className="h-3 w-3 text-signal" />
                  </span>

                  {/* Mobile year header */}
                  <div className="flex flex-wrap items-baseline gap-3 lg:hidden">
                    <span className="font-display text-3xl text-signal">
                      {m.year}
                    </span>
                    {m.badge && (
                      <span className="rounded-full border border-signal/30 bg-signal/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-signal">
                        {m.badge}
                      </span>
                    )}
                  </div>

                  {/* Desktop in-flow header */}
                  <div className="hidden items-center gap-3 lg:flex">
                    {m.badge && (
                      <span className="rounded-full border border-signal/30 bg-signal/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-signal">
                        {m.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-2 font-display text-2xl text-paper sm:text-3xl">
                    {m.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-paper-muted sm:text-[16px]">
                    {m.detail}
                  </p>
                </motion.li>
              );
            })}
          </ol>
        </section>

        {/* Companies summary */}
        <section className="mt-32">
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
