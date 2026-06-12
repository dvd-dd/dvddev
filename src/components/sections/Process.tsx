"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * "How I Work" — replaces the conventional pricing tier section per
 * David's call ("steps 1-2-3-4 ao invés de preços"). Four numbered
 * steps laid out in a single row on desktop, stacked on mobile.
 *
 * Step pattern, per Sanity's editorial blocks:
 *   numeral (mono, brand mint) → label (display, weight 400) → body.
 * No icons, no illustrations — typographic restraint.
 */
const STEPS = [
  {
    title: "Discovery call",
    body:
      "30-minute talk to understand the product, the audience, and what \"shipped\" actually means. No deck, no pitch — questions and clarity.",
  },
  {
    title: "Wireframes + tech plan",
    body:
      "Low-fidelity layouts paired with a stack proposal and timeline. You see the structure before any pixels move.",
  },
  {
    title: "Build in public",
    body:
      "Daily preview URL, async updates, a private Slack/WhatsApp channel. You watch the site grow — no surprises at handoff.",
  },
  {
    title: "Ship + handoff",
    body:
      "Production deploy, docs, source repo access, plus 14 days of post-launch support for anything that surfaces in real traffic.",
  },
] as const;

export function Process() {
  const { t } = useTranslation();

  return (
    <section
      id="process"
      className="relative w-full px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-[1248px]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 max-w-2xl md:mb-16"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-faint">
            {t.chrome.nav.links.process} · 04
          </p>
          <h2 className="mt-4 text-balance text-4xl font-normal leading-[1.05] tracking-[-0.03em] text-fg-base md:text-6xl">
            How I work.
          </h2>
        </motion.div>

        <ol className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-10">
          {STEPS.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.55,
                delay: 0.08 * i,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="border-t border-border-faint pt-6"
            >
              <span className="font-mono text-3xl font-normal text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-balance text-2xl font-normal leading-tight tracking-tight text-fg-base">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-dim md:text-base">
                {step.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
