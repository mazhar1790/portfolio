import { ogSize, ogContentType, renderOg } from "@/lib/og-template";
import { PROJECTS } from "@/data/cv";

export const runtime = "edge";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Project case study — Mazhar Hayat";

export default function Image({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find((p) => p.slug === params.slug);

  if (!project) {
    return renderOg({
      eyebrow: "Case study",
      title: "Project not found",
    });
  }

  const metricEntries = Object.entries(project.metrics).slice(0, 4);

  // Split title at a natural point for the italic portion (the last word group)
  const words = project.title.split(" ");
  const cut = Math.max(1, words.length - 2);
  const head = words.slice(0, cut).join(" ");
  const tail = words.slice(cut).join(" ");

  return renderOg({
    eyebrow: `Case study · ${project.year} · ${project.company.split("—")[0]?.trim() ?? ""}`,
    title: head,
    italicWord: tail,
    metrics: metricEntries.map(([label, value]) => ({ value, label })),
    footer: `/projects/${project.slug}`,
  });
}
