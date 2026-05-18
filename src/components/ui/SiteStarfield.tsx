"use client";

import { useMemo } from "react";

/*
 * SITE-WIDE STARFIELD — fixed full-bleed cosmic backdrop.
 *
 * Lives behind every section (except the Hero, which has its own
 * video covering it). Gives the rest of the site a consistent
 * "you are in space" backdrop instead of each section having its
 * own gradient.
 *
 * Composition (back → front):
 *   1. Galaxy spiral — 3 overlapping rotated radial gradients
 *   2. Constellation lines — 8 dashed clusters
 *   3. Far stars  (180, tiny, 15-40% opacity, static)
 *   4. Mid stars  (110, small, 30-60% opacity, static)
 *   5. Near stars (45, bright, 65-95% opacity, soft twinkle + glow)
 *
 * Perf budget: pure SVG. ~340 elements total, but they only ever
 * paint once because the layer is fixed and the browser composites
 * it as a separate GPU layer — scrolling doesn't repaint.
 * The only animation is the twinkle on the brightest 45 stars; opacity
 * keyframes on SVG circles are basically free.
 *
 * viewBox 1920x1080 with `preserveAspectRatio="xMidYMid slice"` so the
 * SVG scales to fill any aspect ratio without distortion (it crops
 * at the edges, which is invisible for a starfield).
 */

const VIEWBOX_WIDTH = 1920;
const VIEWBOX_HEIGHT = 1080;
const HALF_W = VIEWBOX_WIDTH / 2;
const HALF_H = VIEWBOX_HEIGHT / 2;

/* ─── Deterministic PRNG ──────────────────────────────────────── */

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/* ─── Stars + constellations generation ───────────────────────── */

interface BgStar {
  x: number;
  y: number;
  r: number;
  opacity: number;
  twinkleDelay?: number;
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
  }
): BgStar[] {
  const rand = seededRandom(seed);
  return Array.from({ length: count }, () => ({
    x: (rand() - 0.5) * VIEWBOX_WIDTH,
    y: (rand() - 0.5) * VIEWBOX_HEIGHT,
    r: options.rMin + rand() * (options.rMax - options.rMin),
    opacity:
      options.opacityMin + rand() * (options.opacityMax - options.opacityMin),
    twinkleDelay: options.twinkle ? rand() * 6 : undefined,
  }));
}

interface Constellation {
  points: { x: number; y: number }[];
}

function generateConstellations(
  count: number,
  pointsPerConstellation: number,
  seed: number
): Constellation[] {
  const rand = seededRandom(seed);
  return Array.from({ length: count }, () => {
    const cx = (rand() - 0.5) * VIEWBOX_WIDTH * 0.9;
    const cy = (rand() - 0.5) * VIEWBOX_HEIGHT * 0.9;
    const points: { x: number; y: number }[] = [];
    for (let i = 0; i < pointsPerConstellation; i++) {
      points.push({
        x: cx + (rand() - 0.5) * 220,
        y: cy + (rand() - 0.5) * 220,
      });
    }
    return { points };
  });
}

/* ─── Component ───────────────────────────────────────────────── */

export function SiteStarfield() {
  const farStars = useMemo(
    () =>
      generateStars(180, 11, {
        rMin: 0.6,
        rMax: 1.2,
        opacityMin: 0.15,
        opacityMax: 0.4,
      }),
    []
  );
  const midStars = useMemo(
    () =>
      generateStars(110, 23, {
        rMin: 0.9,
        rMax: 1.7,
        opacityMin: 0.3,
        opacityMax: 0.6,
      }),
    []
  );
  const nearStars = useMemo(
    () =>
      generateStars(45, 37, {
        rMin: 1.5,
        rMax: 2.6,
        opacityMin: 0.65,
        opacityMax: 0.95,
        twinkle: true,
      }),
    []
  );
  const constellations = useMemo(() => generateConstellations(8, 5, 51), []);

  return (
    <div
      aria-hidden
      // z-0 places this above the body bg but below any positioned
      // child that sits in normal flow. As long as sections don't
      // set their OWN backgrounds, the starfield shows through.
      className="pointer-events-none fixed inset-0 z-0"
    >
      <svg
        className="h-full w-full"
        viewBox={`${-HALF_W} ${-HALF_H} ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="site-galaxy-core">
            <stop offset="0%" stopColor="rgba(212,165,116,0.18)" />
            <stop offset="40%" stopColor="rgba(212,165,116,0.05)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="site-galaxy-arm-a">
            <stop offset="0%" stopColor="rgba(124,58,237,0.10)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="site-galaxy-arm-b">
            <stop offset="0%" stopColor="rgba(217,70,239,0.08)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter
            id="site-star-glow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="1.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Galaxy — 3 overlapping rotated ellipses, screen-blended
            so they ADD light to the dark backdrop instead of darkening. */}
        <g style={{ mixBlendMode: "screen" }}>
          <ellipse
            cx="0"
            cy="0"
            rx="720"
            ry="240"
            fill="url(#site-galaxy-core)"
            transform="rotate(18)"
          />
          <ellipse
            cx="-200"
            cy="100"
            rx="520"
            ry="200"
            fill="url(#site-galaxy-arm-a)"
            transform="rotate(35)"
          />
          <ellipse
            cx="220"
            cy="-120"
            rx="500"
            ry="170"
            fill="url(#site-galaxy-arm-b)"
            transform="rotate(-15)"
          />
        </g>

        {/* Constellation lines — drawn before stars so the star
            nodes paint on top of the line endpoints. */}
        <g
          stroke="rgba(212, 165, 116, 0.15)"
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

        {/* Far stars — darkest layer, no animation */}
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

        {/* Mid stars — middle brightness, no animation */}
        <g>
          {midStars.map((s, i) => (
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

        {/* Near stars — brightest, glow filter + subtle twinkle. The
            twinkle is the only running animation in this layer; it's
            cheap (opacity-only) and the staggered delays keep the
            field looking alive without a synchronized blink. */}
        <g filter="url(#site-star-glow)">
          {nearStars.map((s, i) => (
            <circle
              key={i}
              cx={s.x}
              cy={s.y}
              r={s.r}
              fill="#fffefb"
              opacity={s.opacity}
              style={{
                animation: `star-twinkle 6s ease-in-out ${s.twinkleDelay ?? 0}s infinite`,
              }}
            />
          ))}
        </g>
      </svg>

      <style>{`
        @keyframes star-twinkle {
          0%, 100% { opacity: var(--base, 1); }
          50%      { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}
