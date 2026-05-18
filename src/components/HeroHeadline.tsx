"use client";

import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";

// Three honest variants — each tested for ~7 days of traffic.
// Variant assignment is sticky per user (localStorage). All variants
// fire an `ab_hero_view` event so we can correlate to chat-open /
// case-study clicks downstream.
const VARIANTS = [
  {
    id: "A_architect",
    render: () => (
      <>
        I architect{" "}
        <span className="display-italic">AI systems</span>
        <br />
        that ship.
      </>
    ),
  },
  {
    id: "B_production",
    render: () => (
      <>
        Production{" "}
        <span className="display-italic">AI systems.</span>
        <br />
        Built to last.
      </>
    ),
  },
  {
    id: "C_proof",
    render: () => (
      <>
        I ship AI that{" "}
        <span className="display-italic">survives</span>
        <br />
        real users.
      </>
    ),
  },
] as const;

const STORAGE_KEY = "ab.hero.v1";

export default function HeroHeadline() {
  const [variant, setVariant] = useState<(typeof VARIANTS)[number]>(VARIANTS[0]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let pickId = window.localStorage.getItem(STORAGE_KEY);
    if (!pickId || !VARIANTS.some((v) => v.id === pickId)) {
      pickId = VARIANTS[Math.floor(Math.random() * VARIANTS.length)]!.id;
      window.localStorage.setItem(STORAGE_KEY, pickId);
    }
    const found = VARIANTS.find((v) => v.id === pickId) ?? VARIANTS[0];
    setVariant(found);
    setReady(true);

    // Fire analytics view event — Vercel Analytics drops gracefully if not loaded
    try {
      track("ab_hero_view", { variant: found.id });
    } catch {
      /* no-op */
    }
  }, []);

  // SSR-safe: render the default variant initially, swap on hydration.
  // Avoids hero flash by keeping markup stable (same h1 shape).
  return (
    <h1
      className="display-1 mt-8"
      data-ab-variant={ready ? variant.id : "ssr"}
    >
      {variant.render()}
    </h1>
  );
}

// Re-export so other components can fire correlated events
export function trackHeroConversion(action: string) {
  if (typeof window === "undefined") return;
  const variant = window.localStorage.getItem(STORAGE_KEY) ?? "unknown";
  try {
    track("ab_hero_convert", { variant, action });
  } catch {
    /* no-op */
  }
}
