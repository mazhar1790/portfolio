"use client";

import { motion } from "framer-motion";

interface Props {
  number: string;
  text: string;
}

export default function V2Lesson({ number, text }: Props) {
  return (
    <section className="bg-[#fafaf7] py-16 sm:py-20">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="relative rounded-3xl border border-[#e0dfd8] bg-white px-7 py-10 sm:px-12 sm:py-14"
        >
          <span className="absolute -top-3 left-7 inline-block rounded-full bg-[#0e0e0d] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#6dcc99]">
            {number}
          </span>
          <p className="font-jakarta text-2xl font-bold leading-snug text-[#0e0e0d] sm:text-3xl">
            &ldquo;<span className="font-hand text-[#3fb578]">{text}</span>&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
