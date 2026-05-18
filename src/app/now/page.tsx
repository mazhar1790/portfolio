"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  Brain,
  Building2,
  ExternalLink,
  FileText,
  Hammer,
  MessageCircle,
  Sparkles,
  Sun,
} from "lucide-react";

interface NowData {
  updatedAt: string;
  location: string;
  focus: string[];
  learning: string[];
  building: string[];
  blockers: string[];
  moodOfTheWeek: string;
  currentlyReadingId?: string;
}

interface ReadingData {
  updatedAt: string;
  books: { id: string; title: string; author: string; status: string; note: string }[];
  papers: { id: string; title: string; authors: string; note: string }[];
  talks: { id: string; title: string; speaker: string; url?: string; note: string }[];
}

export default function NowPage() {
  const [now, setNow] = useState<NowData | null>(null);
  const [reading, setReading] = useState<ReadingData | null>(null);

  useEffect(() => {
    void Promise.all([
      fetch("/now.json").then((r) => r.json()),
      fetch("/reading.json").then((r) => r.json()),
    ])
      .then(([n, r]) => {
        setNow(n);
        setReading(r);
      })
      .catch(() => null);
  }, []);

  const updated = now ? new Date(now.updatedAt) : null;

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
          <p className="meta">/now</p>
          <h1 className="display-1 mt-4">
            What I&apos;m{" "}
            <span className="display-italic text-signal/90">working on</span>{" "}
            right now.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper-muted">
            Inspired by{" "}
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-signal underline-offset-4 hover:underline"
            >
              nownownow.com
            </a>
            . An honest, in-the-moment look at what&apos;s on my plate — current
            focus, what I&apos;m learning, what&apos;s blocking me. Updated every
            couple of weeks.
          </p>
          {updated && (
            <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-paper-dim">
              Last updated · {updated.toDateString()}
            </p>
          )}
        </header>

        {!now ? (
          <p className="mt-12 text-sm text-paper-dim">Loading…</p>
        ) : (
          <>
            {/* Mood */}
            <section className="mt-12 rounded-2xl border border-signal/20 bg-signal/[0.04] p-7">
              <div className="flex items-start gap-3">
                <Sun className="mt-0.5 h-5 w-5 shrink-0 text-signal" />
                <div>
                  <p className="meta">Mood of the week</p>
                  <p className="mt-2 text-lg leading-relaxed text-paper">
                    &ldquo;{now.moodOfTheWeek}&rdquo;
                  </p>
                </div>
              </div>
            </section>

            {/* Four columns */}
            <section className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line sm:grid-cols-2">
              <NowSection
                icon={Sparkles}
                title="Currently focused on"
                items={now.focus}
              />
              <NowSection
                icon={Brain}
                title="Currently learning"
                items={now.learning}
              />
              <NowSection
                icon={Hammer}
                title="Currently building"
                items={now.building}
              />
              <NowSection
                icon={AlertTriangle}
                title="Currently blocked by"
                items={now.blockers}
                tone="amber"
              />
            </section>

            {/* Location */}
            <section className="mt-10 flex items-center gap-3 rounded-xl border border-ink-line bg-ink-card p-5">
              <Building2 className="h-4 w-4 text-paper-dim" />
              <div className="flex-1">
                <p className="font-mono text-[10px] uppercase tracking-widest text-paper-dim">
                  Location
                </p>
                <p className="text-sm text-paper">{now.location}</p>
              </div>
              <Link
                href="/for-recruiters"
                className="font-mono text-[10px] uppercase tracking-widest text-signal hover:underline"
              >
                Hiring? →
              </Link>
            </section>
          </>
        )}

        {/* Reading list */}
        {reading && (
          <>
            <section className="mt-20">
              <div className="flex items-end justify-between">
                <h2 className="display-3">
                  Currently{" "}
                  <span className="display-italic">reading.</span>
                </h2>
                <p className="font-mono text-[11px] uppercase tracking-widest text-paper-dim">
                  {reading.books.length} books · {reading.papers.length} papers · {reading.talks.length} talks
                </p>
              </div>

              <div className="mt-8">
                <p className="meta mb-3 flex items-center gap-2">
                  <BookOpen className="h-3.5 w-3.5 text-signal" />
                  Books
                </p>
                <ul className="grid gap-px overflow-hidden rounded-xl border border-ink-line bg-ink-line sm:grid-cols-2">
                  {reading.books.map((b) => (
                    <li
                      key={b.id}
                      className={`bg-ink-card p-5 ${
                        b.id === now?.currentlyReadingId
                          ? "ring-1 ring-signal/40"
                          : ""
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-display text-lg text-paper">
                          {b.title}
                        </p>
                        <span
                          className={`rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest ${
                            b.status === "finished"
                              ? "border-ink-line text-paper-dim"
                              : "border-signal/40 bg-signal/10 text-signal"
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-paper-muted">
                        {b.author}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-paper-muted">
                        {b.note}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <p className="meta mb-3 flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5 text-signal" />
                  Papers
                </p>
                <ul className="space-y-3">
                  {reading.papers.map((p) => (
                    <li
                      key={p.id}
                      className="rounded-xl border border-ink-line bg-ink-card p-5"
                    >
                      <p className="font-medium text-paper">{p.title}</p>
                      <p className="mt-1 font-mono text-[11px] text-paper-dim">
                        {p.authors}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-paper-muted">
                        {p.note}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <p className="meta mb-3 flex items-center gap-2">
                  <MessageCircle className="h-3.5 w-3.5 text-signal" />
                  Talks I keep recommending
                </p>
                <ul className="space-y-3">
                  {reading.talks.map((t) => (
                    <li
                      key={t.id}
                      className="rounded-xl border border-ink-line bg-ink-card p-5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-medium text-paper">{t.title}</p>
                        {t.url && (
                          <a
                            href={t.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-paper-dim transition hover:text-signal"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                      <p className="mt-1 font-mono text-[11px] text-paper-dim">
                        {t.speaker}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-paper-muted">
                        {t.note}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}

function NowSection({
  icon: Icon,
  title,
  items,
  tone = "signal",
}: {
  icon: typeof Sparkles;
  title: string;
  items: string[];
  tone?: "signal" | "amber";
}) {
  const color = tone === "amber" ? "text-amber-400" : "text-signal";
  return (
    <div className="bg-ink-card p-6">
      <p className="meta mb-3 flex items-center gap-2">
        <Icon className={`h-3.5 w-3.5 ${color}`} />
        {title}
      </p>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[14px] text-paper-muted">
            <span className={`mt-2 h-px w-4 shrink-0 ${tone === "amber" ? "bg-amber-400/60" : "bg-signal/60"}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
