"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowUpDown, ArrowUpRight, Search, X } from "lucide-react";
import { PROJECTS } from "@/data/cv";
import { cn } from "@/lib/utils";

type SortKey = "year" | "title" | "company";
type SortDir = "asc" | "desc";

export default function ProjectsIndex() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("year");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const allTags = useMemo(() => {
    const set = new Set<string>();
    for (const p of PROJECTS) p.stack.forEach((s) => set.add(s));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    let list = [...PROJECTS];
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.solution.toLowerCase().includes(q) ||
          p.challenge.toLowerCase().includes(q) ||
          p.stack.some((s) => s.toLowerCase().includes(q)),
      );
    }
    if (activeTag) {
      list = list.filter((p) => p.stack.includes(activeTag));
    }
    list.sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      if (sortKey === "year") return (a.year > b.year ? 1 : -1) * dir;
      if (sortKey === "title") return a.title.localeCompare(b.title) * dir;
      return a.company.localeCompare(b.company) * dir;
    });
    return list;
  }, [query, activeTag, sortKey, sortDir]);

  function toggleSort(k: SortKey) {
    if (sortKey === k) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(k);
      setSortDir("desc");
    }
  }

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
          <p className="meta">All projects</p>
          <h1 className="display-1 mt-4">
            Every production system,{" "}
            <span className="display-italic text-signal/90">
              filterable.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper-muted">
            Search by tech, sort by year, filter by tag. Hit a row to dive into
            the full case study.
          </p>
        </header>

        {/* Search + filters */}
        <section className="mt-10 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-paper-dim" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, technology, or keyword…"
              className="w-full rounded-xl border border-ink-line bg-ink-card py-3 pl-11 pr-4 text-sm text-paper placeholder:text-paper-dim focus:border-signal/40 focus:outline-none focus:ring-1 focus:ring-signal/20"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-paper-dim">
              Filter by tech
            </span>
            {allTags.slice(0, 20).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setActiveTag(activeTag === t ? null : t)}
                className={cn(
                  "rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest transition",
                  activeTag === t
                    ? "border-signal/40 bg-signal/15 text-signal"
                    : "border-ink-line bg-ink-card text-paper-dim hover:text-paper",
                )}
              >
                {t}
              </button>
            ))}
            {(activeTag || query) && (
              <button
                type="button"
                onClick={() => {
                  setActiveTag(null);
                  setQuery("");
                }}
                className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-paper-dim hover:text-signal"
              >
                <X className="h-3 w-3" /> clear
              </button>
            )}
          </div>
        </section>

        {/* Results count */}
        <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-paper-dim">
          {filtered.length} of {PROJECTS.length} projects
        </p>

        {/* Table */}
        <section className="mt-3 overflow-hidden rounded-xl border border-ink-line">
          <table className="w-full text-sm">
            <thead className="bg-ink-elev">
              <tr className="text-left font-mono text-[10px] uppercase tracking-widest text-paper-dim">
                <th
                  className="cursor-pointer px-4 py-3 transition hover:text-paper"
                  onClick={() => toggleSort("year")}
                >
                  <span className="inline-flex items-center gap-1">
                    Year <ArrowUpDown className="h-3 w-3" />
                  </span>
                </th>
                <th
                  className="cursor-pointer px-4 py-3 transition hover:text-paper"
                  onClick={() => toggleSort("title")}
                >
                  <span className="inline-flex items-center gap-1">
                    Project <ArrowUpDown className="h-3 w-3" />
                  </span>
                </th>
                <th
                  className="hidden cursor-pointer px-4 py-3 transition hover:text-paper md:table-cell"
                  onClick={() => toggleSort("company")}
                >
                  <span className="inline-flex items-center gap-1">
                    Company <ArrowUpDown className="h-3 w-3" />
                  </span>
                </th>
                <th className="hidden px-4 py-3 lg:table-cell">Top metric</th>
                <th className="hidden px-4 py-3 lg:table-cell">Stack</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-line">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-paper-dim">
                    No projects match your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((p) => {
                  const topMetric = Object.entries(p.metrics)[0];
                  return (
                    <tr
                      key={p.slug}
                      className="bg-ink-card transition hover:bg-ink-elev"
                    >
                      <td className="px-4 py-4 font-mono text-paper-muted">
                        {p.year}
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-medium text-paper">{p.title}</p>
                        <p className="mt-1 line-clamp-1 text-xs text-paper-dim">
                          {p.solution}
                        </p>
                      </td>
                      <td className="hidden px-4 py-4 text-paper-muted md:table-cell">
                        {p.company.split("—")[0]?.trim()}
                      </td>
                      <td className="hidden px-4 py-4 lg:table-cell">
                        {topMetric && (
                          <div>
                            <div className="font-display text-xl text-signal">
                              {topMetric[1]}
                            </div>
                            <div className="font-mono text-[9px] uppercase tracking-widest text-paper-dim">
                              {topMetric[0]}
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="hidden px-4 py-4 lg:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {p.stack.slice(0, 3).map((s) => (
                            <span
                              key={s}
                              className="rounded-full border border-ink-line bg-ink-elev px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-paper-dim"
                            >
                              {s}
                            </span>
                          ))}
                          {p.stack.length > 3 && (
                            <span className="font-mono text-[9px] text-paper-dim">
                              +{p.stack.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <Link
                          href={`/projects/${p.slug}`}
                          className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-paper-dim transition hover:text-signal"
                        >
                          Case study
                          <ArrowUpRight className="h-3 w-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}
