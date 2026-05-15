"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TimelineEvent {
  year: string;
  label: string;
}

interface RadioTimelineProps {
  events: readonly TimelineEvent[];
  heading?: string;
  className?: string;
}

/*
 * Each dot pulses three concentric rings. Pre-computed delays so the
 * three rings of a single dot are evenly out of phase (a staircase of
 * 0 / 0.8s / 1.6s within a 2.4s loop), giving the "ripple chasing a
 * ripple" feel a single ring can't produce.
 */
const RING_DELAYS = [0, 0.8, 1.6] as const;
const RING_DURATION = 2.4;

function RadioRing({ delay, dotDelay }: { delay: number; dotDelay: number }) {
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-saturn-gold"
      initial={{ scale: 1, opacity: 0.6 }}
      animate={{ scale: 2.5, opacity: 0 }}
      transition={{
        duration: RING_DURATION,
        repeat: Infinity,
        ease: "easeOut",
        delay: delay + dotDelay,
      }}
    />
  );
}

const rowVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

/**
 * Vertical "transmission log". Each event sits on a hairline spine
 * with a saturn-gold dot. The dot continuously emits 3 phase-shifted
 * radio-wave rings to evoke an active signal. Per-row offsets keep
 * adjacent dots out of sync — the field feels like multiple active
 * stations, not one synchronized pulse.
 *
 * Rendered as <ol> for screen readers; the visual styling is layered
 * on top without interfering with semantics.
 */
export function RadioTimeline({
  events,
  heading,
  className,
}: RadioTimelineProps) {
  return (
    <div className={cn("relative", className)}>
      {heading && (
        <h3 className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-saturn-gold">
          {heading}
        </h3>
      )}

      <ol className="relative">
        {/* Vertical spine: anchored to dot center (col 0 = w-2 dot,
            so its center is at 4px ≈ left-1 + 1 -> left-[7px]). */}
        <span
          aria-hidden
          className="absolute bottom-2 left-[7px] top-2 w-px bg-saturn-gold/30"
        />

        {events.map((event, i) => (
          <motion.li
            key={`${event.year}-${i}`}
            custom={i}
            variants={rowVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="relative flex items-start gap-4 pb-8 last:pb-0"
          >
            {/* Dot + rings container — sized exactly to the dot so the
                rings can center against it via absolute positioning. */}
            <span className="relative mt-1 flex h-2 w-2 flex-shrink-0">
              {/* Per-row dotDelay = i * 0.4s. Combined with each ring's
                  internal delay, no two rings start identically. */}
              <RadioRing delay={RING_DELAYS[0]} dotDelay={i * 0.4} />
              <RadioRing delay={RING_DELAYS[1]} dotDelay={i * 0.4} />
              <RadioRing delay={RING_DELAYS[2]} dotDelay={i * 0.4} />
              <span className="relative h-2 w-2 rounded-full bg-saturn-gold shadow-[0_0_8px_rgba(212,165,116,0.6)]" />
            </span>

            <div className="flex flex-col">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-saturn-gold">
                {event.year}
              </span>
              <span className="mt-1 text-sm text-saturn-cream/70">
                {event.label}
              </span>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
