"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Award, GraduationCap } from "lucide-react";

type Org = {
  icon?: LucideIcon;
  logo?: { src: string; alt: string };
  name: string;
  sub: string;
};

const ORGS: Org[] = [
  {
    logo: { src: "/logos/scad-colored.svg", alt: "Statistics Centre Abu Dhabi" },
    name: "SCAD",
    sub: "Statistics Centre Abu Dhabi",
  },
  {
    logo: { src: "/logos/mohre.png", alt: "UAE Ministry of Human Resources & Emiratisation" },
    name: "MoHRE",
    sub: "Ministry of Human Resources · UAE",
  },
  {
    icon: GraduationCap,
    name: "Microsoft Certified",
    sub: "AI-102 · AZ-305 · AI-3016",
  },
  {
    icon: Award,
    name: "15+ Years",
    sub: "Shipping production software",
  },
];

export default function V2TrustStrip() {
  return (
    <section className="border-y border-[#e0dfd8] bg-[#fafaf7] py-10">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <p className="mb-5 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-[#9a9a96]">
          Shipped systems for · Verified by
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#e0dfd8] bg-[#e0dfd8] sm:grid-cols-4"
        >
          {ORGS.map((org) => {
            const Icon = org.icon;
            return (
              <div
                key={org.name}
                className="group flex items-center gap-3 bg-white px-5 py-5 transition hover:bg-[#f3fbf7]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f3fbf7] transition group-hover:bg-[#e3f6ec]">
                  {org.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={org.logo.src}
                      alt={org.logo.alt}
                      className="max-h-6 max-w-[28px] object-contain"
                      loading="lazy"
                    />
                  ) : Icon ? (
                    <Icon className="h-4 w-4 text-[#2d9961]" />
                  ) : null}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-jakarta text-sm font-bold text-[#0e0e0d]">
                    {org.name}
                  </p>
                  <p className="truncate font-mono text-[10px] uppercase tracking-widest text-[#9a9a96]">
                    {org.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
