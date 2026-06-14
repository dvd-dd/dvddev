"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  type TargetAndTransition,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { getFeaturedProjects } from "@/lib/projects";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * Selected Work — sanity.io's "Everything your team needs in one place"
 * pattern, dvddev-flavored and full-bleed. Three zones:
 *
 *   [ sticky index 01…07 ] [ scrolling text ] [ sticky visual ]
 *
 * ONLY the middle text column scrolls. The left index + the big right
 * visual are both pinned (sticky). As a text block crosses the viewport
 * centre, scroll-spy lifts the active project → the index highlights it
 * AND the sticky visual TRANSITIONS to that project's images with a
 * per-project entrance effect (each one different — slide from the
 * right, zoom, wipe up, slide from the left, …). On mobile the sticky
 * columns collapse and each block shows its text + visual inline.
 */

type ProjectCopy = {
  category: string;
  tagline: string;
  description: string;
  highlight: string;
  bullets: readonly string[];
};

const TXN = { duration: 0.55, ease: [0.4, 0, 0.2, 1] as const };

/** Each project's visual enters with its OWN effect. */
type V = {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  exit: TargetAndTransition;
};
const VISUAL_FX: Record<string, V> = {
  corvin: { initial: { opacity: 0, x: 90 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -70 } }, // slide ← from right
  upward: { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 1.05 } }, // zoom in
  phoenix: { initial: { opacity: 0, y: 90 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -70 } }, // rise up
  luxor: { initial: { opacity: 0, x: -90 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 70 } }, // slide → from left
  pecaai: { initial: { opacity: 0, y: -80 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 60 } }, // drop down
  woodframe: {
    initial: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
    animate: { opacity: 1, clipPath: "inset(0 0 0% 0)" },
    exit: { opacity: 0, clipPath: "inset(100% 0 0 0)" },
  }, // wipe up
  smartfloors: { initial: { opacity: 0, x: 80, y: 40 }, animate: { opacity: 1, x: 0, y: 0 }, exit: { opacity: 0, x: -60, y: -30 } }, // diagonal
};
const DEFAULT_FX: V = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };

