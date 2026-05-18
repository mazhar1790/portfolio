"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SKILLS, SKILL_PROOFS } from "@/data/cv";

export default function Skills() {
  const entries = Object.entries(SKILLS);

  return (
    <section id="skills" className="section bg-ink-alt">
      <div className="container-page">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-signal">03</span>
          <span className="hairline w-12" />
          <span className="meta-plain">Stack</span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="display-2 mt-6 max-w-4xl"
        >
          The toolkit{" "}
          <span className="display-italic">behind the systems.</span>
        </motion.h2>

        <div className="mt-16 divide-y divide-ink-line border-y border-ink-line">
          {entries.map(([category, data], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="grid gap-6 py-8 lg:grid-cols-12 lg:gap-10"
            >
              <div className="lg:col-span-4">
                <p className="font-mono text-xs text-signal">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-2xl text-paper">
                  {category}
                </h3>
                <p className="mt-2 text-sm text-paper-muted">{data.blurb}</p>
              </div>

              <div className="lg:col-span-8">
                <div className="flex flex-wrap gap-1.5">
                  {data.items.map((item) => {
                    const proof = SKILL_PROOFS[item];
                    if (proof) {
                      return (
                        <Link
                          key={item}
                          href={proof}
                          className="group inline-flex items-center gap-1 rounded-full border border-signal/30 bg-signal/[0.06] px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-signal transition hover:border-signal/60 hover:bg-signal/10"
                          aria-label={`See ${item} in action`}
                        >
                          {item}
                          <ArrowUpRight className="h-2.5 w-2.5 opacity-60 transition group-hover:opacity-100" />
                        </Link>
                      );
                    }
                    return (
                      <span key={item} className="tag">
                        {item}
                      </span>
                    );
                  })}
                </div>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-paper-dim">
                  <span className="text-signal">●</span> Green items link to
                  proof — a project or article where I used them
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
