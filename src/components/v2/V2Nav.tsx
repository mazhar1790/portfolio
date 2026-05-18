"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import { PERSONAL } from "@/data/cv";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Work" },
  { href: "#skills", label: "Stack" },
  { href: "#experience", label: "Experience" },
  { href: "#writing", label: "Writing" },
  { href: "#contact", label: "Contact" },
];

export default function V2Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all ${
        scrolled
          ? "border-b border-cream-line bg-cream/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <Link href="/v2" className="flex items-center gap-2.5">
          <Logo />
          <span className="font-jakarta text-lg font-bold tracking-tight text-coal">
            mazhar.
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-coal-muted transition hover:bg-mint-100 hover:text-coal"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="hidden rounded-full px-3 py-2 text-xs font-medium text-coal-muted transition hover:text-coal sm:inline-flex"
            title="Switch to the original dark theme"
          >
            Dark version →
          </Link>
          <a
            href={PERSONAL.cvUrlPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-coal px-4 py-2.5 text-sm font-semibold text-cream transition hover:bg-mint-700"
          >
            Download CV
            <Download className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <span className="relative inline-flex h-9 w-9 items-center justify-center">
      <svg viewBox="0 0 40 40" className="h-9 w-9">
        <circle
          cx="20"
          cy="20"
          r="17"
          fill="none"
          stroke="#3fb578"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="80 30"
          strokeDashoffset="6"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-jakarta text-base font-extrabold text-coal">
        m
      </span>
    </span>
  );
}
