"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/projects";
import { useTranslation } from "@/hooks/useTranslation";

/*
 * STELLAR CONSOLE — cockpit/mission-select UI for the portfolio.
 *
 * Layout (desktop):
 *   ┌─────────────┬─────────────────┬─────────────┐
 *   │  ROSTER     │   CENTER PLANET │  TELEMETRY  │
 *   │  6 missions │   big cinematic │  HUD readout│
 *   │  ↑/↓ keys   │   scanner sweep │  + diff box │
 *   └─────────────┴─────────────────┴─────────────┘
 *   ┌──────────────────────────────────────────────┐
 *   │  [ENTER]  ▶▶▶  DEPLOY TO SURFACE — <url>     │
 *   └──────────────────────────────────────────────┘
 *
 * Mobile: roster + planet + telemetry stack vertically, command bar
 * still at the bottom of the section.
 *
 * State: a single `activeId` drives everything. Roster click sets it,
 * arrow keys nav prev/next, the planet + telemetry + CTA all react.
 *
 * Replaces the StellarMap + ProjectInfoPanel combo. The data
 * (projects.ts + translations.ts items.*) is unchanged — both
 * components consume the same source of truth.
 */

const CONSOLE_PLANET_SIZE = 280;

/* ─── Per-project display-only metadata ────────────────────────── */

/** Category badge shown in roster + telemetry. Hardcoded by id so we
 *  don't have to bake it into the data layer — these are display
 *  facets, not project facts. */
function getCategory(id: string): string {
  switch (id) {
    case "upward":
      return "AGENCY";
    case "smartfloors":
      return "SERVICES";
    case "phoenix":
      return "SAAS";
    case "pecaai":
      return "APP";
    case "luxor":
      return "LUXURY";
    case "woodframe":
      return "EDITORIAL";
    default:
      return "PROJECT";
  }
}

/** Fake-but-deterministic "distance from sun" derived from ring
 *  number. Pure HUD ambiance — sells the sci-fi telemetry. */
function getDistance(ring: number): string {
  return `${(ring * 1.2).toFixed(1)} AU`;
}

/** Strip protocol + trailing /index.html so the URL shown in the
 *  command bar is readable: "upwardbr.com" or "/portfolio/luxor-site". */
