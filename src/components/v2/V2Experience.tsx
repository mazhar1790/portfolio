"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { EXPERIENCE } from "@/data/cv";

export default function V2Experience() {
  return (
    <section id="experience" className="bg-[#fafaf7] py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid items-end gap-6 sm:grid-cols-[1fr_auto]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#2d9961]">
              / experience
            </p>
            <h2 className="mt-4 font-jakarta text-4xl font-extrabold leading-tight tracking-tight text-[#0e0e0d] sm:text-5xl">
              <span className="font-hand text-[#3fb578]">git log</span>{" "}
              --author=&quot;mazhar&quot;
            </h2>
          </div>
          <Link
            href="/timeline"
            className="group inline-flex items-center gap-2 self-end text-sm font-semibold text-[#525251] transition hover:text-[#0e0e0d]"
          >
            See full timeline
            <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="relative mt-14 pl-8 sm:pl-12">
          {/* Vertical line */}
          <span
            aria-hidden
            className="absolute left-2 top-3 bottom-3 w-px bg-gradient-to-b from-[#6dcc99] via-[#e0dfd8] to-transparent"
          />

          <div className="space-y-14">
            {EXPERIENCE.map((e, i) => (
              <motion.article
                key={e.role + e.company}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative"
              >
                {/* Dot */}
                <span
                  aria-hidden
                  className="absolute -left-[34px] top-2 sm:-left-[46px]"
                >
                  <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-[#3fb578] bg-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3fb578]" />
                  </span>
                </span>

                <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-3">
                    <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#2d9961]">
                      {e.period}
                    </p>
                    <p className="mt-1.5 inline-flex items-center gap-1 font-mono text-[11px] text-[#9a9a96]">
                      <MapPin className="h-3 w-3" />
                      {e.location}
                    </p>
                  </div>

                  <div className="lg:col-span-9">
                    <h3 className="font-jakarta text-2xl font-bold text-[#0e0e0d]">
                      {e.role}
                    </h3>
                    <p className="mt-1 text-sm text-[#525251]">
                      <span className="text-[#3fb578]">@</span> {e.company}
                    </p>

                    <ul className="mt-5 space-y-2">
                      {e.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex gap-3 text-[14px] leading-relaxed text-[#525251]"
                        >
                          <span className="mt-2 h-1 w-3 shrink-0 rounded-full bg-[#6dcc99]" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {e.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-[#e0dfd8] bg-white px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-[#525251]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
