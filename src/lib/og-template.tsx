import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

interface OgTemplateProps {
  eyebrow: string;
  title: string;
  italicWord?: string;
  metrics?: { value: string; label: string }[];
  footer?: string;
}

export function renderOg({ eyebrow, title, italicWord, metrics, footer }: OgTemplateProps) {
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
        <div
          style={{
            display: "flex",
            position: "absolute",
            right: -160,
            top: -100,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "rgba(0, 255, 136, 0.06)",
            filter: "blur(90px)",
          }}
        />
        <div
          style={{
            display: "flex",
            position: "absolute",
            left: -100,
            bottom: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "rgba(0, 255, 136, 0.04)",
            filter: "blur(80px)",
          }}
        />

        {/* Top: monogram + eyebrow */}
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
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span
              style={{
                fontSize: 13,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#00ff88",
              }}
            >
              {eyebrow}
            </span>
            <span
              style={{
                fontSize: 12,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#52525b",
              }}
            >
              Mazhar Hayat · AI Architect
            </span>
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            fontSize: 64,
            fontWeight: 400,
            color: "#fafaf9",
            lineHeight: 1.02,
            letterSpacing: "-0.035em",
            maxWidth: 1040,
          }}
        >
          <span>{title}</span>
          {italicWord && (
            <span style={{ color: "#00ff88", fontStyle: "italic" }}>
              {italicWord}
            </span>
          )}
        </div>

        {/* Bottom */}
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
            {(metrics ?? []).map((m) => (
              <div
                key={m.label}
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
                  {m.value}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#52525b",
                  }}
                >
                  {m.label}
                </span>
              </div>
            ))}
          </div>

          {footer && (
            <span
              style={{
                fontSize: 13,
                color: "#71717a",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              {footer}
            </span>
          )}
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
