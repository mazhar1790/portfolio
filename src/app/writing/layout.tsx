import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function WritingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-ink pt-24 pb-32">
      <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
        <Link
          href="/#writing"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-paper-dim transition hover:text-signal"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All writing
        </Link>
        <article className="prose-portfolio mt-12">{children}</article>
      </div>
    </div>
  );
}
