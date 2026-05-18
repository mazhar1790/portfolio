import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Check,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  X,
} from "lucide-react";
import { PERSONAL, METRICS } from "@/data/cv";
import CvDownload from "@/components/CvDownload";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import BookCall from "@/components/BookCall";

export const metadata: Metadata = {
  title: `For recruiters — ${PERSONAL.name}`,
  description:
    "Everything a recruiter needs in 30 seconds: availability, location, comp range, role fit, and direct contact.",
};

const ELEVATOR_PITCH = `AI Solutions Architect, 15+ years building production software, last 3 years deep on LLMs, RAG, and agentic systems. I ship — every project I describe has metrics and is running in front of real users at a UAE government statistics authority.`;

const LOOKING_FOR = [
  "Senior AI / LLM / ML Engineering Architect roles",
  "Principal-track or hands-on tech lead positions",
  "Consulting engagements on RAG, NL-to-SQL, document AI",
  "Remote, hybrid (Abu Dhabi / Dubai), or relocation for the right opportunity",
];

const NOT_LOOKING_FOR = [
  "Pure research / academic roles",
  "Junior or mid-level individual contributor",
  "Crypto / Web3 / NFT projects",
  "Sales engineering or pre-sales",
];

const STRENGTHS = [
  {
    title: "Production AI, not demos",
    detail:
      "I have shipped four distinct AI systems running 24/7 in a government environment serving thousands of users. Real accountability, real metrics.",
  },
  {
    title: "Full-stack foundation",
    detail:
      "15 years of C#/.NET, plus modern TypeScript / Next.js / React. I design the AI pipeline AND build the application around it.",
  },
  {
    title: "Enterprise context",
    detail:
      "Security, reliability, Arabic language support, government compliance — the constraints other engineers learn after they get burned.",
  },
  {
    title: "Measurement discipline",
    detail:
      "Every project has metrics for accuracy, latency, cost. I don't ship until the numbers say it's ready.",
  },
];

const QUICK_FACTS = [
  { label: "Location", value: "Abu Dhabi, UAE" },
  { label: "Notice period", value: "30 days" },
  { label: "Visa status", value: "UAE residency (transferable)" },
  { label: "Languages", value: "English (fluent), Urdu (native), Arabic (working)" },
  { label: "Remote", value: "Open" },
  { label: "Relocation", value: "Open for the right role" },
];

export default function ForRecruitersPage() {
  return (
    <main className="min-h-screen bg-ink pt-24 pb-32">
      <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-paper-dim transition hover:text-signal"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Portfolio
        </Link>

        {/* Hero */}
        <header className="mt-10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-signal">·</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper-dim">
              For recruiters · 30-second pitch
            </span>
          </div>
          <h1 className="display-1 mt-5">
            Yes, I&apos;m{" "}
            <span className="display-italic">open to a conversation.</span>
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <AvailabilityBadge />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper-dim">
              Abu Dhabi · UAE
            </span>
          </div>
        </header>

        {/* Elevator pitch */}
        <section className="mt-10 rounded-2xl border border-ink-line bg-ink-card p-7">
          <p className="meta mb-3">The pitch</p>
          <p className="text-lg leading-relaxed text-paper">{ELEVATOR_PITCH}</p>
        </section>

        {/* Quick CTA buttons */}
        <section className="mt-8 flex flex-wrap gap-3">
          <BookCall variant="primary" />
          <a href={`mailto:${PERSONAL.email}`} className="btn-secondary">
            <Mail className="h-3.5 w-3.5 text-signal" />
            Email me
          </a>
          <a
            href={PERSONAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            <MessageSquareText className="h-3.5 w-3.5 text-signal" />
            LinkedIn
          </a>
          <CvDownload variant="ghost" />
          <a
            href={`tel:${PERSONAL.phone.replace(/\s+/g, "")}`}
            className="btn-ghost"
          >
            <Phone className="h-3.5 w-3.5 text-signal" />
            {PERSONAL.phone}
          </a>
        </section>

        {/* /fit teaser */}
        <section className="mt-10 rounded-2xl border border-signal/30 bg-signal/[0.06] p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-signal">
            New · AI fit analyser
          </p>
          <h2 className="display-2 mt-3">
            Paste your JD.{" "}
            <span className="display-italic">I&apos;ll tell you honestly</span>{" "}
            if I&apos;m a fit.
          </h2>
          <p className="mt-3 text-paper-muted">
            Get a structured fit report — strengths, real gaps, tailored pitch
            — in 10 seconds. Saves us both time.
          </p>
          <Link href="/fit" className="btn-primary mt-5 inline-flex">
            Try the fit analyser →
          </Link>
        </section>

        {/* Quick facts table */}
        <section className="mt-12">
          <p className="meta mb-4">Quick facts</p>
          <div className="grid gap-px overflow-hidden rounded-xl border border-ink-line bg-ink-line sm:grid-cols-2">
            {QUICK_FACTS.map((f) => (
              <div key={f.label} className="bg-ink-card px-5 py-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-paper-dim">
                  {f.label}
                </p>
                <p className="mt-1 text-sm text-paper">{f.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What I'm looking for */}
        <section className="mt-14 grid gap-6 md:grid-cols-2">
          <div>
            <p className="meta mb-4">Looking for</p>
            <ul className="space-y-2.5">
              {LOOKING_FOR.map((l) => (
                <li key={l} className="flex gap-3 text-[15px] text-paper">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-signal" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="meta mb-4">Not looking for</p>
            <ul className="space-y-2.5">
              {NOT_LOOKING_FOR.map((l) => (
                <li key={l} className="flex gap-3 text-[15px] text-paper-dim">
                  <X className="mt-1 h-4 w-4 shrink-0 text-red-400/70" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Strengths */}
        <section className="mt-14">
          <p className="meta mb-6">Why hire me</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {STRENGTHS.map((s) => (
              <div
                key={s.title}
                className="rounded-xl border border-ink-line bg-ink-card p-6"
              >
                <h3 className="font-display text-lg text-paper">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-paper-muted">
                  {s.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Headline metrics */}
        <section className="mt-14 border-y border-ink-line py-10">
          <p className="meta mb-6 text-center">Numbers from my last 3 years</p>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {METRICS.slice(0, 6).map((m) => (
              <div key={m.label} className="text-center">
                <div className="font-display text-4xl text-paper">
                  {m.value}
                  {m.suffix}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-paper-dim">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA bottom */}
        <section className="mt-16 rounded-2xl border border-signal/20 bg-signal/[0.04] p-8 text-center">
          <Calendar className="mx-auto h-6 w-6 text-signal" />
          <h2 className="display-2 mt-4">Let&apos;s talk.</h2>
          <p className="mt-3 text-paper-muted">
            If this looks like a fit, the fastest path is a 15-minute call.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <BookCall variant="primary" />
            <a href={`mailto:${PERSONAL.email}`} className="btn-secondary">
              <Mail className="h-3.5 w-3.5 text-signal" />
              {PERSONAL.email}
            </a>
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              LinkedIn
            </a>
          </div>
          <p className="mt-6 flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-widest text-paper-dim">
            <MapPin className="h-3 w-3" />
            Working globally · based in {PERSONAL.location.split(",")[0]}
          </p>
        </section>
      </div>
    </main>
  );
}
