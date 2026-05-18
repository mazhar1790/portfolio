"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Instagram, Linkedin, MapPin, Sparkles } from "lucide-react";
import { PERSONAL } from "@/data/cv";

export default function V2Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-28 sm:pt-32">
      {/* Soft background blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-40 -z-10 h-[28rem] w-[28rem] rounded-full bg-mint-200/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10rem] top-[-4rem] -z-10 h-[24rem] w-[24rem] rounded-full bg-mint-100/60 blur-3xl"
      />
      {/* Subtle dotted noise */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.5] [background-image:radial-gradient(rgba(14,14,13,0.06)_1px,transparent_1px)] [background-size:18px_18px]"
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 pb-20 sm:px-8 lg:grid-cols-[1fr_auto] lg:gap-16">
        {/* Left: copy */}
        <div className="order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-mint-200 bg-white px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-mint-700"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint-500" />
            Available · June 2026
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-8 font-jakarta text-5xl font-extrabold leading-[1.02] tracking-tight text-coal sm:text-6xl lg:text-[5.5rem]"
          >
            I architect{" "}
            <span className="relative inline-block">
              <span className="relative z-10">AI&nbsp;systems</span>
              <Underline />
            </span>
            <br />
            that ship.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-coal-muted"
          >
            15+ years building production software · 3+ years shipping
            enterprise LLM systems for government. RAG, NL-to-SQL, document
            intelligence — the kind that runs 24/7, not the kind that demos
            well.
          </motion.p>

          {/* Identity strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm"
          >
            <span className="font-jakarta text-2xl font-bold tracking-tight text-coal">
              {PERSONAL.name}
            </span>
            <span className="text-coal-dim">·</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-coal-muted">
              AI Solutions Architect &nbsp;//&nbsp; Senior Engineer
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#portfolio"
              className="group inline-flex items-center gap-2 rounded-full bg-coal px-5 py-3 text-sm font-semibold text-cream transition hover:bg-mint-700"
            >
              See the work
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={`mailto:${PERSONAL.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-cream-line bg-white px-5 py-3 text-sm font-semibold text-coal transition hover:border-mint-300 hover:bg-mint-50"
            >
              Email me
            </a>
            <span className="ml-1 inline-flex items-center gap-1.5 text-xs text-coal-muted">
              <MapPin className="h-3.5 w-3.5 text-mint-600" />
              {PERSONAL.location}
            </span>
          </motion.div>
        </div>

        {/* Right: square photo with squiggle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="order-1 mx-auto w-full max-w-sm lg:order-2 lg:max-w-md"
        >
          <div className="relative">
            {/* The photo container — arched card */}
            <div className="relative overflow-hidden rounded-[28px] border border-cream-line bg-white shadow-[0_24px_48px_-24px_rgba(14,14,13,0.18)]">
              {/* Explicit height so next/image fill works correctly */}
              <div className="relative h-[480px] w-full sm:h-[540px]">
                <Image
                  src="/me.png"
                  alt={`${PERSONAL.name} — portrait`}
                  fill
                  priority
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 360px, 420px"
                  className="object-cover object-top"
                />
                {/* Soft tint bottom */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/60 to-transparent" />
              </div>

              {/* Badge overlay */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-[rgba(14,14,13,0.82)] px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur">
                <Sparkles className="h-3 w-3 text-emerald-300" />
                Production-grade AI · since 2023
              </div>
            </div>

            {/* Decorative "come on, let's talk" curved label */}
            <CurvedLabel />

            {/* Hand-drawn squiggle accent */}
            <Squiggle className="pointer-events-none absolute -bottom-10 -left-10 hidden h-40 w-40 text-mint-400 lg:block" />

            {/* Social icons — below the card on mobile, floating left on lg */}
            <div className="mt-4 flex justify-center gap-3 lg:absolute lg:-left-14 lg:top-12 lg:mt-0 lg:flex-col">
              <SocialPill href={PERSONAL.linkedin} label="LinkedIn">
                <Linkedin className="h-3.5 w-3.5" />
              </SocialPill>
              <SocialPill href="https://github.com/mazhar1790" label="GitHub">
                <span className="font-jakarta text-xs font-bold">gh</span>
              </SocialPill>
              <SocialPill href={`mailto:${PERSONAL.email}`} label="Email">
                <span className="font-jakarta text-xs font-bold">@</span>
              </SocialPill>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Underline() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 320 24"
      preserveAspectRatio="none"
      className="absolute -bottom-1 left-0 h-3 w-full text-mint-400"
    >
      <motion.path
        d="M 4 14 Q 80 4, 160 12 T 316 10"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.7 }}
      />
    </svg>
  );
}

function CurvedLabel() {
  return (
    <div className="absolute -top-10 -right-8 hidden h-32 w-32 lg:block">
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full">
        <defs>
          <path
            id="v2-circle-path"
            d="M 60,60 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0"
          />
        </defs>
        <text className="fill-coal font-mono text-[10px] uppercase tracking-[0.22em]">
          <textPath href="#v2-circle-path" startOffset="0%">
            come on · let&apos;s talk · come on · let&apos;s talk ·
          </textPath>
        </text>
      </svg>
      <a
        href="#contact"
        aria-label="Get in touch"
        className="absolute inset-[34%] flex items-center justify-center rounded-full border-2 border-mint-400 bg-cream text-mint-700 transition hover:bg-mint-100"
      >
        <ArrowUpRight className="h-4 w-4" />
      </a>
    </div>
  );
}

function Squiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} aria-hidden>
      <motion.path
        d="M 20 100 C 40 70, 60 130, 80 100 S 120 70, 140 100 S 180 130, 195 95"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, ease: "easeOut", delay: 0.9 }}
      />
      <motion.circle
        cx="20"
        cy="100"
        r="4"
        fill="currentColor"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.0 }}
      />
    </svg>
  );
}

function SocialPill({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-cream-line bg-white text-coal-muted transition hover:border-mint-400 hover:text-mint-700"
    >
      {children}
    </a>
  );
}
