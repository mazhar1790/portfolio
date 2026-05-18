"use client";

import { useCallback, useEffect, useState } from "react";
import { Headphones, Loader2, Square } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  text: string;
  label?: string;
  className?: string;
}

/**
 * Browser SpeechSynthesis-based "listen" button. Zero API cost.
 * Picks the best available English voice and falls back gracefully on
 * browsers that don't support it.
 */
export default function ListenButton({ text, label = "Listen", className }: Props) {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    setSupported(true);

    function pickVoice() {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;
      const preferred =
        voices.find((v) => /Google.*US English/.test(v.name)) ||
        voices.find((v) => /Microsoft.*Aria|Microsoft.*Jenny/.test(v.name)) ||
        voices.find((v) => v.lang === "en-US" && v.localService) ||
        voices.find((v) => v.lang === "en-US") ||
        voices.find((v) => v.lang.startsWith("en")) ||
        voices[0];
      setVoice(preferred ?? null);
    }
    pickVoice();
    window.speechSynthesis.addEventListener("voiceschanged", pickVoice);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", pickVoice);
    };
  }, []);

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [supported]);

  const start = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    if (voice) utter.voice = voice;
    utter.rate = 1.02;
    utter.pitch = 1;
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utter);
  }, [supported, text, voice]);

  useEffect(() => {
    return () => {
      if (supported && speaking) window.speechSynthesis.cancel();
    };
  }, [supported, speaking]);

  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={speaking ? stop : start}
      aria-label={speaking ? "Stop reading" : "Listen to this section"}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest transition",
        speaking
          ? "border-signal/40 bg-signal/15 text-signal"
          : "border-ink-line bg-ink-card text-paper-dim hover:border-signal/40 hover:text-paper",
        className,
      )}
    >
      {speaking ? (
        <>
          <Square className="h-3 w-3 fill-current" />
          Stop
        </>
      ) : (
        <>
          <Headphones className="h-3 w-3" />
          {label}
        </>
      )}
    </button>
  );
}
