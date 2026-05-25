"use client";

import { motion } from "framer-motion";
import { AnimatedSkillsConstellation } from "@/components/ui/SkillsConstellation";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * Mapped Tools — constellation chart of David's stack + workflow.
 *
 * Six clusters (CORE STACK · FRONTEND CRAFT · AI WORKFLOW · DESIGN ·
 * TOOLING · INFRA & DEPLOY), each rendered as a constellation of
 * star-positioned brand logos connected by dashed lines.
 *
 * Data lives in src/lib/skills.ts — adding a new tool is one entry
 * in the SKILLS array. Icons come from react-icons (Simple Icons set)
 * so brand marks stay current automatically.
 */
export function Skills() {
  const { t } = useTranslation();

  return (
    <section
      id="skills"
      className="relative w-full overflow-hidden px-6 py-24 md:py-32"
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 mx-auto mb-12 max-w-3xl text-center md:mb-16"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-saturn-gold">
          {t.sections.skills.chapter}
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold leading-[0.95] tracking-tight text-saturn-cream md:text-6xl">
          {t.sections.skills.heading}
        </h2>
      </motion.div>

      {/* Constellation chart */}
      <AnimatedSkillsConstellation />
    </section>
  );
}
