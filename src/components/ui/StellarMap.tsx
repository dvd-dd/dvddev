"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  PROJECTS,
  getRingRadius,
  getRingSpeedSeconds,
  type Project,
} from "@/lib/projects";

/*
 * STELLAR MAP — SVG + CSS solar-system view of the portfolio.
 *
 * Layout strategy:
 *   1. Outer container holds aspect-square space + CSS perspective.
 *   2. Inner "stage" tilts 25° on X — this is what turns the SVG
 *      circles (which are flat-on circles) into the elliptical-
 *      looking orbital rings in screen space. Pure CSS 3D, no math.
 *   3. SVG renders the orbital rings as dashed circles at radii
 *      120/200/280 (centered at viewBox origin). These get visually
 *      foreshortened by the parent's tilt.
 *   4. A central "sun" sits at the stage origin with a pulsing glow.
 *   5. Each project's planet lives in TWO nested wrappers:
 *        outer: rotate(startAngle)            ← initial position
 *        inner: animation: orbit-rotation     ← infinite spin
 *      The button inside translates by ring radius on X, then
 *      counter-tilts the planet (rotateX(-25deg)) so the planet body
 *      reads as facing camera, not lying on the orbital plane.
 *
 * Scaling story: add a 7th project = push to PROJECTS with a ring +
 * startAngle. The map renders it. No 3D math, no manual positioning.
 */

const TILT_DEGREES = 25;
const STAGE_SIZE = 800; // SVG viewBox is centered at origin: -400..400

/* ─── Deterministic ambient starfield ───────────────────────────── */

interface BgStar {
  x: number; // viewBox-relative x (-400..400)
  y: number;
  r: number; // px
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

/* ─── Single planet visual ──────────────────────────────────────── */

interface PlanetVisualProps {
  project: Project;
  hovered: boolean;
}

function PlanetVisual({ project, hovered }: PlanetVisualProps) {
  const { orbit } = project;
  const { color, size, hasRing, ringColor } = orbit;

  // Pre-mix lighter/darker variants so the body radial gradient sells
  // a sphere instead of a flat disc. The 30%/25% gradient origin
  // simulates a key light coming from upper-left.
  // We bias to the actual color in the middle stop to keep the planet
  // recognizable; the darker stop at the rim provides shadow turn.
  const lightStop = `color-mix(in srgb, ${color} 70%, white)`;
  const darkStop = `color-mix(in srgb, ${color} 35%, black)`;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Planet body */}
      <div
        className="relative h-full w-full rounded-full transition-all duration-300"
        style={{
          background: `radial-gradient(circle at 30% 25%, ${lightStop} 0%, ${color} 45%, ${darkStop} 100%)`,
          // Outer glow + inner shadow stacked. Hover swells the outer
          // glow without changing the body — keeps the silhouette
          // anchored while signaling interactivity.
          boxShadow: hovered
            ? `0 0 24px 6px ${color}aa, inset -4px -4px 8px ${darkStop}`
            : `0 0 12px 2px ${color}66, inset -4px -4px 8px ${darkStop}`,
        }}
      />

      {/* Optional Saturn-style ring — pseudo via a child div tilted
          steeply so it reads as an ellipse passing through the body. */}
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

/* ─── Main map ──────────────────────────────────────────────────── */

interface StellarMapProps {
  onActivate: (project: Project) => void;
}

export function StellarMap({ onActivate }: StellarMapProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Determine ring count once from data — keeps SVG in sync if we add
  // a future project on a deeper ring.
  const maxRing = useMemo(
    () => Math.max(...PROJECTS.map((p) => p.orbit.ring)),
    []
  );

  // Background starfield: deterministic so it's stable across renders
  // and SSR-safe (no Math.random() inside the JSX).
  const bgStars = useMemo(() => generateBgStars(60), []);

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[700px]"
      style={{ perspective: "1400px" }}
    >
      {/* Ambient starfield — sits FLAT inside the container (no tilt)
          so the stars feel like fixed distant lights, not part of the
          rotating orbital plane. */}
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

      {/* Tilted stage. Everything orbital lives inside this rotateX
          frame — orbits become ellipses, sun stays centered. */}
      <div
        className="absolute inset-0"
        style={{
          transform: `rotateX(${TILT_DEGREES}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Orbital rings as dashed concentric circles */}
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

        {/* Central sun — sits at the stage origin. Pulse animation is
            a CSS keyframe defined in the <style> block below. */}
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

          return (
            // Outer wrapper sets the static initial angle. Inner
            // wrapper carries the infinite-rotation animation. Without
            // this two-layer split, the @keyframes wipes out the
            // initial offset on the first frame.
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
                  animationPlayState: isHovered ? "paused" : "running",
                }}
              >
                <button
                  type="button"
                  aria-label={`${project.designation} — ${project.name}`}
                  onClick={() => onActivate(project)}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(project.id)}
                  onBlur={() => setHoveredId(null)}
                  className="absolute flex cursor-pointer items-center justify-center border-0 bg-transparent p-0"
                  style={{
                    // Move OUT along the orbital radius on X, then
                    // counter-rotate the planet on X by -tilt so the
                    // body reads as facing the camera (not lying in
                    // the orbital plane).
                    transform: `translate(${radius}px, -50%) rotateX(-${TILT_DEGREES}deg)`,
                  }}
                >
                  <PlanetVisual project={project} hovered={isHovered} />

                  {/* Designation HUD label — fades in on hover, lives
                      above the planet so it doesn't fight the body. */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.span
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.15 }}
                        className="pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap border border-saturn-gold/40 bg-deep-space/85 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-saturn-cream backdrop-blur-sm"
                        style={{
                          bottom: "100%",
                          marginBottom: 12,
                        }}
                      >
                        {project.designation}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Keyframes — scoped via <style> so they ship with the
          component. orbit-rotation drives the infinite revolution;
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
