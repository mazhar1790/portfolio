"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/data/cv";

export default function V2Portfolio() {
  const featured = PROJECTS.filter((p) => p.featured).slice(0, 4);

  return (
    <section id="portfolio" className="bg-cream-warm py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid items-end gap-6 sm:grid-cols-[1fr_auto]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-mint-700">
              / portfolio
            </p>
            <h2 className="mt-4 font-jakarta text-4xl font-extrabold leading-tight tracking-tight text-coal sm:text-5xl">
              Selected work,{" "}
              <span className="font-hand text-mint-600">production grade.</span>
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-coal-muted">
              Four flagship systems. Each one was an experiment for someone,
              somewhere. Now they all run 24/7 in front of real users.
            </p>
          </div>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 self-end text-sm font-semibold text-coal-muted transition hover:text-coal"
          >
            See all projects
            <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {featured.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      className="group relative overflow-hidden rounded-3xl border border-cream-line bg-white p-7 transition hover:border-mint-300 hover:shadow-[0_24px_48px_-26px_rgba(45,153,97,0.32)]"
    >
      {/* Year + company */}
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-coal-muted">
          {project.year} · {project.company.split("—")[0]?.trim()}
        </p>
        <span className="rounded-full border border-mint-200 bg-mint-50 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-mint-700">
          Featured
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-5 font-jakarta text-2xl font-bold leading-tight text-coal">
        {project.title}
      </h3>

      {/* Body */}
      <p className="mt-3 text-[14.5px] leading-relaxed text-coal-muted">
        {project.solution}
      </p>

      {/* Impact bullets */}
      <ul className="mt-5 space-y-2">
        {project.impact.slice(0, 3).map((imp) => (
          <li
            key={imp}
            className="flex gap-2.5 text-sm leading-snug text-coal-soft"
          >
            <span className="mt-2 h-1 w-3 shrink-0 rounded-full bg-mint-500" />
            <span>{imp}</span>
          </li>
        ))}
      </ul>

      {/* Stack chips */}
      <div className="mt-6 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 5).map((s) => (
          <span
            key={s}
            className="rounded-full border border-cream-line bg-cream-warm px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-coal-muted"
          >
            {s}
          </span>
        ))}
      </div>

      {/* CTA */}
      <Link
        href={`/projects/${project.slug}`}
        className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-mint-700 transition group-hover:gap-2.5"
      >
        Full case study
        <ArrowUpRight className="h-3.5 w-3.5" />
      </Link>
    </motion.div>
  );
}
