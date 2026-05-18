import { ImageResponse } from "next/og";
import { PERSONAL } from "@/data/cv";

export const runtime = "edge";
export const alt = `${PERSONAL.name} — ${PERSONAL.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const STATS = [
  { v: "15+", l: "Years" },
  { v: "100K+", l: "Docs" },
  { v: "18K+", l: "Queries/mo" },
  { v: "95%", l: "Time Saved" },
];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          position: "relative",
        }}
      >
        {/* Signal glow */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            left: -160,
            top: 80,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "rgba(0, 255, 136, 0.05)",
            filter: "blur(90px)",
          }}
        />

        {/* Top row: monogram + name */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 52,
              height: 52,
              borderRadius: 12,
              border: "1px solid rgba(0,255,136,0.4)",
              background: "rgba(0,255,136,0.08)",
              color: "#fafaf9",
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            MH
          </div>
          <span
            style={{
              fontSize: 14,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#71717a",
            }}
          >
            {PERSONAL.name} · {PERSONAL.location.split(",")[0]}
          </span>
        </div>

        {/* Centre: availability + headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                display: "flex",
                width: 8,
                height: 8,
                borderRadius: 4,
                background: "#00ff88",
              }}
            />
            <span
              style={{
                fontSize: 13,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#52525b",
              }}
            >
              AVAILABLE · ABU DHABI · UAE
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              fontSize: 76,
              fontWeight: 400,
              color: "#fafaf9",
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
            }}
          >
            <span>I architect</span>
            <span style={{ color: "#a1a1aa", fontStyle: "italic" }}>AI systems</span>
            <span>that ship.</span>
          </div>
        </div>

        {/* Bottom: stats + title */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", gap: 48 }}>
            {STATS.map((s) => (
              <div
                key={s.l}
                style={{ display: "flex", flexDirection: "column", gap: 4 }}
              >
                <span
                  style={{
                    fontSize: 34,
                    fontWeight: 400,
                    color: "#fafaf9",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {s.v}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#52525b",
                  }}
                >
                  {s.l}
                </span>
              </div>
            ))}
          </div>

          <span
            style={{
              fontSize: 13,
              color: "#00ff88",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            {PERSONAL.title}
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
