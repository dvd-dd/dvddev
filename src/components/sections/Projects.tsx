"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ProjectInfoPanel } from "@/components/ui/ProjectInfoPanel";
import { CaseStudyModal } from "@/components/ui/CaseStudyModal";
import { useTranslation } from "@/hooks/useTranslation";
import type { Project } from "@/lib/projects";

/**
 * 3D scene is client-only — Canvas/Three.js can't SSR. Dynamic import
 * with ssr:false keeps it out of the server bundle so the rest of the
 * page hydrates fast.
 */
const ProjectsScene = dynamic(
  () =>
    import("@/components/three/ProjectsScene").then((m) => m.ProjectsScene),
  { ssr: false }
);

/**
 * Projects ("Discovered Worlds") section.
 *
 * Layout structure:
 *   • Outer section is min-h-[200vh] so the user has "exploration
 *     time" — the sticky inner pins the scene to the viewport for a
 *     full extra screen of scroll, letting them inspect planets
 *     before the next section arrives.
 *   • Inner is sticky top-0 h-screen with the 3D canvas as the
 *     interactive backdrop, the chapter header overlaid at the top.
 *   • The InfoPanel and CaseStudyModal float on top via portals/fixed
 *     positioning — they don't displace the section.
 */
export function Projects() {
  const { t } = useTranslation();
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Lazy-mount the 3D scene: only construct the WebGL context + load
  // the planet textures when the section is approaching the viewport,
  // and tear it down once it's fully scrolled off.
  // Frees ~60–80 MB of GPU memory (textures + framebuffers + post-FX
  // buffers) and stops the per-frame render loop while the user is
  // anywhere else on the page. `margin: "200px"` pre-warms ~200px
  // before the section becomes visible so there's no pop-in at entry.
  const sectionRef = useRef<HTMLElement>(null);
  const sceneInView = useInView(sectionRef, { margin: "200px" });

  const handleActivate = (project: Project) => {
    setActiveProject(project);
  };

  const handleClosePanel = () => {
    // Closing the panel resets activeProject — the camera controller
    // reads that null and lerps back to the overview position.
    setActiveProject(null);
    setModalOpen(false);
  };

  const handleInspect = () => {
    // Open the case study modal on top of the panel; the panel stays
    // open behind so closing the modal returns to it naturally.
    setModalOpen(true);
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-[200vh] w-full bg-gradient-to-b from-deep-space via-space-black to-deep-space"
    >
      {/* Sticky inner — keeps the scene pinned for an extra viewport
          of scroll so the user can pause to investigate. */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* 3D scene gated on viewport proximity. Unmounted when the
            user is elsewhere on the page so we don't burn GPU + RAM
            on idle planets. */}
        {sceneInView && (
          <ProjectsScene
            activeId={activeProject?.id ?? null}
            onActivate={handleActivate}
          />
        )}

        {/* Chapter header overlaid at the top. Pointer-events off
            on the wrapper so it never blocks planet clicks; chrome
            sits at the top of the viewport regardless of scroll
            position inside the section. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 px-6 pt-12 text-center md:pt-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-saturn-gold"
          >
            {t.sections.projects.chapter}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 font-display text-4xl font-bold leading-[0.95] tracking-tight text-saturn-cream md:text-6xl"
          >
            {t.sections.projects.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-4 font-mono text-[11px] uppercase tracking-[0.3em] text-saturn-cream/50"
          >
            {t.sections.projects.instruction}
          </motion.p>
        </div>
      </div>

      {/* Floating UI — outside the sticky container so they're
          positioned fixed against the viewport, not the section. */}
      <ProjectInfoPanel
        project={activeProject}
        onClose={handleClosePanel}
        onInspect={handleInspect}
      />
      <CaseStudyModal
        project={activeProject}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
