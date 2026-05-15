"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  PROJECTS,
  getRingRadius,
  getRingSpeedSeconds,
  type Project,
} from "@/lib/projects";

/*
 * STELLAR MAP — SVG + CSS solar-system view of the portfolio with a
 * cinematic "break orbit" zoom interaction on click.
 *
 * Static layout:
 *   1. Outer container holds aspect-square space + CSS perspective.
 *   2. "Stage" tilts 25° on X — turns flat SVG circles into elliptical
 *      orbits in screen space without any trigonometry.
 *   3. SVG dashed concentric rings (driven from PROJECTS' max ring).
 *   4. Central sun, pulsing.
 *   5. Each planet sits in a two-layer wrapper (static startAngle +
 *      infinite rotation animation) with its name label always
 *      visible below the body.
 *
 * Active-project interaction:
 *   - On click, capture the planet's bounding rect via
 *     `getBoundingClientRect()`. The parent gets notified via
 *     `onActivate` and stores the active project; the rect lives in
 *     local state.
 *   - When active, all orbital rotations pause + the entire stage
 *     fades to 0.15. The clicked planet's button goes opacity 0 so the
 *     space is preserved for the return animation.
 *   - A `<motion.div>` is rendered fixed-position via AnimatePresence:
 *       initial = captured origin rect (small, where the planet was)
 *       animate = 25vw / 50vh, scaled by 2.8
 *       exit    = back to the captured rect
 *   - Inside the FLIP container, ZoomedPlanetVisual paints a premium
 *     version of the planet: intense glow, slow internal spin, idle
 *     float, surface noise, three orbiting particles, optional ring.
 *   - A HUD designation callout fades in after the FLIP settles.
 *
 * Scaling: add a 7th project = push to PROJECTS. The map renders it
 * automatically. No 3D math, no manual repositioning.
 */

const TILT_DEGREES = 25;
const STAGE_SIZE = 800; // SVG viewBox centered at origin: -400..400
const ZOOM_SCALE = 2.8;

/* ─── Deterministic ambient starfield ───────────────────────────── */

interface BgStar {
  x: number;
  y: number;
  r: number;
  opacity: number;
}

/** Park-Miller LCG. Cheap, deterministic, runs once on first render. */
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateBgStars(count: number, seed = 42): BgStar[] {
  const rand = seededRandom(seed);
  return Array.from({ length: count }, () => ({
    x: (rand() - 0.5) * STAGE_SIZE,
    y: (rand() - 0.5) * STAGE_SIZE,
    r: 0.6 + rand() * 1.2,
    opacity: 0.2 + rand() * 0.4,
  }));
}

/* ─── Single planet body (orbital + zoomed share gradient math) ──── */

function planetGradient(color: string) {
  // color-mix is supported in all evergreen browsers; the mixes give
  // us automatic light/dark variants without pre-computed hex tables.
  const lightStop = `color-mix(in srgb, ${color} 70%, white)`;
  const darkStop = `color-mix(in srgb, ${color} 35%, black)`;
  return {
    background: `radial-gradient(circle at 30% 25%, ${lightStop} 0%, ${color} 45%, ${darkStop} 100%)`,
    darkStop,
  };
}

interface PlanetVisualProps {
  project: Project;
  hovered: boolean;
}

function PlanetVisual({ project, hovered }: PlanetVisualProps) {
  const { orbit } = project;
  const { color, size, hasRing, ringColor } = orbit;
  const { background, darkStop } = planetGradient(color);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div
        className="relative h-full w-full rounded-full transition-all duration-300"
        style={{
          background,
          boxShadow: hovered
            ? `0 0 24px 6px ${color}aa, inset -4px -4px 8px ${darkStop}`
            : `0 0 12px 2px ${color}66, inset -4px -4px 8px ${darkStop}`,
        }}
      />
      {hasRing && (
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2"
          style={{
            width: size * 1.7,
            height: size * 0.35,
            transform:
              "translate(-50%, -50%) rotateX(70deg) rotateZ(15deg)",
            border: `1.5px solid ${ringColor ?? color}88`,
            borderRadius: "50%",
          }}
        />
      )}
    </div>
  );
}

/* ─── Premium zoomed planet (active state) ──────────────────────── */

// Inline SVG noise via data URI. baseFrequency tunes grain density.
// Saturated to 0 so it's pure luminance noise that overlays cleanly.
const NOISE_DATA_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E";

