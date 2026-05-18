"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  Loader2,
  Mail,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { PERSONAL } from "@/data/cv";
import { cn } from "@/lib/utils";

interface FitReport {
  overallFit: "strong" | "good" | "partial" | "weak";
  fitScore: number;
  headline: string;
  strengths: { requirement: string; evidence: string }[];
  gaps: { requirement: string; honestNote: string }[];
  tailoredPitch: string;
  suggestedNextStep: string;
}

const FIT_COLORS: Record<string, string> = {
  strong: "text-signal border-signal/40 bg-signal/10",
  good: "text-emerald-400 border-emerald-400/40 bg-emerald-400/10",
  partial: "text-amber-400 border-amber-400/40 bg-amber-400/10",
  weak: "text-red-400 border-red-400/40 bg-red-400/10",
};

const SAMPLE_JD = `Senior AI Engineer
Location: Dubai, UAE (Hybrid)

We're looking for a senior AI engineer to lead the LLM and RAG initiatives for our fintech platform. You'll own the architecture of conversational interfaces, document intelligence pipelines, and structured data extraction systems.

Required:
- 7+ years software engineering, 2+ years building production LLM systems
- Experience with RAG, vector databases (Pinecone, Weaviate, or similar)
- Hands-on with Azure OpenAI, GPT-4, Claude
- Strong full-stack background (TypeScript / Python / .NET acceptable)
- Track record of shipped AI products (demos don't count)
- Comfortable with Arabic content / bilingual systems

Nice to have:
- Microsoft Azure certifications
- Experience in regulated environments (banking, government)
- Open-source contributions`;

export default function FitPage() {
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<FitReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function analyze() {
    if (!jd.trim() || loading) return;
    setLoading(true);
    setError(null);
    setReport(null);

    try {
      const res = await fetch("/api/fit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jd }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Analysis failed");
      } else {
        setReport(data as FitReport);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

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
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-signal">
            <Target className="h-3 w-3" />
            <span>AI Fit Analyser</span>
          </div>
          <h1 className="display-1 mt-5">
            Paste a job description.
            <br />
            <span className="display-italic text-signal/90">
              I&apos;ll tell you honestly
            </span>{" "}
            if I&apos;m a fit.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper-muted">
            An AI compares the JD against my full CV and produces a structured
            fit report: strengths, gaps (yes, real gaps — not just spin), a
            tailored pitch, and a suggested next step. Powered by Llama 3.3 70B
            on Groq. Takes ~10 seconds. Free.
          </p>
        </header>

        {/* JD input */}
        <section className="mt-12">
          <div className="flex items-center justify-between">
            <label className="meta">Job description</label>
            <button
              type="button"
              onClick={() => setJd(SAMPLE_JD)}
              className="font-mono text-[10px] uppercase tracking-widest text-paper-dim transition hover:text-signal"
            >
              Load sample JD
            </button>
          </div>
          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste the full JD here — required skills, responsibilities, nice-to-haves, the lot."
            rows={12}
            maxLength={8000}
            className="mt-3 w-full resize-y rounded-xl border border-ink-line bg-ink-card p-4 text-sm leading-relaxed text-paper placeholder:text-paper-dim focus:border-signal/40 focus:outline-none focus:ring-1 focus:ring-signal/20"
          />
          <div className="mt-2 flex items-center justify-between text-[11px] text-paper-dim">
            <span className="font-mono">
              {jd.length.toLocaleString()} / 8,000 chars
            </span>
            <button
              type="button"
              onClick={analyze}
              disabled={!jd.trim() || loading}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition",
                jd.trim() && !loading
                  ? "bg-signal text-ink hover:bg-signal/80"
                  : "bg-ink-line text-paper-dim",
              )}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analysing…
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Analyse fit
                </>
              )}
            </button>
          </div>
        </section>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300"
            >
              <AlertTriangle className="mr-2 inline h-4 w-4" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Report */}
        <AnimatePresence>
          {report && (
            <motion.section
              key="report"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-12"
            >
              {/* Overall fit hero */}
              <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
                <div
                  className={cn(
                    "flex h-32 w-32 flex-col items-center justify-center rounded-2xl border",
                    FIT_COLORS[report.overallFit],
                  )}
                >
                  <span className="font-display text-5xl">
                    {report.fitScore}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest">
                    {report.overallFit} fit
                  </span>
                </div>
                <div>
                  <p className="meta">Fit headline</p>
                  <p className="mt-2 text-xl leading-snug text-paper">
                    {report.headline}
                  </p>
                </div>
              </div>

              {/* Strengths */}
              <div className="mt-10">
                <p className="meta mb-4 flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-signal" />
                  Strengths · {report.strengths.length}
                </p>
                <ul className="space-y-3">
                  {report.strengths.map((s, i) => (
                    <li
                      key={i}
                      className="rounded-xl border border-ink-line bg-ink-card p-5"
                    >
                      <p className="font-medium text-paper">{s.requirement}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-paper-muted">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-signal">
                          Evidence ·
                        </span>{" "}
                        {s.evidence}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gaps */}
              {report.gaps?.length > 0 && (
                <div className="mt-10">
                  <p className="meta mb-4 flex items-center gap-2">
                    <X className="h-3.5 w-3.5 text-red-400" />
                    Honest gaps · {report.gaps.length}
                  </p>
                  <ul className="space-y-3">
                    {report.gaps.map((g, i) => (
                      <li
                        key={i}
                        className="rounded-xl border border-amber-400/20 bg-amber-400/[0.04] p-5"
                      >
                        <p className="font-medium text-paper">
                          {g.requirement}
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-paper-muted">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-amber-400">
                            Honest note ·
                          </span>{" "}
                          {g.honestNote}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Pitch */}
              <div className="mt-10 rounded-2xl border border-signal/20 bg-signal/[0.04] p-7">
                <p className="meta mb-3">Tailored opening pitch</p>
                <p className="text-lg leading-relaxed text-paper">
                  &ldquo;{report.tailoredPitch}&rdquo;
                </p>
              </div>

              {/* Next step */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-ink-line bg-ink-card p-5">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-paper-dim">
                    Suggested next step
                  </p>
                  <p className="mt-1 text-paper">
                    {report.suggestedNextStep}
                  </p>
                </div>
                <a
                  href={`mailto:${PERSONAL.email}?subject=${encodeURIComponent(
                    "Quick call about fit — " + report.headline,
                  )}`}
                  className="btn-primary"
                >
                  <Mail className="h-3.5 w-3.5 text-ink" />
                  Email Mazhar
                </a>
              </div>

              <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-widest text-paper-dim">
                Generated by Llama 3.3 70B on Groq · grounded against Mazhar&apos;s
                full CV
              </p>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Help text */}
        {!report && !error && (
          <p className="mt-8 text-center text-sm text-paper-dim">
            Tip: include the full JD — requirements, nice-to-haves, the lot. The
            more context, the sharper the analysis.
          </p>
        )}
      </div>
    </main>
  );
}