export function Projects() {
  const { t } = useTranslation();
  const featured = getFeaturedProjects();
  const items = t.sections.projects.items as Record<string, ProjectCopy>;
  const [active, setActive] = useState(0);
  const activeProject = featured[active];
  const fx = VISUAL_FX[activeProject?.id] ?? DEFAULT_FX;

  const scrollToBlock = useCallback((id: string) => {
    const el = document.getElementById(`work-${id}`);
    if (!el) return;
    const lenis = window.__dvddevLenis;
    if (lenis) lenis.scrollTo(el, { offset: -120 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section
      id="projects"
      className="relative w-full overflow-x-clip bg-bg-base px-6 py-24 md:px-10 md:py-32 lg:px-14"
    >
      <div className="mx-auto w-full max-w-[1840px]">
        {/* Heading */}
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

        <div className="lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-12">
          {/* Zone 1 — sticky index rail + dotted field */}
          <aside className="hidden lg:col-span-2 lg:block">
            <div className="sticky top-[120px] flex h-[calc(100vh-150px)] flex-col">
              <ol className="flex flex-col gap-1">
                {featured.map((p, i) => {
                  const on = i === active;
                  return (
                    <li key={p.id}>
                      <button
                        type="button"
                        onClick={() => scrollToBlock(p.id)}
                        className="group flex w-full items-center gap-3 py-1.5 text-left"
                      >
                        <span
                          className={`inline-flex h-6 w-7 shrink-0 items-center justify-center rounded-[4px] border font-mono text-[10px] transition-colors ${
                            on
                              ? "border-brand text-fg-base"
                              : "border-transparent text-fg-faint group-hover:text-fg-dim"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                            on ? "text-fg-base" : "text-fg-faint group-hover:text-fg-dim"
                          }`}
                        >
                          {items[p.id]?.category}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
              {/* Dotted field — fills the rest of the rail, all the way down */}
              <div
                aria-hidden
                className="mt-10 w-full flex-1"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(185,185,185,0.45) 1.3px, transparent 1.3px)",
                  backgroundSize: "15px 15px",
                  maskImage:
                    "linear-gradient(to bottom, #000 0%, #000 70%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, #000 0%, #000 70%, transparent 100%)",
                }}
              />
            </div>
          </aside>

          {/* Zone 2 — scrolling text column */}
          <div className="lg:col-span-4">
            {featured.map((p, i) => (
              <WorkText
                key={p.id}
                project={p}
                copy={items[p.id]}
                index={i}
                visitLabel={t.sections.projects.ctaVisitSite}
                onActive={setActive}
              />
            ))}
          </div>

          {/* Zone 3 — sticky visual that transitions per active project */}
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-[120px] flex h-[calc(100vh-150px)] items-center">
              <div className="w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject?.id}
                    initial={fx.initial}
                    animate={fx.animate}
                    exit={fx.exit}
                    transition={TXN}
                    className="w-full"
                  >
                    {activeProject && <ProjectVisual project={activeProject} />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── One text block (scroll-spy) + inline visual on mobile ──────── */

function WorkText({
  project,
  copy,
  index,
  visitLabel,
  onActive,
}: {
  project: Project;
  copy?: ProjectCopy;
  index: number;
  visitLabel: string;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  if (!copy) return null;
  const nn = String(index + 1).padStart(2, "0");
  const external = project.url?.startsWith("http");

  return (
    <article
      id={`work-${project.id}`}
      ref={ref}
      className="flex scroll-mt-28 flex-col justify-center gap-10 py-16 md:py-20 lg:min-h-[92vh] lg:py-0"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={TXN}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand">
          {nn} · {copy.category}
        </p>
        <h3 className="mt-4 text-balance text-4xl font-normal leading-[1.04] tracking-[-0.03em] text-fg-base md:text-5xl xl:text-6xl">
          {project.name}
        </h3>
        <p className="mt-5 max-w-md text-base leading-relaxed text-fg-dim lg:text-lg">
          {copy.description}
        </p>
        <ul className="mt-6 flex flex-col gap-2">
          {copy.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-sm text-fg-dim">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand" />
              {b}
            </li>
          ))}
        </ul>
        <a
          href={project.url ?? "#"}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="group mt-8 inline-flex items-center gap-2 rounded-full border border-border-dim px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-base transition-colors hover:border-brand hover:text-brand"
        >
          {visitLabel.replace(" →", "")}
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2}
            aria-hidden
          />
        </a>
      </motion.div>

      {/* Inline visual — mobile only (the sticky column handles lg+) */}
      <div className="lg:hidden">
        <ProjectVisual project={project} />
      </div>
    </article>
  );
}

/* ─── Per-project visual variants (all distinct) ─────────────────── */

function ProjectVisual({ project }: { project: Project }) {
  const imgs = project.screenshots ?? (project.screenshot ? [project.screenshot] : []);
  const alt = `${project.name} screenshot`;
  switch (project.id) {
    case "corvin":
      return <SingleDevice src={imgs[0]} alt={alt} />;
    case "upward":
      return <StaggeredPair imgs={imgs} alt={alt} />;
    case "phoenix":
      return <CropGrid imgs={imgs} alt={alt} />;
    case "luxor":
      return <WideFloatingCard imgs={imgs} alt={alt} />;
    case "pecaai":
      return <MobileBesideDesktop imgs={imgs} alt={alt} />;
    case "woodframe":
      return <EditorialDuo imgs={imgs} alt={alt} />;
    case "smartfloors":
      return <WideWithStrip imgs={imgs} alt={alt} />;
    default:
      return <SingleDevice src={imgs[0]} alt={alt} />;
  }
}

const Img = ({ src, alt, className }: { src?: string; alt: string; className?: string }) =>
  src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} loading="lazy" decoding="async" className={className} />
  ) : null;

const FRAME =
  "overflow-hidden rounded-[10px] border border-border-faint bg-bg-elevated shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)]";

/* 1 · corvin — single shot in browser chrome */
function SingleDevice({ src, alt }: { src?: string; alt: string }) {
  return (
    <div className={`${FRAME}`}>
      <div className="flex items-center gap-1.5 border-b border-border-faint bg-bg-dim px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-fg-faint/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-fg-faint/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-fg-faint/40" />
        <span className="ml-3 h-4 flex-1 rounded bg-bg-elevated" />
      </div>
      <Img src={src} alt={alt} className="block w-full" />
    </div>
  );
}

/* 2 · upward — two staggered, back one rotated + dimmed */
function StaggeredPair({ imgs, alt }: { imgs: string[]; alt: string }) {
  return (
    <div className="relative pb-12 pr-12">
      <div className={`${FRAME} ml-auto w-[82%] rotate-[2deg] opacity-60`}>
        <Img src={imgs[1]} alt={alt} className="block w-full" />
      </div>
      <div className={`${FRAME} absolute bottom-0 left-0 w-[82%] -rotate-[1.5deg]`}>
        <Img src={imgs[0]} alt={alt} className="block w-full" />
      </div>
    </div>
  );
}

/* 3 · phoenix — 2x2 crop grid */
function CropGrid({ imgs, alt }: { imgs: string[]; alt: string }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {imgs.slice(0, 4).map((s, i) => (
        <div key={i} className={`${FRAME} aspect-[16/10]`}>
          <Img src={s} alt={alt} className="h-full w-full object-cover object-top" />
        </div>
      ))}
    </div>
  );
}

/* 4 · luxor — wide shot + floating card over a violet scrim */
function WideFloatingCard({ imgs, alt }: { imgs: string[]; alt: string }) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[16px] bg-[radial-gradient(60%_60%_at_70%_30%,rgba(168,85,247,0.25),transparent_70%)]"
      />
      <div className={`${FRAME}`}>
        <Img src={imgs[0]} alt={alt} className="block w-full" />
      </div>
      <div className={`${FRAME} absolute -bottom-8 -left-8 w-[38%]`}>
        <Img src={imgs[1]} alt={alt} className="block w-full" />
      </div>
    </div>
  );
}

