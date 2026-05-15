"use client";

import { cn } from "@/lib/utils";

interface GlitchTextProps {
  text: string;
  className?: string;
}

/**
 * Layered chromatic-aberration text. Two duplicate layers nudged
 * sideways with `mix-blend-mode: screen` create the cyan/red ghost
 * fringe on hover. Pure CSS — no JS animation cost on the main thread.
 */
export function GlitchText({ text, className }: GlitchTextProps) {
  return (
    <span
      data-text={text}
      className={cn(
        "relative inline-block",
        // Hover ghosts
        "before:absolute before:left-0 before:top-0 before:w-full before:content-[attr(data-text)] before:text-[#ff003c] before:opacity-0 before:mix-blend-screen before:transition-all before:duration-300",
        "after:absolute after:left-0 after:top-0 after:w-full after:content-[attr(data-text)] after:text-[#00fff7] after:opacity-0 after:mix-blend-screen after:transition-all after:duration-300",
        "hover:before:translate-x-[2px] hover:before:opacity-80",
        "hover:after:-translate-x-[2px] hover:after:opacity-80",
        className
      )}
    >
      {text}
    </span>
  );
}
