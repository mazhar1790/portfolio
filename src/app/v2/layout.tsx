import type { Metadata } from "next";
import { PERSONAL } from "@/data/cv";

export const metadata: Metadata = {
  title: `${PERSONAL.name} — Portfolio (Studio Edition)`,
  description:
    "An alternate, lighter-themed take on Mazhar's portfolio. Same 15+ years of AI engineering, warmer presentation.",
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream font-jakarta text-coal antialiased">
      {children}
    </div>
  );
}
