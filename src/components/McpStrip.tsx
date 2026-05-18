"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Cpu } from "lucide-react";

export default function McpStrip() {
  return (
    <section className="border-y border-ink-line bg-ink">
      <div className="container-page py-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="grid items-center gap-8 sm:grid-cols-[auto_1fr_auto]"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-signal/30 bg-signal/10">
            <Cpu className="h-6 w-6 text-signal" />
          </div>

          <div>
            <p className="meta">New · Agent-native CV</p>
            <h3 className="mt-2 font-display text-2xl text-paper sm:text-3xl">
              I shipped my CV as an{" "}
              <span className="display-italic text-signal/90">MCP server.</span>
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-paper-muted sm:text-base">
              If you use Claude Desktop, Cursor, or any MCP-aware client, point
              it at this repo and your agent can interview my CV directly —
              six structured tools, two resources, zero hallucination.
            </p>
          </div>

          <Link
            href="/mcp"
            className="group inline-flex items-center gap-2 self-start rounded-xl border border-signal/30 bg-signal/[0.06] px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-signal transition hover:border-signal/60 hover:bg-signal/10 sm:self-center"
          >
            Wire it up
            <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:rotate-12" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
