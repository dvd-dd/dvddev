"use client";

import { motion } from "framer-motion";
import { StellarConsole } from "@/components/ui/StellarConsole";
import { ProjectsList } from "@/components/ui/ProjectsList";
import { useTranslation } from "@/hooks/useTranslation";
import { useIsMobile } from "@/hooks/useLightMode";

/**
 * Discovered Worlds — cockpit-style portfolio console.
 *
 * Heading on top, 3-column StellarConsole below (mission roster +
 * center planet + telemetry HUD + command bar). Console pulls its
 * data from projects.ts and translations.ts items.*.
 */
export function Projects() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <section
      id="projects"
      className="relative w-full overflow-hidden px-6 py-24 md:min-h-screen md:py-32"
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 mx-auto mb-10 max-w-3xl text-center md:mb-16"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-saturn-gold">
          {t.sections.projects.chapter}
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold leading-[0.95] tracking-tight text-saturn-cream md:text-6xl">
          {t.sections.projects.heading}
        </h2>
      </motion.div>

      {/* Desktop: full cockpit. Mobile: lightweight accordion list. */}
      {isMobile ? <ProjectsList /> : <StellarConsole />}
    </section>
  );
}
