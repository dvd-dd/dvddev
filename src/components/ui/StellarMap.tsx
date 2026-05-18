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
 * STELLAR MAP — cinematic SVG/CSS solar-system view of the portfolio.
 *
 * Visual layers (back → front):
 *   1. Galaxy spiral backdrop      — 3 rotated radial gradients
 *   2. Far starfield               — 120 small stars (depth)
 *   3. Mid starfield               — 80 stars w/ subtle twinkle
 *   4. Near starfield              — 30 bright stars w/ halo
 *   5. Constellation lines         — thin polylines, 6 groups
 *   6. Cosmic dust                 — 12 slowly drifting particles
 *   7. (tilted 25° stage begins)
 *   8. Orbital rings + glow filter
 *   9. Central sun + corona rays
 *  10. Planets w/ counter-rotated labels
 *  11. (zoom overlay on top when active)
 *
 * Scaling story: add a 7th project = push to PROJECTS with a
 * ring + startAngle. The map renders it automatically.
 */

const TILT_DEGREES = 25;
const STAGE_SIZE = 1200; // SVG viewBox: -600..600
const ZOOM_SCALE = 2.8;
const HALF = STAGE_SIZE / 2;

/* ─── Deterministic seeded PRNG (Park-Miller LCG) ─────────────── */

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/* ─── Starfield generation ────────────────────────────────────── */

interface BgStar {
  x: number;
  y: number;
  r: number;
  opacity: number;
  /** Optional twinkle phase (seconds, 0..4). */
  twinkle?: number;
  /** Glow color for bright "near" stars. */
  glow?: string;
}

function generateStars(
  count: number,
  seed: number,
  options: {
    rMin: number;
    rMax: number;
    opacityMin: number;
    opacityMax: number;
    twinkle?: boolean;
    glow?: string;
  }
): BgStar[] {
  const rand = seededRandom(seed);
  return Array.from({ length: count }, () => ({
    x: (rand() - 0.5) * STAGE_SIZE,
    y: (rand() - 0.5) * STAGE_SIZE,
    r: options.rMin + rand() * (options.rMax - options.rMin),
    opacity:
      options.opacityMin + rand() * (options.opacityMax - options.opacityMin),
    twinkle: options.twinkle ? rand() * 4 : undefined,
    glow: options.glow,
  }));
}

/* ─── Constellation generation ─────────────────────────────────── */

interface Constellation {
  points: { x: number; y: number }[];
}

/**
 * Build N constellations by picking K nearby points within a random
 * "neighborhood" of the canvas. Just enough connection to suggest
 * "this is a star map" without becoming busy line-art.
 */
function generateConstellations(
  count: number,
  pointsPerConstellation: number,
  seed: number
): Constellation[] {
  const rand = seededRandom(seed);
  return Array.from({ length: count }, () => {
    // Pick a neighborhood center, then sprinkle points around it.
    const cx = (rand() - 0.5) * STAGE_SIZE * 0.85;
    const cy = (rand() - 0.5) * STAGE_SIZE * 0.85;
    const points: { x: number; y: number }[] = [];
    for (let i = 0; i < pointsPerConstellation; i++) {
      points.push({
        x: cx + (rand() - 0.5) * 180,
        y: cy + (rand() - 0.5) * 180,
      });
    }
    return { points };
  });
}

/* ─── Planet body (shared by orbital + zoomed) ────────────────── */

