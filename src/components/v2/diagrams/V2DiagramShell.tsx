"use client";

import { useState } from "react";

export function V2DiagramShell({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-[#e0dfd8] bg-white shadow-[0_18px_36px_-22px_rgba(14,14,13,0.10)] ${className}`}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-[#e0dfd8] bg-[#fafaf7] px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#f87171]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#f5b54a]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#3fb578]/90" />
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#525251]">
          {title}
        </p>
        <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[#2d9961]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3fb578] opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#3fb578]" />
          </span>
          live
        </span>
      </div>
      <div className="relative p-4 sm:p-6">{children}</div>
    </div>
  );
}

export function V2DiagramLane({
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
        rx={8}
        fill="#f7f7f3"
        stroke="#e0dfd8"
        strokeDasharray="2 3"
      />
      <text
        x={x + w / 2}
        y={y + 14}
        textAnchor="middle"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fill="#9a9a96"
        style={{ fontSize: 8.5, letterSpacing: 1.5 }}
      >
        {label}
      </text>
    </g>
  );
}

export function V2DiagramNode({
  x,
  y,
  w = 130,
  h = 46,
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

  const fill = accent
    ? hovered
      ? "#d8f1e3"
      : "#ebf8f1"
    : hovered
      ? "#fafaf7"
      : "#ffffff";
  const stroke = accent
    ? hovered
      ? "#2d9961"
      : "#6dcc99"
    : hovered
      ? "#9a9a96"
      : "#e0dfd8";

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
        rx={8}
        fill={fill}
        stroke={stroke}
        strokeWidth={hovered ? 1.5 : 1}
        style={{ transition: "fill 0.15s, stroke 0.15s" }}
      />
      <text
        x={w / 2}
        y={sublabel ? h / 2 - 2 : h / 2 + 4}
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fill="#0e0e0d"
        style={{ fontSize: 11, fontWeight: 600, pointerEvents: "none" }}
      >
        {label}
      </text>
      {sublabel && (
        <text
          x={w / 2}
          y={h / 2 + 12}
          textAnchor="middle"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fill={accent ? "#2d9961" : "#9a9a96"}
          style={{ fontSize: 9, pointerEvents: "none" }}
        >
          {sublabel}
        </text>
      )}
      {hovered && tooltip && (
        <g>
          <rect
            x={w / 2 - 80}
            y={h + 6}
            width={160}
            height={28}
            rx={6}
            fill="#0e0e0d"
            stroke="#3fb578"
            strokeWidth={1}
          />
          <text
            x={w / 2}
            y={h + 24}
            textAnchor="middle"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fill="#f3fbf7"
            style={{ fontSize: 9.5, pointerEvents: "none" }}
          >
            {tooltip}
          </text>
        </g>
      )}
    </g>
  );
}

export function V2DiagramArrow({
  d,
  flow = true,
  delay = 0,
  tone = "mint",
}: {
  d: string;
  flow?: boolean;
  delay?: number;
  tone?: "mint" | "amber" | "muted";
}) {
  const stroke =
    tone === "amber"
      ? "#d97706"
      : tone === "muted"
        ? "#9a9a96"
        : "#3fb578";
  return (
    <g>
      <path d={d} fill="none" stroke="#e0dfd8" strokeWidth={1} />
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

export function V2DiagramCodeCard({
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
        rx={8}
        fill={accent ? "#ebf8f1" : "#fafaf7"}
        stroke={accent ? "#6dcc99" : "#e0dfd8"}
      />
      <text
        x={10}
        y={16}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fill={accent ? "#2d9961" : "#9a9a96"}
        style={{ fontSize: 8.5, letterSpacing: 1.2 }}
      >
        {title}
      </text>
      {lines.map((ln, i) => (
        <text
          key={i}
          x={10}
          y={32 + i * 12}
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fill="#0e0e0d"
          style={{ fontSize: 9 }}
        >
          {ln}
        </text>
      ))}
    </g>
  );
}
