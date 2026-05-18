"use client";

import { motion } from "framer-motion";
import { Award, Building2, GraduationCap, Shield } from "lucide-react";

const ORGS = [
  {
    icon: Building2,
    name: "SCAD",
    sub: "Statistics Centre Abu Dhabi",
  },
  {
    icon: Shield,
    name: "MoHRE",
    sub: "Ministry of Human Resources · UAE",
  },
  {
    icon: GraduationCap,
    name: "Microsoft AI Developer Program",
    sub: "Trained · Aug–Sep 2025",
  },
  {
    icon: Award,
    name: "15+ Years",
    sub: "Shipping production software",
  },
];

export default function TrustStrip() {
  return (
    <section className="border-y border-ink-line bg-ink-alt/40 py-8">
      <div className="container-page">
        <p className="mb-5 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-paper-dim">
          Shipped systems for · Trained by
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-ink-line bg-ink-line sm:grid-cols-4"
        >
          {ORGS.map((org) => {
            const Icon = org.icon;
            return (
              <div
                key={org.name}
                className="group flex items-center gap-3 bg-ink px-5 py-4 transition hover:bg-ink-elev"
              >
                <Icon className="h-4 w-4 shrink-0 text-paper-dim transition group-hover:text-signal" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-paper">
                    {org.name}
                  </p>
                  <p className="truncate font-mono text-[10px] uppercase tracking-widest text-paper-dim">
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
