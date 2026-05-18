"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, FileText, MessageSquareText, Sparkles, Target, Wand2 } from "lucide-react";

const POPULAR = [
  { href: "/", label: "Home", desc: "Start at the top", icon: ArrowLeft },
  { href: "/for-recruiters", label: "For recruiters", desc: "30-second pitch", icon: FileText },
  { href: "/fit", label: "AI fit analyser", desc: "Paste a JD, get a fit report", icon: Target },
  { href: "/playground", label: "Playground", desc: "Ask AI about your own document", icon: Wand2 },
  { href: "/stack", label: "Stack & cost", desc: "$0/month transparency", icon: FileText },
  { href: "/#rag-demo", label: "RAG demo", desc: "Live RAG with sandbox controls", icon: Sparkles },
];

export default function NotFound() {
  const [path, setPath] = useState("");
  const [glitchIdx, setGlitchIdx] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setPath(window.location.pathname);
    intervalRef.current = setInterval(() => {
      setGlitchIdx((i) => (i + 1) % 8);
    }, 120);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const glitchChars = ["█", "▓", "░", "▒", "▀", "▄", "■", "□"];
  const ch = glitchChars[glitchIdx];

  return (
    <main className="min-h-screen bg-ink pt-24 pb-32">
      <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-signal">
          Error · 404 · Signal lost
        </div>

        <h1 className="display-1 mt-5">
          That page is{" "}
          <span className="display-italic text-red-400/90">
            {ch}
            {ch}
            {ch}
          </span>
          <br />
          <span>nowhere to be found.</span>
        </h1>

        {path && (
          <p className="mt-6 max-w-2xl font-mono text-sm text-paper-dim">
            <span className="text-paper-dim">→</span>{" "}
            <span className="text-paper-muted">{path}</span>
          </p>
        )}

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper-muted">
          But I built this portfolio with an AI that knows everything in my CV
          — projects, skills, decisions, lessons. Easiest path forward:{" "}
          <span className="text-paper">ask it where you wanted to go.</span>
        </p>

        {/* AI ask hint */}
        <button
          type="button"
          onClick={() => {
            // Trigger Cmd+K palette
            window.dispatchEvent(
              new KeyboardEvent("keydown", {
                key: "k",
                ctrlKey: true,
                bubbles: true,
              }),
            );
          }}
          className="mt-8 inline-flex items-center gap-3 rounded-xl border border-signal/40 bg-signal/10 px-5 py-3 text-sm text-paper transition hover:bg-signal/15"
        >
          <MessageSquareText className="h-4 w-4 text-signal" />
          <span>Open search / AI ask</span>
          <kbd className="rounded border border-signal/30 bg-ink-card px-2 py-0.5 font-mono text-[10px] text-signal">
            ⌘K
          </kbd>
        </button>

        {/* Popular destinations */}
        <section className="mt-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper-dim">
            Or jump to —
          </p>
          <div className="mt-5 grid gap-px overflow-hidden rounded-xl border border-ink-line bg-ink-line sm:grid-cols-2">
            {POPULAR.map((p) => {
              const Icon = p.icon;
              return (
                <Link
                  key={p.href}
                  href={p.href}
                  className="group flex items-center gap-3 bg-ink-card px-5 py-4 transition hover:bg-ink-elev"
                >
                  <Icon className="h-4 w-4 shrink-0 text-paper-dim transition group-hover:text-signal" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-paper">
                      {p.label}
                    </p>
                    <p className="truncate font-mono text-[10px] uppercase tracking-widest text-paper-dim">
                      {p.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
