import type { Metadata } from "next";
import { PERSONAL } from "@/data/cv";
import ForceDarkTheme from "./force-dark";

export const metadata: Metadata = {
  title: `${PERSONAL.name} — Portfolio (Dark Edition)`,
  description:
    "The original dark / Signal-themed version of Mazhar's portfolio. The default site now uses the Studio (light) theme.",
};

export default function DarkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-ink text-paper antialiased noise">
      <ForceDarkTheme />
      {children}
    </div>
  );
}
