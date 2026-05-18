"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import {
  METRICS,
  NOW,
  PERSONAL,
  ROTATING_HEADLINES,
} from "@/data/cv";
import { useChat } from "./AiChat/ChatContext";
import Counter from "./Counter";

const QUICK_PROMPTS = [
  "What AI projects has he shipped?",
  "Tell me about his RAG architecture",
  "Is he available for hire?",
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Hero() {
  const { openChat } = useChat();
  const [draft, setDraft] = useState("");
  const [headlineIdx, setHeadlineIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setHeadlineIdx((i) => (i + 1) % ROTATING_HEADLINES.length),
      3800,
    );
    return () => clearInterval(t);
  }, []);

  function submitPrompt(prompt: string) {
    const text = prompt.trim();
    if (!text) return;
    openChat(text);
    setDraft("");
  }

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-28 sm:pt-32"
    >
      <div aria-hidden className="absolute inset-0 -z-10 grid-overlay opacity-50" />
      <div
        aria-hidden
        className="absolute -left-1/4 top-1/3 -z-10 h-[40rem] w-[40rem] rounded-full bg-signal/[0.05] blur-[120px]"
      />

      <div className="container-page">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid items-end gap-10 lg:grid-cols-[1.45fr_1fr] lg:gap-14"
        >
          <div>
            <motion.div variants={item} className="flex items-center gap-3">
              <span className="signal-dot" />
              <span className="meta-plain">
                Available · Abu Dhabi · UAE
              </span>
            </motion.div>

            <motion.h1 variants={item} className="display-1 mt-8">
              I architect <span className="display-italic">AI systems</span>
              <br />
              that ship.
            </motion.h1>

            <motion.div
              variants={item}
              className="mt-8 flex h-8 items-center gap-3 overflow-hidden"
            >
              <span className="signal-text font-mono text-xs">▸</span>
              <div className="relative h-7 flex-1 overflow-hidden">
                {ROTATING_HEADLINES.map((h, i) => (
                  <motion.p
                    key={h}
                    initial={false}
                    animate={{
                      y: i === headlineIdx ? 0 : i < headlineIdx ? -28 : 28,
                      opacity: i === headlineIdx ? 1 : 0,
                    }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 text-sm text-paper-muted sm:text-base"
                  >
                    {h}
                  </motion.p>
                ))}
              </div>
            </motion.div>

            <motion.div variants={item} className="mt-12">
              <p className="meta mb-3">Ask my AI anything</p>
              <PromptComposer
                value={draft}
                onChange={setDraft}
                onSubmit={() => submitPrompt(draft)}
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {QUICK_PROMPTS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => submitPrompt(p)}
                    className="group inline-flex items-center gap-1.5 rounded-full border border-ink-line bg-ink-card/60 px-3 py-1.5 text-xs text-paper-muted transition hover:border-signal/40 hover:text-paper"
                  >
                    {p}
                    <ArrowUpRight className="h-3 w-3 transition group-hover:text-signal" />
                  </button>
                ))}
              </div>
            </motion.div>

          <motion.div
            variants={item}
            className="mt-12 flex flex-wrap items-center gap-3"
          >
            <a href="#projects" className="btn-primary">
              See the work
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#contact" className="btn-secondary">
              Get in touch
            </a>
            <a
              href={PERSONAL.cvUrl}
              download={PERSONAL.cvLabel}
              className="btn-ghost"
            >
              <ArrowDown className="h-3.5 w-3.5 text-signal" />
              Download CV
            </a>
          </motion.div>
          </div>

          <motion.aside variants={item} className="lg:pl-6">
            <ProfileCard />
          </motion.aside>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-20 grid grid-cols-2 gap-6 border-y border-ink-line py-10 sm:grid-cols-4 lg:grid-cols-6"
        >
          {METRICS.map((m) => (
            <div key={m.label}>
              <div className="font-display text-4xl text-paper">
                <Counter value={m.value} suffix={m.suffix} />
              </div>
              <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-paper-dim">
                {m.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PromptComposer({
  value,
  onChange,
  onSubmit,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="group relative flex items-center gap-2 rounded-2xl border border-ink-line bg-ink-card/80 p-2 pl-4 transition focus-within:border-signal/50 focus-within:shadow-signal-sm"
    >
      <Sparkles className="h-4 w-4 shrink-0 text-signal" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ask about Mazhar's projects, stack, availability…"
        className="flex-1 bg-transparent py-2.5 text-sm text-paper placeholder:text-paper-dim focus:outline-none sm:text-base"
        aria-label="Ask the AI"
      />
      <button
        type="submit"
        disabled={!value.trim()}
        aria-label="Ask"
        className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-paper px-4 text-sm font-medium text-ink transition hover:bg-signal disabled:cursor-not-allowed disabled:opacity-40"
      >
        Ask
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </form>
  );
}

function ProfileCard() {
  return (
    <div className="surface scanline relative overflow-hidden p-5">
      <div className="flex items-start gap-4">
        <Avatar />
        <div className="min-w-0 flex-1">
          <p className="meta-plain">{PERSONAL.title}</p>
          <p className="mt-1 font-display text-xl text-paper">
            {PERSONAL.name}
          </p>
          <p className="mt-2 flex items-center gap-1.5 text-xs text-paper-muted">
            <MapPin className="h-3 w-3 text-signal" />
            {PERSONAL.location}
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-3 border-t border-ink-line pt-5 text-sm">
        <Row k="Now" v={NOW.building} accent />
        <Row k="Reading" v={NOW.reading} />
        <Row k="Status" v={NOW.available} />
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-ink-line pt-4">
        <a
          href={PERSONAL.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
        >
          LinkedIn
          <ArrowUpRight className="h-3 w-3" />
        </a>
        <a
          href={`mailto:${PERSONAL.email}`}
          className="btn-ghost"
        >
          Email
          <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}

function Row({
  k,
  v,
  accent,
}: {
  k: string;
  v: string;
  accent?: boolean;
}) {
  return (
    <div className="grid grid-cols-[60px_1fr] gap-3 leading-snug">
      <span className="font-mono text-[10px] uppercase tracking-widest text-paper-dim">
        {k}
      </span>
      <span className={accent ? "text-signal" : "text-paper-muted"}>
        {v}
      </span>
    </div>
  );
}

function Avatar() {
  return (
    <div className="relative h-14 w-14 shrink-0">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-signal/30 via-signal/10 to-transparent" />
      <div className="absolute inset-[1px] rounded-[10px] bg-ink-elev" />
      <div className="absolute inset-0 flex items-center justify-center font-display text-xl text-paper">
        MH
      </div>
      <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-ink-card bg-signal shadow-signal-sm" />
    </div>
  );
}
