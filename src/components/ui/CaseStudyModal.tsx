"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import type { Project } from "@/lib/projects";

interface CaseStudyModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Self-falling-back screenshot. If `/projects/{id}-...png` exists,
 * it renders the real image; if not (404 → onError), it shows a
 * tasteful gradient placeholder with "Screenshot pending" copy.
 *
 * Tracking `hasError` instead of detecting size lets us flip back
 * to the real image once it's deployed without any code change.
 */
function ScreenshotSlot({
  src,
  alt,
  aspect = "16/9",
  fallbackLabel,
}: {
  src: string;
  alt: string;
  aspect?: string;
  fallbackLabel: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className="flex w-full items-center justify-center rounded-lg border border-saturn-gold/20 bg-gradient-to-br from-deep-space via-space-black to-deep-space"
        style={{ aspectRatio: aspect }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-saturn-cream/40">
          {fallbackLabel}
        </span>
      </div>
    );
  }

  return (
    <div
      className="relative w-full overflow-hidden rounded-lg border border-saturn-gold/20"
      style={{ aspectRatio: aspect }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        onError={() => setHasError(true)}
        className="object-cover"
      />
    </div>
  );
}

/**
 * Full-screen case-study modal. Opens via "View Specimen" CTA on
 * case-study projects (Phoenix, PeçaAí, Luxor, Wood Frame) — the
 * sites aren't deployed publicly but live in the portfolio folder.
 *
 * The modal shows the description from the i18n bag (already loaded
 * by ProjectInfoPanel) plus 3 image slots that gracefully fall back
 * to a placeholder when the corresponding /public/projects/ file
 * doesn't exist yet.
 */
export function CaseStudyModal({
  project,
  isOpen,
  onClose,
}: CaseStudyModalProps) {
  const { t } = useTranslation();

  // ESC closes; also keeps the body scroll locked while open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    // Body scroll lock — the modal lives outside the section so
    // without this the page would scroll behind it.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  const items = t.sections.projects.items as Record<
    string,
    { tagline: string; description: string; highlight: string }
  >;
  const copy = project ? items[project.id] : null;

  return (
    <AnimatePresence>
      {isOpen && project && copy && (
        <motion.div
          key="case-modal"
          role="dialog"
          aria-modal="true"
          aria-label={project.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-40 overflow-y-auto bg-space-black/90 backdrop-blur-md"
        >
          <motion.div
            // Stop propagation so clicks INSIDE the content don't
            // bubble up to the backdrop's onClose handler.
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 26,
              mass: 0.7,
            }}
            className="mx-auto my-12 max-w-5xl px-6 md:px-10"
          >
            {/* Header: close + designation */}
            <div className="mb-8 flex items-start justify-between gap-4">
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

            {/* Title + tagline */}
            <div className="mb-8">
              <h2 className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-saturn-cream md:text-6xl">
                {project.name}
              </h2>
              <p className="mt-4 font-mono text-sm italic text-saturn-cream/70">
                {copy.tagline}
              </p>
            </div>

            {/* Hero screenshot slot */}
            <div className="mb-10">
              <ScreenshotSlot
                src={`/projects/${project.id}-hero.png`}
                alt={`${project.name} — hero`}
                fallbackLabel={t.sections.projects.screenshotPending}
              />
            </div>

            {/* 2-col body: description / details */}
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              {/* LEFT — long description + tech stack */}
              <div className="flex flex-col gap-6">
                <p className="text-base leading-relaxed text-saturn-cream/80 md:text-lg">
                  {copy.description}
                </p>

                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-saturn-gold/80">
                    {t.sections.projects.techStackLabel}
                  </span>
                  <div className="mt-3 flex flex-wrap gap-2">
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
              </div>

              {/* RIGHT — signature feature + 2 detail screenshots */}
              <div className="flex flex-col gap-6">
                <div className="border border-saturn-gold/40 bg-saturn-gold/5 p-5">
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-saturn-gold">
                    {t.sections.projects.signatureFeature}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-saturn-cream/90">
                    {copy.highlight}
                  </p>
                </div>

                <ScreenshotSlot
                  src={`/projects/${project.id}-detail-1.png`}
                  alt={`${project.name} — detail 1`}
                  aspect="4/3"
                  fallbackLabel={t.sections.projects.screenshotPending}
                />
                <ScreenshotSlot
                  src={`/projects/${project.id}-detail-2.png`}
                  alt={`${project.name} — detail 2`}
                  aspect="4/3"
                  fallbackLabel={t.sections.projects.screenshotPending}
                />
              </div>
            </div>

            {/* Footer disclaimer */}
            <p className="mt-12 border-t border-saturn-gold/20 pt-6 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-saturn-cream/40">
              {t.sections.projects.caseStudyDisclaimer}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
