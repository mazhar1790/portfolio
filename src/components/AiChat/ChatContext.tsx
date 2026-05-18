"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import ChatWidget from "./ChatWidget";

interface ChatContextValue {
  open: boolean;
  openChat: (prompt?: string) => void;
  closeChat: () => void;
  toggleChat: () => void;
  pendingPrompt: string | null;
  consumePendingPrompt: () => string | null;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);

  const openChat = useCallback((prompt?: string) => {
    if (prompt) setPendingPrompt(prompt);
    setOpen(true);
  }, []);

  const closeChat = useCallback(() => setOpen(false), []);
  const toggleChat = useCallback(() => setOpen((v) => !v), []);

  const consumePendingPrompt = useCallback(() => {
    const p = pendingPrompt;
    setPendingPrompt(null);
    return p;
  }, [pendingPrompt]);

  const value = useMemo<ChatContextValue>(
    () => ({
      open,
      openChat,
      closeChat,
      toggleChat,
      pendingPrompt,
      consumePendingPrompt,
    }),
    [open, openChat, closeChat, toggleChat, pendingPrompt, consumePendingPrompt],
  );

  return (
    <ChatContext.Provider value={value}>
      {children}
      <ChatWidget />
    </ChatContext.Provider>
  );
}

export function useChat(): ChatContextValue {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}
