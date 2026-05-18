import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PROJECTS, PERSONAL } from "@/data/cv";
import RagDiagram from "@/components/diagrams/RagDiagram";
import NlSqlDiagram from "@/components/diagrams/NlSqlDiagram";
import VisionDiagram from "@/components/diagrams/VisionDiagram";
import type { ComponentType } from "react";

const DIAGRAMS: Record<string, ComponentType> = {
  "rag-document-intelligence": RagDiagram,
  "conversational-analytics": NlSqlDiagram,
  "vision-ai-pipeline": VisionDiagram,
};

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${PERSONAL.name}`,
    description: project.solution,
  };
}

export default function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const Diagram = DIAGRAMS[project.slug];
  const idx = PROJECTS.findIndex((p) => p.slug === params.slug);
  const prev = PROJECTS[idx - 1];
  const next = PROJECTS[idx + 1];

  return (
    <main className="min-h-screen bg-ink pt-24 pb-32">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8 lg:px-12">
        {/* Back */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-paper-dim transition hover:text-signal"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All work
        </Link>

        {/* Header */}
        <div className="mt-12">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-mono text-xs text-signal">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <span className="font-mono text-xs text-paper-dim">{project.year}</span>
            <span className="h-px w-8 bg-ink-line" />
            <span className="font-mono text-xs text-paper-dim">
              {project.company.split("—")[0]?.trim()}
            </span>
          </div>
          <h1 className="display-1 mt-6 max-w-4xl">{project.title}</h1>
        </div>

        {/* Diagram */}
        {Diagram && (
          <div className="mt-14">
            <p className="meta mb-4">Architecture</p>
            <Diagram />
          </div>
        )}

        {/* Challenge + Solution */}
        <div className="mt-16 grid gap-10 md:grid-cols-2">
          <div>
            <p className="meta">Challenge</p>
            <p className="mt-4 text-lg leading-relaxed text-paper">
              {project.challenge}
            </p>
          </div>
          <div>
            <p className="meta">Approach</p>
            <p className="mt-4 text-lg leading-relaxed text-paper-muted">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Impact */}
        <div className="mt-16">
          <p className="meta mb-6">Impact</p>
          <ul className="space-y-4">
            {project.impact.map((line) => (
              <li key={line} className="flex gap-4 text-lg leading-relaxed text-paper">
                <span className="mt-3 h-px w-6 shrink-0 bg-signal" />
                {line}
              </li>
            ))}
          </ul>
        </div>

        {/* Metrics */}
        <div className="mt-16 grid grid-cols-2 gap-6 border-y border-ink-line py-12 sm:grid-cols-4">
          {Object.entries(project.metrics).map(([k, v]) => (
            <div key={k}>
              <div className="font-display text-5xl text-paper">{v}</div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-paper-dim">
                {k}
              </div>
            </div>
          ))}
        </div>

        {/* Stack */}
        <div className="mt-12">
          <p className="meta mb-4">Tech stack</p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span key={s} className="tag">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Prev / Next */}
        <div className="mt-20 flex items-center justify-between border-t border-ink-line pt-10">
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="group flex items-center gap-2 text-sm text-paper-dim transition hover:text-paper"
            >
              <ArrowLeft className="h-4 w-4 transition group-hover:text-signal" />
              <span>
                <span className="block font-mono text-[10px] uppercase tracking-widest text-paper-dim">
                  Previous
                </span>
                <span className="mt-1 block font-display text-lg text-paper">
                  {prev.title}
                </span>
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group flex items-center gap-2 text-right text-sm text-paper-dim transition hover:text-paper"
            >
              <span>
                <span className="block font-mono text-[10px] uppercase tracking-widest text-paper-dim">
                  Next
                </span>
                <span className="mt-1 block font-display text-lg text-paper">
                  {next.title}
                </span>
              </span>
              <ArrowUpRight className="h-4 w-4 transition group-hover:text-signal" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </main>
  );
}
