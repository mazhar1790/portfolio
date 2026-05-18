"use client";

import { motion } from "framer-motion";

type Mark = "scad" | "mohre" | "netsol" | "trg" | "ms" | "azure" | "pinecone" | "anthropic" | "cohere" | "groq" | "langchain";

interface Item {
  name: string;
  note?: string;
  mark: Mark;
  /** When provided, an official logo from /public/logos is rendered instead of the custom glyph. */
  officialLogo?: { src: string; alt: string; dark?: boolean };
}

const AFFILIATIONS: Item[] = [
  {
    name: "SCAD",
    note: "Statistics Centre Abu Dhabi",
    mark: "scad",
    officialLogo: { src: "/logos/scad-colored.svg", alt: "Statistics Centre Abu Dhabi" },
  },
  {
    name: "MoHRE",
    note: "UAE Government",
    mark: "mohre",
    officialLogo: { src: "/logos/mohre.png", alt: "UAE Ministry of Human Resources & Emiratisation" },
  },
  {
    name: "NETSOL",
    note: "Asset Finance Platform",
    mark: "netsol",
    officialLogo: { src: "/logos/netsol.png", alt: "NETSOL Technologies" },
  },
  {
    name: "TRG Tech",
    note: "Sentiment Engine",
    mark: "trg",
    officialLogo: { src: "/logos/trg.svg", alt: "TRG Holdings", dark: true },
  },
];

const TECH: Item[] = [
  { name: "Azure OpenAI", mark: "azure" },
  { name: "Pinecone", mark: "pinecone" },
  { name: "Anthropic", mark: "anthropic" },
  { name: "Cohere", mark: "cohere" },
  { name: "Groq", mark: "groq" },
  { name: "LangChain", mark: "langchain" },
];

export default function V2LogoStrip() {
  return (
    <section className="relative">
      <div className="bg-gradient-to-b from-[#dff4e8] via-[#ecf9f1] to-[#fafaf7]">
        <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
          <Row label="Where I've shipped" items={AFFILIATIONS} delay={0} />
          <div className="mx-auto my-9 h-px max-w-3xl bg-[#b8e8ce]/60" />
          <Row label="What I build with" items={TECH} delay={0.15} muted />
          <p className="mx-auto mt-10 max-w-2xl text-center font-mono text-[10px] leading-relaxed text-[#9a9a96]">
            Logos shown are the property of their respective owners and used here solely to
            identify past clients and employers. No endorsement or partnership is implied.
          </p>
        </div>
      </div>
    </section>
  );
}

