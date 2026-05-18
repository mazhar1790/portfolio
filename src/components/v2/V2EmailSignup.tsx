"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Loader2, Mail } from "lucide-react";

export default function V2EmailSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [errMsg, setErrMsg] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading" || !email.trim()) return;
    setStatus("loading");
    setErrMsg(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("err");
        setErrMsg(data.error ?? "Subscription failed");
        return;
      }
      setStatus("ok");
      setEmail("");
    } catch {
      setStatus("err");
      setErrMsg("Network error. Please try again.");
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55 }}
      className="bg-[#e3f6ec] py-20"
    >
      <div className="mx-auto w-full max-w-3xl px-5 text-center sm:px-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#2d9961]">
          / newsletter
        </p>
        <h2 className="mt-4 font-jakarta text-3xl font-extrabold leading-tight tracking-tight text-[#0e0e0d] sm:text-4xl">
          New articles & shipped projects —{" "}
          <span className="font-hand text-[#3fb578]">
            straight to your inbox.
          </span>
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-[#525251]">
          ~1 email a month. Real lessons from production AI. No spam, no
          recycled LinkedIn content.
        </p>

        <form
          onSubmit={submit}
          className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row"
        >
          <div className="relative flex-1">
            <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9a9a96]" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={status === "loading" || status === "ok"}
              className="w-full rounded-xl border border-[#b8e8ce] bg-white py-3 pl-10 pr-4 text-sm text-[#0e0e0d] placeholder:text-[#9a9a96] focus:border-[#3fb578] focus:outline-none focus:ring-2 focus:ring-[#3fb578]/20 disabled:opacity-60"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading" || status === "ok" || !email.trim()}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-jakarta text-sm font-bold transition ${
              status === "ok"
                ? "bg-white text-[#2d9961]"
                : email.trim() && status !== "loading"
                  ? "bg-[#0e0e0d] text-white hover:bg-[#2d9961]"
                  : "bg-[#cfe9d8] text-[#7ab498]"
            }`}
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Subscribing
              </>
            ) : status === "ok" ? (
              <>
                <Check className="h-4 w-4" />
                Subscribed
              </>
            ) : (
              <>
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {status === "err" && errMsg && (
          <p className="mt-3 text-xs text-red-600">{errMsg}</p>
        )}
        {status === "ok" && (
          <p className="mt-3 text-xs text-[#525251]">
            Thanks! Check your inbox for a confirmation.
          </p>
        )}
      </div>
    </motion.section>
  );
}
