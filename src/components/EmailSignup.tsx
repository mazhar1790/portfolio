"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Loader2, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export default function EmailSignup() {
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
      transition={{ duration: 0.6 }}
      className="border-y border-ink-line bg-ink-alt/40 py-16"
    >
      <div className="container-page text-center">
        <p className="meta">Stay in the loop</p>
        <h2 className="display-2 mt-4 mx-auto max-w-2xl">
          New articles & shipped projects —{" "}
          <span className="display-italic">straight to your inbox.</span>
        </h2>
        <p className="mt-3 text-paper-muted">
          ~1 email a month. Real lessons from production AI. No spam, no
          recycled LinkedIn content.
        </p>

        <form
          onSubmit={submit}
          className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row"
        >
          <div className="relative flex-1">
            <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-paper-dim" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={status === "loading" || status === "ok"}
              className="w-full rounded-lg border border-ink-line bg-ink-card py-3 pl-10 pr-4 text-sm text-paper placeholder:text-paper-dim focus:border-signal/40 focus:outline-none focus:ring-1 focus:ring-signal/20 disabled:opacity-60"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading" || status === "ok" || !email.trim()}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition",
              status === "ok"
                ? "bg-signal/20 text-signal"
                : email.trim() && status !== "loading"
                  ? "bg-signal text-ink hover:bg-signal/80"
                  : "bg-ink-line text-paper-dim",
            )}
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
          <p className="mt-3 text-xs text-red-300">{errMsg}</p>
        )}
        {status === "ok" && (
          <p className="mt-3 text-xs text-paper-dim">
            Thanks! Check your inbox for a confirmation if this is your first
            time.
          </p>
        )}
      </div>
    </motion.section>
  );
}
