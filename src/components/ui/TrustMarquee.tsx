"use client";

import type { ComponentType } from "react";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiVercel,
  SiGit,
  SiPnpm,
  SiFigma,
  SiAnthropic,
  SiNodedotjs,
} from "react-icons/si";

/**
 * Sanity-style trust strip directly under the hero. Combines three
 * idea categories into one infinite horizontal scroll, per David's
 * direction ("minhas skills poderiam rodar aqui nessa faixa"):
 *
 *   • client / project wordmarks (Upward, Smart Hardwood Floors, etc.)
 *   • flag glyphs (🇺🇸 🇧🇷 🇬🇧) for countries he's shipped for
 *   • stack icons (Next.js / React / TypeScript / Tailwind / etc.)
 *
 * Visually: brand-mint background, black-filtered icons + wordmarks,
 * mono uppercase labels. CSS `@keyframes marqyL` drives an infinite
 * linear translate so the loop never pauses; `pause-on-hover` lets a
 * curious visitor stop and read. Duplicated list inside so the scroll
 * is seamless.
 */

const STACK: Array<{
  Icon: ComponentType<{ className?: string; size?: number }>;
  label: string;
}> = [
  { Icon: SiNextdotjs, label: "Next.js" },
  { Icon: SiReact, label: "React" },
  { Icon: SiTypescript, label: "TypeScript" },
  { Icon: SiTailwindcss, label: "Tailwind" },
  { Icon: SiFramer, label: "Framer Motion" },
  { Icon: SiNodedotjs, label: "Node.js" },
  { Icon: SiVercel, label: "Vercel" },
  { Icon: SiGit, label: "Git" },
  { Icon: SiPnpm, label: "pnpm" },
  { Icon: SiFigma, label: "Figma" },
  { Icon: SiAnthropic, label: "Claude" },
];

const CLIENTS = [
  "Upward Media",
  "Smart Hardwood Floors",
  "Phoenix",
  "PeçaAí",
  "Luxor",
  "Wood Frame",
];

const FLAGS = ["🇺🇸 Connecticut", "🇧🇷 São Paulo", "🇬🇧 Birmingham"];

export function TrustMarquee() {
  // Build the inline strip once; we render it twice so the CSS
  // -50% translate creates a seamless loop.
  const items = (
    <>
      <span className="mx-8 font-mono text-[11px] uppercase tracking-[0.22em]">
        Shipped for
      </span>
      {CLIENTS.map((c) => (
        <span
          key={`client-${c}`}
          className="mx-6 whitespace-nowrap font-display text-[15px] font-medium"
        >
          {c}
        </span>
      ))}
      <span className="mx-8 font-mono text-[11px] uppercase tracking-[0.22em]">
        ·
      </span>
      <span className="mx-8 font-mono text-[11px] uppercase tracking-[0.22em]">
        Clients in
      </span>
      {FLAGS.map((f) => (
        <span
          key={`flag-${f}`}
          className="mx-6 whitespace-nowrap font-mono text-[13px] uppercase tracking-[0.18em]"
        >
          {f}
        </span>
      ))}
      <span className="mx-8 font-mono text-[11px] uppercase tracking-[0.22em]">
        ·
      </span>
      <span className="mx-8 font-mono text-[11px] uppercase tracking-[0.22em]">
        Stack
      </span>
      {STACK.map(({ Icon, label }) => (
        <span
          key={`stack-${label}`}
          className="mx-6 inline-flex items-center gap-2 whitespace-nowrap font-mono text-[13px] uppercase tracking-[0.18em]"
        >
          <Icon className="h-4 w-4 shrink-0" size={16} />
          {label}
        </span>
      ))}
    </>
  );

  return (
    <div
      data-theme="light"
      aria-label="Selected work, regions, and stack"
      className="group relative w-full overflow-hidden bg-brand py-5 text-ink-base"
    >
      <div className="flex w-max items-center gap-x-0 [animation:marqueeL_42s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:[animation:none]">
        <div className="flex items-center">{items}</div>
        <div aria-hidden className="flex items-center">
          {items}
        </div>
      </div>

      <style>{`
        @keyframes marqueeL {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