function displayUrl(url: string): string {
  return url
    .replace(/^https?:\/\//, "")
    .replace(/\/index\.html$/, "");
}

/* ─── Roster item (one row per project) ────────────────────────── */

interface RosterItemProps {
  project: Project;
  active: boolean;
  index: number;
  onSelect: () => void;
}

function RosterItem({ project, active, index, onSelect }: RosterItemProps) {
  const isLive = project.status === "live";
  const category = getCategory(project.id);
  const statusText = isLive ? "LIVE" : "DEMO";

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative w-full overflow-hidden border text-left backdrop-blur-md transition-all duration-200 ${
        active
          ? "border-saturn-gold/60 bg-deep-space/75"
          : "border-saturn-gold/15 bg-deep-space/55 hover:border-saturn-gold/30 hover:bg-deep-space/70"
      }`}
    >
      {/* Corner ticks — show on active OR hover for the HUD feel. */}
      <span
        className={`pointer-events-none absolute -left-px -top-px h-2 w-2 border-l border-t transition-colors ${
          active ? "border-saturn-gold" : "border-saturn-gold/40"
        }`}
      />
      <span
        className={`pointer-events-none absolute -right-px -top-px h-2 w-2 border-r border-t transition-colors ${
          active ? "border-saturn-gold" : "border-saturn-gold/40"
        }`}
      />
      <span
        className={`pointer-events-none absolute -bottom-px -left-px h-2 w-2 border-b border-l transition-colors ${
          active ? "border-saturn-gold" : "border-saturn-gold/40"
        }`}
      />
      <span
        className={`pointer-events-none absolute -bottom-px -right-px h-2 w-2 border-b border-r transition-colors ${
          active ? "border-saturn-gold" : "border-saturn-gold/40"
        }`}
      />

      {/* Left edge "TARGET LOCKED" indicator when active. */}
      {active && (
        <motion.span
          layoutId="roster-marker"
          className="absolute left-0 top-0 bottom-0 w-[3px] bg-saturn-gold"
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
        />
      )}

      <div className="flex flex-col gap-1.5 px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-saturn-gold/90">
            {project.designation}
          </span>
          <span
            className={`font-mono text-[11px] leading-none ${
              isLive ? "text-emerald-400" : "text-saturn-gold"
            }`}
          >
            {isLive ? "◉" : "◌"}
          </span>
        </div>
        <div className="font-display text-base font-semibold leading-tight text-saturn-cream">
          {project.name}
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em]">
          <span className="text-saturn-cream/55">▶</span>
          <span className="text-saturn-cream/85">{category}</span>
          <span className="text-saturn-cream/30">·</span>
          <span
            className={isLive ? "text-emerald-400/90" : "text-saturn-gold/90"}
          >
            {statusText}
          </span>
        </div>
      </div>

      {/* Hotkey hint — only visible on the active item to encourage
          discovery of keyboard navigation. */}
      {active && (
        <span
          aria-hidden
          className="absolute right-2.5 bottom-2 font-mono text-[10px] uppercase tracking-[0.18em] text-saturn-gold/80"
        >
          {index + 1}
        </span>
      )}
    </button>
  );
}

/* ─── Center planet ─────────────────────────────────────────────── */

function ConsolePlanet({ project }: { project: Project }) {
  const { color, hasRing, ringColor, texture } = project.orbit;

  return (
    <div
      className="relative"
      style={{ width: CONSOLE_PLANET_SIZE, height: CONSOLE_PLANET_SIZE }}
    >
      {/* Outer atmosphere wash — radial glow extending past the body. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-16"
        style={{
          background: `radial-gradient(circle at center, ${color}33 0%, ${color}11 30%, transparent 65%)`,
        }}
      />

      {/* Scanner sweep — rotating "radar line" around the planet. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute left-1/2 top-1/2 h-px origin-left"
          style={{
            width: "75%",
            background: `linear-gradient(to right, transparent 50%, ${color}cc 90%, transparent 100%)`,
            boxShadow: `0 0 6px ${color}88`,
          }}
        />
      </motion.div>

      {/* Target reticle — corner ticks framing the planet, pulse on
          mount to sell the "target acquired" moment. */}
      <motion.div
        aria-hidden
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1.2, opacity: 0.7 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0"
      >
        {(["tl", "tr", "bl", "br"] as const).map((corner) => {
          const cls = {
            tl: "left-0 top-0 border-l border-t",
            tr: "right-0 top-0 border-r border-t",
            bl: "left-0 bottom-0 border-b border-l",
            br: "right-0 bottom-0 border-b border-r",
          }[corner];
          return (
            <span
              key={corner}
              className={`absolute h-4 w-4 border-saturn-gold/70 ${cls}`}
            />
          );
        })}
      </motion.div>

      {/* Float wrapper — idle ±4px bob. */}
      <motion.div
        className="absolute inset-0"
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Planet body — real NASA-derived texture as background
            (no rotation: the equirectangular projection would visibly
            stretch if spun in 2D). Three layered backgrounds:
              1. Upper-left highlight  — fakes the lit hemisphere
              2. Lower-right shadow    — fakes the terminator
              3. Actual planet texture — Jupiter bands, Mars red, etc.
            The inset box-shadows reinforce the sphere illusion by
            darkening the rim and bleeding atmosphere color inward. */}
        <div
          className="relative h-full w-full overflow-hidden rounded-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 30% 25%, rgba(255, 255, 255, 0.22) 0%, transparent 38%),
              radial-gradient(circle at 70% 75%, rgba(0, 0, 0, 0.55) 50%, transparent 82%),
              url("${texture}")
            `,
            backgroundSize: "cover, cover, cover",
            backgroundPosition: "center, center, center",
            boxShadow: `
              0 0 60px 12px ${color}88,
              0 0 120px 24px ${color}33,
              inset -14px -14px 28px rgba(0, 0, 0, 0.6),
              inset 10px 10px 24px ${color}22
            `,
          }}
        />
      </motion.div>

      {/* Optional Saturn-style ring (Phoenix). */}
      {hasRing && (
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2"
          style={{
            width: "180%",
            height: "35%",
            transform:
              "translate(-50%, -50%) rotateX(70deg) rotateZ(15deg)",
            border: `2px solid ${ringColor ?? color}aa`,
            borderRadius: "50%",
            boxShadow: `0 0 12px ${ringColor ?? color}66`,
          }}
        />
      )}
    </div>
  );
}

