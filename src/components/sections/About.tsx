"use client";

import { motion, type Variants } from "framer-motion";
import { CareerLog } from "@/components/ui/CareerLog";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * About — the bio, scoped to what this site actually is: web work, not
 * a space saga. The old "Signal incoming." / radio "transmission log"
 * cosmic framing is gone. The trajectory now reads as a developer's
 * native artifact — a horizontal `git log` (CareerLog) — and the bio
 * sits below it in four acts (Origin / Mission / Trajectory / Studio).
 *
 *   eyebrow · About · 01
 *   How I got here.            ← H2, weight 400
 *   one-line intro             ← fg-dim
 *   ───────────────────────────────────────────  git log (horizontal)
 *   [ Origin ]   [ Mission ]
 *   [ Trajectory ] [ Studio → Upward ]
 */
const blockVariants: Variants = {
  hidden: { opacity: 0, y: 20, clipPath: "inset(0% 100% 0% 0%)" },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
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
      <div className="mx-auto max-w-[1248px]">
        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-faint"
        >
          {t.about.chapter}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-[16ch] text-balance text-5xl font-normal leading-[1.05] tracking-[-0.03em] text-fg-base md:text-6xl"
        >
          {t.about.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="mt-5 max-w-[52ch] text-base leading-relaxed text-fg-dim md:text-lg"
        >
          {t.about.intro}
        </motion.p>

        {/* Trajectory — horizontal git log */}
        <div className="mt-14 rounded-2xl border border-border-faint bg-white/[0.02] p-7 md:mt-16 md:p-9">
          <CareerLog
            command={t.about.timeline.heading}
            events={t.about.timeline.events}
          />
        </div>

        {/* Bio in four acts */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid grid-cols-1 gap-x-12 gap-y-12 md:mt-20 md:grid-cols-2"
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
    </section>
  );
}
