import { ogSize, ogContentType, renderOg } from "@/lib/og-template";

export const runtime = "edge";
export const alt = "AI fit analyser — Mazhar Hayat";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "AI Fit Analyser",
    title: "Paste a JD. I'll tell you",
    italicWord: "honestly if I fit.",
    metrics: [
      { value: "~10s", label: "Analysis" },
      { value: "JSON", label: "Output" },
      { value: "Free", label: "Cost" },
      { value: "Honest", label: "Gaps shown" },
    ],
    footer: "/fit",
  });
}
