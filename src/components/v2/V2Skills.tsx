"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SKILLS, SKILL_PROOFS } from "@/data/cv";

export default function V2Skills() {
  const entries = Object.entries(SKILLS);

  return (
    <section id="skills" className="bg-[#f7f7f3] py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid items-end gap-6 sm:grid-cols-[1fr_auto]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#2d9961]">
              / stack
            </p>
            <h2 className="mt-4 font-jakarta text-4xl font-extrabold leading-tight tracking-tight text-[#0e0e0d] sm:text-5xl">
              The toolkit{" "}
              <span className="font-hand text-[#3fb578]">behind the systems.</span>
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#525251]">
              Green chips link to a project or article where I actually used
              the thing — proof, not just labels.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-[#e0dfd8] bg-[#e0dfd8]">
          {entries.map(([category, data], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.04 }}
              className="grid gap-6 bg-white p-7 lg:grid-cols-12 lg:gap-10"
            >
              <div className="lg:col-span-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#2d9961]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-jakarta text-2xl font-bold text-[#0e0e0d]">
                  {category}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#525251]">
                  {data.blurb}
                </p>
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
                          className="group inline-flex items-center gap-1 rounded-full border border-[#b8e8ce] bg-[#f3fbf7] px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-[#2d9961] transition hover:border-[#6dcc99] hover:bg-[#e3f6ec]"
                        >
                          {item}
                          <ArrowUpRight className="h-2.5 w-2.5 opacity-60 transition group-hover:opacity-100" />
                        </Link>
                      );
                    }
                    return (
                      <span
                        key={item}
                        className="rounded-full border border-[#e0dfd8] bg-[#fafaf7] px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-[#525251]"
                      >
                        {item}
                      </span>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
