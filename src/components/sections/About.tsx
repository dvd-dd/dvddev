"use client";

import { motion, type Variants } from "framer-motion";
import { HelmetVisor } from "@/components/ui/HelmetVisor";
import { RadioTimeline } from "@/components/ui/RadioTimeline";
import { useTranslation } from "@/hooks/useTranslation";

/*
 * Per-block decoder reveal. Each bio paragraph wipes left→right via
 * clip-path inset (same idiom we use for the logo paint), but here
 * the wipe runs in 1.2s with a slightly longer ease tail so it reads
 * as "signal resolving" rather than "stroke being painted".
 */
const blockVariants: Variants = {
  hidden: { opacity: 0, y: 24, clipPath: "inset(0% 100% 0% 0%)" },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

export function About() {
  const { t } = useTranslation();
  // Tag each act with a locale-invariant id so the React keys below
  // stay stable across language toggles. If we keyed by `act.title`,
  // switching EN→PT would change every key, unmounting/remounting the
  // motion.article elements; the fresh mounts then start at
  // initial="hidden" (clip-path fully clipped) and never re-trigger
  // the parent's `whileInView once: true` reveal — leaving the bio
  // bodies stuck invisible.
  const acts = [
    { id: "origin", ...t.about.origin },
    { id: "mission", ...t.about.mission },
    { id: "trajectory", ...t.about.trajectory },
  ] as const;

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden px-6 py-32 md:px-12 md:py-40"
    >
      {/* (Decorative CSS starfield removed — SiteStarfield now
          provides ambient stars across the whole site, so this
          local layer was double-rendering. */}

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
        {/* Left column: visual anchor + timeline. Stacks under the bio
            on mobile, sits beside it on desktop. */}
        <div className="flex flex-col gap-12">
          <HelmetVisor />
          <RadioTimeline
            heading={t.about.timeline.heading}
            events={t.about.timeline.events}
          />
        </div>

        {/* Right column: bio in three acts. */}
        <div className="flex flex-col">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-saturn-gold"
          >
            {t.about.chapter}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 font-display text-6xl font-bold leading-[0.95] tracking-tight text-saturn-cream md:text-7xl"
          >
            {t.about.heading}
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-12 flex flex-col gap-12"
          >
            {acts.map((act) => (
              <motion.article key={act.id} variants={blockVariants}>
                <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-saturn-gold">
                  {act.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-saturn-cream/80 md:text-lg">
                  {act.body}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
