"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { getFeaturedProjects } from "@/lib/projects";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * Selected Work — sanity.io's "Everything your team needs in one place"
 * pattern, dvddev-flavored. A sticky left index (01…07 + category) that
 * highlights the active project as you scroll, and a tall right column
 * with one block per project. Each block keeps the same skeleton
 * (eyebrow · name · description · bullets · Visit-site CTA) but renders a
 * DIFFERENT visual arrangement of its screenshots, so every project
 * reads unique — like Sanity's five distinct section visuals.
 *
 * Scroll-spy: each block tracks its own `useInView` (centered band); the
 * one crossing the viewport center lifts the active index to the rail.
 * Index clicks scroll via the Lenis instance (window.lenis) so they
 * cooperate with the smooth-scroll instead of fighting it; falls back to
 * native smooth scroll on touch/reduced-motion.
 */

type ProjectCopy = {
  category: string;
  tagline: string;
  description: string;
  highlight: string;
  bullets: readonly string[];
};

const ENTRY = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
  },
};

export function Projects() {
  const { t } = useTranslation();
  const featured = getFeaturedProjects();
  const items = t.sections.projects.items as Record<string, ProjectCopy>;
  const [active, setActive] = useState(0);

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
      className="relative w-full bg-bg-base px-6 py-24 md:px-10 md:py-32 lg:px-14"
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
          {/* Sticky index rail */}
          <aside className="hidden lg:col-span-2 lg:block">
            <div className="sticky top-[120px]">
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
                            on
                              ? "text-fg-base"
                              : "text-fg-faint group-hover:text-fg-dim"
                          }`}
                        >
                          {items[p.id]?.category}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
              <DottedGrid />
            </div>
          </aside>

          {/* Project blocks */}
          <div className="lg:col-span-10">
            {featured.map((p, i) => (
              <WorkBlock
                key={p.id}
                project={p}
                copy={items[p.id]}
                index={i}
                visitLabel={t.sections.projects.ctaVisitSite}
                onActive={setActive}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── One project block ─────────────────────────────────────────── */

function WorkBlock({
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
      className="flex scroll-mt-28 flex-col justify-center gap-10 border-t border-border-faint/60 py-16 first:border-t-0 md:py-24 lg:min-h-[82vh] lg:flex-row lg:items-center lg:gap-12"
    >
      {/* Text */}
      <motion.div
        variants={ENTRY}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="lg:w-[34%] lg:shrink-0"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand">
          {nn} · {copy.category}
        </p>
        <h3 className="mt-4 text-balance text-4xl font-normal leading-[1.04] tracking-[-0.03em] text-fg-base md:text-5xl xl:text-6xl">
          {project.name}
        </h3>
        <p className="mt-5 text-base leading-relaxed text-fg-dim lg:text-lg">
          {copy.description}
        </p>
        <ul className="mt-6 flex flex-col gap-2">
          {copy.bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-2.5 text-sm text-fg-dim"
            >
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

      {/* Visual */}
      <motion.div
        variants={ENTRY}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="min-w-0 flex-1"
      >
        <ProjectVisual project={project} />
      </motion.div>
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
    <div className="relative pb-10 pr-10">
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
        className="absolute -inset-4 -z-10 rounded-[16px] bg-[radial-gradient(60%_60%_at_70%_30%,rgba(168,85,247,0.25),transparent_70%)]"
      />
      <div className={`${FRAME}`}>
        <Img src={imgs[0]} alt={alt} className="block w-full" />
      </div>
      <div className={`${FRAME} absolute -bottom-8 -left-6 w-[42%] sm:w-[36%]`}>
        <Img src={imgs[1]} alt={alt} className="block w-full" />
      </div>
    </div>
  );
}

/* 5 · pecaai — desktop crop + tall mobile beside it */
function MobileBesideDesktop({ imgs, alt }: { imgs: string[]; alt: string }) {
  return (
    <div className="flex items-end gap-4">
      <div className={`${FRAME} flex-1`}>
        <Img src={imgs[0]} alt={alt} className="block w-full" />
      </div>
      <div className="w-[28%] shrink-0 overflow-hidden rounded-[18px] border-4 border-bg-elevated bg-bg-elevated shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)]">
        <Img src={imgs[1]} alt={alt} className="block w-full" />
      </div>
    </div>
  );
}

/* 6 · woodframe — two stacked editorial crops, offset */
function EditorialDuo({ imgs, alt }: { imgs: string[]; alt: string }) {
  return (
    <div className="flex flex-col gap-5">
      <div className={`${FRAME} w-[88%]`}>
        <Img src={imgs[0]} alt={alt} className="block w-full" />
      </div>
      <div className={`${FRAME} ml-auto w-[88%]`}>
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

/* ─── Dotted grid decoration under the index rail ────────────────── */

function DottedGrid() {
  return (
    <svg
      aria-hidden
      className="mt-12 h-40 w-40 text-fg-faint/40"
      viewBox="0 0 160 160"
      fill="none"
    >
      <defs>
        <pattern
          id="work-dots"
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="160" height="160" fill="url(#work-dots)" />
    </svg>
  );
}
