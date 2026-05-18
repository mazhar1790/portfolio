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
              Built with Next.js · Tailwind · Claude.{" "}
              <span className="text-signal">All systems nominal.</span>
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
