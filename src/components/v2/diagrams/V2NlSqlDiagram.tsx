"use client";

import {
  V2DiagramArrow,
  V2DiagramCodeCard,
  V2DiagramLane,
  V2DiagramNode,
  V2DiagramShell,
} from "./V2DiagramShell";

export default function V2NlSqlDiagram() {
  return (
    <V2DiagramShell title="nl_to_sql.flow">
      <svg
        viewBox="0 0 680 360"
        className="w-full"
        role="img"
        aria-label="Natural language to SQL pipeline"
      >
        {/* Lanes */}
        <V2DiagramLane x={10} y={12} w={150} h={134} label="INPUT" />
        <V2DiagramLane x={170} y={12} w={320} h={134} label="REASON" />
        <V2DiagramLane x={500} y={12} w={170} h={134} label="EXECUTE" />

        <V2DiagramLane x={10} y={160} w={660} h={130} label="VALIDATE · REPAIR · DELIVER" />

        {/* ── Row 1: forward pipeline ───────────────────────────────── */}
        <g transform="translate(20, 38)">
          <rect
            width={140}
            height={98}
            rx={8}
            fill="#ffffff"
            stroke="#e0dfd8"
          />
          <text
            x={10}
            y={20}
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fill="#9a9a96"
            style={{ fontSize: 8.5, letterSpacing: 1 }}
          >
            USER QUESTION
          </text>
          <text
            x={10}
            y={42}
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontStyle="italic"
            fill="#0e0e0d"
            style={{ fontSize: 10 }}
          >
            &quot;Top 5 sectors
          </text>
          <text
            x={10}
            y={56}
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontStyle="italic"
            fill="#0e0e0d"
            style={{ fontSize: 10 }}
          >
            by employment
          </text>
          <text
            x={10}
            y={70}
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontStyle="italic"
            fill="#0e0e0d"
            style={{ fontSize: 10 }}
          >
            in 2024?&quot;
          </text>
          <text
            x={10}
            y={88}
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fill="#9a9a96"
            style={{ fontSize: 8 }}
          >
            EN · AR · multilingual
          </text>
        </g>

        <V2DiagramArrow d="M 162 80 L 192 80" />

        <V2DiagramNode
          x={192}
          y={56}
          w={140}
          h={48}
          label="Intent + Schema"
          sublabel="semantic-kernel"
          accent
          tooltip="Detect intent, inject relevant schema slice"
        />

        <V2DiagramArrow d="M 332 80 L 358 80" delay={0.15} />

        <V2DiagramNode
          x={358}
          y={56}
          w={128}
          h={48}
          label="SQL Synthesis"
          sublabel="GPT-4 · 80 few-shots"
          tooltip="Few-shot prompting with curated examples"
        />

        <V2DiagramArrow d="M 486 80 L 510 80" delay={0.3} />

        {/* DB cluster */}
        <g transform="translate(510, 38)">
          <rect
            width={150}
            height={98}
            rx={8}
            fill="#ffffff"
            stroke="#e0dfd8"
          />
          <text
            x={75}
            y={20}
            textAnchor="middle"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fill="#9a9a96"
            style={{ fontSize: 8.5, letterSpacing: 1 }}
          >
            8 DATABASES · READ-ONLY
          </text>
          {["census_2024", "labor_force", "trade_stats", "demographics"].map(
            (db, i) => (
              <g key={db} transform={`translate(10, ${30 + i * 16})`}>
                <rect
                  width={130}
                  height={13}
                  rx={3}
                  fill="#fafaf7"
                  stroke="#e0dfd8"
                />
                <text
                  x={6}
                  y={10}
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  fill="#525251"
                  style={{ fontSize: 8 }}
                >
                  ▤ {db}
                </text>
                <circle cx={122} cy={6.5} r={2.2} fill="#3fb578" opacity={0.85} />
              </g>
            ),
          )}
        </g>

        {/* ── Row 2: generated SQL + validate/repair loop ───────────── */}
        <V2DiagramArrow d="M 585 136 L 585 184" delay={0.45} />

        <V2DiagramCodeCard
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

        <V2DiagramArrow d="M 422 104 C 422 150, 200 150, 145 184" delay={0.35} />

        <V2DiagramArrow d="M 270 240 L 308 240" delay={0.5} />

        <V2DiagramNode
          x={308}
          y={216}
          w={130}
          h={48}
          label="Validate + Repair"
          sublabel="execution-aware"
          accent
          tooltip="Try query → if error, feed schema + error back to LLM"
        />

        <V2DiagramArrow d="M 438 240 L 510 240" delay={0.6} />

        {/* DB result box */}
        <g transform="translate(510, 216)">
          <rect
            width={150}
            height={48}
            rx={8}
            fill="#ebf8f1"
            stroke="#6dcc99"
          />
          <text
            x={10}
            y={18}
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fill="#2d9961"
            style={{ fontSize: 8.5, letterSpacing: 1 }}
          >
            RESULT SET
          </text>
          <text
            x={10}
            y={32}
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fill="#0e0e0d"
            style={{ fontSize: 9 }}
          >
            5 rows · 47 ms
          </text>
          <text
            x={10}
            y={42}
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fill="#525251"
            style={{ fontSize: 8 }}
          >
            → chart + explanation
          </text>
        </g>

        {/* Repair arc */}
        <g>
          <path
            d="M 360 264 C 360 310, 410 310, 410 264"
            fill="none"
            stroke="#d97706"
            strokeOpacity={0.65}
            strokeWidth={1}
            strokeDasharray="3 4"
          />
          <text
            x={385}
            y={325}
            textAnchor="middle"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fill="#d97706"
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
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fill="#525251"
          style={{ fontSize: 9, letterSpacing: 1.5 }}
        >
          200+ NON-TECH USERS · 18K+ QUERIES/MO · 85% ACCURACY · ROW-LEVEL SECURITY
        </text>
      </svg>
    </V2DiagramShell>
  );
}
