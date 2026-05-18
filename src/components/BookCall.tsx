"use client";

import { useCallback, useEffect, useState } from "react";
import { Calendar, Loader2 } from "lucide-react";
import { PERSONAL } from "@/data/cv";
import { cn } from "@/lib/utils";

interface Props {
  variant?: "primary" | "secondary" | "ghost";
  label?: string;
  className?: string;
}

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
    };
  }
}

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
const CSS_HREF = "https://assets.calendly.com/assets/external/widget.css";

export default function BookCall({
  variant = "primary",
  label = "Book a 20-min call",
  className,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);

  // Preload Calendly assets once on mount so click→open is instant.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.Calendly) {
      setScriptReady(true);
      return;
    }
    // Inject CSS once
    if (!document.querySelector(`link[href="${CSS_HREF}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = CSS_HREF;
      document.head.appendChild(link);
    }
    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`,
    );
    if (!script) {
      script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.onload = () => setScriptReady(true);
      document.body.appendChild(script);
    } else {
      script.addEventListener("load", () => setScriptReady(true));
      if (window.Calendly) setScriptReady(true);
    }
  }, []);

  const open = useCallback(() => {
    if (typeof window === "undefined") return;
    if (window.Calendly && PERSONAL.calendly) {
      window.Calendly.initPopupWidget({ url: PERSONAL.calendly });
      return;
    }
    setLoading(true);
    // Fallback: redirect after a beat if script never loaded.
    const interval = setInterval(() => {
      if (window.Calendly && PERSONAL.calendly) {
        clearInterval(interval);
        setLoading(false);
        window.Calendly.initPopupWidget({ url: PERSONAL.calendly });
      }
    }, 200);
    setTimeout(() => {
      clearInterval(interval);
      setLoading(false);
      if (!window.Calendly && PERSONAL.calendly) {
        window.open(PERSONAL.calendly, "_blank", "noopener,noreferrer");
      }
    }, 2500);
  }, []);

  if (!PERSONAL.calendly) return null;

  const buttonClass = cn(
    variant === "primary" && "btn-primary",
    variant === "secondary" && "btn-secondary",
    variant === "ghost" && "btn-ghost",
    className,
  );

  return (
    <button
      type="button"
      onClick={open}
      disabled={loading}
      aria-label={label}
      className={buttonClass}
      data-calendly-ready={scriptReady}
    >
      {loading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin text-signal" />
      ) : (
        <Calendar className="h-3.5 w-3.5 text-signal" />
      )}
      {label}
    </button>
  );
}
