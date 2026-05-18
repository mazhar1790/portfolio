import { ogSize, ogContentType, renderOg } from "@/lib/og-template";

export const runtime = "edge";
export const alt = "AI playground — Mazhar Hayat";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "Playground · Paste your own doc",
    title: "Try the AI on",
    italicWord: "your document.",
    metrics: [
      { value: "20K", label: "Char limit" },
      { value: "<1s", label: "Streaming" },
      { value: "0", label: "Stored" },
      { value: "Free", label: "Cost" },
    ],
    footer: "/playground",
  });
}
