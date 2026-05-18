"use client";

import { ArrowDown } from "lucide-react";
import { PERSONAL } from "@/data/cv";
import { cn } from "@/lib/utils";

interface Props {
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}

export default function CvDownload({ variant = "ghost", className }: Props) {
  const buttonClass = cn(
    variant === "primary" && "btn-primary",
    variant === "secondary" && "btn-secondary",
    variant === "ghost" && "btn-ghost",
    className,
  );

  return (
    <a
      href={PERSONAL.cvUrl}
      download={`${PERSONAL.cvLabel}.docx`}
      className={buttonClass}
      aria-label="Download CV (DOCX)"
    >
      <ArrowDown className="h-3.5 w-3.5 text-signal" />
      Download CV
      <span className="font-mono text-[10px] uppercase tracking-wider text-paper-dim">
        DOCX
      </span>
    </a>
  );
}
