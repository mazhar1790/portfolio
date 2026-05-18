"use client";

import {
  V2DiagramArrow,
  V2DiagramCodeCard,
  V2DiagramLane,
  V2DiagramNode,
  V2DiagramShell,
} from "./V2DiagramShell";

export default function V2VisionDiagram() {
  return (
    <V2DiagramShell title="vision.pipeline">
      <svg
        viewBox="0 0 700 360"
        className="w-full"
        role="img"
        aria-label="Document processing and Vision AI pipeline"
      >
        {/* Lanes */}
        <V2DiagramLane x={10} y={12} w={130} h={336} label="INTAKE" />
        <V2DiagramLane x={150} y={12} w={160} h={336} label="ROUTE" />
        <V2DiagramLane x={320} y={12} w={160} h={336} label="EXTRACT · MERGE" />
        <V2DiagramLane x={490} y={12} w={200} h={336} label="VALIDATE · DELIVER" />

        {/* ── INTAKE ───────────────────────────────────────────────── */}
        <g transform="translate(20, 38)">
          <rect
            width={110}
            height={290}
            rx={8}
            fill="#ffffff"
            stroke="#e0dfd8"
          />
          <text
            x={55}
            y={20}
            textAnchor="middle"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fill="#9a9a96"
            style={{ fontSize: 8.5, letterSpacing: 1 }}
          >
            INBOX · 1K/DAY
          </text>
          {[
            { y: 40, label: "PDF", count: "420" },
            { y: 80, label: "JPG", count: "180" },
            { y: 120, label: "PNG", count: "150" },
            { y: 160, label: "FORM", count: "210" },
            { y: 200, label: "SCAN", count: "40" },
          ].map((d) => (
            <g key={d.label} transform={`translate(15, ${d.y})`}>
              <rect
                width={80}
                height={28}
                rx={4}
                fill="#fafaf7"
                stroke="#e0dfd8"
              />
              <text
                x={8}
                y={18}
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                fill="#525251"
                style={{ fontSize: 9 }}
              >
                ▤ {d.label}
              </text>
              <text
                x={72}
                y={18}
                textAnchor="end"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                fill="#9a9a96"
                style={{ fontSize: 8 }}
              >
                {d.count}
              </text>
            </g>
          ))}
          <text
            x={55}
            y={252}
            textAnchor="middle"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fill="#9a9a96"
            style={{ fontSize: 8 }}
          >
            AR + EN content
          </text>
          <text
            x={55}
            y={266}
            textAnchor="middle"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fill="#9a9a96"
            style={{ fontSize: 8 }}
          >
            handwriting · tables
          </text>
          <text
            x={55}
            y={280}
            textAnchor="middle"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fill="#2d9961"
            style={{ fontSize: 8 }}
          >
            14 document types
          </text>
        </g>

        {/* ── ROUTE ────────────────────────────────────────────────── */}
        <V2DiagramArrow d="M 130 180 L 162 180" />

        <V2DiagramNode
          x={162}
          y={156}
          w={136}
          h={48}
          label="Classifier"
          sublabel="route by type"
          accent
          tooltip="Type-aware routing — each doc type goes to its best extractor"
        />

        {/* Routing arrows to three extractors */}
        <V2DiagramArrow d="M 230 156 C 230 110, 280 110, 322 70" delay={0.15} />
        <V2DiagramArrow d="M 298 180 L 322 180" delay={0.2} />
        <V2DiagramArrow d="M 230 204 C 230 250, 280 250, 322 290" delay={0.25} />

        {/* ── EXTRACT ──────────────────────────────────────────────── */}
        <V2DiagramNode
          x={322}
          y={46}
          w={150}
          h={48}
          label="Form Recognizer"
          sublabel="structured forms"
          tooltip="Azure Document Intelligence — cheap, fast, accurate on forms"
        />

        <V2DiagramNode
          x={322}
          y={156}
          w={150}
          h={48}
          label="GPT-4 Vision"
          sublabel="unstructured · AR"
          accent
          tooltip="Handles handwriting, mixed Arabic-English, complex layouts"
        />

        <V2DiagramNode
          x={322}
          y={266}
          w={150}
          h={48}
          label="Tesseract · OCR"
          sublabel="legacy scans"
          tooltip="Fallback for low-quality legacy scans"
        />

        {/* Three → Merge */}
        <V2DiagramArrow d="M 472 70 C 510 70, 510 162, 530 162" delay={0.35} />
        <V2DiagramArrow d="M 472 180 L 530 180" delay={0.4} />
        <V2DiagramArrow d="M 472 290 C 510 290, 510 198, 530 198" delay={0.45} />

        {/* ── MERGE + VALIDATE ─────────────────────────────────────── */}
        <V2DiagramNode
          x={530}
          y={146}
          w={150}
          h={56}
          label="Merge + Enrich"
          sublabel="per-field confidence"
          accent
          tooltip="Combine sources; per-field confidence drives review"
        />

        <V2DiagramArrow d="M 605 202 L 605 230" delay={0.55} />

        <V2DiagramCodeCard
          x={500}
          y={230}
          w={190}
          title="STRUCTURED · COSMOS DB"
          lines={[
            "{ type, fields, conf }",
            '  emp_id: "12345" (0.99)',
            '  date:   "2024-01" (0.94)',
            '  notes:  ar+en       (0.71)',
          ]}
          accent
        />

        {/* Confidence-gated review branch */}
        <g>
          <path
            d="M 605 202 C 605 222, 240 220, 235 250"
            fill="none"
            stroke="#d97706"
            strokeOpacity={0.65}
            strokeWidth={1}
            strokeDasharray="3 4"
          />
          <text
            x={395}
            y={222}
            textAnchor="middle"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fill="#d97706"
            style={{ fontSize: 8.5, letterSpacing: 1 }}
          >
            ↳ if conf &lt; 0.85 → human review queue
          </text>
        </g>

        {/* Stats strip */}
        <text
          x={350}
          y={350}
          textAnchor="middle"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fill="#525251"
          style={{ fontSize: 9, letterSpacing: 1.5 }}
        >
          80% AUTOMATED · 94% EXTRACTION · 2K+ HRS SAVED/MO · 30s VS 15min · 14 DOC TYPES
        </text>
      </svg>
    </V2DiagramShell>
  );
}
