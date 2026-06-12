"use client";

import { motion, type Variants } from "framer-motion";
import { RadioTimeline } from "@/components/ui/RadioTimeline";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * About — bio in four acts (Origin / Mission / Trajectory / Studio)
 * paired with the RadioTimeline visual on the left column.
 *
 * Phase 5 refresh:
 *   - Dropped the HelmetVisor astronaut PNG — too Saturn-specific.
 *   - Repaint all `saturn-gold` / `saturn-cream` legacy classes to the
 *     new fg-base / fg-dim / brand tokens.
 *   - Headline weight 400 (per the typography contract), max-w-[12ch].
 *   - Per-block clip-path reveal kept (Sanity's restraint allows this
 *     since it's a one-shot once:true enter, not a hover state).
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

  const acts: ReadonlyArray<{
    id: string;
    title: string;
    body: string;
    link?: { label: string; url: string };
  }> = [
    { id: "origin", ...t.about.origin },
    { id: "mission", ...t.about.mission },
    { id: "trajectory", ...t.about.trajectory },
    {
      id: "studio",
      title: t.about.studio.title,
      body: t.about.studio.body,
      link: {
        label: t.about.studio.linkLabel,
        url: t.about.studio.linkUrl,
      },
    },
  ];

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto grid max-w-[1248px] grid-cols-1 gap-12 md:grid-cols-[5fr_7fr] md:gap-16">
        {/* Left — timeline */}
        <div className="flex flex-col gap-12">
          <RadioTimeline
            heading={t.about.timeline.heading}
            events={t.about.timeline.events}
          />
        </div>

        {/* Right — bio in four acts */}
        <div className="flex flex-col">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-faint"
          >
            {t.about.chapter}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-[14ch] text-balance text-5xl font-normal leading-[1.05] tracking-[-0.03em] text-fg-base md:text-6xl"
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
                <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand">
                  {act.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-fg-dim md:text-lg">
                  {act.body}
                </p>
                {act.link && (
                  <a
                    href={act.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-brand transition-colors hover:text-fg-base"
                  >
                    {act.link.label}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                )}
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
