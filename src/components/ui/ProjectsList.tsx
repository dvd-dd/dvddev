"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import { PROJECTS } from "@/lib/projects";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * Mobile-only accordion list of projects.
 *
 * Replaces the StellarConsole cockpit on small viewports where the
 * 3-column layout (roster + planet + telemetry + command bar) would
 * stack vertically into a 600vh scroll monster. Each card collapses
 * to a header (designation + name + status), expanding on tap to
 * show description + "Visit Site" button. No planet, no screenshot,
 * no tech stack — the user wanted the minimum that lets them pick a
 * project and jump to the live site.
 */
export function ProjectsList() {
  const { t } = useTranslation();
  const [openId, setOpenId] = useState<string | null>(PROJECTS[0].id);

  const items = t.sections.projects.items as Record<
    string,
    { tagline: string; description: string; highlight: string }
  >;

  return (
    <div className="mx-auto w-full max-w-2xl space-y-3 px-1">
      {PROJECTS.map((project) => {
        const isOpen = openId === project.id;
        const copy = items[project.id];
        const isLive = project.status === "live";
        return (
          <article
            key={project.id}
            className={`relative border backdrop-blur-md transition-colors ${
              isOpen
                ? "border-saturn-gold/55 bg-deep-space/75"
                : "border-saturn-cream/15 bg-deep-space/55"
            }`}
          >
            {/* Corner ticks — keep the cockpit hairline vibe. */}
            <span
              className={`pointer-events-none absolute -left-px -top-px h-2 w-2 border-l border-t transition-colors ${
                isOpen ? "border-saturn-gold" : "border-saturn-gold/40"
              }`}
            />
            <span
              className={`pointer-events-none absolute -right-px -top-px h-2 w-2 border-r border-t transition-colors ${
                isOpen ? "border-saturn-gold" : "border-saturn-gold/40"
              }`}
            />
            <span
              className={`pointer-events-none absolute -bottom-px -left-px h-2 w-2 border-b border-l transition-colors ${
                isOpen ? "border-saturn-gold" : "border-saturn-gold/40"
              }`}
            />
            <span
              className={`pointer-events-none absolute -bottom-px -right-px h-2 w-2 border-b border-r transition-colors ${
                isOpen ? "border-saturn-gold" : "border-saturn-gold/40"
              }`}
            />

            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : project.id)}
              className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
              aria-expanded={isOpen}
            >
              <div className="flex-1">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-saturn-gold/90">
                  {project.designation}
                </div>
                <div className="mt-1 flex items-center gap-2 font-display text-base font-semibold leading-tight text-saturn-cream">
                  <span>{project.name}</span>
                  <span
                    className={`font-mono text-[10px] leading-none ${
                      isLive ? "text-emerald-400" : "text-saturn-gold"
                    }`}
                  >
                    {isLive
                      ? t.sections.projects.statusLive
                      : t.sections.projects.statusCase}
                  </span>
                </div>
              </div>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-saturn-cream/60 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
                strokeWidth={2}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4">
                    <p className="text-sm leading-relaxed text-saturn-cream/85">
                      {copy.description}
                    </p>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mt-4 inline-flex items-center gap-2 border border-saturn-gold/55 bg-saturn-gold/[0.08] px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-saturn-gold transition-all duration-300 hover:border-saturn-gold hover:bg-saturn-gold/[0.16] hover:text-saturn-cream"
                      >
                        <span>{t.sections.projects.ctaVisit}</span>
                        <ExternalLink
                          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                          strokeWidth={2.25}
                        />
                      </a>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        );
      })}
    </div>
  );
}
