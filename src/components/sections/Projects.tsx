"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { StellarMap } from "@/components/ui/StellarMap";
import { ProjectInfoPanel } from "@/components/ui/ProjectInfoPanel";
import { CaseStudyModal } from "@/components/ui/CaseStudyModal";
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
 * Replacement is a flat-layout section: heading on top, StellarMap
 * below it. No sticky scroll, no Canvas, no dynamic imports — the
 * map renders inline with the rest of the page.
 *
 * When the info panel opens, the heading fades to ~0.15 opacity so it
 * doesn't compete with the project details visually.
 */
export function Projects() {
  const { t } = useTranslation();
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const panelOpen = activeProject !== null;

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-deep-space via-space-black to-deep-space px-6 py-24 md:py-32"
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

      {/* Stellar map */}
      <div className="mt-16 md:mt-20">
        <StellarMap onActivate={(project) => setActiveProject(project)} />
      </div>

      {/* Slide-in panel + case-study modal — unchanged from the 3D
          version. Reused as-is. */}
      <ProjectInfoPanel
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onInspect={() => setModalOpen(true)}
      />
      <CaseStudyModal
        project={activeProject}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
