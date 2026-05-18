"use client";

import { useEffect, useRef } from "react";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

interface Props {
  messages: ChatMessage[];
  loading: boolean;
}

export default function ChatMessages({ messages, loading }: Props) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  return (
    <div className="flex flex-col gap-3 px-4 py-4">
      {messages.map((m, i) => (
        <div
          key={i}
          className={cn(
            "flex max-w-[88%] gap-2 text-sm leading-relaxed",
            m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto",
          )}
        >
          <div
            className={cn(
              "flex h-7 w-7 shrink-0 items-center justify-center rounded-md",
              m.role === "user"
                ? "bg-paper/10 text-paper"
                : "bg-signal/15 text-signal",
            )}
            aria-hidden
          >
            {m.role === "user" ? (
              <User className="h-3.5 w-3.5" />
            ) : (
              <Bot className="h-3.5 w-3.5" />
            )}
          </div>

          <div
            className={cn(
              "whitespace-pre-wrap rounded-xl px-3.5 py-2.5",
              m.role === "user"
                ? "border border-ink-line bg-ink-elev text-paper"
                : "border border-signal/15 bg-signal/[0.04] text-paper",
              m.streaming && "caret",
            )}
          >
            {m.content || (m.streaming ? "Thinking..." : "")}
          </div>
        </div>
      ))}

      {loading &&
        messages.length > 0 &&
        messages[messages.length - 1]?.role === "user" && (
          <div className="mr-auto flex max-w-[88%] gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-signal/15 text-signal">
              <Bot className="h-3.5 w-3.5" />
            </div>
            <div className="rounded-xl border border-signal/15 bg-signal/[0.04] px-3.5 py-2.5 text-sm text-paper-muted">
              <span className="inline-flex gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-signal [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-signal [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-signal" />
              </span>
            </div>
          </div>
        )}

      <div ref={endRef} />
    </div>
  );
}
