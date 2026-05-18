"use client";

import { motion } from "framer-motion";

interface Props {
  number: string;
  text: string;
  attribution?: string;
}

export default function Lesson({ number, text, attribution = "— Lesson learned" }: Props) {
  return (
    <section className="bg-ink-alt/30 py-20">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-signal">
            {number}
          </p>
          <blockquote className="mt-5 font-display text-2xl leading-snug text-paper sm:text-3xl md:text-[2.25rem]">
            <span className="text-signal/40">&ldquo;</span>
            <span className="display-italic">{text}</span>
            <span className="text-signal/40">&rdquo;</span>
          </blockquote>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-paper-dim">
            {attribution}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
