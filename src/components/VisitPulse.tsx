"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";

// Uses abacus.jasoncameron.dev — a free, no-auth hit counter API.
// Namespace and key are arbitrary; once set they're persistent.
// Falls back gracefully if the API is unreachable.
const NAMESPACE = "mazhar-portfolio";
const KEY = "site-visits";

export default function VisitPulse() {
  const [count, setCount] = useState<number | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let cancelled = false;
    // Increment-once-per-session — store a session marker in sessionStorage
    const alreadyHit = sessionStorage.getItem("portfolio-counted");
    const endpoint = alreadyHit
      ? `https://abacus.jasoncameron.dev/get/${NAMESPACE}/${KEY}`
      : `https://abacus.jasoncameron.dev/hit/${NAMESPACE}/${KEY}`;

    fetch(endpoint)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        const v = typeof data.value === "number" ? data.value : null;
        if (v !== null) {
          setCount(v);
          sessionStorage.setItem("portfolio-counted", "1");
          setShow(true);
        }
      })
      .catch(() => {
        // Silent fail — counter is a nice-to-have.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!show || count === null) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      className="fixed bottom-5 left-5 z-30 hidden items-center gap-2 rounded-full border border-ink-line bg-ink-card/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-paper-dim shadow-lg backdrop-blur sm:flex"
      aria-label="Total site visits"
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
      </span>
      <Eye className="h-3 w-3 text-paper-dim" />
      <span>
        <span className="text-paper">{count.toLocaleString()}</span> visits
      </span>
    </motion.div>
  );
}
