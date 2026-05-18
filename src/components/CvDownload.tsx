"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ChevronDown, FileDown, FileText } from "lucide-react";
import { PERSONAL } from "@/data/cv";
import { cn } from "@/lib/utils";

interface Props {
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}

export default function CvDownload({ variant = "ghost", className }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [open]);

  const buttonClass = cn(
    variant === "primary" && "btn-primary",
    variant === "secondary" && "btn-secondary",
    variant === "ghost" && "btn-ghost",
    className,
  );

  return (
    <div ref={ref} className="relative inline-flex">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={buttonClass}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <ArrowDown className="h-3.5 w-3.5 text-signal" />
        Download CV
        <ChevronDown
          className={cn(
            "h-3 w-3 text-paper-dim transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-30 mt-2 w-56 overflow-hidden rounded-lg border border-ink-line bg-ink-card shadow-2xl"
        >
          <a
            role="menuitem"
            href={PERSONAL.cvUrlPdf}
            download={`${PERSONAL.cvLabel}.pdf`}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-3.5 py-2.5 text-sm text-paper transition hover:bg-ink-elev"
          >
            <FileText className="h-4 w-4 text-signal" />
            <span className="flex-1">PDF</span>
            <span className="font-mono text-[10px] text-paper-dim">
              for recruiters
            </span>
          </a>
          <a
            role="menuitem"
            href={PERSONAL.cvUrl}
            download={`${PERSONAL.cvLabel}.docx`}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 border-t border-ink-line px-3.5 py-2.5 text-sm text-paper transition hover:bg-ink-elev"
          >
            <FileDown className="h-4 w-4 text-paper-dim" />
            <span className="flex-1">Word (DOCX)</span>
            <span className="font-mono text-[10px] text-paper-dim">
              editable
            </span>
          </a>
        </div>
      )}
    </div>
  );
}
