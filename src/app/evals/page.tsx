"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Beaker,
  CheckCircle2,
  History,
  Settings2,
} from "lucide-react";

interface Metric {
  name: string;
  definition: string;
  current: number;
  previous: number;
  target: number;
  unit: string;
  trend: "up" | "down" | "flat";
  note?: string;
}

interface EvalsData {
  updatedAt: string;
  goldSet: {
    questions: number;
    categories: string[];
    lastRunAt: string;
    buildSha: string;
  };
  currentStack: {
    embedding: string;
    retriever: string;
    reranker: string;
    generator: string;
  };
  metrics: Metric[];
  history: {
    date: string;
    build: string;
    stack: string;
    accuracy: number;
    p50: number;
    note: string;
  }[];
  failureExamples: { question: string; issue: string; fix: string }[];
}

export default function EvalsPage() {
  const [data, setData] = useState<EvalsData | null>(null);

  useEffect(() => {
    void fetch("/evals.json")
      .then((r) => r.json())
      .then(setData)
      .catch(() => null);
  }, []);

  return (
    <main className="min-h-screen bg-ink pt-24 pb-32">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-paper-dim transition hover:text-signal"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Portfolio
        </Link>

        <header className="mt-10">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-signal">
            <Beaker className="h-3 w-3" />
            <span>Live RAG evals</span>
          </div>
          <h1 className="display-1 mt-5">
            How well does my own{" "}
            <span className="display-italic text-signal/90">RAG</span> actually
            work?
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-paper-muted">
            Most AI portfolios show demos. This one shows the eval scores
            running against the demos. A fixed gold set of {data?.goldSet.questions ?? 50}{" "}
            questions, re-run on every meaningful change, tracked over time.
            Including the failures.
          </p>
          {data && (
            <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-paper-dim">
              Last evaluated · {new Date(data.goldSet.lastRunAt).toDateString()}{" "}
              · build {data.goldSet.buildSha}
            </p>
          )}
        </header>

        {!data ? (
          <p className="mt-12 text-sm text-paper-dim">Loading evals…</p>
        ) : (
          <>
            {/* Current metrics */}
            <section className="mt-14">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-signal" />
                <h2 className="display-3">Current run</h2>
              </div>
              <p className="meta mt-2">
                Vs previous run · target where applicable
              </p>
              <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line sm:grid-cols-2 lg:grid-cols-3">
                {data.metrics.map((m) => (
                  <MetricCard key={m.name} m={m} />
                ))}
              </div>
            </section>

            {/* Stack */}
            <section className="mt-14 rounded-2xl border border-ink-line bg-ink-card p-7">
              <div className="flex items-center gap-2">
                <Settings2 className="h-4 w-4 text-signal" />
                <p className="meta">Current stack under eval</p>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <StackRow label="Embedding" value={data.currentStack.embedding} />
                <StackRow label="Retriever" value={data.currentStack.retriever} />
                <StackRow label="Reranker" value={data.currentStack.reranker} />
                <StackRow label="Generator" value={data.currentStack.generator} />
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {data.goldSet.categories.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-ink-line bg-ink px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-paper-dim"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </section>

            {/* History */}
            <section className="mt-16">
              <div className="flex items-center gap-2">
                <History className="h-4 w-4 text-signal" />
                <h2 className="display-3">Change log</h2>
              </div>
              <p className="meta mt-2">Each meaningful change · re-run · re-recorded</p>
              <ol className="mt-8 border-l border-ink-line pl-6">
                {data.history.map((h, i) => (
                  <motion.li
                    key={h.build}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="relative mb-10 last:mb-0"
                  >
                    <span className="absolute -left-[31px] mt-1.5 flex h-3 w-3 items-center justify-center">
                      <span className="h-3 w-3 rounded-full border-2 border-signal/60 bg-ink" />
                    </span>
                    <div className="flex flex-wrap items-baseline gap-3">
                      <p className="font-mono text-xs text-signal">{h.date}</p>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-paper-dim">
                        {h.build}
                      </p>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-4">
                      <span className="font-display text-2xl text-paper">
                        {h.accuracy}%
                      </span>
                      <span className="font-mono text-xs text-paper-dim">
                        p50 · {h.p50}s
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-[10px] text-paper-dim">
                      {h.stack}
                    </p>
                    <p className="mt-2 max-w-2xl text-sm text-paper-muted">
                      {h.note}
                    </p>
                  </motion.li>
                ))}
              </ol>
            </section>

            {/* Failure examples */}
            <section className="mt-16">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <h2 className="display-3">
                  Real{" "}
                  <span className="display-italic">failures</span> · and the
                  fixes.
                </h2>
              </div>
              <p className="meta mt-2">
                Because every honest eval includes what didn&apos;t work.
              </p>
              <div className="mt-8 space-y-4">
                {data.failureExamples.map((f, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.04] p-6"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-widest text-amber-400">
                      Question that failed
                    </p>
                    <p className="mt-1.5 font-medium text-paper">
                      &ldquo;{f.question}&rdquo;
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-paper-muted">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-paper-dim">
                        Issue ·
                      </span>{" "}
                      {f.issue}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-paper-muted">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-signal">
                        Fix ·
                      </span>{" "}
                      {f.fix}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="mt-20 rounded-2xl border border-signal/20 bg-signal/[0.04] p-8 text-center">
              <CheckCircle2 className="mx-auto h-6 w-6 text-signal" />
              <h3 className="display-3 mt-4">
                Evals are the new{" "}
                <span className="display-italic">unit tests.</span>
              </h3>
              <p className="mt-3 max-w-xl mx-auto text-paper-muted">
                If you&apos;re hiring someone to ship LLM features in your
                product, look for someone who measures them. Want to talk?
              </p>
              <Link
                href="/for-recruiters"
                className="btn-primary mt-5 inline-flex"
              >
                For recruiters →
              </Link>
            </section>
          </>
        )}
      </div>
    </main>
  );
}

function MetricCard({ m }: { m: Metric }) {
  const delta = m.current - m.previous;
  // Determine if change is "better" — for latency lower is better
  const lowerIsBetter = m.unit === "s" || m.unit === "USD";
  const isBetter = lowerIsBetter ? delta < 0 : delta > 0;
  const TrendIcon = isBetter ? ArrowUp : ArrowDown;
  const trendColor = isBetter ? "text-signal" : "text-amber-400";
  const progress = Math.min(
    100,
    Math.max(
      0,
      lowerIsBetter
        ? m.target === 0
          ? 100
          : (1 - m.current / Math.max(m.previous, 1)) * 100
        : (m.current / m.target) * 100,
    ),
  );

  return (
    <div className="bg-ink-card p-6">
      <p className="font-mono text-[10px] uppercase tracking-widest text-paper-dim">
        {m.name}
      </p>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-display text-4xl text-paper">
          {m.current}
          <span className="ml-0.5 text-xl text-paper-dim">{m.unit}</span>
        </span>
        <span
          className={`inline-flex items-center gap-0.5 font-mono text-xs ${trendColor}`}
        >
          <TrendIcon className="h-3 w-3" />
          {Math.abs(delta).toFixed(m.unit === "s" ? 1 : 0)}
          {m.unit}
        </span>
      </div>
      {/* Progress bar to target */}
      <div className="mt-4 h-1 overflow-hidden rounded-full bg-ink-line">
        <div
          className="h-full bg-signal/60"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-paper-dim">
        Target · {m.target}
        {m.unit}
      </p>
      <p className="mt-3 text-xs leading-relaxed text-paper-muted">
        {m.definition}
      </p>
      {m.note && (
        <p className="mt-2 text-xs italic leading-relaxed text-signal/80">
          {m.note}
        </p>
      )}
    </div>
  );
}

function StackRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-paper-dim">
        {label}
      </p>
      <p className="mt-1 text-sm text-paper">{value}</p>
    </div>
  );
}
