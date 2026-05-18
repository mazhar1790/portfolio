import Link from "next/link";
import { PERSONAL } from "@/data/cv";

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Explore",
    links: [
      { href: "#portfolio", label: "Work" },
      { href: "#skills", label: "Stack" },
      { href: "#experience", label: "Experience" },
      { href: "#writing", label: "Writing" },
    ],
  },
  {
    title: "Sandboxes",
    links: [
      { href: "/fit", label: "AI fit analyser" },
      { href: "/playground", label: "Document playground" },
      { href: "/evals", label: "Live RAG evals" },
      { href: "/timeline", label: "Career timeline" },
    ],
  },
  {
    title: "More",
    links: [
      { href: "/now", label: "/now — what I'm building" },
      { href: "/podcast", label: "Portfolio podcast" },
      { href: "/mcp", label: "MCP server" },
      { href: "/for-recruiters", label: "For recruiters" },
    ],
  },
];

export default function V2Footer() {
  return (
    <footer className="border-t border-[#e0dfd8] bg-[#fafaf7]">
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="/v2"
              className="font-jakarta text-2xl font-extrabold tracking-tight text-[#0e0e0d]"
            >
              mazhar.
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#525251]">
              AI Solutions Architect shipping enterprise LLM systems for
              government scale. Available for senior architecture roles &amp;
              consulting.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs">
              <a
                href={`mailto:${PERSONAL.email}`}
                className="rounded-full border border-[#e0dfd8] bg-white px-3 py-1.5 font-medium text-[#0e0e0d] transition hover:border-[#6dcc99]"
              >
                {PERSONAL.email}
              </a>
              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[#e0dfd8] bg-white px-3 py-1.5 font-medium text-[#0e0e0d] transition hover:border-[#6dcc99]"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#9a9a96]">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-[#525251] transition hover:text-[#2d9961]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[#e0dfd8] pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-[#9a9a96]">
            © {new Date().getFullYear()} {PERSONAL.name}. Studio Edition. Made
            with care in {PERSONAL.location.split(",")[0]}.
          </p>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#9a9a96]">
            <Link href="/" className="hover:text-[#0e0e0d]">
              ← Switch to dark version
            </Link>
            <span>·</span>
            <a
              href="https://github.com/mazhar1790/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0e0e0d]"
            >
              Source
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
