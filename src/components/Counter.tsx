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
  const ref = useRef<HTMLSpanElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

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

    // 1. If already in viewport on mount (e.g. above-the-fold metrics), start now
    const rect = el.getBoundingClientRect();
    if (
      rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom > 0
    ) {
      // Defer to next frame so initial paint shows 0 → animates up
      requestAnimationFrame(start);
    }

    // 2. Also observe for when it scrolls into view (below-the-fold)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) start();
        });
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);

    // 3. Safety fallback — if nothing fired in 1.5s, force start
    const fallback = window.setTimeout(start, 1500);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
