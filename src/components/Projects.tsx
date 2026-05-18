"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ComponentType } from "react";
import { PROJECTS, type Project } from "@/data/cv";
import RagDiagram from "./diagrams/RagDiagram";
import NlSqlDiagram from "./diagrams/NlSqlDiagram";
import VisionDiagram from "./diagrams/VisionDiagram";

const DIAGRAMS: Record<number, ComponentType> = {
  0: RagDiagram,
  1: NlSqlDiagram,
  2: VisionDiagram,
};

export default function Projects() {
  const featured = PROJECTS.filter((p) => p.featured);
  const other = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="projects" className="section">
      <div className="container-page">
        <SectionHeader number="02" label="Selected Work" />

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="display-2 mt-6 max-w-4xl"
        >
          Three systems. <span className="display-italic">In production.</span>
        </motion.h2>

        <div className="mt-20 space-y-32">
          {featured.map((p, i) => (
            <CaseStudy
              key={p.title}
              project={p}
              index={i}
              Diagram={DIAGRAMS[i]}
            />
          ))}
        </div>

        {other.length > 0 && (
          <div className="mt-32 border-t border-ink-line pt-12">
            <p className="meta mb-6">Also shipped</p>
            <div className="grid gap-5 md:grid-cols-2">
              {other.map((p) => (
                <motion.article
                  key={p.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5 }}
                  className="surface group p-6 transition hover:border-signal/30"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-paper-dim">
                      {p.year}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-paper-dim transition group-hover:text-signal" />
                  </div>
                  <h3 className="display-3 mt-4">{p.title}</h3>
                  <p className="mt-2 text-sm text-paper-muted">{p.company}</p>
                  <p className="mt-4 text-sm text-paper-muted">{p.solution}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 5).map((s) => (
                      <span key={s} className="tag">
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function CaseStudy({
  project,
  index,
  Diagram,
}: {
  project: Project;
  index: number;
  Diagram?: ComponentType;
}) {
  const reverse = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
        <div
          className={`lg:col-span-6 ${
            reverse ? "lg:order-2 lg:col-start-7" : ""
          }`}
        >
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs text-signal">
              0{index + 1}
            </span>
            <span className="meta-plain">{project.year}</span>
            <span className="hairline w-12" />
            <span className="font-mono text-[11px] text-paper-dim">
              {project.company.split("—")[0]?.trim()}
            </span>
          </div>

          <h3 className="display-3 mt-5">{project.title}</h3>

          <div className="mt-8 space-y-6 case-prose">
            <div>
              <p className="meta">Challenge</p>
              <p className="mt-2 text-base text-paper">{project.challenge}</p>
            </div>
            <div>
              <p className="meta">Approach</p>
              <p className="mt-2 text-base text-paper-muted">
                {project.solution}
              </p>
            </div>
          </div>

          <ul className="mt-8 space-y-2.5">
            {project.impact.map((line) => (
              <li
                key={line}
                className="flex gap-3 text-[15px] leading-relaxed text-paper"
              >
                <span className="mt-2.5 h-px w-4 shrink-0 bg-signal" />
                {line}
              </li>
            ))}
          </ul>

          <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
            {Object.entries(project.metrics).map(([k, v]) => (
              <div key={k}>
                <div className="font-display text-3xl text-paper">{v}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-paper-dim">
                  {k}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span key={s} className="tag">
                {s}
              </span>
            ))}
          </div>

          {project.slug && (
            <div className="mt-8">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-signal transition hover:text-signal/80"
              >
                Full case study
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}
        </div>

        <div
          className={`lg:col-span-6 ${
            reverse ? "lg:order-1 lg:col-start-1" : ""
          }`}
        >
          {Diagram ? (
            <Diagram />
          ) : (
            <div className="surface-elev grid h-full min-h-[280px] place-items-center">
              <p className="font-mono text-xs text-paper-dim">
                {"// architecture diagram"}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function SectionHeader({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-xs text-signal">{number}</span>
      <span className="hairline w-12" />
      <span className="meta-plain">{label}</span>
    </div>
  );
}
