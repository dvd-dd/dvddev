"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TimelineEvent {
  year: string;
  label: string;
}

interface CareerLogProps {
  events: readonly TimelineEvent[];
  /** Terminal command shown above the log, e.g. "git log --oneline". */
  command?: string;
  className?: string;
}

/*
 * CareerLog — the trajectory as a developer's own native artifact: a
 * `git log`. Replaces the old space/radio "transmission log". Each
 * milestone is a commit on the branch line — a short hash, the year,
 * the message — and the newest one is tagged `HEAD → main` with a soft
 * live glow. Horizontal on desktop (the branch runs left→right), and it
 * folds to a vertical spine on mobile. Restrained motion: a one-shot
 * reveal per commit + a single gentle pulse on HEAD only.
 *
 * The hashes are decorative (not real SHAs) — newest last so HEAD lands
 * on the most recent commit.
 */
const HASHES = ["a1c0de5", "9f2b3c1", "c0ffee2", "de7a112"] as const;

const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
};

export function CareerLog({
  events,
  command = "git log --oneline",
  className,
}: CareerLogProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Terminal prompt caption */}
      <div className="mb-9 flex items-center gap-2 font-mono text-[11px] tracking-[0.02em]">
        <span className="text-fg-faint">~/career</span>
        <span className="text-brand">$</span>
        <span className="text-fg-dim">{command}</span>
        <span
          aria-hidden
          className="ml-0.5 inline-block h-3.5 w-[7px] bg-brand/70 [animation:caret-blink_1.1s_step-end_infinite]"
        />
      </div>

      <ol className="relative grid grid-cols-1 gap-y-7 md:grid-cols-4 md:gap-x-6 md:gap-y-0">
        {/* Branch line — horizontal on desktop, sits at the dot center */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-[6px] right-2 top-[7px] hidden h-px md:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(168,85,247,0.55), rgba(168,85,247,0.55) 86%, transparent)",
          }}
        />
        {/* Branch line — vertical spine on mobile */}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-3 left-[6px] top-1 w-px bg-brand/25 md:hidden"
        />

        {events.map((event, i) => {
          const isHead = i === events.length - 1;
          const hash = HASHES[i] ?? HASHES[HASHES.length - 1];
          return (
            <motion.li
              key={`${event.year}-${i}`}
              custom={i}
              variants={rowVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="relative flex items-start gap-4 md:block"
            >
              {/* Node dot — hollow violet ring for past commits, filled +
                  glowing for HEAD (the current, live state). */}
              <span className="relative z-10 flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center md:h-[15px]">
                {isHead && (
                  <motion.span
                    aria-hidden
                    className="absolute h-3.5 w-3.5 rounded-full bg-brand/40"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 2.1, opacity: 0 }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                {isHead ? (
                  <span className="relative h-[11px] w-[11px] rounded-full bg-brand shadow-[0_0_10px_2px_rgba(168,85,247,0.7)]" />
                ) : (
                  <span className="relative h-[11px] w-[11px] rounded-full border-[1.5px] border-brand/70 bg-bg-base" />
                )}
              </span>

              {/* Commit body */}
              <div className="md:mt-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[11px] text-fg-faint">{hash}</span>
                  {isHead && (
                    <span className="rounded border border-brand/35 bg-brand/10 px-1.5 py-px font-mono text-[9px] uppercase tracking-[0.1em] text-brand">
                      HEAD → main
                    </span>
                  )}
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-brand">
                  {event.year}
                </div>
                <div className="mt-1 text-sm leading-snug text-fg-base">
                  {event.label}
                </div>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
