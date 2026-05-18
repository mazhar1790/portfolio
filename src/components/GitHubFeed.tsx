"use client";

import { useEffect, useState } from "react";
import { GitBranch, GitCommitHorizontal, Star, ArrowUpRight } from "lucide-react";
import type { FeedItem } from "@/app/api/github/route";

const TYPE_ICONS: Record<string, React.ReactNode> = {
  Push: <GitCommitHorizontal className="h-3.5 w-3.5" />,
  Create: <GitBranch className="h-3.5 w-3.5" />,
  Watch: <Star className="h-3.5 w-3.5" />,
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function GitHubFeed() {
  const [events, setEvents] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((d: { events?: FeedItem[] }) => {
        setEvents(d.events ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-10 animate-pulse rounded-md bg-ink-elev"
            style={{ opacity: 1 - i * 0.15 }}
          />
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <p className="font-mono text-xs text-paper-dim">
        No public activity yet.{" "}
        <a
          href="https://github.com/mazhar1790"
          target="_blank"
          rel="noopener noreferrer"
          className="text-signal hover:underline"
        >
          View profile →
        </a>
      </p>
    );
  }

  return (
    <div className="space-y-1">
      {events.map((ev) => (
        <div
          key={ev.id}
          className="flex items-start gap-3 rounded-lg px-3 py-2.5 transition hover:bg-ink-elev"
        >
          <span className="mt-0.5 shrink-0 text-signal/60">
            {TYPE_ICONS[ev.type] ?? <GitCommitHorizontal className="h-3.5 w-3.5" />}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-paper">{ev.message}</p>
            <p className="mt-0.5 font-mono text-[10px] text-paper-dim">
              {ev.repo}
            </p>
          </div>
          <span className="shrink-0 font-mono text-[10px] text-paper-dim">
            {timeAgo(ev.date)}
          </span>
        </div>
      ))}
      <div className="pt-2">
        <a
          href="https://github.com/mazhar1790"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-paper-dim transition hover:text-signal"
        >
          Full profile
          <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
