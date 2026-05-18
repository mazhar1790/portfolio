import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import { PERSONAL, METRICS } from "@/data/cv";
import CvDownload from "@/components/CvDownload";

export const metadata: Metadata = {
  title: `${PERSONAL.name} — مهندس حلول الذكاء الاصطناعي`,
  description:
    "مهندس حلول ذكاء اصطناعي مع 15+ سنة من الخبرة. أبني أنظمة RAG، NL-to-SQL، ورؤية حاسوبية في الإنتاج.",
};

// Note: This is a representative Arabic landing page. The full portfolio
// experience is in English at /. Building this page demonstrates first-class
// RTL + bilingual capability — relevant for any UAE / MENA role.

const PRINCIPLES = [
  "العرض التوضيحي فرضية. الإنتاج هو الدليل الوحيد.",
  "عنق الزجاجة ليس النموذج أبدًا — بل التقطيع والاسترجاع والتلقين.",
  "قِس وإلا لم يحدث. الكمون، الدقة، التكلفة — حدّدها أولًا.",
];

export default function ArabicPage() {
  return (
    <main dir="rtl" lang="ar" className="min-h-screen bg-ink pt-10 pb-32 text-paper">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        {/* Language toggle */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-ink-line bg-ink-card px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-paper-dim transition hover:border-signal/40 hover:text-paper"
          >
            <ArrowLeft className="h-3 w-3 rotate-180" />
            English
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-signal">
            العربية · AR
          </span>
        </div>

        {/* Hero */}
        <header className="mt-12">
          <div className="flex items-center gap-3">
            <span className="signal-dot" />
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-signal">
              متاح للفرص الجديدة
            </span>
            <span className="font-mono text-[11px] text-paper-dim">·</span>
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-paper-dim">
              <MapPin className="h-3 w-3" />
              أبوظبي، الإمارات
            </span>
          </div>

          <h1 className="display-1 mt-6 leading-[1.1]">
            مرحباً، أنا {PERSONAL.name}.
            <br />
            <span className="display-italic text-signal/90">
              أبني الذكاء الاصطناعي
            </span>{" "}
            الذي يصل إلى الإنتاج.
          </h1>

          <p className="mt-7 max-w-2xl text-xl leading-relaxed text-paper-muted">
            مهندس حلول ذكاء اصطناعي مع أكثر من 15 سنة من الخبرة في تطوير
            البرمجيات. على مدى السنوات الثلاث الماضية، شحنت أربعة أنظمة ذكاء
            اصطناعي إنتاجية في مركز الإحصاء — أبوظبي: RAG على 100 ألف وثيقة،
            منصة استعلامات بلغة طبيعية، خط أنابيب رؤية حاسوبية، ومساعد ذكي.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#contact" className="btn-primary">
              <Sparkles className="h-3.5 w-3.5 text-ink" />
              تواصل معي
            </a>
            <CvDownload variant="ghost" />
            <Link
              href="/for-recruiters"
              className="btn-ghost"
            >
              للمسؤولين عن التوظيف
              <ArrowUpRight className="h-3.5 w-3.5 text-signal" />
            </Link>
          </div>
        </header>

        {/* Metrics */}
        <section className="mt-20 grid grid-cols-2 gap-6 border-y border-ink-line py-12 sm:grid-cols-3">
          {METRICS.slice(0, 6).map((m) => (
            <div key={m.label}>
              <div className="font-display text-5xl text-paper">
                {m.value}
                {m.suffix}
              </div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-paper-dim">
                {m.label}
              </div>
            </div>
          ))}
        </section>

        {/* Principles in Arabic */}
        <section className="mt-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-signal">
            مبادئ · ثلاثة دروس
          </p>
          <div className="mt-6 space-y-5">
            {PRINCIPLES.map((p, i) => (
              <blockquote
                key={p}
                className="rounded-xl border border-ink-line bg-ink-card p-6 font-display text-xl leading-snug text-paper sm:text-2xl"
              >
                <span className="font-mono text-sm text-signal">
                  {String(i + 1).padStart(2, "0")} ·
                </span>{" "}
                <span className="display-italic">&ldquo;{p}&rdquo;</span>
              </blockquote>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section
          id="contact"
          className="mt-20 rounded-2xl border border-signal/20 bg-signal/[0.04] p-10 text-center"
        >
          <h2 className="display-2">دعنا نتحدث.</h2>
          <p className="mt-3 text-paper-muted">
            للمشاريع الحكومية، الاستشارات في الذكاء الاصطناعي، أو فرص التوظيف
            الدائمة.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href={`mailto:${PERSONAL.email}`} className="btn-primary">
              {PERSONAL.email}
            </a>
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              LinkedIn
            </a>
          </div>
        </section>

        <p className="mt-10 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-paper-dim">
          النسخة العربية · النسخة الكاملة بالإنجليزية على{" "}
          <Link href="/" className="text-signal hover:underline">
            /
          </Link>
        </p>
      </div>
    </main>
  );
}
