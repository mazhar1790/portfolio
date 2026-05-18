import Link from "next/link";
import { ArrowUp, Linkedin, Mail } from "lucide-react";
import { PERSONAL } from "@/data/cv";

export default function Footer() {
  return (
    <footer className="border-t border-ink-line bg-ink">
      <div className="container-page py-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-mono text-xs text-paper-dim">
              © {new Date().getFullYear()} {PERSONAL.name}.
            </p>
            <p className="mt-1 font-mono text-xs text-paper-dim">
              Next.js · Tailwind · Groq · Gemini · Cohere · Pinecone.{" "}
              <span className="text-signal">All systems nominal.</span>
            </p>
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-paper-dim">
              <Link href="/for-recruiters" className="transition hover:text-paper">
                For recruiters
              </Link>
              <span className="text-ink-line">·</span>
              <Link href="/fit" className="transition hover:text-paper">
                Fit analyser
              </Link>
              <span className="text-ink-line">·</span>
              <Link href="/playground" className="transition hover:text-paper">
                Playground
              </Link>
              <span className="text-ink-line">·</span>
              <Link href="/projects" className="transition hover:text-paper">
                All projects
              </Link>
              <span className="text-ink-line">·</span>
              <Link href="/timeline" className="transition hover:text-paper">
                Timeline
              </Link>
              <span className="text-ink-line">·</span>
              <Link href="/embeddings" className="transition hover:text-paper">
                Embeddings
              </Link>
              <span className="text-ink-line">·</span>
              <Link href="/stack" className="transition hover:text-paper">
                Stack
              </Link>
              <span className="text-ink-line">·</span>
              <Link href="/uses" className="transition hover:text-paper">
                /uses
              </Link>
              <span className="text-ink-line">·</span>
              <Link href="/now" className="transition hover:text-paper">
                /now
              </Link>
              <span className="text-ink-line">·</span>
              <Link href="/evals" className="transition hover:text-paper">
                Evals
              </Link>
              <span className="text-ink-line">·</span>
              <Link href="/podcast" className="transition hover:text-paper">
                Podcast
              </Link>
              <span className="text-ink-line">·</span>
              <Link href="/mcp" className="transition hover:text-signal">
                MCP server
              </Link>
              <span className="text-ink-line">·</span>
              <a
                href="https://github.com/mazhar1790/portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-paper"
              >
                Source
              </a>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-line text-paper-dim transition hover:border-signal/40 hover:text-signal"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${PERSONAL.email}`}
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-line text-paper-dim transition hover:border-signal/40 hover:text-signal"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="#top"
              aria-label="Back to top"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-line text-paper-dim transition hover:border-signal/40 hover:text-signal"
            >
              <ArrowUp className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
