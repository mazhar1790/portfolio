"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { PERSONAL } from "@/data/cv";

export default function V2Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-br from-mint-100 via-cream to-cream py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-mint-700">
              / contact me
            </p>
            <h2 className="mt-4 font-jakarta text-5xl font-extrabold leading-[0.95] tracking-tight text-coal sm:text-6xl lg:text-7xl">
              Come on{" "}
              <span className="font-hand text-mint-600">let&apos;s talk.</span>
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-coal-muted">
              The fastest path is a 15-minute Calendly call — no slide deck, no
              prep, just questions about your problem and whether I&apos;m the
              right person for it.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              {PERSONAL.calendly && (
                <a
                  href={PERSONAL.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-coal px-6 py-3.5 text-sm font-semibold text-cream transition hover:bg-mint-700"
                >
                  <Calendar className="h-4 w-4" />
                  Book a 15-min call
                  <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              )}
              <a
                href={`mailto:${PERSONAL.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-coal/15 bg-white px-6 py-3.5 text-sm font-semibold text-coal transition hover:bg-mint-50"
              >
                <Mail className="h-4 w-4" />
                Send an email
              </a>
            </div>

            {/* Quick links to the deeper system */}
            <div className="mt-12 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <Link href="/dark" className="text-coal-muted underline-offset-4 hover:text-coal hover:underline">
                Original dark theme
              </Link>
              <span className="text-coal-dim">·</span>
              <Link href="/fit" className="text-coal-muted underline-offset-4 hover:text-coal hover:underline">
                AI fit analyser
              </Link>
              <span className="text-coal-dim">·</span>
              <Link href="/evals" className="text-coal-muted underline-offset-4 hover:text-coal hover:underline">
                Live RAG evals
              </Link>
              <span className="text-coal-dim">·</span>
              <Link href="/mcp" className="text-coal-muted underline-offset-4 hover:text-coal hover:underline">
                MCP server
              </Link>
            </div>
          </motion.div>

          {/* Right card */}
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="self-start rounded-3xl border border-cream-line bg-white p-7 shadow-[0_18px_36px_-22px_rgba(14,14,13,0.12)]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-coal-muted">
              Direct channels
            </p>

            <ul className="mt-5 divide-y divide-cream-line">
              <Channel
                icon={<Mail className="h-4 w-4 text-mint-700" />}
                label="Email"
                value={PERSONAL.email}
                href={`mailto:${PERSONAL.email}`}
              />
              <Channel
                icon={<Phone className="h-4 w-4 text-mint-700" />}
                label="Phone"
                value={PERSONAL.phone}
                href={`tel:${PERSONAL.phone.replace(/\s+/g, "")}`}
              />
              <Channel
                icon={<Linkedin className="h-4 w-4 text-mint-700" />}
                label="LinkedIn"
                value="@mazharhayyat"
                href={PERSONAL.linkedin}
                external
              />
              <Channel
                icon={<MapPin className="h-4 w-4 text-mint-700" />}
                label="Based in"
                value={PERSONAL.location}
              />
            </ul>

            <div className="mt-7 rounded-2xl bg-mint-50 p-5">
              <p className="font-hand text-2xl leading-tight text-mint-700">
                I read every message.
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-coal-muted">
                Usually reply within a business day. Faster if you mention RAG,
                NL-to-SQL, or anything Arabic + AI.
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

function Channel({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-mint-50">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[10px] uppercase tracking-widest text-coal-dim">
          {label}
        </span>
        <span className="block truncate text-[15px] font-medium text-coal">
          {value}
        </span>
      </span>
      {href && (
        <ArrowUpRight className="h-3.5 w-3.5 text-coal-dim transition group-hover:translate-x-0.5 group-hover:text-mint-700" />
      )}
    </>
  );
  if (!href) {
    return <li className="flex items-center gap-3 py-3.5">{inner}</li>;
  }
  return (
    <li>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="group flex items-center gap-3 py-3.5 transition"
      >
        {inner}
      </a>
    </li>
  );
}