function ZoomedPlanetVisual({ project }: { project: Project }) {
  const { orbit } = project;
  const { color, hasRing, ringColor } = orbit;
  const { background, darkStop } = planetGradient(color);

  return (
    // Outer wrapper handles the idle float — separate from the
    // internal rotation so the two motions compose cleanly.
    <motion.div
      animate={{ y: [-6, 6, -6] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="relative h-full w-full"
    >
      {/* Body + slow surface rotation. Wrapping the gradient layer in
          a rotating motion.div makes the noise overlay (mounted as
          its child) rotate too — reads as a planet turning on its
          axis at cosmic-time scale. */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="relative h-full w-full overflow-hidden rounded-full"
        style={{
          background,
          // Two-stop glow: tight halo at body color, wide bloom at
          // 33% alpha so it reads as atmospheric scatter not just
          // a drop-shadow. Inset shadow deepens the terminator.
          boxShadow: `0 0 60px 12px ${color}88, 0 0 120px 24px ${color}33, inset -8px -8px 16px ${darkStop}`,
        }}
      >
        {/* Surface noise — gives the body texture rather than flat */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `url("${NOISE_DATA_URI}")`,
            backgroundSize: "100% 100%",
            opacity: 0.12,
            mixBlendMode: "overlay",
          }}
        />
      </motion.div>

      {/* Saturn-style ring at zoom scale — wider + bolder than the
          orbital version so it reads against the intense glow. */}
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

      {/* Three particle dots orbiting at different speeds. Each lives
          in its own absolute inset-0 wrapper that rotates infinitely;
          a static phase offset spreads them 120° apart so they don't
          all sit on top of each other on first paint. */}
      {[0, 120, 240].map((phase, i) => (
        <motion.div
          key={i}
          aria-hidden
          className="pointer-events-none absolute inset-0"
          initial={{ rotate: phase }}
          animate={{ rotate: phase + 360 }}
          transition={{
            duration: 10 + i * 3,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div
            className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-saturn-cream"
            style={{
              top: "50%",
              // 115% of the wrapper width = 65% past the planet's
              // right edge → dot orbits at ~1.3x the planet radius.
              left: "115%",
              opacity: 0.55,
              boxShadow: `0 0 6px ${color}`,
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ─── Main map ──────────────────────────────────────────────────── */

interface StellarMapProps {
  /** Lifted from the parent so the map and the panel share state. */
  activeProject: Project | null;
  onActivate: (project: Project) => void;
}

export function StellarMap({ activeProject, onActivate }: StellarMapProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  // Per-project bounding rects captured at click time so the FLIP
  // animation has the right origin even after multiple clicks. Stored
  // in a ref because we never want to re-render on rect changes.
  const originRectsRef = useRef<Map<string, DOMRect>>(new Map());
  // Mirror-state for the rect of the CURRENTLY rendered zoom overlay —
  // needed in render output, so it lives in state and we set it at the
  // moment we activate.
  const [activeRect, setActiveRect] = useState<DOMRect | null>(null);

  const isActive = activeProject !== null;
  const maxRing = useMemo(
    () => Math.max(...PROJECTS.map((p) => p.orbit.ring)),
    []
  );
  const bgStars = useMemo(() => generateBgStars(60), []);

  const handlePlanetClick = (project: Project, el: HTMLButtonElement) => {
    const rect = el.getBoundingClientRect();
    originRectsRef.current.set(project.id, rect);
    setActiveRect(rect);
    onActivate(project);
  };

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[700px]"
      style={{ perspective: "1400px" }}
    >
      {/* Ambient starfield — flat (no tilt) so the stars feel like
          fixed distant lights, not part of the orbital plane. */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox={`${-STAGE_SIZE / 2} ${-STAGE_SIZE / 2} ${STAGE_SIZE} ${STAGE_SIZE}`}
      >
        {bgStars.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="#fafafa"
            opacity={s.opacity}
          />
        ))}
      </svg>

      {/* Tilted stage. Dims to 0.15 when a project is active so the
          spotlighted zoomed planet owns the visual focus. */}
      <motion.div
        animate={{ opacity: isActive ? 0.15 : 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute inset-0"
        style={{
          transform: `rotateX(${TILT_DEGREES}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Orbital rings */}
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full"
          viewBox={`${-STAGE_SIZE / 2} ${-STAGE_SIZE / 2} ${STAGE_SIZE} ${STAGE_SIZE}`}
        >
          {Array.from({ length: maxRing }, (_, i) => i + 1).map((ring) => (
            <circle
              key={ring}
              cx={0}
              cy={0}
              r={getRingRadius(ring)}
              fill="none"
              stroke="rgba(212, 165, 116, 0.18)"
              strokeWidth={0.6}
              strokeDasharray="2 4"
            />
          ))}
        </svg>

        {/* Central pulsing sun */}
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: 14,
            height: 14,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, #fff5d4 0%, #d4a574 70%, #8e6e48 100%)",
            boxShadow:
              "0 0 20px 4px rgba(212, 165, 116, 0.6), 0 0 40px 8px rgba(212, 165, 116, 0.3)",
            animation: "sun-pulse 4s ease-in-out infinite",
          }}
        />

        {/* Planets */}
        {PROJECTS.map((project) => {
          const { ring, startAngle } = project.orbit;
          const radius = getRingRadius(ring);
          const speed = getRingSpeedSeconds(ring);
          const isHovered = hoveredId === project.id;
          const isThisActive = activeProject?.id === project.id;
          // Pause all orbits while ANY project is active so the focus
          // is clean — not just the active one's orbit, all of them.
          const pauseOrbit = isActive || isHovered;

          return (
            <div
              key={project.id}
              className="absolute left-1/2 top-1/2"
              style={{
                width: 0,
                height: 0,
                transform: `rotate(${startAngle}deg)`,
              }}
            >
              <div
                style={{
                  width: 0,
                  height: 0,
                  animation: `orbit-rotation ${speed}s linear infinite`,
                  animationPlayState: pauseOrbit ? "paused" : "running",
                }}
              >
                <motion.button
                  type="button"
                  aria-label={`${project.designation} — ${project.name}`}
                  // Hide the original button when its project is
                  // active — the zoom overlay is showing it instead.
                  // Other buttons render normally (they'll inherit the
                  // parent's 0.15 fade).
                  animate={{ opacity: isThisActive ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => handlePlanetClick(project, e.currentTarget)}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(project.id)}
                  onBlur={() => setHoveredId(null)}
                  className="group absolute flex cursor-pointer flex-col items-center justify-center border-0 bg-transparent p-0"
                  style={{
                    transform: `translate(${radius}px, -50%) rotateX(-${TILT_DEGREES}deg)`,
                  }}
                >
                  <PlanetVisual project={project} hovered={isHovered} />

                  {/* Static label — always visible below the planet.
                      Tracking expands a hair on hover for tactile
                      feedback without needing a true tooltip. */}
                  <div
                    className="pointer-events-none mt-2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.22em] text-saturn-cream/55 transition-all duration-300 group-hover:tracking-[0.28em] group-hover:text-saturn-cream"
                  >
                    {project.name.toUpperCase()}
                  </div>
                </motion.button>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* ZOOM OVERLAY — fixed positioning at viewport scale. The
          motion.div FLIPs from the captured origin rect (where the
          planet was on screen) to a fixed 25vw / 50vh spotlight. */}
      <AnimatePresence onExitComplete={() => setActiveRect(null)}>
        {activeProject && activeRect && (
          <motion.div
            // No key — when the user clicks a different planet
            // mid-active, this same motion.div updates its inner
            // ZoomedPlanetVisual props without remounting. Avoids
            // an awkward "old planet exits + new planet enters"
            // crossover at the same screen position.
            initial={{
              top: activeRect.top + activeRect.height / 2,
              left: activeRect.left + activeRect.width / 2,
              width: activeRect.width,
              height: activeRect.height,
              x: "-50%",
              y: "-50%",
              opacity: 1,
            }}
            animate={{
              top: "50vh",
              left: "25vw",
              width: activeProject.orbit.size * ZOOM_SCALE,
              height: activeProject.orbit.size * ZOOM_SCALE,
              x: "-50%",
              y: "-50%",
              opacity: 1,
            }}
            exit={{
              top: activeRect.top + activeRect.height / 2,
              left: activeRect.left + activeRect.width / 2,
              width: activeRect.width,
              height: activeRect.height,
              x: "-50%",
              y: "-50%",
              opacity: 0,
            }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              pointerEvents: "none",
              zIndex: 25,
            }}
          >
            <ZoomedPlanetVisual project={activeProject} />

            {/* HUD designation callout — fades in after the FLIP has
                landed (delay matches the FLIP duration). Positioned
                to the upper-right of the zoomed planet so it doesn't
                obscure the body. */}
            <motion.div
              key={`callout-${activeProject.id}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="pointer-events-none absolute whitespace-nowrap"
              style={{
                top: "-12%",
                left: "100%",
                marginLeft: 16,
              }}
            >
              <span className="border border-saturn-gold/40 bg-deep-space/80 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-saturn-gold backdrop-blur-sm">
                {activeProject.designation}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyframes — orbit rotation drives the orbital wrappers,
          sun-pulse breathes the central star. */}
      <style>{`
        @keyframes orbit-rotation {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes sun-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50%      { transform: translate(-50%, -50%) scale(1.08); }
        }
      `}</style>
    </div>
  );
}
