import { ogSize, ogContentType, renderOg } from "@/lib/og-template";

export const runtime = "edge";
export const alt = "$0/month AI stack — Mazhar Hayat";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "Stack & cost · Full transparency",
    title: "This portfolio runs at",
    italicWord: "$0/month.",
    metrics: [
      { value: "$0", label: "Monthly" },
      { value: "8", label: "Services" },
      { value: "<2s", label: "RAG Latency" },
      { value: "Free", label: "All tiers" },
    ],
    footer: "/stack",
  });
}
