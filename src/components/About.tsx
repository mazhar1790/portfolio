"use client";

import { motion } from "framer-motion";
import { PERSONAL, PRINCIPLES } from "@/data/cv";
import ListenButton from "./ListenButton";

const ABOUT_SPOKEN = `I'm Mazhar — an AI Solutions Architect in Abu Dhabi. Before LLMs were cool I was shipping dot-net systems for governments and ministries serving millions of users. When the world changed, I went deep on retrieval, prompt engineering, evals, and the unglamorous plumbing that makes AI work in production. I've now shipped four production AI systems at the Statistics Centre Abu Dhabi: a RAG system on 100,000 documents, a natural language SQL platform for 200 analysts, a vision pipeline saving 2,000 staff hours monthly, and a chatbot handling 18,000 queries each month. I'm now open to senior AI architecture roles or consulting from June 2026.`;

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container-page">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-signal">01</span>
          <span className="hairline w-12" />
          <span className="meta-plain">About</span>
        </div>

        <div className="mt-10 grid gap-14 lg:grid-cols-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="display-2 max-w-3xl">
                Fifteen years of shipping software.{" "}
                <span className="display-italic">
                  The last three building AI.
                </span>
              </h2>
              <ListenButton text={ABOUT_SPOKEN} label="Listen" />
            </div>

            <div className="mt-12 max-w-2xl space-y-6 text-lg leading-relaxed text-paper-muted">
              <p>
                I&apos;m {PERSONAL.name.split(" ")[0]} — an AI Solutions
                Architect in Abu Dhabi. Before LLMs were cool I was shipping
                .NET systems for governments and ministries serving millions of
                users. When the world changed, I went deep on retrieval, prompt
                engineering, evals, and the unglamorous plumbing that makes AI
                work in production.
              </p>
              <p>
                I&apos;m a{" "}
                <span className="text-paper">vibe-coding advocate</span> —
                shipping fast, end-to-end, refusing to confuse a demo for a
                product. The systems I build run every day, in front of
                thousands of users, and the metrics are public.
              </p>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <p className="meta mb-6">Operating principles</p>
            <ol className="space-y-7">
              {PRINCIPLES.map((p) => (
                <li key={p.n} className="grid grid-cols-[42px_1fr] gap-4">
                  <span className="font-mono text-xs text-signal pt-1">
                    {p.n}
                  </span>
                  <div>
                    <p className="font-display text-xl leading-tight text-paper">
                      {p.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-paper-muted">
                      {p.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
