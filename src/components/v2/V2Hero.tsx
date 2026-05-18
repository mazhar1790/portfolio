"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Linkedin, MapPin, Sparkles } from "lucide-react";
import { PERSONAL } from "@/data/cv";

export default function V2Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f7f7f3] pt-24 sm:pt-28">
      {/* Mint blob top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-20 -z-10 h-[28rem] w-[28rem] rounded-full bg-[#d4f0e0] opacity-60 blur-[80px]"
      />
      {/* Mint blob bottom-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-0 -z-10 h-[20rem] w-[20rem] rounded-full bg-[#d4f0e0] opacity-40 blur-[60px]"
      />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">

          {/* ── Left: copy ──────────────────────────────────────── */}
          <div className="flex-1">
            {/* Available badge */}
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#b8e8ce] bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2d9961]"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#3fb578]" />
              Available · June 2026
            </motion.span>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mt-7 font-jakarta text-[clamp(3rem,8vw,5.5rem)] font-extrabold leading-[1.0] tracking-[-0.02em] text-[#0e0e0d]"
            >
              I architect{" "}
              <span className="relative inline-block">
                <span className="relative z-10">AI&nbsp;systems</span>
                {/* Animated underline */}
                <svg
                  aria-hidden
                  viewBox="0 0 320 16"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 h-[0.18em] w-full"
                >
                  <motion.path
                    d="M 4 10 Q 80 2, 160 8 T 316 6"
                    stroke="#3fb578"
                    strokeWidth="7"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
                  />
                </svg>
              </span>
              <br />
              that ship.
            </motion.h1>

            {/* Sub-copy */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-6 max-w-[480px] text-[17px] leading-relaxed text-[#525251]"
            >
              15+ years building production software · 3+ years shipping
              enterprise LLM systems for government. RAG, NL-to-SQL, document
              intelligence — the kind that runs 24/7, not the kind that demos
              well.
            </motion.p>

            {/* Name + title strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2"
            >
              <span className="font-jakarta text-2xl font-bold text-[#0e0e0d]">
                {PERSONAL.name}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9a9a96]">
                AI Solutions Architect &nbsp;//&nbsp; Senior Engineer
              </span>
            </motion.div>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <a
                href="#portfolio"
                className="group inline-flex items-center gap-2 rounded-full bg-[#0e0e0d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2d9961]"
              >
                See the work
                <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href={`mailto:${PERSONAL.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-[#e0dfd8] bg-white px-5 py-3 text-sm font-semibold text-[#0e0e0d] transition hover:border-[#9fdfbb] hover:bg-[#f3fbf7]"
              >
                Email me
              </a>
              <span className="inline-flex items-center gap-1.5 text-xs text-[#9a9a96]">
                <MapPin className="h-3.5 w-3.5 text-[#3fb578]" />
                {PERSONAL.location}
              </span>
            </motion.div>
          </div>

          {/* ── Right: photo card ────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative mx-auto w-full max-w-[340px] shrink-0 lg:mx-0 lg:max-w-[380px]"
          >
            {/* "Come on · let's talk" circular badge */}
            <div className="absolute -right-6 -top-8 z-10 hidden h-28 w-28 lg:block">
              <svg viewBox="0 0 120 120" className="h-full w-full">
                <defs>
                  <path
                    id="hero-circle"
                    d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
                  />
                </defs>
                <text
                  fontSize="9"
                  fontFamily="monospace"
                  letterSpacing="2"
                  fill="#262624"
                  textAnchor="middle"
                >
                  <textPath href="#hero-circle">
                    come on · let&apos;s talk · come on · let&apos;s talk ·
                  </textPath>
                </text>
              </svg>
              <a
                href="#contact"
                className="absolute inset-[30%] flex items-center justify-center rounded-full border-2 border-[#6dcc99] bg-[#f7f7f3] text-[#2d9961] transition hover:bg-[#e3f6ec]"
                aria-label="Contact me"
              >
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            {/* Photo card — plain <img> for maximum reliability */}
            <div
              className="relative overflow-hidden rounded-[24px] bg-white"
              style={{ boxShadow: "0 20px 60px -20px rgba(14,14,13,0.22)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/me.png"
                alt={`${PERSONAL.name} — portrait`}
                width={760}
                height={960}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  objectFit: "cover",
                  objectPosition: "top center",
                }}
              />

              {/* Gradient fade at bottom */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4"
                style={{ background: "linear-gradient(to top, rgba(247,247,243,0.7), transparent)" }}
              />

              {/* Badge */}
              <div
                className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-medium text-white"
                style={{ background: "rgba(14,14,13,0.80)", backdropFilter: "blur(8px)" }}
              >
                <Sparkles className="h-3 w-3 text-emerald-300" />
                Production-grade AI · since 2023
              </div>
            </div>

            {/* Hand-drawn squiggle — bottom right */}
            <svg
              aria-hidden
              viewBox="0 0 160 60"
              fill="none"
              className="absolute -bottom-8 -right-6 hidden w-40 text-[#6dcc99] lg:block"
            >
              <motion.path
                d="M 4 30 C 20 10, 40 50, 60 30 S 100 10, 120 30 S 148 50, 156 26"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeOut", delay: 1 }}
              />
            </svg>

            {/* Social pills */}
            <div className="mt-5 flex justify-center gap-3 lg:absolute lg:-left-14 lg:top-10 lg:mt-0 lg:flex-col">
              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e0dfd8] bg-white text-[#525251] transition hover:border-[#6dcc99] hover:text-[#2d9961]"
              >
                <Linkedin className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://github.com/mazhar1790"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e0dfd8] bg-white font-jakarta text-xs font-bold text-[#525251] transition hover:border-[#6dcc99] hover:text-[#2d9961]"
              >
                gh
              </a>
              <a
                href={`mailto:${PERSONAL.email}`}
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e0dfd8] bg-white font-jakarta text-sm font-bold text-[#525251] transition hover:border-[#6dcc99] hover:text-[#2d9961]"
              >
                @
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom spacer */}
        <div className="h-16 sm:h-20" />
      </div>
    </section>
  );
}