/* 5 · pecaai — desktop crop + tall mobile beside it */
function MobileBesideDesktop({ imgs, alt }: { imgs: string[]; alt: string }) {
  return (
    <div className="flex items-end gap-5">
      <div className={`${FRAME} flex-1`}>
        <Img src={imgs[0]} alt={alt} className="block w-full" />
      </div>
      <div className="w-[26%] shrink-0 overflow-hidden rounded-[20px] border-4 border-bg-elevated bg-bg-elevated shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)]">
        <Img src={imgs[1]} alt={alt} className="block w-full" />
      </div>
    </div>
  );
}

/* 6 · woodframe — two stacked editorial crops, offset */
function EditorialDuo({ imgs, alt }: { imgs: string[]; alt: string }) {
  return (
    <div className="flex flex-col gap-5">
      <div className={`${FRAME} w-[86%]`}>
        <Img src={imgs[0]} alt={alt} className="block w-full" />
      </div>
      <div className={`${FRAME} ml-auto w-[86%]`}>
        <Img src={imgs[1]} alt={alt} className="block w-full" />
      </div>
    </div>
  );
}

/* 7 · smartfloors — one wide hero + a strip of 3 thumbnails */
function WideWithStrip({ imgs, alt }: { imgs: string[]; alt: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div className={`${FRAME}`}>
        <Img src={imgs[0]} alt={alt} className="block w-full" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {imgs.slice(1, 4).map((s, i) => (
          <div key={i} className={`${FRAME} aspect-[16/10]`}>
            <Img src={s} alt={alt} className="h-full w-full object-cover object-top" />
          </div>
        ))}
      </div>
    </div>
  );
}
