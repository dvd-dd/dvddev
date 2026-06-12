"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";

interface StatusPillProps {
  /** Where the pill links to. Defaults to "#contact". */
  href?: string;
  className?: string;
}

/**
 * "Available for work" pill — mirrors Sanity's system-status pill in
 * placement (bottom-right of footer, inline with copyright) but says
 * something more useful for a freelance portfolio. The green dot uses
 * the asymmetric `pulse-heartbeat` keyframe (defined in globals.css)
 * so it feels alive without strobing.
 */
export function StatusPill({ href = "#contact", className }: StatusPillProps) {
  const { t } = useTranslation();

  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-fg-faint/40 bg-bg-elevated/60 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-dim transition-colors hover:border-brand hover:text-fg-base",
        className
      )}
    >
      <span
        aria-hidden
        className="relative inline-flex h-2 w-2"
      >
        <span
          className="absolute inset-0 rounded-full bg-brand"
          style={{ animation: "pulse-heartbeat 1.6s ease-in-out infinite" }}
        />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
      </span>
      <span>{t.chrome.statusPill}</span>
    </a>
  );
}
