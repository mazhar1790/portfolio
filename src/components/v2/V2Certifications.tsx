"use client";

import { motion } from "framer-motion";
import { Award, BadgeCheck } from "lucide-react";
import { CERTIFICATIONS } from "@/data/cv";

const COLORS: Record<string, { ring: string; bg: string; text: string }> = {
  cyan: { ring: "border-[#6dcc99]", bg: "bg-[#f3fbf7]", text: "text-[#2d9961]" },
  violet: { ring: "border-[#cdb4ff]", bg: "bg-[#f6f0ff]", text: "text-[#6b46c1]" },
  blue: { ring: "border-[#93c5fd]", bg: "bg-[#eff6ff]", text: "text-[#1d4ed8]" },
};

export default function V2Certifications() {
  return (
    <section id="certifications" className="bg-[#f7f7f3] py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="flex items-center gap-3">
          <BadgeCheck className="h-4 w-4 text-[#3fb578]" />
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#2d9961]">
            / certifications
          </p>
        </div>
        <h2 className="mt-4 font-jakarta text-3xl font-extrabold leading-tight tracking-tight text-[#0e0e0d] sm:text-4xl">
          Microsoft Certified.{" "}
          <span className="font-hand text-[#3fb578]">Multiple times over.</span>
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((c, i) => {
            const color = COLORS[c.color] ?? COLORS.cyan!;
            return (
              <motion.div
                key={c.code}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="group relative overflow-hidden rounded-2xl border border-[#e0dfd8] bg-white p-6 transition hover:border-[#6dcc99] hover:shadow-[0_18px_36px_-22px_rgba(45,153,97,0.30)]"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl border ${color.ring} ${color.bg}`}
                >
                  <Award className={`h-5 w-5 ${color.text}`} />
                </div>
                <h3 className="mt-5 font-jakarta text-lg font-bold leading-tight text-[#0e0e0d]">
                  {c.name}
                </h3>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-[#9a9a96]">
                  {c.code} · {c.issuer}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