/* ─── Telemetry panel (right column) ───────────────────────────── */

function TelemetryPanel({ project }: { project: Project }) {
  const { t } = useTranslation();
  const items = t.sections.projects.items as Record<
    string,
    { tagline: string; description: string; highlight: string }
  >;
  const copy = items[project.id];
  if (!copy) return null;

  const category = getCategory(project.id);
  const distance = getDistance(project.orbit.ring);
  const isLive = project.status === "live";

  return (
    <div className="flex flex-col gap-5">
      {/* Surface preview thumbnail — only when the project has one.
          Wraps the live URL so clicking the thumbnail does the same
          thing as the DEPLOY TO SURFACE bar below.
          The aspect-ratio wrapper reserves the box space BEFORE the
          image decodes — otherwise the img height is 0 until load
          and the panel below shifts down when the screenshot pops in. */}
      {project.screenshot && (
        <a
          href={project.url ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block overflow-hidden border border-saturn-cream/15 transition-colors duration-300 hover:border-saturn-gold/60"
        >
          <span className="pointer-events-none absolute -left-px -top-px z-10 h-2 w-2 border-l border-t border-saturn-gold/70" />
          <span className="pointer-events-none absolute -right-px -top-px z-10 h-2 w-2 border-r border-t border-saturn-gold/70" />
          <span className="pointer-events-none absolute -bottom-px -left-px z-10 h-2 w-2 border-b border-l border-saturn-gold/70" />
          <span className="pointer-events-none absolute -bottom-px -right-px z-10 h-2 w-2 border-b border-r border-saturn-gold/70" />

          <div className="relative aspect-[16/10] w-full overflow-hidden bg-deep-space/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.screenshot}
              alt={`${project.name} screenshot`}
              loading="eager"
              decoding="async"
              className="absolute inset-0 block h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>

          {/* Label strip overlay — bottom-left mono caption. */}
          <span className="pointer-events-none absolute bottom-1.5 left-2 z-10 font-mono text-[9px] uppercase tracking-[0.22em] text-saturn-cream/85 [text-shadow:0_1px_2px_rgba(0,0,0,0.85)]">
            ▸ SURFACE PREVIEW
          </span>
        </a>
      )}

      {/* HUD readout block */}
      <div className="relative border border-saturn-gold/30 bg-deep-space/65 px-4 py-3 backdrop-blur-md">
        <span className="pointer-events-none absolute -left-px -top-px h-2 w-2 border-l border-t border-saturn-gold" />
        <span className="pointer-events-none absolute -right-px -top-px h-2 w-2 border-r border-t border-saturn-gold" />
        <span className="pointer-events-none absolute -bottom-px -left-px h-2 w-2 border-b border-l border-saturn-gold" />
        <span className="pointer-events-none absolute -bottom-px -right-px h-2 w-2 border-b border-r border-saturn-gold" />

        <div className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-saturn-gold">
          ▸ TELEMETRY
        </div>
        <dl className="grid grid-cols-[88px_1fr] gap-y-2 font-mono text-[11px] uppercase tracking-[0.15em] text-saturn-cream">
          <dt className="text-saturn-cream/55">CLASS</dt>
          <dd className="text-saturn-cream/95">{category}</dd>
          <dt className="text-saturn-cream/55">STATUS</dt>
          <dd
            className={
              isLive
                ? "text-emerald-400"
                : "text-saturn-gold"
            }
          >
            {isLive ? "● LIVE" : "○ DEMO"}
          </dd>
          <dt className="text-saturn-cream/55">STACK</dt>
          <dd className="text-saturn-cream/90">
            {project.techStack.join(" · ")}
          </dd>
          <dt className="text-saturn-cream/55">DISTANCE</dt>
          <dd className="text-saturn-cream/95">{distance}</dd>
        </dl>
      </div>

      {/* Tagline + description grouped on a single dark scrim so the
          body text reads cleanly over the starfield. */}
      <div className="space-y-3 border border-saturn-cream/[0.08] bg-deep-space/60 px-4 py-4 backdrop-blur-md">
        <p className="font-mono text-sm italic leading-relaxed text-saturn-cream/75">
          {copy.tagline}
        </p>
        <p className="text-[15px] leading-relaxed text-saturn-cream/90">
          {copy.description}
        </p>
      </div>

      {/* Diferencial highlight */}
      <div className="border border-saturn-gold/40 bg-deep-space/70 p-4 backdrop-blur-md">
        <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-saturn-gold">
          {t.sections.projects.signatureFeature}
        </div>
        <p className="text-sm leading-relaxed text-saturn-cream/95">
          {copy.highlight}
        </p>
      </div>
    </div>
  );
}

/* ─── Command bar (bottom) ─────────────────────────────────────── */

function CommandBar({ project }: { project: Project }) {
  const url = project.url ?? "";
  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden border border-saturn-gold/55 bg-gradient-to-r from-saturn-gold/[0.06] via-saturn-gold/[0.14] to-saturn-gold/[0.06] backdrop-blur-md transition-all duration-300 hover:scale-[1.005] hover:border-saturn-gold hover:from-saturn-gold/[0.16] hover:via-saturn-gold/[0.28] hover:to-saturn-gold/[0.16] hover:shadow-[0_0_44px_-4px_rgba(212,165,116,0.55)]"
      style={{ animation: "cta-pulse 3.2s ease-in-out infinite" }}
    >
      {/* Corner ticks — slightly larger + bolder for CTA hierarchy */}
      <span className="pointer-events-none absolute -left-px -top-px h-3 w-3 border-l-2 border-t-2 border-saturn-gold" />
      <span className="pointer-events-none absolute -right-px -top-px h-3 w-3 border-r-2 border-t-2 border-saturn-gold" />
      <span className="pointer-events-none absolute -bottom-px -left-px h-3 w-3 border-b-2 border-l-2 border-saturn-gold" />
      <span className="pointer-events-none absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-saturn-gold" />

      {/* Shimmer sweep — a translucent gold band that diagonally
          scans across the button every 5s. Holds off-screen for the
          rest of the cycle so the effect feels like a "ping" rather
          than continuous motion. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-[18%] -skew-x-12 bg-gradient-to-r from-transparent via-saturn-cream/30 to-transparent"
        style={{
          left: "-25%",
          animation: "cta-shimmer 5s ease-in-out infinite",
        }}
      />

      <div className="relative flex items-center justify-between gap-4 px-6 py-5">
        {/* Left: hotkey hint */}
        <div className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-saturn-gold sm:block">
          [ENTER] ▶▶▶
        </div>

        {/* Center: deploy text + URL */}
        <div className="flex flex-1 flex-col items-center text-center sm:flex-row sm:justify-center sm:gap-3">
          <span className="font-mono text-sm font-semibold uppercase tracking-[0.22em] text-saturn-gold transition-colors group-hover:text-saturn-cream md:text-base">
            DEPLOY TO SURFACE
          </span>
          <span
            aria-hidden
            className="hidden text-saturn-gold/40 sm:inline"
          >
            —
          </span>
          <span className="font-mono text-[12px] lowercase tracking-[0.1em] text-saturn-cream/85 transition-colors group-hover:text-saturn-cream sm:text-sm">
            {displayUrl(url)}
          </span>
        </div>

        {/* Right: external link icon — bigger + bolder + slides on hover */}
        <ExternalLink
          className="h-5 w-5 shrink-0 text-saturn-gold transition-all duration-200 group-hover:translate-x-1.5 group-hover:text-saturn-cream"
          strokeWidth={2.25}
        />
      </div>
    </a>
  );
}

