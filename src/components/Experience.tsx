"use client";

import { motion } from "framer-motion";
import { EXPERIENCE } from "@/data/cv";

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container-page">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-signal">04</span>
          <span className="hairline w-12" />
          <span className="meta-plain">Experience</span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="display-2 mt-6 max-w-4xl"
        >
          <span className="display-italic">git log</span> --author=&quot;mazhar&quot;
        </motion.h2>

        <div className="relative mt-16 pl-8 sm:pl-10">
          <span
            aria-hidden
            className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-signal/40 via-ink-line to-transparent"
          />

          <div className="space-y-16">
            {EXPERIENCE.map((e, i) => (
              <motion.div
                key={e.role + e.company}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="relative"
              >
                <span
                  aria-hidden
                  className="absolute -left-[34px] top-1.5 sm:-left-[42px]"
                >
                  <span className="signal-dot" />
                </span>

                <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-3">
                    <p className="font-mono text-xs uppercase tracking-widest text-signal">
                      {e.period}
                    </p>
                    <p className="mt-1.5 font-mono text-[11px] text-paper-dim">
                      {e.location}
                    </p>
                  </div>

                  <div className="lg:col-span-9">
                    <h3 className="font-display text-2xl text-paper">
                      {e.role}
                    </h3>
                    <p className="mt-1 text-sm text-paper-muted">
                      <span className="text-signal">@</span> {e.company}
                    </p>

                    <ul className="mt-5 space-y-2">
                      {e.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex gap-3 text-sm leading-relaxed text-paper-muted"
                        >
                          <span className="font-mono text-signal/70">+</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {e.stack.map((s) => (
                        <span key={s} className="tag">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
