import Link from "next/link";
import { PERSONAL } from "@/data/cv";

export default function V2Footer() {
  return (
    <footer className="border-t border-cream-line bg-cream">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-4 px-5 py-8 sm:flex-row sm:items-center sm:px-8">
        <p className="text-xs text-coal-muted">
          © {new Date().getFullYear()} {PERSONAL.name}. Made with care in{" "}
          {PERSONAL.location.split(",")[0]}.
        </p>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-coal-muted">
          <Link href="/" className="hover:text-coal">
            Dark version
          </Link>
          <span className="text-coal-dim">·</span>
          <Link href="/for-recruiters" className="hover:text-coal">
            For recruiters
          </Link>
          <span className="text-coal-dim">·</span>
          <Link href="/mcp" className="hover:text-mint-700">
            MCP server
          </Link>
          <span className="text-coal-dim">·</span>
          <a
            href="https://github.com/mazhar1790/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-coal"
          >
            Source
          </a>
        </p>
      </div>
    </footer>
  );
}