/* ─── Main console ─────────────────────────────────────────────── */

export function StellarConsole() {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState<string>(PROJECTS[0].id);

  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { margin: "-15%" });

  const activeProject = useMemo(
    () => PROJECTS.find((p) => p.id === activeId) ?? PROJECTS[0],
    [activeId]
  );

  // Keyboard navigation: ↑/↓ to move through the roster, Enter to
  // deploy. Only active when the console is in the viewport so we
  // don't hijack keys while the user is reading other sections.
  useEffect(() => {
    if (!inView) return;
    const handler = (e: KeyboardEvent) => {
      // Don't fight inputs / textareas / forms.
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA")
      )
        return;

      const idx = PROJECTS.findIndex((p) => p.id === activeId);
      if (e.key === "ArrowDown" || e.key === "j") {
        e.preventDefault();
        setActiveId(PROJECTS[(idx + 1) % PROJECTS.length].id);
      } else if (e.key === "ArrowUp" || e.key === "k") {
        e.preventDefault();
        setActiveId(
          PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length].id
        );
      } else if (e.key === "Enter") {
        // Skip if the user has a roster button focused — let the
        // button's own click handler fire to avoid double-action.
        if (target instanceof HTMLButtonElement) return;
        if (activeProject.url) {
          window.open(activeProject.url, "_blank", "noopener,noreferrer");
        }
      } else if (/^[1-6]$/.test(e.key)) {
        e.preventDefault();
        const idxFromKey = parseInt(e.key, 10) - 1;
        if (PROJECTS[idxFromKey]) setActiveId(PROJECTS[idxFromKey].id);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [inView, activeId, activeProject]);

  return (
    <div ref={sectionRef} className="relative mx-auto w-full max-w-7xl">
      {/* Header strip: instruction (left) + fleet status (right).
          Wrapped in a subtle scrim so the small mono labels read
          clearly against the global starfield. */}
      <div className="mb-6 flex flex-col items-start justify-between gap-2 rounded-sm border border-saturn-cream/[0.06] bg-deep-space/55 px-4 py-2.5 backdrop-blur-md sm:flex-row sm:items-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-saturn-cream/85">
          {t.sections.projects.instruction}
        </p>
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-saturn-cream/90">
          ▸ FLEET STATUS:{" "}
          <span className="text-emerald-400">{PROJECTS.length}</span>
          <span className="text-saturn-cream/55"> / </span>
          <span>{PROJECTS.length}</span> ACTIVE
        </div>
      </div>

      {/* Main 3-column grid (stacks on mobile). */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr_360px] lg:gap-8">
        {/* Mission roster */}
        <aside>
          <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-saturn-gold">
            ▸ MISSION ROSTER
          </div>
          <div className="flex flex-col gap-2">
            {PROJECTS.map((p, i) => (
              <RosterItem
                key={p.id}
                project={p}
                index={i}
                active={p.id === activeId}
                onSelect={() => setActiveId(p.id)}
              />
            ))}
          </div>
        </aside>

        {/* Center planet — AnimatePresence with mode="wait" runs the
            exit + enter sequentially, producing the "warp" feel: old
            planet shrinks out, new planet zooms in. */}
        <div className="relative flex min-h-[400px] items-center justify-center lg:min-h-[480px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ scale: 0.65, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.65, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <ConsolePlanet project={activeProject} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Telemetry panel — fades + slides on swap. */}
        <aside>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <TelemetryPanel project={activeProject} />
            </motion.div>
          </AnimatePresence>
        </aside>
      </div>

      {/* Command bar — fixed at the bottom of the grid. URL animates
          via the AnimatePresence key on the whole anchor so the
          hover state resets cleanly when switching projects. */}
      <div className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
          >
            <CommandBar project={activeProject} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
