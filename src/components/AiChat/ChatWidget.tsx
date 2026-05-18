"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Sparkles, X } from "lucide-react";
import ChatInput from "./ChatInput";
import ChatMessages, { ChatMessage } from "./ChatMessages";
import { useChat } from "./ChatContext";

const QUICK_CHIPS = [
  "What AI projects has he shipped?",
  "Tell me about his RAG experience",
  "Is he available for hire?",
  "What's his tech stack?",
];

export default function ChatWidget() {
  const { open, openChat, closeChat, consumePendingPrompt } = useChat();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (content: string) => {
      const text = content.trim();
      if (!text || loading) return;

      setError(null);

      const userMsg: ChatMessage = { role: "user", content: text };
      const assistantMsg: ChatMessage = {
        role: "assistant",
        content: "",
        streaming: true,
      };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setInput("");
      setLoading(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...messages, userMsg].map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          throw new Error(`Request failed: ${res.status}`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const next = [...prev];
            const last = next[next.length - 1];
            if (last && last.role === "assistant") {
              next[next.length - 1] = {
                ...last,
                content: last.content + chunk,
              };
            }
            return next;
          });
        }

        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          if (last && last.role === "assistant") {
            next[next.length - 1] = { ...last, streaming: false };
          }
          return next;
        });
      } catch (err) {
        const msg =
          err instanceof Error && err.name === "AbortError"
            ? null
            : "Sorry — I couldn't reach the AI right now. Please try again, or email Mazhar1783@outlook.com.";
        if (msg) setError(msg);
        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          if (last && last.role === "assistant" && last.streaming) {
            if (last.content) {
              next[next.length - 1] = { ...last, streaming: false };
            } else {
              next.pop();
            }
          }
          return next;
        });
      } finally {
        setLoading(false);
        abortRef.current = null;
      }
    },
    [messages, loading],
  );

  useEffect(() => {
    if (!open) return;
    const pending = consumePendingPrompt();
    if (pending) {
      void sendMessage(pending);
    }
  }, [open, consumePendingPrompt, sendMessage]);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            key="chat-fab"
            initial={{ opacity: 0, scale: 0.6, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 30 }}
            transition={{ type: "spring", stiffness: 380, damping: 24 }}
            onClick={() => openChat()}
            aria-label="Open AI chat"
            className="group fixed bottom-5 right-5 z-50 flex h-12 items-center gap-2 rounded-full border border-signal/40 bg-ink-card/95 px-4 text-sm text-paper shadow-signal-sm backdrop-blur transition hover:border-signal hover:shadow-signal sm:bottom-8 sm:right-8"
          >
            <span className="signal-dot" />
            <span className="font-mono text-xs uppercase tracking-[0.18em]">
              Ask AI
            </span>
            <Sparkles className="h-3.5 w-3.5 text-signal transition group-hover:scale-110" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="fixed inset-0 z-50 flex flex-col border border-ink-line bg-ink-card sm:bottom-6 sm:right-6 sm:left-auto sm:top-auto sm:inset-auto sm:h-[600px] sm:w-[420px] sm:rounded-2xl sm:shadow-signal-lg"
          >
            <header className="flex items-center justify-between border-b border-ink-line bg-ink-card px-4 py-3">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-md bg-signal/15 text-signal">
                  <Bot className="h-4 w-4" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-signal shadow-signal-sm" />
                </div>
                <div className="leading-tight">
                  <p className="font-display text-sm text-paper">
                    Mazhar&apos;s AI
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper-dim">
                    <span className="text-signal">●</span> Online · Claude
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeChat}
                aria-label="Close chat"
                className="rounded-md p-1.5 text-paper-dim transition hover:bg-ink-elev hover:text-paper"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto bg-ink/70">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-signal/30 bg-signal/10 text-signal">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-display text-xl text-paper">
                      Ask me anything.
                    </p>
                    <p className="mt-1 max-w-[280px] text-sm text-paper-muted">
                      I&apos;m Mazhar&apos;s portfolio AI. Projects, stack,
                      availability — I have the answers.
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                    {QUICK_CHIPS.map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => sendMessage(chip)}
                        className="rounded-full border border-ink-line bg-ink-card px-3 py-1.5 text-xs text-paper-muted transition hover:border-signal/40 hover:text-paper"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <ChatMessages messages={messages} loading={loading} />
              )}
            </div>

            {error && (
              <div className="border-t border-red-500/20 bg-red-500/10 px-4 py-2 text-xs text-red-200">
                {error}
              </div>
            )}

            <ChatInput
              value={input}
              onChange={setInput}
              onSend={() => sendMessage(input)}
              disabled={loading}
            />

            <p className="border-t border-ink-line bg-ink-card px-4 py-2 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-paper-dim">
              Powered by Claude · Anthropic
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
