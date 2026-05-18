"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Headphones, Pause, Play, Video, X } from "lucide-react";

const AUDIO_SRC = "/intro.mp3";
const VIDEO_SRC = "/demo.mp4";
const VIDEO_POSTER = "/demo-poster.jpg";

type Mode = "audio" | "video" | null;

export default function MediaIntro() {
  const [hasAudio, setHasAudio] = useState(false);
  const [hasVideo, setHasVideo] = useState(false);
  const [mode, setMode] = useState<Mode>(null);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Detect media availability with HEAD requests so users don't see broken
  // buttons. Both files are optional — drop intro.mp3 / demo.mp4 in /public.
  useEffect(() => {
    void fetch(AUDIO_SRC, { method: "HEAD" })
      .then((r) => setHasAudio(r.ok))
      .catch(() => null);
    void fetch(VIDEO_SRC, { method: "HEAD" })
      .then((r) => setHasVideo(r.ok))
      .catch(() => null);
  }, []);

  function toggleAudio() {
    if (mode !== "audio") {
      setMode("audio");
      setTimeout(() => audioRef.current?.play().catch(() => null), 0);
      return;
    }
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play().catch(() => null);
    } else {
      audioRef.current.pause();
    }
  }

  if (!hasAudio && !hasVideo) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {hasAudio && (
        <button
          type="button"
          onClick={toggleAudio}
          className="btn-ghost"
          aria-label="Play 90-second voice intro"
        >
          {mode === "audio" && playing ? (
            <Pause className="h-3.5 w-3.5 text-signal" />
          ) : (
            <Headphones className="h-3.5 w-3.5 text-signal" />
          )}
          {mode === "audio" && playing ? "Pause intro" : "90-sec voice intro"}
        </button>
      )}
      {hasVideo && (
        <button
          type="button"
          onClick={() => setMode("video")}
          className="btn-ghost"
          aria-label="Watch demo video"
        >
          <Video className="h-3.5 w-3.5 text-signal" />
          Watch the 30-sec demo
        </button>
      )}

      {/* Hidden audio element */}
      {hasAudio && (
        <audio
          ref={audioRef}
          src={AUDIO_SRC}
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
      )}

      {/* Video modal */}
      {mode === "video" && hasVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 backdrop-blur"
          onClick={() => setMode(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-ink-line bg-ink-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setMode(null)}
              aria-label="Close video"
              className="absolute right-3 top-3 z-10 rounded-full border border-ink-line bg-ink/80 p-2 text-paper-dim transition hover:text-paper"
            >
              <X className="h-4 w-4" />
            </button>
            <video
              controls
              autoPlay
              playsInline
              poster={VIDEO_POSTER}
              className="aspect-video w-full bg-ink"
            >
              <source src={VIDEO_SRC} type="video/mp4" />
            </video>
            <div className="flex items-center gap-2 border-t border-ink-line px-4 py-3">
              <Play className="h-3.5 w-3.5 text-signal" />
              <p className="text-xs text-paper-muted">
                30-second walk-through · home → RAG demo → fit analyser
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
