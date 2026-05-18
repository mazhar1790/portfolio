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
  tone = "signal",
}: {
  d: string;
  flow?: boolean;
  delay?: number;
  tone?: "signal" | "amber" | "muted";
}) {
  const stroke =
    tone === "amber"
      ? "rgba(255,184,77,0.7)"
      : tone === "muted"
        ? "rgba(255,255,255,0.32)"
        : "rgba(0,255,136,0.85)";
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke="rgba(255,255,255,0.10)"
        strokeWidth={1}
      />
      {flow && (
        <path
          d={d}
          fill="none"
          stroke={stroke}
          strokeWidth={1.5}
          strokeDasharray={tone === "amber" ? "3 4" : "6 8"}
          className="dash-flow"
          style={{ animationDelay: `${delay}s` }}
        />
      )}
    </g>
  );
}

/**
 * A lane (column) label rendered as a subtle vertical band header.
 */
export function DiagramLane({
  x,
  y,
  w,
  h,
  label,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={6}
        fill="rgba(255,255,255,0.015)"
        stroke="rgba(255,255,255,0.06)"
        strokeDasharray="2 3"
      />
      <text
        x={x + w / 2}
        y={y + 14}
        textAnchor="middle"
        className="fill-paper-dim font-mono"
        style={{ fontSize: 8.5, letterSpacing: 1.5 }}
      >
        {label}
      </text>
    </g>
  );
}

/**
 * A "code card" that renders monospaced lines inside a styled rect.
 */
export function DiagramCodeCard({
  x,
  y,
  w,
  title,
  lines,
  accent = false,
}: {
  x: number;
  y: number;
  w: number;
  title: string;
  lines: string[];
  accent?: boolean;
}) {
  const h = 26 + lines.length * 12 + 8;
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        width={w}
        height={h}
        rx={6}
        fill={accent ? "rgba(0,255,136,0.06)" : "rgba(0,0,0,0.4)"}
        stroke={accent ? "rgba(0,255,136,0.30)" : "rgba(255,255,255,0.12)"}
      />
      <text
        x={10}
        y={16}
        className={accent ? "fill-signal font-mono" : "fill-paper-dim font-mono"}
        style={{ fontSize: 8.5, letterSpacing: 1.2 }}
      >
        {title}
      </text>
      {lines.map((ln, i) => (
        <text
          key={i}
          x={10}
          y={32 + i * 12}
          className="fill-paper font-mono"
          style={{ fontSize: 9 }}
        >
          {ln}
        </text>
      ))}
    </g>
  );
}
