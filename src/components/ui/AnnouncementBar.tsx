"use client";

import { useTranslation } from "@/hooks/useTranslation";

/**
 * Thin inverse strip above the top nav — Sanity's announcement-bar
 * pattern. Single line with the "currently shipping for" status
 * message + flags + a call-to-action arrow link to #contact.
 *
 * Renders inverted (white text on near-black) regardless of theme, so
 * it reads as system chrome rather than content.
 */
export function AnnouncementBar() {
  const { t } = useTranslation();
  const a = t.chrome.announcement;

  return (
    <a
      href="#contact"
      className="group relative flex w-full items-center justify-center gap-2.5 bg-ink-base px-6 py-2 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-fg-base transition-colors hover:bg-ink-dim"
    >
      <span className="text-fg-dim">{a.prefix}</span>
      <span aria-hidden className="text-[13px] leading-none">
        {a.flags}
      </span>
      <span className="hidden text-fg-faint sm:inline">·</span>
      <span className="hidden text-fg-base sm:inline">
        {a.suffix}
      </span>
      <span
        aria-hidden
        className="ml-1 transition-transform duration-200 group-hover:translate-x-0.5"
      >
        →
      </span>
    </a>
  );
}
