"use client";

import Link from "next/link";
import { ArrowUpRight, Terminal } from "lucide-react";

export default function V2McpStrip() {
  return (
    <section className="bg-[#0e0e0d] py-16 text-white">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#6dcc99]/30 bg-[#6dcc99]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#6dcc99]">
              <Terminal className="h-3 w-3" />
              new · Model Context Protocol
            </div>
            <h2 className="mt-4 font-jakarta text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              Talk to my portfolio from{" "}
              <span className="font-hand text-[#6dcc99]">Claude.</span>
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/70">
              I shipped an MCP server that exposes my profile, projects, skills
              and CV corpus as live tools. Any MCP-compatible client (Claude
              Desktop, Cursor, etc.) can query, search and check fit
              programmatically.
            </p>
          </div>

          <Link
            href="/mcp"
            className="group inline-flex items-center gap-2 self-start rounded-xl bg-[#6dcc99] px-6 py-3.5 font-jakarta text-sm font-bold text-[#0e0e0d] transition hover:bg-white lg:self-center"
          >
            View MCP setup
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            { code: "get_profile", desc: "Bio, role, location" },
            { code: "list_projects", desc: "All shipped projects" },
            { code: "search_cv", desc: "Semantic search the corpus" },
          ].map((t) => (
            <div
              key={t.code}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
            >
              <p className="font-mono text-[12px] text-[#6dcc99]">{t.code}</p>
              <p className="mt-1 text-[12px] text-white/60">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
