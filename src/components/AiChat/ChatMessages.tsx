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
              "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
              m.role === "user"
                ? "bg-[#0e0e0d] text-white"
                : "bg-[#ebf8f1] text-[#2d9961]",
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
              "whitespace-pre-wrap rounded-2xl px-3.5 py-2.5",
              m.role === "user"
                ? "rounded-tr-sm bg-[#0e0e0d] text-white"
                : "rounded-tl-sm border border-[#e0dfd8] bg-white text-[#0e0e0d] shadow-[0_4px_10px_-6px_rgba(14,14,13,0.06)]",
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
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#ebf8f1] text-[#2d9961]">
              <Bot className="h-3.5 w-3.5" />
            </div>
            <div className="rounded-2xl rounded-tl-sm border border-[#e0dfd8] bg-white px-3.5 py-2.5 text-sm text-[#525251] shadow-[0_4px_10px_-6px_rgba(14,14,13,0.06)]">
              <span className="inline-flex gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#3fb578] [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#3fb578] [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#3fb578]" />
              </span>
            </div>
          </div>
        )}

      <div ref={endRef} />
    </div>
  );
}
