"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function DiagramShell({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "surface-elev relative overflow-hidden",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-ink-line px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-500/60" />
          <span className="h-2 w-2 rounded-full bg-amber-signal/60" />
          <span className="h-2 w-2 rounded-full bg-signal/70" />
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-dim">
          {title}
        </p>
        <span className="font-mono text-[10px] text-signal">● live</span>
      </div>
      <div className="relative p-4 sm:p-6">{children}</div>
    </div>
  );
}

export function DiagramNode({
  x,
  y,
  w = 110,
  h = 44,
  label,
  sublabel,
  accent,
  tooltip,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  label: string;
  sublabel?: string;
  accent?: boolean;
  tooltip?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <g
      transform={`translate(${x}, ${y})`}
      style={{ cursor: tooltip ? "pointer" : "default" }}
      onMouseEnter={() => tooltip && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <rect
        width={w}
        height={h}
        rx={6}
        fill={
          accent
            ? hovered
              ? "rgba(0, 255, 136, 0.18)"
              : "rgba(0, 255, 136, 0.10)"
            : hovered
              ? "rgba(255, 255, 255, 0.07)"
              : "rgba(255, 255, 255, 0.03)"
        }
        stroke={
          accent
            ? hovered
              ? "rgba(0, 255, 136, 0.85)"
              : "rgba(0, 255, 136, 0.55)"
            : hovered
              ? "rgba(255, 255, 255, 0.30)"
              : "rgba(255, 255, 255, 0.16)"
        }
        strokeWidth={hovered ? 1.5 : 1}
        style={{ transition: "fill 0.15s, stroke 0.15s" }}
      />
      <text
        x={w / 2}
        y={sublabel ? h / 2 - 2 : h / 2 + 4}
        textAnchor="middle"
        className="fill-paper font-sans"
        style={{ fontSize: 11, fontWeight: 500, pointerEvents: "none" }}
      >
        {label}
      </text>
      {sublabel && (
        <text
          x={w / 2}
          y={h / 2 + 12}
          textAnchor="middle"
          className={accent ? "fill-signal" : "fill-paper-dim"}
          style={{ fontSize: 9, fontFamily: "var(--font-jetbrains-mono)", pointerEvents: "none" }}
        >
          {sublabel}
        </text>
      )}
      {/* Tooltip */}
      {hovered && tooltip && (
        <g>
          <rect
            x={w / 2 - 72}
            y={h + 6}
            width={144}
            height={28}
            rx={5}
            fill="#0a0a0a"
            stroke="rgba(0,255,136,0.35)"
            strokeWidth={1}
          />
          <text
            x={w / 2}
            y={h + 24}
            textAnchor="middle"
            fill="rgba(255,255,255,0.75)"
            style={{ fontSize: 10, fontFamily: "var(--font-jetbrains-mono)", pointerEvents: "none" }}
          >
            {tooltip}
          </text>
        </g>
      )}
    </g>
  );
}

export function DiagramArrow({
  d,
  flow = true,
  delay = 0,
}: {
  d: string;
  flow?: boolean;
  delay?: number;
}) {
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth={1}
      />
      {flow && (
        <path
          d={d}
          fill="none"
          stroke="rgba(0,255,136,0.85)"
          strokeWidth={1.5}
          strokeDasharray="6 8"
          className="dash-flow"
          style={{ animationDelay: `${delay}s` }}
        />
      )}
    </g>
  );
}
