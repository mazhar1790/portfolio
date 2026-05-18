"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data/cv";

export default function Testimonials() {
  return (
    <section id="testimonials" className="section bg-ink-alt">
      <div className="container-page">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-signal">06</span>
          <span className="hairline w-12" />
          <span className="meta-plain">What colleagues say</span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="display-2 mt-6 max-w-4xl"
        >
          Words from the{" "}
          <span className="display-italic">people who shipped with me.</span>
        </motion.h2>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name + t.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="surface flex flex-col gap-6 p-7 transition hover:border-signal/20"
            >
              <Quote className="h-6 w-6 shrink-0 text-signal" aria-hidden />

              <blockquote className="flex-1 text-[15px] leading-relaxed text-paper-muted">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <figcaption className="border-t border-ink-line pt-5">
                <p className="font-display text-base text-paper">{t.name}</p>
                <p className="mt-0.5 text-sm text-paper-muted">
                  {t.role} &middot; {t.company}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-signal">
                  {t.relation}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 font-mono text-xs text-paper-dim"
        >
          * Quotes represent the substance of feedback received. Names withheld
          at request of colleagues; full references available on request.
        </motion.p>
      </div>
    </section>
  );
}
