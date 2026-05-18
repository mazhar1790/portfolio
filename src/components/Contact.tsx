"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Copy,
  Linkedin,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { PERSONAL } from "@/data/cv";
import { useChat } from "./AiChat/ChatContext";
import CvDownload from "./CvDownload";
import BookCall from "./BookCall";

export default function Contact() {
  const { openChat } = useChat();

  return (
    <section id="contact" className="section">
      <div className="container-page">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-signal">09</span>
          <span className="hairline w-12" />
          <span className="meta-plain">Contact</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="display-1 mt-8 max-w-5xl">
            Let&apos;s build something{" "}
            <span className="display-italic">that ships.</span>
          </h2>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper-muted">
            Open to senior AI architecture roles, consulting engagements, and
            speaking opportunities — based in Abu Dhabi, working globally.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <BookCall variant="primary" />
            <a href={`mailto:${PERSONAL.email}`} className="btn-secondary">
              Start a conversation
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => openChat("Is he available for new opportunities?")}
              className="btn-ghost"
            >
              <MessageSquareText className="h-4 w-4 text-signal" />
              Ask the AI
            </button>
            <CvDownload variant="ghost" />
          </div>

          <div className="mt-20 grid gap-px overflow-hidden border border-ink-line bg-ink-line sm:grid-cols-2 lg:grid-cols-4">
            <EmailCell />
            <ContactCell
              icon={<Linkedin className="h-4 w-4" />}
              label="LinkedIn"
              value="@mazharhayyat"
              href={PERSONAL.linkedin}
            />
            <ContactCell
              icon={<Phone className="h-4 w-4" />}
              label="Phone"
              value={PERSONAL.phone}
              href={`tel:${PERSONAL.phone.replace(/\s+/g, "")}`}
            />
            <ContactCell
              icon={<MapPin className="h-4 w-4" />}
              label="Location"
              value={PERSONAL.location.split(",")[0] ?? PERSONAL.location}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactCell({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="group flex h-full min-h-[110px] flex-col justify-between bg-ink-card p-6 transition hover:bg-ink-elev">
      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-signal/10 text-signal">
        {icon}
      </span>
      <div className="mt-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-paper-dim">
          {label}
        </p>
        <p className="mt-1 truncate text-sm text-paper">{value}</p>
      </div>
    </div>
  );

  if (!href) return inner;

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {inner}
    </a>
  );
}

function EmailCell() {
  const [copied, setCopied] = useState(false);

  function handleCopy(e: React.MouseEvent) {
    e.preventDefault();
    navigator.clipboard.writeText(PERSONAL.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="group relative flex h-full min-h-[110px] flex-col justify-between bg-ink-card p-6 transition hover:bg-ink-elev">
      <div className="flex items-start justify-between">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-signal/10 text-signal">
          <Mail className="h-4 w-4" />
        </span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy email address"
          className="rounded-md p-1.5 text-paper-dim opacity-0 transition group-hover:opacity-100 hover:bg-ink-line hover:text-signal"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-signal" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
      <div className="mt-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-paper-dim">
          Email
          {copied && (
            <span className="ml-2 text-signal">· Copied!</span>
          )}
        </p>
        <a
          href={`mailto:${PERSONAL.email}`}
          className="mt-1 block truncate text-sm text-paper transition hover:text-signal"
        >
          {PERSONAL.email}
        </a>
      </div>
    </div>
  );
}
