"use client";

import { useTranslation } from "@/hooks/useTranslation";

/**
 * Thin strip above the top nav. Light cream background (`bg-gray-100`)
 * with dark ink text — matches the current sanity.io chrome where the
 * announcement reads as a page sign-on rather than inverted system
 * chrome.
 */
export function AnnouncementBar() {
  const { t } = useTranslation();
  const a = t.chrome.announcement;

  return (
    <a
      href="#contact"
      className="group relative flex w-full items-center justify-center gap-2.5 bg-transparent px-6 py-2 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-fg-base transition-colors hover:text-brand"
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
