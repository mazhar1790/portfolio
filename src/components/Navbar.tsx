"use client";

import { useEffect, useState } from "react";
import { Command, Menu, MessageSquareText, X } from "lucide-react";
import { useChat } from "./AiChat/ChatContext";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#about", label: "About", n: "01", section: "about" },
  { href: "#projects", label: "Work", n: "02", section: "projects" },
  { href: "#experience", label: "Experience", n: "04", section: "experience" },
  { href: "#rag-demo", label: "RAG Demo", n: "07", section: "rag-demo" },
  { href: "#writing", label: "Writing", n: "08", section: "writing" },
  { href: "#contact", label: "Contact", n: "09", section: "contact" },
];

const SECTION_IDS = LINKS.map((l) => l.section);


export default function Navbar() {
  const { openChat } = useChat();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 16);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.25, rootMargin: "-64px 0px -35% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-ink-line bg-ink/80 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-3" aria-label="Home">
          <span className="signal-dot" />
          <span className="font-display text-base text-paper">
            Mazhar Hayat
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-paper-dim sm:inline">
            / AI Architect
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => {
            const isActive = activeSection === l.section;
            return (
              <a
                key={l.href}
                href={l.href}
                className={cn(
                  "group flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] transition",
                  isActive ? "text-paper" : "text-paper-dim hover:text-paper",
                )}
              >
                <span
                  className={cn(
                    "transition",
                    isActive ? "text-signal" : "text-signal/40 group-hover:text-signal",
                  )}
                >
                  {l.n}
                </span>
                {l.label}
                {isActive && (
                  <span className="h-1 w-1 rounded-full bg-signal shadow-signal-sm" />
                )}
              </a>
            );
          })}
          <a
            href="/for-recruiters"
            className="hidden items-center gap-1.5 rounded-full border border-ink-line bg-ink-card px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-paper-dim transition hover:border-signal/40 hover:text-paper lg:inline-flex"
          >
            For recruiters
          </a>
          <a
            href="/"
            className="hidden items-center gap-1.5 rounded-full border border-signal/40 bg-signal/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-signal transition hover:bg-signal/15 lg:inline-flex"
            title="Studio edition — default light theme"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            Studio edition
          </a>
          <a
            href="/ar"
            className="hidden items-center gap-1 rounded-md border border-ink-line bg-ink-card px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-paper-dim transition hover:border-signal/40 hover:text-paper lg:inline-flex"
            aria-label="Arabic version"
            title="النسخة العربية"
          >
            عر
          </a>
          <button
            type="button"
            onClick={() => openChat()}
            className="inline-flex items-center gap-2 rounded-full border border-signal/40 bg-signal/5 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-signal transition hover:bg-signal/15"
          >
            <MessageSquareText className="h-3 w-3" />
            Ask AI
          </button>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true }))}
            className="hidden items-center gap-1.5 rounded-md border border-ink-line px-2 py-1 font-mono text-[10px] text-paper-dim transition hover:border-signal/30 hover:text-paper xl:inline-flex"
            aria-label="Open command palette"
          >
            <Command className="h-3 w-3" />K
          </button>
          <ThemeToggle />
        </nav>

        <button
          type="button"
          className="rounded-md p-2 text-paper-dim transition hover:bg-ink-elev hover:text-paper md:hidden"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-ink-line bg-ink/95 backdrop-blur-md md:hidden">
          <nav className="container-page flex flex-col gap-1 py-4">
            {LINKS.map((l) => {
              const isActive = activeSection === l.section;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-3 font-mono text-xs uppercase tracking-[0.18em] transition hover:bg-ink-elev",
                    isActive ? "text-paper" : "text-paper-dim hover:text-paper",
                  )}
                >
                  <span className={isActive ? "text-signal" : "text-signal/50"}>
                    {l.n}
                  </span>
                  {l.label}
                  {isActive && (
                    <span className="ml-auto h-1 w-1 rounded-full bg-signal" />
                  )}
                </a>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                openChat();
              }}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-signal/40 bg-signal/10 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.18em] text-signal"
            >
              <MessageSquareText className="h-3.5 w-3.5" />
              Ask AI
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
