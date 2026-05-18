"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { CERTIFICATIONS } from "@/data/cv";

export default function Certifications() {
  return (
    <section id="certifications" className="section bg-ink-alt">
      <div className="container-page">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-signal">05</span>
          <span className="hairline w-12" />
          <span className="meta-plain">Training &amp; Programs</span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="display-2 mt-6 max-w-4xl"
        >
          Trained <span className="display-italic">by Microsoft.</span>
        </motion.h2>
        <p className="mt-4 max-w-2xl text-sm text-paper-muted">
          Microsoft Official Course completions and learning paths. Exams AI-102 / AZ-305
          not yet attempted &mdash; the knowledge is applied daily in production at SCAD.
        </p>

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-ink-line bg-ink-line md:grid-cols-3">
          {CERTIFICATIONS.map((c, i) => {
            const Card = (
              <>
                <div className="flex items-center justify-between">
                  <p className="font-mono text-xs text-signal">{c.code}</p>
                  <span className="flex items-center gap-2">
                    <span className="rounded-full border border-ink-line px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-paper-dim">
                      {c.kind === "exam" ? "Certified" : "Trained"}
                    </span>
                    <ShieldCheck className="h-4 w-4 text-paper-dim transition group-hover:text-signal" />
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl leading-snug text-paper">
                  {c.name}
                </h3>
                {c.period && (
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-paper-dim">
                    {c.period}
                  </p>
                )}
                {c.detail && (
                  <p className="mt-3 text-sm leading-relaxed text-paper-muted">
                    {c.detail}
                  </p>
                )}
                <p className="mt-4 text-xs text-paper-dim">{c.issuer}</p>
              </>
            );
            const className =
              "group block bg-ink-card p-8 transition hover:bg-ink-elev";
            return (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                {c.proof ? (
                  <a
                    href={c.proof}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    {Card}
                  </a>
                ) : (
                  <div className={className}>{Card}</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
