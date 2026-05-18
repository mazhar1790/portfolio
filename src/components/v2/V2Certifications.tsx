"use client";

import { motion } from "framer-motion";
import { Award, BadgeCheck, FileText } from "lucide-react";
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
            / training &amp; programs
          </p>
        </div>
        <h2 className="mt-4 font-jakarta text-3xl font-extrabold leading-tight tracking-tight text-[#0e0e0d] sm:text-4xl">
          Trained by Microsoft.{" "}
          <span className="font-hand text-[#3fb578]">Applied in production.</span>
        </h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#525251]">
          Microsoft Official Course completions and self-paced learning paths. I haven&rsquo;t
          sat the AI-102 / AZ-305 exams yet &mdash; the knowledge is applied daily in
          production at SCAD.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((c, i) => {
            const color = COLORS[c.color] ?? COLORS.cyan!;
            const Card = (
              <>
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border ${color.ring} ${color.bg}`}
                  >
                    <Award className={`h-5 w-5 ${color.text}`} />
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] ${
                      c.kind === "exam"
                        ? "border border-[#3fb578] bg-[#e6f6ee] text-[#1f6a3f]"
                        : "border border-[#e0dfd8] bg-white text-[#525251]"
                    }`}
                  >
                    {c.kind === "exam" ? "Certified" : "Trained"}
                  </span>
                </div>
                <h3 className="mt-5 font-jakarta text-lg font-bold leading-tight text-[#0e0e0d]">
                  {c.name}
                </h3>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-[#9a9a96]">
                  {c.code}
                </p>
                {c.period && (
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[#9a9a96]">
                    {c.period}
                  </p>
                )}
                {c.detail && (
                  <p className="mt-3 text-[13px] leading-relaxed text-[#525251]">
                    {c.detail}
                  </p>
                )}
                <p className="mt-4 text-[11px] text-[#9a9a96]">{c.issuer}</p>
                {c.proof && (
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-medium text-[#2d9961] underline-offset-2 hover:underline">
                    <FileText className="h-3 w-3" />
                    View certificate
                  </span>
                )}
              </>
            );

            const className =
              "group relative block overflow-hidden rounded-2xl border border-[#e0dfd8] bg-white p-6 transition hover:border-[#6dcc99] hover:shadow-[0_18px_36px_-22px_rgba(45,153,97,0.30)]";

            return (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
              >
                {c.proof ? (
                  <a
                    href={c.proof}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    {Card}
                  </a>
                ) : (
                  <div className={className}>{Card}</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
