"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  PROJECTS,
  getRingRadius,
  type Project,
} from "@/lib/projects";

/*
 * STELLAR MAP — static cinematic constellation, no orbital rotation.
 *
 * Previous version had planets continuously rotating around the sun.
 * User feedback: felt childish + the rotating labels needed counter-
 * rotation tricks to stay readable. Replaced with a static
 * arrangement that derives its 3D feel from three composable sources:
 *
 *   1. CSS perspective + rotateX(25°) tilts the orbital plane (the
 *      orbital rings become elliptical without any trig).
 *   2. Mouse parallax: planets shift opposite-to-cursor proportional
 *      to their ring number — outer rings shift more than inner, so
 *      the whole scene reads as depth-layered.
 *   3. Per-planet float: each body gently bobs ±5px on Y with its
 *      own period (5-8s) and random phase, so nothing feels frozen.
 *
 * The galaxy + stars + constellations that used to live here have
 * been promoted to <SiteStarfield /> (mounted globally), so this
 * component now only renders the interactive solar-system layer.
 */

const TILT_DEGREES = 25;
const STAGE_SIZE = 900; // SVG userspace; ~half of the rendered px width
const HALF = STAGE_SIZE / 2;
const ZOOM_SCALE = 2.8;

/* ─── Planet body (orbital + zoomed share gradient math) ──────── */

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

/* ─── Zoomed planet (premium spotlight) — unchanged ───────────── */

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

/* ─── Single static planet with parallax + float ──────────────── */

interface StaticPlanetProps {
  project: Project;
  hovered: boolean;
  active: boolean;
  isThisActive: boolean;
  onPointerOver: () => void;
  onPointerOut: () => void;
  onPointerFocus: () => void;
  onPointerBlur: () => void;
  onClick: (el: HTMLButtonElement) => void;
  /** Phase offset for the float animation in seconds. */
  floatPhase: number;
}

