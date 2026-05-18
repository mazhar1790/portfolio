"use client";

import { DiagramArrow, DiagramNode, DiagramShell } from "./DiagramShell";

export default function VisionDiagram() {
  return (
    <DiagramShell title="vision.pipeline">
      <svg
        viewBox="0 0 560 280"
        className="w-full"
        role="img"
        aria-label="Document processing and Vision AI pipeline"
      >
        {/* Inbox / source */}
        <g transform="translate(14, 40)">
          <rect
            width={108}
            height={200}
            rx={8}
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(255,255,255,0.10)"
          />
          <text
            x={54}
            y={20}
            textAnchor="middle"
            className="fill-paper-dim font-mono"
            style={{ fontSize: 9, letterSpacing: 1 }}
          >
            INBOX · 1K/DAY
          </text>
          {/* Document icons */}
          {[
            { y: 40, label: "PDF" },
            { y: 80, label: "JPG" },
            { y: 120, label: "PNG" },
            { y: 160, label: "FORM" },
          ].map((d) => (
            <g key={d.label} transform={`translate(20, ${d.y})`}>
              <rect
                width={68}
                height={30}
                rx={3}
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
              />
              <text
                x={8}
                y={19}
                className="fill-paper-muted font-mono"
                style={{ fontSize: 9 }}
              >
                ▤ {d.label}
              </text>
            </g>
          ))}
        </g>

        <DiagramArrow d="M 122 142 L 162 142" />

        {/* Form Recognizer */}
        <DiagramNode
          x={162}
          y={60}
          w={130}
          label="Form Recognizer"
          sublabel="layout + fields"
        />
        <DiagramArrow d="M 122 142 L 162 82" />

        {/* GPT-4 Vision */}
        <DiagramNode
          x={162}
          y={140}
          w={130}
          label="GPT-4 Vision"
          sublabel="unstructured"
          accent
        />

        {/* Classifier */}
        <DiagramNode
          x={162}
          y={220}
          w={130}
          label="Classifier"
          sublabel="route by type"
        />
        <DiagramArrow d="M 122 142 L 162 240" />

        {/* Merge / Enrich */}
        <DiagramArrow d="M 292 82 L 332 132" delay={0.2} />
        <DiagramArrow d="M 292 162 L 332 162" delay={0.3} />
        <DiagramArrow d="M 292 240 L 332 192" delay={0.4} />

        <DiagramNode
          x={332}
          y={140}
          w={120}
          label="Merge + Enrich"
          sublabel="validate"
          accent
        />

        {/* Output card */}
        <g transform="translate(332, 200)">
          <rect
            width={208}
            height={56}
            rx={6}
            fill="rgba(0,255,136,0.06)"
            stroke="rgba(0,255,136,0.30)"
          />
          <text
            x={10}
            y={18}
            className="fill-signal font-mono"
            style={{ fontSize: 9, letterSpacing: 1 }}
          >
            STRUCTURED OUTPUT
          </text>
          <text
            x={10}
            y={34}
            className="fill-paper font-mono"
            style={{ fontSize: 9.5 }}
          >
            {"{ type, fields, confidence }"}
          </text>
          <text
            x={10}
            y={48}
            className="fill-paper-dim font-mono"
            style={{ fontSize: 9 }}
          >
            → Cosmos DB
          </text>
        </g>

        <DiagramArrow d="M 392 184 L 392 200" delay={0.5} />

        {/* Time box */}
        <DiagramNode
          x={462}
          y={60}
          w={78}
          h={68}
          label="30s"
          sublabel="(was 15m)"
          accent
        />
        <DiagramArrow d="M 452 162 C 480 162, 480 130, 480 128" delay={0.3} />

        <text
          x={280}
          y={272}
          textAnchor="middle"
          className="fill-paper-dim font-mono"
          style={{ fontSize: 9, letterSpacing: 1.5 }}
        >
          80% AUTOMATED · 94% EXTRACTION · 2K+ HRS SAVED/MO
        </text>
      </svg>
    </DiagramShell>
  );
}
