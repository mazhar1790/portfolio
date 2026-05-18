"use client";

import {
  DiagramArrow,
  DiagramCodeCard,
  DiagramLane,
  DiagramNode,
  DiagramShell,
} from "./DiagramShell";

export default function NlSqlDiagram() {
  return (
    <DiagramShell title="nl_to_sql.flow">
      <svg
        viewBox="0 0 680 360"
        className="w-full"
        role="img"
        aria-label="Natural language to SQL pipeline"
      >
        {/* Lanes */}
        <DiagramLane x={10} y={12} w={150} h={134} label="INPUT" />
        <DiagramLane x={170} y={12} w={320} h={134} label="REASON" />
        <DiagramLane x={500} y={12} w={170} h={134} label="EXECUTE" />

        <DiagramLane x={10} y={160} w={660} h={130} label="VALIDATE · REPAIR · DELIVER" />

        {/* ── Row 1: forward pipeline ───────────────────────────────── */}

        {/* Question */}
        <g transform="translate(20, 38)">
          <rect
            width={140}
            height={98}
            rx={6}
            fill="rgba(255,255,255,0.03)"
            stroke="rgba(255,255,255,0.10)"
          />
          <text
            x={10}
            y={20}
            className="fill-paper-dim font-mono"
            style={{ fontSize: 8.5, letterSpacing: 1 }}
          >
            USER QUESTION
          </text>
          <text x={10} y={42} className="fill-paper font-sans italic" style={{ fontSize: 10 }}>
            &quot;Top 5 sectors
          </text>
          <text x={10} y={56} className="fill-paper font-sans italic" style={{ fontSize: 10 }}>
            by employment
          </text>
          <text x={10} y={70} className="fill-paper font-sans italic" style={{ fontSize: 10 }}>
            in 2024?&quot;
          </text>
          <text
            x={10}
            y={88}
            className="fill-paper-dim font-mono"
            style={{ fontSize: 8 }}
          >
            EN · AR · multilingual
          </text>
        </g>

        <DiagramArrow d="M 162 80 L 192 80" />

        {/* Intent + Schema injection */}
        <DiagramNode
          x={192}
          y={56}
          w={140}
          h={48}
          label="Intent + Schema"
          sublabel="semantic-kernel"
          accent
          tooltip="Detect intent, inject relevant schema slice"
        />

        <DiagramArrow d="M 332 80 L 358 80" delay={0.15} />

        {/* Few-shot synthesis */}
        <DiagramNode
          x={358}
          y={56}
          w={128}
          h={48}
          label="SQL Synthesis"
          sublabel="GPT-4 · 80 few-shots"
          tooltip="Few-shot prompting with curated examples"
        />

        <DiagramArrow d="M 486 80 L 510 80" delay={0.3} />

        {/* DB cluster */}
        <g transform="translate(510, 38)">
          <rect
            width={150}
            height={98}
            rx={6}
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(255,255,255,0.10)"
          />
          <text
            x={75}
            y={20}
            textAnchor="middle"
            className="fill-paper-dim font-mono"
            style={{ fontSize: 8.5, letterSpacing: 1 }}
          >
            8 DATABASES · READ-ONLY
          </text>
          {["census_2024", "labor_force", "trade_stats", "demographics"].map((db, i) => (
            <g key={db} transform={`translate(10, ${30 + i * 16})`}>
              <rect
                width={130}
                height={13}
                rx={2}
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.08)"
              />
              <text
                x={6}
                y={10}
                className="fill-paper-muted font-mono"
                style={{ fontSize: 8 }}
              >
                ▤ {db}
              </text>
              <circle cx={122} cy={6.5} r={2} className="fill-signal" opacity={0.7} />
            </g>
          ))}
        </g>

        {/* ── Row 2: generated SQL + validate/repair loop ───────────── */}

        {/* Down-arrow from DB to validate */}
        <DiagramArrow d="M 585 136 L 585 184" delay={0.45} />

        {/* Generated SQL code card */}
        <DiagramCodeCard
          x={20}
          y={184}
          w={250}
          title="GENERATED SQL"
          lines={[
            "SELECT sector, SUM(emp) AS total",
            "FROM census_2024",
            "WHERE year = 2024",
            "GROUP BY sector",
            "ORDER BY total DESC LIMIT 5;",
          ]}
        />

        {/* Arrow from synthesis (row 1) down to SQL card */}
        <DiagramArrow d="M 422 104 C 422 150, 200 150, 145 184" delay={0.35} />

        {/* Arrow from SQL card to validator */}
        <DiagramArrow d="M 270 240 L 308 240" delay={0.5} />

        {/* Validator */}
        <DiagramNode
          x={308}
          y={216}
          w={130}
          h={48}
          label="Validate + Repair"
          sublabel="execution-aware"
          accent
          tooltip="Try query → if error, feed schema + error back to LLM"
        />

        {/* Validator → DB (forward path) */}
        <DiagramArrow d="M 438 240 L 510 240" delay={0.6} />

        {/* DB result box */}
        <g transform="translate(510, 216)">
          <rect
            width={150}
            height={48}
            rx={6}
            fill="rgba(0,255,136,0.06)"
            stroke="rgba(0,255,136,0.30)"
          />
          <text
            x={10}
            y={18}
            className="fill-signal font-mono"
            style={{ fontSize: 8.5, letterSpacing: 1 }}
          >
            RESULT SET
          </text>
          <text x={10} y={32} className="fill-paper font-mono" style={{ fontSize: 9 }}>
            5 rows · 47 ms
          </text>
          <text
            x={10}
            y={42}
            className="fill-paper-dim font-mono"
            style={{ fontSize: 8 }}
          >
            → chart + explanation
          </text>
        </g>

        {/* Repair arc — clean curve under everything, amber */}
        <g>
          <path
            d="M 360 264 C 360 310, 410 310, 410 264"
            fill="none"
            stroke="rgba(255,184,77,0.55)"
            strokeWidth={1}
            strokeDasharray="3 4"
          />
          <text
            x={385}
            y={325}
            textAnchor="middle"
            className="fill-amber-signal font-mono"
            style={{ fontSize: 8.5, letterSpacing: 1 }}
          >
            ↻ +13% accuracy from repair loop
          </text>
        </g>

        {/* Stats strip */}
        <text
          x={340}
          y={350}
          textAnchor="middle"
          className="fill-paper-dim font-mono"
          style={{ fontSize: 9, letterSpacing: 1.5 }}
        >
          200+ NON-TECH USERS · 18K+ QUERIES/MO · 85% ACCURACY · ROW-LEVEL SECURITY
        </text>
      </svg>
    </DiagramShell>
  );
}