function Row({
  label,
  items,
  delay,
  muted = false,
}: {
  label: string;
  items: Item[];
  delay: number;
  muted?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center gap-7"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#525251]">
        {label}
      </p>
      <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-12">
        {items.map((it, i) => (
          <motion.li
            key={it.name}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: delay + i * 0.05 }}
            className="group flex items-center gap-3"
          >
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border transition group-hover:-translate-y-0.5 ${
                it.officialLogo?.dark
                  ? "border-[#1a1a1a] bg-[#0e0e0d]"
                  : muted
                    ? "border-[#e0dfd8] bg-white"
                    : "border-[#b8e8ce] bg-white"
              }`}
            >
              {it.officialLogo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={it.officialLogo.src}
                  alt={it.officialLogo.alt}
                  className="max-h-7 max-w-[34px] object-contain"
                  loading="lazy"
                />
              ) : (
                <Glyph mark={it.mark} />
              )}
            </span>
            <div className="leading-tight">
              <span
                className={`block font-jakarta text-[22px] font-extrabold tracking-tight transition ${
                  muted
                    ? "text-[#0e0e0d]/85 group-hover:text-[#0e0e0d]"
                    : "text-[#0e0e0d] group-hover:text-[#2d9961]"
                }`}
              >
                {it.name}
              </span>
              {it.note && (
                <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-[#9a9a96]">
                  {it.note}
                </span>
              )}
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

/**
 * Custom SVG glyphs — original marks I designed, not copies of any
 * company's trademarked logo. Each one is a small shape suggesting the
 * org's domain (charts for SCAD, shield for MoHRE, etc.).
 */
function Glyph({ mark }: { mark: Mark }) {
  const stroke = "#2d9961";
  const fill = "#3fb578";
  switch (mark) {
    case "scad":
      // Bar chart — statistics
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <rect x="4" y="13" width="3" height="7" rx="1" fill={fill} />
          <rect x="10.5" y="8" width="3" height="12" rx="1" fill={fill} opacity="0.85" />
          <rect x="17" y="4" width="3" height="16" rx="1" fill={fill} opacity="0.65" />
        </svg>
      );
    case "mohre":
      // Shield — ministry
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path
            d="M12 3 L20 6 V12 C20 16 16.5 19.5 12 21 C7.5 19.5 4 16 4 12 V6 Z"
            fill={fill}
            opacity="0.18"
            stroke={stroke}
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M8.5 12 L11 14.5 L15.5 10" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "netsol":
      // Stacked layers — enterprise system
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <rect x="4" y="5" width="16" height="3.5" rx="1" fill={fill} opacity="0.85" />
          <rect x="4" y="10.25" width="16" height="3.5" rx="1" fill={fill} opacity="0.55" />
          <rect x="4" y="15.5" width="16" height="3.5" rx="1" fill={fill} opacity="0.3" />
        </svg>
      );
    case "trg":
      // Connected nodes — sentiment graph
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <line x1="6" y1="6" x2="12" y2="12" stroke={stroke} strokeWidth="1.4" />
          <line x1="12" y1="12" x2="18" y2="6" stroke={stroke} strokeWidth="1.4" />
          <line x1="12" y1="12" x2="18" y2="18" stroke={stroke} strokeWidth="1.4" />
          <line x1="12" y1="12" x2="6" y2="18" stroke={stroke} strokeWidth="1.4" />
          <circle cx="6" cy="6" r="2.4" fill={fill} />
          <circle cx="18" cy="6" r="2.4" fill={fill} opacity="0.7" />
          <circle cx="12" cy="12" r="2.4" fill={fill} />
          <circle cx="18" cy="18" r="2.4" fill={fill} opacity="0.7" />
          <circle cx="6" cy="18" r="2.4" fill={fill} opacity="0.85" />
        </svg>
      );
    case "ms":
      // Four-tile certification mark
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <rect x="4" y="4" width="7" height="7" rx="1" fill={fill} />
          <rect x="13" y="4" width="7" height="7" rx="1" fill={fill} opacity="0.7" />
          <rect x="4" y="13" width="7" height="7" rx="1" fill={fill} opacity="0.55" />
          <rect x="13" y="13" width="7" height="7" rx="1" fill={fill} opacity="0.85" />
        </svg>
      );
    case "azure":
      // Cloud
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path
            d="M7 17 H17 a3.5 3.5 0 0 0 0.5 -6.95 A5 5 0 0 0 8 9.5 A4 4 0 0 0 7 17 Z"
            fill={fill}
            opacity="0.2"
            stroke={stroke}
            strokeWidth="1.5"
          />
        </svg>
      );
    case "pinecone":
      // Diamond / pinecone abstract
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path d="M12 3 L19 12 L12 21 L5 12 Z" fill={fill} opacity="0.18" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M5 12 L19 12" stroke={stroke} strokeWidth="1.2" />
          <path d="M12 3 L12 21" stroke={stroke} strokeWidth="1.2" opacity="0.5" />
        </svg>
      );
    case "anthropic":
      // Caret / A-mark
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path d="M5 19 L12 5 L19 19" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.5 13.5 L15.5 13.5" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "cohere":
      // Three rings — rerank/ensembles
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <circle cx="9" cy="12" r="4.5" stroke={stroke} strokeWidth="1.5" />
          <circle cx="13" cy="12" r="4.5" stroke={stroke} strokeWidth="1.5" opacity="0.7" />
          <circle cx="17" cy="12" r="4.5" stroke={stroke} strokeWidth="1.5" opacity="0.45" />
        </svg>
      );
    case "groq":
      // Lightning — speed
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path
            d="M13 3 L6 13 H11 L10 21 L18 11 H13 Z"
            fill={fill}
            opacity="0.35"
            stroke={stroke}
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "langchain":
      // Chain links
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <rect x="3.5" y="9.5" width="9" height="5" rx="2.5" stroke={stroke} strokeWidth="1.6" />
          <rect x="11.5" y="9.5" width="9" height="5" rx="2.5" stroke={stroke} strokeWidth="1.6" opacity="0.7" />
        </svg>
      );
    default:
      return null;
  }
}
