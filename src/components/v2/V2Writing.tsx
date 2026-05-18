"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Clock } from "lucide-react";
import { ARTICLES } from "@/data/cv";

function formatDate(s: string) {
  const [year, month] = s.split("-");
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const m = Number(month);
  return `${months[m - 1] ?? "??"} ${year}`;
}

export default function V2Writing() {
  return (
    <section id="writing" className="bg-[#f7f7f3] py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid items-end gap-6 sm:grid-cols-[1fr_auto]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#2d9961]">
              / writing
            </p>
            <h2 className="mt-4 font-jakarta text-4xl font-extrabold leading-[1.05] tracking-tight text-[#0e0e0d] sm:text-5xl">
              Field notes from{" "}
              <span className="font-hand text-[#3fb578]">shipping AI.</span>
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#525251]">
              Real architectures, real numbers, hard-won lessons. No fluff.
            </p>
          </div>
          <Link
            href="/writing"
            className="group inline-flex items-center gap-2 self-end text-sm font-semibold text-[#525251] transition hover:text-[#0e0e0d]"
          >
            All articles
            <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-4">
          {ARTICLES.map((a, i) => {
            const Wrapper = a.comingSoon ? "div" : Link;
            const wrapperProps = a.comingSoon
              ? { className: "" }
              : { href: `/writing/${a.slug}` };

            return (
              <motion.div
                key={a.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
              >
                {/* @ts-expect-error dynamic wrapper element */}
                <Wrapper
                  {...wrapperProps}
                  className={`group flex flex-col gap-4 rounded-3xl border border-[#e0dfd8] bg-white p-7 transition hover:border-[#6dcc99] hover:shadow-[0_18px_36px_-22px_rgba(45,153,97,0.30)] lg:flex-row lg:items-center lg:gap-8 ${
                    a.comingSoon ? "cursor-default opacity-70" : ""
                  }`}
                >
                  <div className="hidden lg:block">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#b8e8ce] bg-[#f3fbf7]">
                      <BookOpen className="h-5 w-5 text-[#2d9961]" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-[#9a9a96]">
                      <span>{formatDate(a.date)}</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {a.readMin} min read
                      </span>
                      {a.comingSoon && (
                        <span className="rounded-full bg-[#fafaf7] px-2 py-0.5 text-[#9a9a96]">
                          coming soon
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 font-jakarta text-xl font-bold leading-snug text-[#0e0e0d] transition group-hover:text-[#2d9961]">
                      {a.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-[#525251]">
                      {a.summary}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {a.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-[#fafaf7] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[#525251]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {!a.comingSoon && (
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-[#9a9a96] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#2d9961]" />
                  )}
                </Wrapper>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
