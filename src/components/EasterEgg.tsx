"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";

const SEQUENCE = "mazhar";

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  vx: number;
  vy: number;
}

const EMOJIS = ["▴", "▾", "●", "◆", "⌬", "✦", "⚡", "·"];

export default function EasterEgg() {
  const [show, setShow] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    let buf = "";
    const onKey = (e: KeyboardEvent) => {
      // Ignore typing in form fields
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.key.length !== 1) return;
      buf = (buf + e.key.toLowerCase()).slice(-SEQUENCE.length);
      if (buf === SEQUENCE) {
        trigger();
        buf = "";
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function trigger() {
    setShow(true);
    // Generate ~40 particles bursting from center
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const next: Particle[] = Array.from({ length: 50 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 50;
      const speed = 6 + Math.random() * 10;
      return {
        id: Date.now() + i,
        x: cx,
        y: cy,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)]!,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
      };
    });
    setParticles(next);
    setTimeout(() => setParticles([]), 2200);
    setTimeout(() => setShow(false), 7000);
  }

  return (
    <>
      {/* Particle burst */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ x: p.x, y: p.y, opacity: 1, scale: 1 }}
            animate={{
              x: p.x + p.vx * 30,
              y: p.y + p.vy * 30 + 200, // gravity
              opacity: 0,
              scale: 0.6,
              rotate: Math.random() * 360,
            }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed left-0 top-0 z-[60] font-mono text-2xl text-signal"
            style={{ willChange: "transform, opacity" }}
          >
            {p.emoji}
          </motion.span>
        ))}
      </AnimatePresence>

      {/* Reveal panel */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 overflow-hidden rounded-2xl border border-signal/40 bg-ink-card/95 shadow-signal-lg backdrop-blur"
            style={{ maxWidth: "calc(100vw - 2rem)" }}
          >
            <div className="flex items-start gap-4 p-5 sm:p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-signal/40 bg-signal/15">
                <Sparkles className="h-5 w-5 text-signal" />
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-signal">
                  You found it · konami achievement
                </p>
                <p className="mt-2 font-display text-xl text-paper">
                  Curious people make the best engineers.
                </p>
                <p className="mt-2 max-w-md text-sm text-paper-muted">
                  Most visitors never type random words into a portfolio. The
                  fact that you did says good things. If you&apos;re hiring AI
                  talent, that probably extends to candidates too.{" "}
                  <a
                    href="mailto:Mazhar1783@outlook.com?subject=I%20found%20the%20easter%20egg"
                    className="text-signal underline-offset-4 hover:underline"
                  >
                    Drop me a line.
                  </a>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShow(false)}
                aria-label="Close"
                className="ml-2 shrink-0 rounded-md p-1.5 text-paper-dim transition hover:bg-ink-elev hover:text-paper"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
