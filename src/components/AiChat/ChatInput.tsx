"use client";

import { Send } from "lucide-react";
import { FormEvent, useRef } from "react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  disabled,
}: Props) {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!value.trim() || disabled) return;
    onSend();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 border-t border-[#e0dfd8] bg-white px-3 py-3"
    >
      <textarea
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        placeholder="Ask anything about Mazhar..."
        disabled={disabled}
        className="max-h-32 flex-1 resize-none rounded-xl border border-[#e0dfd8] bg-[#fafaf7] px-3 py-2 text-sm text-[#0e0e0d] placeholder:text-[#9a9a96] transition focus:border-[#6dcc99] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6dcc99]/20 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0e0e0d] text-white transition hover:bg-[#2d9961] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
