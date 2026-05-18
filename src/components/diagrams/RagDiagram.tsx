"use client";

import { DiagramArrow, DiagramNode, DiagramShell } from "./DiagramShell";

export default function RagDiagram() {
  return (
    <DiagramShell title="rag.pipeline">
      <svg
        viewBox="0 0 560 280"
        className="w-full"
        role="img"
        aria-label="Retrieval Augmented Generation pipeline"
      >
        <defs>
          <linearGradient id="rag-vec" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(0,255,136,0.18)" />
            <stop offset="100%" stopColor="rgba(0,255,136,0)" />
          </linearGradient>
        </defs>

        {/* Docs source */}
        <g>
          <rect
            x={14}
            y={20}
            width={92}
            height={240}
            rx={8}
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(255,255,255,0.10)"
          />
          <text
            x={60}
            y={40}
            textAnchor="middle"
            className="fill-paper-dim font-mono"
            style={{ fontSize: 9, letterSpacing: 1 }}
          >
            CORPUS
          </text>
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i} transform={`translate(${28}, ${60 + i * 36})`}>
              <rect
                width={64}
                height={24}
                rx={3}
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
              />
              <text
                x={32}
                y={16}
                textAnchor="middle"
                className="fill-paper-muted font-sans"
                style={{ fontSize: 9 }}
              >
                doc_{i + 1}.pdf
              </text>
            </g>
          ))}
        </g>

        {/* Embed */}
        <DiagramNode x={144} y={50} label="Embed" sublabel="text-embedding-3" />
        <DiagramArrow d="M 106 140 L 144 72" />

        {/* Vector Store */}
        <g transform="translate(144, 130)">
          <rect
            width={110}
            height={104}
            rx={8}
            fill="url(#rag-vec)"
            stroke="rgba(0,255,136,0.35)"
          />
          <text
            x={55}
            y={20}
            textAnchor="middle"
            className="fill-signal font-mono"
            style={{ fontSize: 9, letterSpacing: 1 }}
          >
            VECTOR STORE
          </text>
          <text
            x={55}
            y={36}
            textAnchor="middle"
            className="fill-paper-dim font-mono"
            style={{ fontSize: 8 }}
          >
            pinecone · 100K+
          </text>
          {/* dots representing vectors */}
          {Array.from({ length: 18 }).map((_, i) => {
            const cx = 14 + (i % 6) * 14;
            const cy = 52 + Math.floor(i / 6) * 14;
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={1.6}
                className="fill-signal"
                opacity={0.4 + ((i * 37) % 60) / 100}
              />
            );
          })}
        </g>

        {/* Query path */}
        <DiagramNode x={144} y={20} label="Query" sublabel="user prompt" />
        <DiagramArrow d="M 254 42 C 290 42, 290 90, 308 90" />

        {/* Retriever */}
        <DiagramNode
          x={308}
          y={70}
          label="Hybrid Retriever"
          sublabel="BM25 + Vector"
          accent
        />
        <DiagramArrow d="M 254 182 C 280 182, 280 100, 308 100" />

        {/* Re-rank */}
        <DiagramNode
          x={308}
          y={130}
          label="Re-ranker"
          sublabel="cross-encoder"
        />
        <DiagramArrow d="M 363 114 L 363 130" flow={false} />

        {/* GPT */}
        <DiagramNode
          x={446}
          y={100}
          label="GPT-4"
          sublabel="Azure OpenAI"
          accent
        />
        <DiagramArrow d="M 418 152 C 432 152, 432 122, 446 122" delay={0.4} />

        {/* Response */}
        <DiagramNode
          x={446}
          y={200}
          label="Response"
          sublabel="cited · 10s"
        />
        <DiagramArrow d="M 500 144 L 500 200" delay={0.8} />

        {/* Bottom legend */}
        <text
          x={280}
          y={266}
          textAnchor="middle"
          className="fill-paper-dim font-mono"
          style={{ fontSize: 9, letterSpacing: 1.5 }}
        >
          92% ACCURACY · 65% COST CUT · 5K+ QUERIES/MO
        </text>
      </svg>
    </DiagramShell>
  );
}
