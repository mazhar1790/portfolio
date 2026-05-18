"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock, PenLine } from "lucide-react";
import { ARTICLES } from "@/data/cv";

function formatDate(iso: string): string {
  const [year, month] = iso.split("-");
  if (!year || !month) return iso;
  const d = new Date(Number(year), Number(month) - 1);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function Writing() {
  return (
    <section id="writing" className="section">
      <div className="container-page">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-signal">08</span>
          <span className="hairline w-12" />
          <span className="meta-plain">Writing</span>
        </div>

        <div className="mt-6 flex items-end justify-between gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="display-2 max-w-3xl"
          >
            Patterns from{" "}
            <span className="display-italic">production AI.</span>
          </motion.h2>
          <span className="hidden shrink-0 rounded-full border border-signal/30 bg-signal/5 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-signal sm:inline-flex">
            <PenLine className="mr-1.5 h-3 w-3" />
            Coming soon
          </span>
        </div>

        <div className="mt-14 divide-y divide-ink-line border-y border-ink-line">
          {ARTICLES.map((a, i) => (
            <motion.article
              key={a.slug}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group grid gap-4 py-8 lg:grid-cols-12 lg:gap-8"
            >
              <div className="lg:col-span-2">
                <p className="font-mono text-xs text-paper-dim">
                  {formatDate(a.date)}
                </p>
                <p className="mt-1 flex items-center gap-1 font-mono text-xs text-paper-dim">
                  <Clock className="h-3 w-3" />
                  {a.readMin} min read
                </p>
              </div>

              <div className="lg:col-span-9">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl leading-snug text-paper transition group-hover:text-signal lg:text-[1.6rem]">
                    {a.title}
                  </h3>
                  {a.comingSoon ? (
                    <span className="mt-1 shrink-0 rounded-full border border-ink-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-paper-dim lg:flex hidden items-center">
                      Soon
                    </span>
                  ) : (
                    <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-paper-dim transition group-hover:text-signal hidden lg:block" />
                  )}
                </div>

                <p className="mt-3 text-[15px] leading-relaxed text-paper-muted">
                  {a.summary}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {a.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 font-mono text-xs text-paper-dim"
        >
          Articles publishing soon. Follow on{" "}
          <a
            href="https://www.linkedin.com/in/mazharhayyat/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-signal underline underline-offset-2 transition hover:text-paper"
          >
            LinkedIn
          </a>{" "}
          to be notified.
        </motion.p>
      </div>
    </section>
  );
}