function planetGradient(color: string) {
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
            ? `0 0 32px 8px ${color}aa, inset -5px -5px 10px ${darkStop}`
            : `0 0 18px 3px ${color}66, inset -5px -5px 10px ${darkStop}`,
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

/* ─── Premium zoomed planet (unchanged from prior version) ──── */

const NOISE_DATA_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E";

function ZoomedPlanetVisual({ project }: { project: Project }) {
  const { orbit } = project;
  const { color, hasRing, ringColor } = orbit;
  const { background, darkStop } = planetGradient(color);

  return (
    <motion.div
      animate={{ y: [-6, 6, -6] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="relative h-full w-full"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="relative h-full w-full overflow-hidden rounded-full"
        style={{
          background,
          boxShadow: `0 0 60px 12px ${color}88, 0 0 120px 24px ${color}33, inset -8px -8px 16px ${darkStop}`,
        }}
      >
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
  activeProject: Project | null;
  onActivate: (project: Project) => void;
}

export function StellarMap({ activeProject, onActivate }: StellarMapProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const originRectsRef = useRef<Map<string, DOMRect>>(new Map());
  const [activeRect, setActiveRect] = useState<DOMRect | null>(null);

  const isActive = activeProject !== null;
  const maxRing = useMemo(
    () => Math.max(...PROJECTS.map((p) => p.orbit.ring)),
    []
  );

  // Three star layers at increasing brightness → simulates depth.
  // Seeded so SSR-stable and constant across renders.
  const farStars = useMemo(
    () =>
      generateStars(120, 11, {
        rMin: 0.5,
        rMax: 1.1,
        opacityMin: 0.15,
        opacityMax: 0.4,
      }),
    []
  );
  const midStars = useMemo(
    () =>
      generateStars(80, 23, {
        rMin: 0.8,
        rMax: 1.6,
        opacityMin: 0.3,
        opacityMax: 0.6,
        twinkle: true,
      }),
    []
  );
  const nearStars = useMemo(
    () =>
      generateStars(30, 37, {
        rMin: 1.4,
        rMax: 2.4,
        opacityMin: 0.65,
        opacityMax: 0.95,
        twinkle: true,
        glow: "rgba(245, 230, 211, 0.4)",
      }),
    []
  );

  const constellations = useMemo(() => generateConstellations(6, 5, 51), []);

  // Cosmic dust — 12 deterministic positions, animated via inline CSS
  // keyframes with random delays. Drift slow + opacity blink.
  const dust = useMemo(() => {
    const rand = seededRandom(77);
    return Array.from({ length: 12 }, () => ({
      x: (rand() - 0.5) * STAGE_SIZE * 0.9,
      y: (rand() - 0.5) * STAGE_SIZE * 0.9,
      delay: rand() * 12,
      duration: 14 + rand() * 10,
    }));
  }, []);

  const handlePlanetClick = (project: Project, el: HTMLButtonElement) => {
    const rect = el.getBoundingClientRect();
    originRectsRef.current.set(project.id, rect);
    setActiveRect(rect);
    onActivate(project);
  };

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[700px] md:max-w-[900px] lg:max-w-[1100px]"
      style={{ perspective: "1600px" }}
    >
      {/* ═══ GALAXY BACKDROP — flat (no tilt), behind everything ═══ */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox={`${-HALF} ${-HALF} ${STAGE_SIZE} ${STAGE_SIZE}`}
      >
        <defs>
          {/* Galaxy core — warm gold center */}
          <radialGradient id="galaxy-core">
            <stop offset="0%" stopColor="rgba(212,165,116,0.16)" />
            <stop offset="35%" stopColor="rgba(212,165,116,0.05)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          {/* Spiral arm — purple-blue dust lane */}
          <radialGradient id="galaxy-arm-a">
            <stop offset="0%" stopColor="rgba(124,58,237,0.10)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          {/* Spiral arm — magenta wash */}
          <radialGradient id="galaxy-arm-b">
            <stop offset="0%" stopColor="rgba(217,70,239,0.08)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          {/* Subtle glow filter for the brightest near stars + sun */}
          <filter id="star-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Ring glow — slightly blurred for the orbital rings to
              read as luminous instead of hairline. */}
          <filter id="ring-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.8" />
          </filter>
        </defs>

        {/* Galaxy disc — large elongated ellipse rotated for "spiral
            arm" feel. Three offset ellipses at slightly different
            rotations sells the spiral without needing real spirals. */}
        <g style={{ mixBlendMode: "screen" }}>
          <ellipse
            cx="0"
            cy="0"
            rx="540"
            ry="180"
            fill="url(#galaxy-core)"
            transform="rotate(20)"
          />
          <ellipse
            cx="-120"
            cy="60"
            rx="380"
            ry="140"
            fill="url(#galaxy-arm-a)"
            transform="rotate(35)"
          />
          <ellipse
            cx="140"
            cy="-80"
            rx="380"
            ry="120"
            fill="url(#galaxy-arm-b)"
            transform="rotate(-15)"
          />
        </g>

        {/* Constellation lines — thin polylines connecting clusters.
            Drawn before stars so stars sit on top of the line nodes. */}
        <g
          stroke="rgba(212, 165, 116, 0.18)"
          strokeWidth="0.5"
          fill="none"
          strokeDasharray="2 5"
          strokeLinecap="round"
        >
          {constellations.map((c, i) => (
            <polyline
              key={i}
              points={c.points.map((p) => `${p.x},${p.y}`).join(" ")}
            />
          ))}
        </g>

        {/* Far stars — darkest layer */}
        <g>
          {farStars.map((s, i) => (
            <circle
              key={i}
              cx={s.x}
              cy={s.y}
              r={s.r}
              fill="#fafafa"
              opacity={s.opacity}
            />
          ))}
        </g>

        {/* Mid stars — twinkle. Each gets its own animation delay so
            they don't all blink in sync. */}
        <g>
          {midStars.map((s, i) => (
            <circle
              key={i}
              cx={s.x}
              cy={s.y}
              r={s.r}
              fill="#fafafa"
              opacity={s.opacity}
              style={{
                animation: `star-twinkle 4s ease-in-out ${s.twinkle ?? 0}s infinite`,
              }}
            />
          ))}
        </g>

        {/* Near stars — bright, glowy. Filter-blurred for halo. */}
        <g filter="url(#star-glow)">
          {nearStars.map((s, i) => (
            <circle
              key={i}
              cx={s.x}
              cy={s.y}
              r={s.r}
              fill="#fffefb"
              opacity={s.opacity}
              style={{
                animation: `star-twinkle 4s ease-in-out ${s.twinkle ?? 0}s infinite`,
              }}
            />
          ))}
        </g>

        {/* Cosmic dust — small particles drifting. Animation handled
            inline via CSS custom keyframes (dust-drift) below. */}
        <g opacity="0.5">
          {dust.map((d, i) => (
            <circle
              key={i}
              cx={d.x}
              cy={d.y}
              r={0.6}
              fill="#f5e6d3"
              style={{
                animation: `dust-drift ${d.duration}s ease-in-out ${d.delay}s infinite`,
              }}
            />
          ))}
        </g>
      </svg>

      {/* ═══ TILTED STAGE — orbits, sun, planets ═══ */}
      <motion.div
        animate={{ opacity: isActive ? 0.15 : 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute inset-0"
        style={{
          transform: `rotateX(${TILT_DEGREES}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Orbital rings — thicker stroke + ring-glow filter halo */}
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full"
          viewBox={`${-HALF} ${-HALF} ${STAGE_SIZE} ${STAGE_SIZE}`}
        >
          <g filter="url(#ring-glow)">
            {Array.from({ length: maxRing }, (_, i) => i + 1).map((ring) => (
              <circle
                key={ring}
                cx={0}
                cy={0}
                r={getRingRadius(ring)}
                fill="none"
                stroke="rgba(212, 165, 116, 0.32)"
                strokeWidth={0.9}
                strokeDasharray={ring % 2 === 0 ? "3 6" : "2 5"}
              />
            ))}
          </g>
        </svg>

        {/* Central sun + corona rays.
            Layer stack:
              • Outer corona: 8 thin "rays" rotating slowly via SVG
              • Sun body: radial gradient circle with multi-layer box-shadow */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2"
          style={{ width: 0, height: 0 }}
        >
          {/* Corona rays. NOTE the .toFixed(4) on each coordinate:
              Math.sin / Math.cos are NOT bit-exact between V8-on-Node
              (SSR) and V8-on-Chromium (client) for irrational arg
              values like (4/12)·2π — ECMAScript leaves transcendental
              precision implementation-defined. Without rounding,
              React hydration sees y2="-34.64101615137754" from the
              server vs -34.641016151377535 from the client and flags
              a mismatch. 4 decimals = sub-pixel accuracy, plenty for
              SVG, and identical string serialization on both sides. */}
          <svg
            aria-hidden
            className="absolute"
            width="180"
            height="180"
            viewBox="-90 -90 180 180"
            style={{
              left: "-90px",
              top: "-90px",
              animation: "sun-corona-rotate 60s linear infinite",
            }}
          >
            <g stroke="rgba(212, 165, 116, 0.35)" strokeLinecap="round">
              {Array.from({ length: 12 }, (_, i) => {
                const a = (i / 12) * Math.PI * 2;
                const r1 = 22;
                const r2 = i % 2 === 0 ? 40 : 32;
                const cosA = Math.cos(a);
                const sinA = Math.sin(a);
                return (
                  <line
                    key={i}
                    x1={(cosA * r1).toFixed(4)}
                    y1={(sinA * r1).toFixed(4)}
                    x2={(cosA * r2).toFixed(4)}
                    y2={(sinA * r2).toFixed(4)}
                    strokeWidth={i % 2 === 0 ? 1.4 : 0.8}
                  />
                );
              })}
            </g>
          </svg>

          {/* Sun body */}
          <div
            style={{
              position: "absolute",
              width: 22,
              height: 22,
              top: -11,
              left: -11,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, #fff5d4 0%, #ffe8b0 40%, #d4a574 75%, #8e6e48 100%)",
              boxShadow:
                "0 0 30px 6px rgba(212, 165, 116, 0.7), 0 0 60px 12px rgba(212, 165, 116, 0.4), 0 0 100px 24px rgba(212, 165, 116, 0.18)",
              animation: "sun-pulse 4s ease-in-out infinite",
            }}
          />
        </div>

        {/* Planets */}
        {PROJECTS.map((project) => {
          const { ring, startAngle, size } = project.orbit;
          const radius = getRingRadius(ring);
          const speed = getRingSpeedSeconds(ring);
          const isHovered = hoveredId === project.id;
          const isThisActive = activeProject?.id === project.id;
          const pauseOrbit = isActive || isHovered;
          const animationPlayState = pauseOrbit
            ? "paused"
            : ("running" as const);

          return (
            // Outer wrapper: static rotate to put the planet's orbit
            // starting position. Inner: animated rotate around center.
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
                  animationPlayState,
                }}
              >
                {/* Planet button — at orbital radius, counter-tilted to
                    face camera. */}
                <motion.button
                  type="button"
                  aria-label={`${project.designation} — ${project.name}`}
                  animate={{ opacity: isThisActive ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) =>
                    handlePlanetClick(project, e.currentTarget)
                  }
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(project.id)}
                  onBlur={() => setHoveredId(null)}
                  className="group absolute flex cursor-pointer items-center justify-center border-0 bg-transparent p-0"
                  style={{
                    transform: `translate(${radius}px, -50%) rotateX(-${TILT_DEGREES}deg)`,
                  }}
                >
                  <PlanetVisual project={project} hovered={isHovered} />
                </motion.button>

                {/* Label — separate from the button so the counter-
                    rotation chain doesn't fight the planet's transform.
                    Positioned at the same orbital radius.
                    Chain: outer translates to orbit position, middle
                    statically counter-rotates by -startAngle, inner
                    animates counter-rotation 0 → -360 over the same
                    period as the orbit. Net: label stays horizontal
                    in screen space. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute"
                  style={{
                    left: 0,
                    top: 0,
                    transform: `translate(${radius}px, ${size / 2 + 18}px)`,
                  }}
                >
                  <div style={{ rotate: `${-startAngle}deg` }}>
                    <div
                      style={{
                        animation: `orbit-counter-rotation ${speed}s linear infinite`,
                        animationPlayState,
                      }}
                    >
                      <div
                        style={{
                          // Counter the 25° X-tilt so the label sits
                          // upright in screen space (not in the tilted
                          // orbital plane).
                          transform: `rotateX(-${TILT_DEGREES}deg) translateX(-50%)`,
                        }}
                        className={`whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.25em] transition-all duration-300 ${
                          isHovered
                            ? "text-saturn-cream tracking-[0.32em]"
                            : "text-saturn-cream/55"
                        }`}
                      >
                        {project.name.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* ═══ ZOOM OVERLAY ═══ */}
      <AnimatePresence onExitComplete={() => setActiveRect(null)}>
        {activeProject && activeRect && (
          <motion.div
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

      {/* ═══ KEYFRAMES ═══ */}
      <style>{`
        @keyframes orbit-rotation {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes orbit-counter-rotation {
          from { rotate: 0deg; }
          to   { rotate: -360deg; }
        }
        @keyframes sun-pulse {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.10); }
        }
        @keyframes sun-corona-rotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes star-twinkle {
          0%, 100% { opacity: var(--star-base, 1); }
          50%      { opacity: 0.25; }
        }
        @keyframes dust-drift {
          0%, 100% { transform: translate(0, 0); opacity: 0.3; }
          25%      { opacity: 0.6; }
          50%      { transform: translate(12px, -8px); opacity: 0.2; }
          75%      { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