function StaticPlanet({
  project,
  hovered,
  active,
  isThisActive,
  onPointerOver,
  onPointerOut,
  onPointerFocus,
  onPointerBlur,
  onClick,
  floatPhase,
}: StaticPlanetProps) {
  const { ring, startAngle, size } = project.orbit;
  const radius = getRingRadius(ring);

  // Static screen-space position from polar coords. .toFixed(3)
  // rounding here matters: SSR (Node V8) and client (Chromium V8)
  // can differ by 1 ULP on Math.cos/sin for irrational args, which
  // React hydration would flag as an attribute mismatch on the
  // translate() string. 3 decimals = sub-pixel and identical
  // string serialization on both sides.
  const rad = (startAngle * Math.PI) / 180;
  const x0 = (Math.cos(rad) * radius).toFixed(3);
  const y0 = (Math.sin(rad) * radius).toFixed(3);

  // Per-planet float — varied duration so adjacent planets don't
  // bob in sync. ±5px Y at 5.5-7.9s per cycle is slow enough that
  // click targeting isn't affected (max ~1.5px drift per frame at
  // 60fps vs a 50-90px hit area). Phase offset via negative
  // animationDelay so the animation starts mid-cycle, avoiding a
  // synced kickoff on mount.
  const floatDuration = 5.5 + ring * 0.8;

  // Hit zone diameter: 1.9× the planet visual. Comfortable click
  // target around the visible body without catching neighbouring
  // planets. (Previous 1.6× was tight on the smaller outer-ring
  // planets — Luxor 36px → 58px hit area was harder to land on
  // than expected, especially with the perspective + float.)
  const hitSize = Math.round(size * 1.9);

  return (
    <div
      // Each planet wrapper sits in its own stacking context with a
      // bumped z-index so hit-testing always finds the planet button
      // even when adjacent elements share the 3D scene. Without this,
      // preserve-3d on the parent stage occasionally lets a
      // back-of-plane element intercept clicks meant for a front-of-
      // plane planet (Phoenix and Luxor were the casualties — both
      // at positive-Y in the orbital plane, behind the depth-sorted
      // siblings in the 3D scene).
      className="absolute left-1/2 top-1/2 z-10"
      style={{ width: 0, height: 0 }}
    >
      {/* Outer position: static polar coords. */}
      <div
        style={{
          position: "absolute",
          transform: `translate(${x0}px, ${y0}px)`,
        }}
      >
        {/* Float bob — its own keyframe so the parallax above and the
            float here compose without fighting for the same property. */}
        <div
          style={{
            animation: `planet-float ${floatDuration}s ease-in-out infinite`,
            animationDelay: `-${floatPhase}s`,
            animationPlayState: active ? "paused" : "running",
          }}
        >
          {/* Counter-tilts the X-rotation of the parent stage so the
              planet body reads as facing the camera. Wraps both the
              button (hit zone + visible body) and the static label
              sibling so they tilt together. */}
          <div
            style={{
              transform: `translate(-50%, -50%) rotateX(-${TILT_DEGREES}deg)`,
              width: hitSize,
              height: hitSize,
              position: "relative",
            }}
          >
            {/* Click target — fills the hit zone. Transparent except
                for a faint hover ring that gives the user feedback on
                what's clickable. Sized to the hit zone, not the planet
                visual, so clicks near the planet edge still register. */}
            <motion.button
              type="button"
              aria-label={`${project.designation} — ${project.name}`}
              animate={{ opacity: isThisActive ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => onClick(e.currentTarget)}
              onMouseEnter={onPointerOver}
              onMouseLeave={onPointerOut}
              onFocus={onPointerFocus}
              onBlur={onPointerBlur}
              className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0"
            >
              {/* Hover ripple — a soft expanding ring outward from the
                  planet on hover. Pure visual feedback. */}
              {hovered && (
                <motion.span
                  key="ripple"
                  aria-hidden
                  initial={{ scale: 1, opacity: 0.45 }}
                  animate={{ scale: 1.55, opacity: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="absolute rounded-full border border-saturn-cream"
                  style={{ width: size, height: size }}
                />
              )}

              {/* Planet body with a subtle scale-up on hover for
                  tactile feedback. */}
              <motion.div
                animate={{ scale: hovered ? 1.12 : 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <PlanetVisual project={project} hovered={hovered} />
              </motion.div>
            </motion.button>
          </div>

          {/* Label — sibling of the hit-zone wrapper (so it doesn't
              expand the click target sideways) but a CHILD of the
              counter-tilted div (so it inherits the upright screen
              orientation, no double tilt needed).
              `left-1/2 top: 100%` puts the anchor at the bottom-
              centre of the hit-zone; translate(-50%) of the label's
              own width then centres the label horizontally on that
              anchor. Previous version had left:0 which anchored
              the label on the hit-zone's LEFT EDGE — labels were
              rendered halfway under the planet shifted left by
              hitSize/2, which made the planet's body look offset
              from its label and made the click feel like the
              planet wasn't where it appeared. */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2"
            style={{
              top: "100%",
              transform: `translate(-50%, 6px)`,
            }}
          >
            <div
              className={`whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.25em] transition-all duration-300 ${
                hovered
                  ? "tracking-[0.32em] text-saturn-cream"
                  : "text-saturn-cream/55"
              }`}
            >
              {project.name.toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </div>
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

  // Mouse parallax removed — even at small magnitudes, planets
  // drifting under the cursor was breaking click precision. Planets
  // now stay put; only the per-planet float (independent of cursor)
  // gives the scene gentle motion. Depth still reads via the 25°
  // stage tilt and the per-ring radial spacing.

  // Random-but-stable float phases. Deterministic from project.id
  // length so SSR matches client. Spread across 0..floatDuration
  // so adjacent planets don't kickoff in sync.
  const floatPhases = useMemo(() => {
    const map = new Map<string, number>();
    PROJECTS.forEach((p, i) => map.set(p.id, (i * 1.7) % 6));
    return map;
  }, []);

  const handlePlanetClick = (project: Project, el: HTMLButtonElement) => {
    const rect = el.getBoundingClientRect();
    originRectsRef.current.set(project.id, rect);
    setActiveRect(rect);
    onActivate(project);
  };

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[600px] md:max-w-[700px] lg:max-w-[800px]"
      style={{ perspective: "1400px" }}
    >
      {/* Tilted stage — orbits, sun, planets all live in this 25°
          rotated frame. Fades to 0.15 when a project is active so
          the zoom overlay owns the focus. */}
      <motion.div
        animate={{ opacity: isActive ? 0.15 : 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute inset-0"
        style={{
          transform: `rotateX(${TILT_DEGREES}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Orbital rings — static dashed circles. No glow filter
            here since the SiteStarfield already provides ambient
            luminosity behind them. */}
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full"
          viewBox={`${-HALF} ${-HALF} ${STAGE_SIZE} ${STAGE_SIZE}`}
        >
          {Array.from({ length: maxRing }, (_, i) => i + 1).map((ring) => (
            <circle
              key={ring}
              cx={0}
              cy={0}
              r={getRingRadius(ring)}
              fill="none"
              stroke="rgba(212, 165, 116, 0.28)"
              strokeWidth={0.8}
              strokeDasharray={ring % 2 === 0 ? "3 6" : "2 5"}
            />
          ))}
        </svg>

        {/* Central sun + corona rays.
            See prior commit for the .toFixed(4) hydration-mismatch
            fix on the ray coordinates. */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2"
          style={{ width: 0, height: 0 }}
        >
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

        {/* Planets — fully static positions + gentle per-planet float */}
        {PROJECTS.map((project) => (
          <StaticPlanet
            key={project.id}
            project={project}
            hovered={hoveredId === project.id}
            active={isActive}
            isThisActive={activeProject?.id === project.id}
            floatPhase={floatPhases.get(project.id) ?? 0}
            onPointerOver={() => setHoveredId(project.id)}
            onPointerOut={() => setHoveredId(null)}
            onPointerFocus={() => setHoveredId(project.id)}
            onPointerBlur={() => setHoveredId(null)}
            onClick={(el) => handlePlanetClick(project, el)}
          />
        ))}
      </motion.div>

      {/* ═══ ZOOM OVERLAY (unchanged) ═══ */}
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

      <style>{`
        @keyframes sun-pulse {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.10); }
        }
        @keyframes sun-corona-rotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes planet-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}
