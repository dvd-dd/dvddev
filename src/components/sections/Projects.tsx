"use client";

import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/projects";
import { WorkCard } from "@/components/ui/WorkCard";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * Selected work — image-led case study grid that replaces the prior
 * StellarConsole cockpit. Each project shows its screenshot, name,
 * tagline, tech-stack chips, and a "Visit Surface →" affordance.
 *
 * Layout: 3-up on desktop / 2-up on tablet / single column on mobile.
 * Spacing follows the redesign brief: container max-w-[1248px],
 * py-96/128 section rhythm.
 */
export function Projects() {
  const { t } = useTranslation();
  const items = t.sections.projects.items as Record<
    string,
    { tagline: string; description: string; highlight: string }
  >;

  return (
    <section
      id="projects"
      className="relative w-full px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-[1248px]">
        {/* Heading block */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 max-w-2xl md:mb-16"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-faint">
            {t.sections.projects.chapter}
          </p>
          <h2 className="mt-4 text-balance text-4xl font-normal leading-[1.05] tracking-[-0.03em] text-fg-base md:text-6xl">
            {t.sections.projects.heading}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-dim md:text-lg">
            {t.sections.projects.instruction}
          </p>
        </motion.div>

        {/* Card grid */}
        <ul className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
          {PROJECTS.map((project, i) => {
            const copy = items[project.id];
            if (!copy) return null;
            return (
              <motion.li
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: 0.06 * (i % 3),
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <WorkCard
                  project={project}
                  copy={{ tagline: copy.tagline, description: copy.description }}
                  visitLabel={t.sections.projects.ctaVisit}
                />
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
