"use client";

import { DiagramArrow, DiagramNode, DiagramShell } from "./DiagramShell";

export default function NlSqlDiagram() {
  return (
    <DiagramShell title="nl_to_sql.flow">
      <svg
        viewBox="0 0 560 280"
        className="w-full"
        role="img"
        aria-label="Natural language to SQL pipeline"
      >
        {/* User question bubble */}
        <g transform="translate(14, 30)">
          <rect
            width={140}
            height={56}
            rx={8}
            fill="rgba(255,255,255,0.03)"
            stroke="rgba(255,255,255,0.10)"
          />
          <text
            x={10}
            y={20}
            className="fill-paper-dim font-mono"
            style={{ fontSize: 9, letterSpacing: 1 }}
          >
            QUESTION
          </text>
          <text
            x={10}
            y={38}
            className="fill-paper font-sans italic"
            style={{ fontSize: 10 }}
          >
            &quot;Top 5 sectors by
          </text>
          <text
            x={10}
            y={50}
            className="fill-paper font-sans italic"
            style={{ fontSize: 10 }}
          >
            employment in 2024?&quot;
          </text>
        </g>

        <DiagramArrow d="M 154 58 L 196 58" />

        <DiagramNode
          x={196}
          y={40}
          w={120}
          label="Intent + Schema"
          sublabel="semantic-kernel"
          accent
        />

        <DiagramArrow d="M 316 62 L 358 62" delay={0.2} />

        <DiagramNode
          x={358}
          y={40}
          w={120}
          label="SQL Synthesis"
          sublabel="GPT-4 · few-shot"
        />

        {/* SQL output */}
        <g transform="translate(180, 120)">
          <rect
            width={250}
            height={66}
            rx={6}
            fill="rgba(0,0,0,0.4)"
            stroke="rgba(0,255,136,0.30)"
          />
          <text
            x={10}
            y={18}
            className="fill-signal font-mono"
            style={{ fontSize: 9, letterSpacing: 1 }}
          >
            GENERATED SQL
          </text>
          <text
            x={10}
            y={34}
            className="fill-paper font-mono"
            style={{ fontSize: 9.5 }}
          >
            SELECT sector, SUM(emp)
          </text>
          <text
            x={10}
            y={46}
            className="fill-paper font-mono"
            style={{ fontSize: 9.5 }}
          >
            FROM census_2024
          </text>
          <text
            x={10}
            y={58}
            className="fill-paper font-mono"
            style={{ fontSize: 9.5 }}
          >
            GROUP BY sector LIMIT 5;
          </text>
        </g>

        {/* Validator with retry loop */}
        <DiagramArrow d="M 305 186 L 305 206" delay={0.4} />
        <DiagramNode
          x={244}
          y={206}
          w={120}
          label="Validate + Repair"
          sublabel="execution-aware"
          accent
        />

        {/* Retry curve back to SQL synthesis */}
        <g>
          <path
            d="M 244 224 C 180 224, 180 130, 240 130"
            fill="none"
            stroke="rgba(255,184,77,0.55)"
            strokeWidth={1}
            strokeDasharray="3 4"
          />
          <text
            x={150}
            y={170}
            className="fill-amber-signal font-mono"
            style={{ fontSize: 9, letterSpacing: 1 }}
          >
            ↻ repair
          </text>
        </g>

        {/* Forward to DB */}
        <DiagramArrow d="M 364 224 L 408 224" delay={0.6} />
        <DiagramNode
          x={408}
          y={206}
          w={110}
          label="8 Databases"
          sublabel="SQL Server"
        />

        {/* Result back to user */}
        <DiagramArrow
          d="M 463 206 C 463 156, 84 156, 84 86"
          delay={0.8}
        />

        <text
          x={280}
          y={266}
          textAnchor="middle"
          className="fill-paper-dim font-mono"
          style={{ fontSize: 9, letterSpacing: 1.5 }}
        >
          200+ NON-TECH USERS · 15K+ QUERIES/MO · 85% ACCURACY
        </text>
      </svg>
    </DiagramShell>
  );
}
