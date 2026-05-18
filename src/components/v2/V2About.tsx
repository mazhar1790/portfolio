"use client";

import { motion } from "framer-motion";
import { METRICS, PERSONAL, PRINCIPLES } from "@/data/cv";
import Counter from "../Counter";
import ListenButton from "../ListenButton";

const ABOUT_SPOKEN = `I'm Mazhar — an AI Solutions Architect in Abu Dhabi. Before LLMs were cool I was shipping dot-net systems for governments and ministries serving millions of users. When the world changed, I went deep on retrieval, prompt engineering, evals, and the unglamorous plumbing that makes AI work in production. I've now shipped four production AI systems at the Statistics Centre Abu Dhabi: a RAG system on 100,000 documents, a natural language SQL platform for 200 analysts, a vision pipeline saving 2,000 staff hours monthly, and a chatbot handling 18,000 queries each month. I'm now open to senior AI architecture roles or consulting from June 2026.`;

export default function V2About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#fafaf7] py-24 sm:py-32"
    >
      {/* Soft mint accent corner */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10rem] top-[-6rem] h-[24rem] w-[24rem] rounded-full bg-[#d8f1e3]/70 blur-3xl"
      />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        {/* ── Top row: copy + metrics ────────────────────────────── */}
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#2d9961]">
                / about
              </p>
              <ListenButton
                text={ABOUT_SPOKEN}
                label="Listen"
                className="!border-[#e0dfd8] !bg-white !text-[#525251] hover:!border-[#6dcc99] hover:!text-[#2d9961]"
              />
            </div>
            <h2 className="mt-4 font-jakarta text-4xl font-extrabold leading-tight tracking-tight text-[#0e0e0d] sm:text-5xl">
              Engineer first.{" "}
              <span className="font-hand text-[#3fb578]">Architect second.</span>
            </h2>
            <div className="mt-7 space-y-5 text-[16px] leading-relaxed text-[#525251]">
              <p>
                I&apos;ve spent{" "}
                <strong className="font-semibold text-[#0e0e0d]">
                  15+ years
                </strong>{" "}
                shipping software — from leasing platforms in Lahore to
                government services in Abu Dhabi to LLM systems running 24/7
                today.
              </p>
              <p>
                The pattern that kept showing up: the hard part is{" "}
                <em className="font-hand text-xl text-[#2d9961]">never</em> the
                model. It&apos;s the chunking, the retrieval, the prompts, the
                evals, the cost. The boring stuff between the demo and the
                system.
              </p>
              <p>
                I now spend my days on production LLM architecture — RAG
                pipelines over 100K+ documents, NL-to-SQL across eight
                databases, vision pipelines that save thousands of staff hours
                a month. The work is technical, opinionated, and end-to-end.
              </p>
              <p className="text-[#0e0e0d]">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#9a9a96]">
                  Currently
                </span>{" "}
                · {PERSONAL.location}. Available from June 2026 for senior IC,
                principal, or hands-on tech-lead roles.
              </p>
            </div>
          </motion.div>

          {/* Metrics grid */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="self-start"
          >
            <div className="grid grid-cols-2 gap-3">
              {METRICS.slice(0, 6).map((m, i) => (
                <div
                  key={m.label}
                  className={`rounded-3xl border border-[#e0dfd8] bg-white p-6 ${
                    i === 0 ? "col-span-2 bg-[#ebf8f1]" : ""
                  }`}
                >
                  <div
                    className={`font-jakarta font-extrabold tracking-tight text-[#0e0e0d] ${
                      i === 0 ? "text-6xl" : "text-4xl"
                    }`}
                  >
                    <Counter value={m.value} suffix={m.suffix} />
                  </div>
                  <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-[#525251]">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center font-hand text-2xl text-[#2d9961]">
              evidence over claims ✓
            </p>
          </motion.div>
        </div>

        {/* ── Operating principles ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#2d9961]">
                / operating principles
              </p>
              <h3 className="mt-3 font-jakarta text-3xl font-extrabold leading-tight tracking-tight text-[#0e0e0d] sm:text-4xl">
                The four rules I{" "}
                <span className="font-hand text-[#3fb578]">actually work by.</span>
              </h3>
            </div>
          </div>

          <ol className="mt-10 grid gap-4 sm:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <motion.li
                key={p.n}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-3xl border border-[#e0dfd8] bg-white p-7 transition hover:border-[#6dcc99]"
              >
                <div className="flex items-start gap-5">
                  <span className="font-mono text-xs font-bold text-[#2d9961]">
                    {p.n}
                  </span>
                  <div>
                    <p className="font-jakarta text-xl font-bold leading-tight text-[#0e0e0d]">
                      {p.title}
                    </p>
                    <p className="mt-2 text-[14px] leading-relaxed text-[#525251]">
                      {p.body}
                    </p>
                  </div>
                </div>
                {/* Decorative number */}
                <span className="pointer-events-none absolute -bottom-6 -right-3 font-jakarta text-[7rem] font-extrabold leading-none text-[#ebf8f1] transition group-hover:text-[#d8f1e3]">
                  {p.n.replace(/\D/g, "")}
                </span>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
