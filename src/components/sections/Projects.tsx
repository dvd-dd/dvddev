"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { StellarMap } from "@/components/ui/StellarMap";
import { ProjectInfoPanel } from "@/components/ui/ProjectInfoPanel";
import { useTranslation } from "@/hooks/useTranslation";
import type { Project } from "@/lib/projects";

/**
 * Discovered Worlds — SVG/CSS stellar map of the portfolio.
 *
 * Pivoted from the WebGL 3D scene because:
 *   • Adding a project required manual 3D positioning, which doesn't
 *     scale past ~10 entries.
 *   • Six textured planets pushed ~30 MB into the GPU and crashed on
 *     mid-tier hardware (silent WebGL context loss).
 *   • The scroll-velocity star streak layer was visually noisy.
 *
 * When the info panel opens, the heading fades to ~0.15 opacity so it
 * doesn't compete with the project details visually.
 *
 * CTAs in the panel are unified — both live sites (Upward,
 * Smartfloors) and case-study demos (Luxor, Phoenix, PeçaAí, Wood
 * Frame) open their `url` in a new tab. The case-study demos live
 * under /public/portfolio/{id}-site/index.html and ship as static
 * assets, so clicking a case-study CTA loads the real interactive
 * site (cursor spotlight, live counters, hover effects intact) —
 * much higher signal than a screenshot modal.
 */
export function Projects() {
  const { t } = useTranslation();
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const panelOpen = activeProject !== null;

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full overflow-hidden px-6 py-24 md:py-32"
    >
      {/* Heading — dims when the info panel is open so the panel's
          copy doesn't have to fight it for attention. */}
      <motion.div
        animate={{
          opacity: panelOpen ? 0.15 : 1,
          y: panelOpen ? -8 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-saturn-gold">
          {t.sections.projects.chapter}
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold leading-[0.95] tracking-tight text-saturn-cream md:text-6xl">
          {t.sections.projects.heading}
        </h2>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.3em] text-saturn-cream/50">
          {t.sections.projects.instruction}
        </p>
      </motion.div>

      {/* Stellar map. activeProject is lifted here so the map and the
          info panel share a single source of truth — closing the panel
          (ESC / backdrop / X) also fires the planet's return-to-orbit
          exit animation. */}
      <div className="mt-16 md:mt-20">
        <StellarMap
          activeProject={activeProject}
          onActivate={(project) => setActiveProject(project)}
        />
      </div>

      {/* Slide-in info panel. CTA inside is a real <a target="_blank">
          to the project's url — no modal involved. */}
      <ProjectInfoPanel
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
