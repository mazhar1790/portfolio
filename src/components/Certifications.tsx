"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { CERTIFICATIONS } from "@/data/cv";

export default function Certifications() {
  return (
    <section id="certifications" className="section bg-ink-alt">
      <div className="container-page">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-signal">05</span>
          <span className="hairline w-12" />
          <span className="meta-plain">Credentials</span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="display-2 mt-6 max-w-4xl"
        >
          Verified <span className="display-italic">by Microsoft.</span>
        </motion.h2>

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-ink-line bg-ink-line md:grid-cols-3">
          {CERTIFICATIONS.map((c, i) => (
            <motion.div
              key={c.code}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-ink-card p-8 transition hover:bg-ink-elev"
            >
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs text-signal">{c.code}</p>
                <ShieldCheck className="h-4 w-4 text-paper-dim transition group-hover:text-signal" />
              </div>
              <h3 className="mt-6 font-display text-2xl leading-snug text-paper">
                {c.name}
              </h3>
              <p className="mt-3 text-sm text-paper-muted">
                Issued by {c.issuer}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
