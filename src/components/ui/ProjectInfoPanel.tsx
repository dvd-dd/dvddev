"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/hooks/useTranslation";
import type { Project } from "@/lib/projects";

interface ProjectInfoPanelProps {
  project: Project | null;
  onClose: () => void;
}

/**
 * Slide-in right panel that surfaces a project's metadata when its
 * planet is clicked. Uses AnimatePresence so the close animation
 * runs before unmount, and an ESC keydown listener + backdrop click
 * for dismissal (both are standard expectations for this UI).
 *
 * CTA is unified: every project (live or case-study) has a `url`
 * field, so the button is always `<a target="_blank">`. The status
 * badge still differentiates production sites from portfolio demos.
 */
export function ProjectInfoPanel({
  project,
  onClose,
}: ProjectInfoPanelProps) {
  const { t } = useTranslation();

  // ESC to close — bound only while the panel is open so we don't
  // leak a listener on every render or fight other ESC consumers.
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  // Indexed lookup into the per-project translations bag. We
  // declare a permissive shape to avoid plumbing a discriminated
  // union for ids that already live in projects.ts.
  const items = t.sections.projects.items as Record<
    string,
    { tagline: string; description: string; highlight: string }
  >;
  const copy = project ? items[project.id] : null;

  return (
    <AnimatePresence>
      {project && copy && (
        <>
          {/* Backdrop — click to close. Sits below the panel z-wise
              but above page content so clicks outside the panel hit it. */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[25] bg-space-black/40 backdrop-blur-[2px]"
          />

          <motion.aside
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label={project.name}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 28,
              mass: 0.8,
            }}
            className="fixed right-0 top-0 bottom-0 z-30 flex w-full max-w-md flex-col gap-6 overflow-y-auto border-l border-saturn-gold/30 bg-deep-space/95 px-8 py-10 backdrop-blur-xl"
          >
            {/* Top row: designation + close button */}
            <div className="flex items-start justify-between gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-saturn-gold">
                {project.designation}
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label={t.sections.projects.ctaClose}
                className="rounded-full p-1 text-saturn-cream/50 transition-colors hover:bg-white/5 hover:text-saturn-cream"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Name + status */}
            <div className="flex flex-col gap-3">
              <h3 className="font-display text-4xl font-bold leading-[0.95] tracking-tight text-saturn-cream md:text-5xl">
                {project.name}
              </h3>
              <span
                className={`self-start font-mono text-[10px] uppercase tracking-[0.3em] ${
                  project.status === "live"
                    ? "text-emerald-400"
                    : "text-saturn-gold"
                }`}
              >
                {project.status === "live"
                  ? t.sections.projects.statusLive
                  : t.sections.projects.statusCase}
              </span>
            </div>

            {/* Tagline (italic mono) */}
            <p className="font-mono text-sm italic leading-relaxed text-saturn-cream/70">
              {copy.tagline}
            </p>

            {/* Description */}
            <p className="text-base leading-relaxed text-saturn-cream/80">
              {copy.description}
            </p>

            {/* Tech stack chips */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-saturn-gold/80">
                {t.sections.projects.techStackLabel}
              </span>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-saturn-gold/30 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-saturn-cream/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Signature feature highlight box */}
            <div className="border border-saturn-gold/40 bg-saturn-gold/5 p-5">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-saturn-gold">
                {t.sections.projects.signatureFeature}
              </span>
              <p className="mt-2 text-sm leading-relaxed text-saturn-cream/90">
                {copy.highlight}
              </p>
            </div>

            {/* Unified CTA — both live projects and case studies now
                resolve to a real URL (case studies point at the
                bundled /portfolio/{id}-site/index.html demos). Opens
                in a new tab so the user keeps their place on dvddev. */}
            <div className="mt-auto pt-4">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="outline" className="w-full justify-center">
                    {t.sections.projects.ctaVisit}
                  </Button>
                </a>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
