"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data/cv";

export default function V2Testimonials() {
  return (
    <section id="testimonials" className="bg-[#fafaf7] py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#2d9961]">
          / testimonials
        </p>
        <h2 className="mt-4 max-w-3xl font-jakarta text-4xl font-extrabold leading-[1.05] tracking-tight text-[#0e0e0d] sm:text-5xl">
          What the people who{" "}
          <span className="font-hand text-[#3fb578]">shipped with me</span> say.
        </h2>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name + t.company}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative flex flex-col rounded-3xl border border-[#e0dfd8] bg-white p-7"
            >
              <Quote className="h-7 w-7 text-[#6dcc99]" />
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-[#0e0e0d]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-[#e0dfd8] pt-4">
                <p className="font-jakarta text-sm font-bold text-[#0e0e0d]">
                  {t.name}
                </p>
                <p className="mt-1 text-xs text-[#525251]">
                  {t.role} · {t.company}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[#2d9961]">
                  {t.relation}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
