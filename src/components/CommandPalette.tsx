"use client";

import { useEffect, useState, useCallback } from "react";
import { Command } from "cmdk";
import {
  BookOpen,
  BriefcaseBusiness,
  FileDown,
  MessageSquareText,
  Search,
  User,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { PROJECTS, SKILLS, PERSONAL } from "@/data/cv";
import { useChat } from "./AiChat/ChatContext";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  group: string;
  keywords?: string;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { openChat } = useChat();

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  function navigate(hash: string) {
    close();
    setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 80);
  }

  const ITEMS: CommandItem[] = [
    {
      id: "nav-about",
      label: "About",
      description: "Who is Mazhar Hayat?",
      icon: <User className="h-4 w-4" />,
      action: () => navigate("#about"),
      group: "Navigate",
    },
    {
      id: "nav-projects",
      label: "Work & Projects",
      description: "Featured AI projects",
      icon: <Zap className="h-4 w-4" />,
      action: () => navigate("#projects"),
      group: "Navigate",
    },
    {
      id: "nav-experience",
      label: "Experience",
      description: "Career timeline",
      icon: <BriefcaseBusiness className="h-4 w-4" />,
      action: () => navigate("#experience"),
      group: "Navigate",
    },
    {
      id: "nav-skills",
      label: "Skills",
      description: "Tech stack & capabilities",
      icon: <Wrench className="h-4 w-4" />,
      action: () => navigate("#skills"),
      group: "Navigate",
    },
    {
      id: "nav-writing",
      label: "Writing",
      description: "Articles & thought leadership",
      icon: <BookOpen className="h-4 w-4" />,
      action: () => navigate("#writing"),
      group: "Navigate",
    },
    {
      id: "nav-contact",
      label: "Contact",
      description: "Get in touch",
      icon: <MessageSquareText className="h-4 w-4" />,
      action: () => navigate("#contact"),
      group: "Navigate",
    },
    {
      id: "action-chat",
      label: "Ask the AI",
      description: "Chat with Mazhar's AI assistant",
      icon: <MessageSquareText className="h-4 w-4 text-signal" />,
      action: () => { close(); openChat(); },
      group: "Actions",
    },
    {
      id: "action-cv",
      label: "Download CV",
      description: "Get the PDF/DOCX",
      icon: <FileDown className="h-4 w-4 text-signal" />,
      action: () => {
        close();
        const a = document.createElement("a");
        a.href = PERSONAL.cvUrl;
        a.download = PERSONAL.cvLabel;
        a.click();
      },
      group: "Actions",
    },
    ...PROJECTS.map((p) => ({
      id: `project-${p.slug}`,
      label: p.title,
      description: p.company,
      icon: <Zap className="h-4 w-4" />,
      action: () => {
        close();
        window.location.href = `/projects/${p.slug}`;
      },
      group: "Projects",
      keywords: p.stack.join(" "),
    })),
    ...Object.entries(SKILLS).flatMap(([category, cat]) =>
      cat.items.slice(0, 3).map((skill) => ({
        id: `skill-${skill}`,
        label: skill,
        description: category,
        icon: <Wrench className="h-4 w-4" />,
        action: () => navigate("#skills"),
        group: "Skills",
        keywords: category,
      })),
    ),
  ];

  if (!open) return null;

  const filtered = query.trim()
    ? ITEMS.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase()) ||
          item.keywords?.toLowerCase().includes(query.toLowerCase()),
      )
    : ITEMS;

  const groups = [...new Set(filtered.map((i) => i.group))];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center px-4 pt-[15vh]"
      onClick={close}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" />

      <Command
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-xl border border-ink-line bg-ink-card shadow-2xl"
        shouldFilter={false}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center border-b border-ink-line px-4">
          <Search className="h-4 w-4 shrink-0 text-paper-dim" />
          <Command.Input
            value={query}
            onValueChange={setQuery}
            placeholder="Search projects, skills, sections…"
            className="flex-1 bg-transparent px-3 py-4 text-sm text-paper placeholder:text-paper-dim focus:outline-none"
            autoFocus
          />
          <button
            type="button"
            onClick={close}
            className="rounded-md p-1 text-paper-dim hover:text-paper"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <Command.List className="max-h-96 overflow-y-auto py-2">
          {filtered.length === 0 && (
            <Command.Empty className="py-10 text-center text-sm text-paper-dim">
              No results for &ldquo;{query}&rdquo;
            </Command.Empty>
          )}

          {groups.map((group) => (
            <Command.Group
              key={group}
              heading={group}
              className="[&>[cmdk-group-heading]]:px-4 [&>[cmdk-group-heading]]:py-2 [&>[cmdk-group-heading]]:font-mono [&>[cmdk-group-heading]]:text-[10px] [&>[cmdk-group-heading]]:uppercase [&>[cmdk-group-heading]]:tracking-widest [&>[cmdk-group-heading]]:text-paper-dim"
            >
              {filtered
                .filter((i) => i.group === group)
                .map((item) => (
                  <Command.Item
                    key={item.id}
                    onSelect={item.action}
                    className="mx-2 flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-paper-muted transition aria-selected:bg-ink-elev aria-selected:text-paper"
                  >
                    <span className="shrink-0 text-paper-dim">{item.icon}</span>
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.description && (
                      <span className="truncate text-xs text-paper-dim">
                        {item.description}
                      </span>
                    )}
                  </Command.Item>
                ))}
            </Command.Group>
          ))}
        </Command.List>

        <div className="border-t border-ink-line px-4 py-2.5 text-xs text-paper-dim">
          <span className="font-mono">↑↓</span> navigate ·{" "}
          <span className="font-mono">↵</span> select ·{" "}
          <span className="font-mono">esc</span> dismiss
        </div>
      </Command>
    </div>
  );
}
