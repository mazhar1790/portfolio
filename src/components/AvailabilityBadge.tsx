"use client";

import { useEffect, useState } from "react";

interface Status {
  available: boolean;
  label: string;
  detail: string;
  updatedAt: string;
}

export default function AvailabilityBadge() {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    fetch("/status.json")
      .then((r) => r.json())
      .then(setStatus)
      .catch(() => null);
  }, []);

  if (!status) return null;

  return (
    <span
      title={status.detail}
      className="inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/5 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-signal cursor-default"
    >
      <span className="relative flex h-1.5 w-1.5">
        {status.available && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
        )}
        <span
          className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
            status.available ? "bg-signal" : "bg-paper-dim"
          }`}
        />
      </span>
      {status.label}
    </span>
  );
}
