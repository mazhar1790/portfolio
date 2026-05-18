import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, Clock } from "lucide-react";
import { ARTICLES } from "@/data/cv";

export const metadata: Metadata = {
  title: "Writing — Mazhar Hayat",
  description:
    "Field notes from shipping AI in production: RAG, NL-to-SQL, prompt engineering, cost optimisation, and the architectures behind them.",
};

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
function formatDate(s: string) {
  const [year, month] = s.split("-");
  const m = Number(month);
  return `${MONTHS[m - 1] ?? "??"} ${year}`;
}

export default function WritingIndexPage() {
  return (
    <div>
      <header className="not-prose">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-signal">
          / writing
        </p>
        <h1 className="mt-4 font-display text-4xl leading-tight text-paper sm:text-5xl">
          Field notes from shipping AI.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-paper-muted">
          Real architectures, real numbers, hard-won lessons from production
          RAG, NL-to-SQL, and prompt-engineering work. No fluff.
        </p>
      </header>

      <ul className="not-prose mt-14 space-y-4">
        {ARTICLES.map((a) => {
          const meta = (
            <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-paper-dim">
              <span>{formatDate(a.date)}</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" /> {a.readMin} min read
              </span>
              {a.comingSoon && (
                <span className="rounded-full border border-ink-line px-2 py-0.5">
                  coming soon
                </span>
              )}
            </div>
          );

          const body = (
            <>
              {meta}
              <h2 className="mt-2 font-display text-2xl leading-snug text-paper transition group-hover:text-signal">
                {a.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-paper-muted">
                {a.summary}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {a.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-ink-line px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-paper-dim"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </>
          );

          const className = `group block rounded-2xl border border-ink-line bg-ink-card p-6 transition hover:border-signal/40 hover:bg-ink-elev ${
            a.comingSoon ? "cursor-default opacity-70" : ""
          }`;

          return (
            <li key={a.slug}>
              {a.comingSoon ? (
                <div className={className}>
                  {body}
                </div>
              ) : (
                <Link href={`/writing/${a.slug}`} className={className}>
                  {body}
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-signal">
                    Read article
                    <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
