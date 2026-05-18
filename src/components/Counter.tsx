"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function Counter({
  value,
  suffix = "",
  duration = 1800,
  className,
}: Props) {
  const [display, setDisplay] = useState(0);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    setMounted(true);

    const el = ref.current;

    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const t0 = performance.now();
      const animate = (now: number) => {
        const t = Math.min(1, (now - t0) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(Math.round(value * eased));
        if (t < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    };

    // 1. Immediate in-viewport check (above-the-fold counters animate right away)
    if (el) {
      const rect = el.getBoundingClientRect();
      const viewportH =
        window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < viewportH && rect.bottom > 0) {
        requestAnimationFrame(start);
      }
    }

    // 2. IntersectionObserver for below-the-fold counters
    let observer: IntersectionObserver | null = null;
    if (el && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) start();
          }
        },
        { threshold: 0, rootMargin: "0px 0px -10% 0px" },
      );
      observer.observe(el);
    }

    // 3. Fallback timer — force start after 1.5s if nothing triggered
    const fallback = window.setTimeout(start, 1500);

    // 4. Last-resort safety — if animation itself never runs (rAF paused etc.),
    //    just snap to the final value after 3s so the user never sees "0".
    const finalSafety = window.setTimeout(() => {
      if (!startedRef.current) {
        startedRef.current = true;
        setDisplay(value);
      }
    }, 3000);

    return () => {
      if (observer) observer.disconnect();
      window.clearTimeout(fallback);
      window.clearTimeout(finalSafety);
    };
  }, [value, duration]);

  // Before mount, render value statically — prevents any "stuck at 0" issue
  // if hydration has any hiccup. Same chars rendered server- and client-side
  // (0 + suffix), so no hydration mismatch.
  if (!mounted) {
    return (
      <span ref={ref} className={className}>
        0{suffix}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
