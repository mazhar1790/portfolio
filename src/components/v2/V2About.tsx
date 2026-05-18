"use client";

import { motion } from "framer-motion";
import { METRICS, PERSONAL } from "@/data/cv";

export default function V2About() {
  return (
    <section id="about" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      {/* Soft mint accent corner */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10rem] top-[-6rem] h-[24rem] w-[24rem] rounded-full bg-mint-100/60 blur-3xl"
      />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr]">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-mint-700">
              / about
            </p>
            <h2 className="mt-4 font-jakarta text-4xl font-extrabold leading-tight tracking-tight text-coal sm:text-5xl">
              Engineer first.{" "}
              <span className="font-hand text-mint-600">Architect second.</span>
            </h2>
            <div className="mt-7 space-y-5 text-[16px] leading-relaxed text-coal-soft">
              <p>
                I&apos;ve spent <strong className="font-semibold text-coal">15+ years</strong>{" "}
                shipping software — from leasing platforms in Lahore to
                government services in Abu Dhabi to LLM systems running 24/7
                today.
              </p>
              <p>
                The pattern that kept showing up: the hard part is{" "}
                <em className="font-hand text-xl text-mint-700">never</em> the
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
              <p className="text-coal">
                <span className="font-mono text-[11px] uppercase tracking-widest text-coal-muted">
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
                  className={`rounded-3xl border border-cream-line bg-white p-6 ${
                    i === 0 ? "col-span-2 bg-mint-50" : ""
                  }`}
                >
                  <div
                    className={`font-jakarta font-extrabold tracking-tight text-coal ${
                      i === 0 ? "text-6xl" : "text-4xl"
                    }`}
                  >
                    {m.value}
                    {m.suffix}
                  </div>
                  <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-coal-muted">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Hand-drawn caption */}
            <p className="mt-6 text-center font-hand text-2xl text-mint-700">
              evidence over claims ✓
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
