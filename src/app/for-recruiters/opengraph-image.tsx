import { ogSize, ogContentType, renderOg } from "@/lib/og-template";

export const runtime = "edge";
export const alt = "For recruiters — Mazhar Hayat";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "For Recruiters · 30-second pitch",
    title: "Yes, I'm",
    italicWord: "open to a conversation.",
    metrics: [
      { value: "15+", label: "Years" },
      { value: "4", label: "AI Systems" },
      { value: "30d", label: "Notice" },
      { value: "Abu Dhabi", label: "Based" },
    ],
    footer: "/for-recruiters",
  });
}
