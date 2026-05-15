"use client";

import { motion, type Variants } from "framer-motion";

/*
 * Timing budget — exported so the Hero can sequence the rest of the
 * overlay copy to land after the logo is "painted in".
 *
 *   t=0.00 -> glyph 1 (left D) starts revealing
 *   t=0.15 -> glyph 2 (V) starts revealing
 *   t=0.30 -> glyph 3 (right D) starts revealing
 *   t=2.10 -> all glyphs done; vertical ticks bounce in
 *   t≈2.65 -> entire logo intro finished
 */
export const GLYPH_REVEAL_DURATION = 1.8;
export const GLYPH_STAGGER = 0.15;
const TICK_DELAY = GLYPH_STAGGER * 2 + GLYPH_REVEAL_DURATION;
const TICK_DURATION = 0.55;
export const DVD_LOGO_TOTAL_DURATION = TICK_DELAY + TICK_DURATION;

/*
 * Inlined SVG path data, sourced from public/dvd-logo.svg. We keep
 * the original potrace transform `translate(0,731) scale(0.1,-0.1)`
 * untouched on the outer <g>, and split the paths into two groups:
 *
 *   • mainGlyphs  — the three D/V/D shapes (revealed by clipPath sweep)
 *   • verticalTicks — the small accents (spring-bounced in after)
 *
 * The mapping below was derived from each path's starting M-coordinate
 * (smaller x = leftmost glyph) so the stagger flows left → right.
 */
const mainGlyphs = [
  // LEFT D (path originally starting at "M0 6665 ...")
  "M0 6665 c0 -18 5 -25 20 -25 32 0 277 -84 378 -130 311 -140 580 -353 878 -695 130 -150 357 -493 492 -745 159 -297 440 -1030 552 -1440 18 -63 38 -135 45 -160 59 -196 176 -775 229 -1135 90 -606 134 -1122 143 -1692 l6 -373 22 0 c27 0 27 -2 55 287 39 406 114 835 214 1223 108 419 240 784 415 1145 348 718 791 1284 1319 1682 117 88 297 197 374 224 42 16 58 27 58 40 0 22 8 21 -140 9 -134 -11 -466 2 -647 25 -276 36 -628 104 -963 186 -250 62 -454 125 -825 259 -83 29 -319 127 -453 187 -236 106 -334 163 -542 317 -52 38 -205 144 -340 234 -135 91 -263 179 -285 196 -92 72 -203 163 -240 197 -22 21 -63 56 -91 78 -29 23 -54 48 -58 56 -9 24 -36 18 -36 -8 0 -26 66 -93 215 -218 149 -125 229 -183 525 -379 150 -100 250 -169 260 -180 13 -14 183 -131 250 -173 79 -49 295 -155 420 -207 472 -196 830 -317 1192 -405 641 -154 1040 -214 1511 -225 27 0 -9 -35 -103 -98 -227 -152 -502 -398 -695 -622 -26 -30 -57 -66 -69 -80 -324 -378 -673 -985 -879 -1530 -136 -361 -247 -749 -323 -1129 -32 -162 -74 -414 -74 -447 0 -8 -7 -14 -15 -14 -10 0 -15 10 -15 28 -1 60 -30 477 -45 632 -54 574 -129 1059 -255 1640 -49 230 -156 601 -250 874 -47 136 -185 506 -205 551 -8 17 -33 75 -56 130 -46 112 -200 423 -246 500 -211 352 -371 563 -608 801 -313 315 -646 516 -1020 615 -90 24 -95 24 -95 -6z",
  // CENTER V (originally "M4230 7037 ...")
  "M4230 7037 c-20 -7 -36 -20 -38 -31 -4 -17 1 -17 50 -10 226 35 593 -65 853 -234 197 -127 398 -331 547 -558 403 -608 697 -1477 862 -2539 91 -586 132 -1006 206 -2090 30 -439 28 -425 56 -425 43 0 56 88 79 530 4 63 15 205 26 314 70 718 211 1275 483 1908 318 743 801 1419 1405 1965 298 270 645 508 811 558 125 37 190 70 190 94 0 17 -6 21 -35 21 -37 0 -129 -32 -210 -72 -91 -46 -406 -112 -680 -142 -462 -52 -1007 -52 -1465 0 -326 37 -874 146 -1255 251 -217 59 -516 160 -745 251 -108 43 -357 129 -413 143 -26 6 -50 15 -53 20 -3 5 -14 9 -25 9 -14 0 -19 -7 -19 -25 0 -29 -6 -30 -57 -10 -178 68 -475 105 -573 72z m855 -155 c44 -17 143 -53 220 -82 574 -212 795 -278 1280 -385 614 -134 926 -170 1485 -170 455 0 754 21 1060 75 137 24 130 23 130 6 0 -7 -24 -29 -52 -48 -329 -219 -764 -623 -1053 -979 -72 -88 -101 -126 -175 -224 -429 -571 -774 -1290 -970 -2022 -114 -424 -183 -858 -211 -1326 -10 -157 -16 -207 -26 -207 -7 0 -13 2 -13 4 0 3 -9 146 -20 318 -78 1205 -205 2121 -391 2811 -197 734 -439 1282 -753 1707 -139 188 -378 402 -553 496 -40 22 -73 45 -73 53 0 15 1 15 115 -27z",
  // RIGHT D (originally "M13665 7217 ...")
  "M13665 7217 c-129 -91 -158 -112 -365 -271 -230 -176 -685 -556 -1145 -956 -541 -471 -845 -711 -1215 -957 -415 -276 -944 -516 -1350 -612 -294 -70 -518 -91 -704 -67 -63 8 -68 8 -65 -9 2 -10 15 -22 29 -26 121 -35 195 -65 395 -163 198 -98 290 -148 458 -251 18 -10 73 -48 122 -84 394 -285 825 -707 1180 -1156 22 -27 42 -52 45 -55 9 -8 222 -291 260 -346 308 -449 457 -691 702 -1144 20 -36 50 -118 67 -185 83 -312 214 -595 276 -595 35 0 58 33 50 72 -11 54 -90 228 -206 458 -107 213 -109 216 -133 350 -73 399 -96 658 -103 1128 -12 850 84 1609 296 2317 64 216 81 265 181 525 211 547 522 1058 843 1381 179 180 355 324 524 429 180 111 258 166 261 183 5 28 -17 21 -123 -39 -438 -246 -841 -630 -1104 -1049 -24 -38 -54 -86 -67 -105 -53 -84 -120 -210 -204 -384 -566 -1167 -784 -2705 -590 -4156 11 -80 20 -146 20 -147 0 -2 -6 -3 -13 -3 -11 0 -81 109 -155 242 -63 112 -267 431 -395 618 -321 467 -727 950 -1052 1253 -404 377 -718 594 -1147 797 -83 39 -117 60 -117 73 -1 13 8 17 42 17 83 0 322 45 532 99 207 54 464 157 771 309 352 175 628 358 1129 750 70 54 437 366 600 508 61 53 193 166 295 252 102 86 206 174 231 196 25 23 81 70 124 106 44 36 91 75 105 87 23 21 201 163 296 238 22 17 104 79 184 138 80 60 165 125 189 145 24 20 56 44 70 52 59 33 151 105 151 117 0 31 -53 6 -175 -80z m-1382 -6629 c41 -93 43 -98 23 -98 -7 0 -27 29 -45 65 -40 84 -48 115 -29 115 8 0 30 -36 51 -82z",
];

const verticalTicks = [
  // Left-side accent (originally "M2910 4548 ...")
  "M2910 4548 c0 -69 37 -271 60 -332 12 -33 40 -35 40 -2 0 28 -46 296 -58 341 -5 17 -16 31 -25 33 -14 3 -17 -5 -17 -40z",
  // Center accent (originally "M7099 5529 ...")
  "M7099 5529 c-12 -24 -7 -475 6 -516 4 -13 14 -23 21 -23 12 0 14 48 14 280 0 239 -2 280 -15 280 -8 0 -19 -10 -26 -21z",
  // Right-side accent (originally "M11194 4368 ...")
  "M11194 4368 c0 -46 -4 -134 -8 -195 -8 -97 -7 -113 6 -113 16 0 29 57 49 225 14 112 6 158 -27 163 -19 3 -20 -3 -20 -80z",
];

// Cubic ease-out — the "paint stroke" feels right when it decelerates
// into its final position rather than easing in.
const PAINT_EASE = [0.33, 1, 0.68, 1] as const;

const glyphVariants: Variants = {
  hidden: { clipPath: "inset(0% 100% 0% 0%)" },
  visible: (i: number) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: GLYPH_REVEAL_DURATION,
      delay: i * GLYPH_STAGGER,
      ease: PAINT_EASE,
    },
  }),
};

const tickVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: TICK_DELAY + i * 0.07,
      duration: TICK_DURATION,
      // Stiff/under-damped spring -> "pop" with a small overshoot.
      type: "spring",
      stiffness: 480,
      damping: 14,
      mass: 0.7,
    },
  }),
};

export interface DvdLogoProps {
  className?: string;
  /**
   * Optional solid fill override. If omitted, the cosmic violet→
   * magenta gradient is applied with a soft purple glow — that's
   * the default brand look. Pass a color (e.g. for favicons or
   * one-off contexts) to disable the gradient and skip the filter.
   */
  color?: string;
}

// Cosmic gradient stops — violet (top-left) → magenta-fuchsia (middle)
// → soft lavender (bottom-right). Picks up the deep-space + nebula
// vibe the rest of the scene leans into, and pops hard against the
// warm-gold Saturn video underneath (complementary colors on the
// wheel = maximum contrast without fighting the brand palette).
const COSMIC_STOPS = [
  { offset: "0%", color: "#7c3aed" }, // violet-600
  { offset: "45%", color: "#d946ef" }, // fuchsia-500
  { offset: "100%", color: "#a78bfa" }, // violet-400 (lighter tail)
] as const;

// Stable id — only one DvdLogo renders on the page at a time, but
// pulling it out as a constant makes the SSR ↔ client hydration
// deterministic (no useId churn).
const GRADIENT_ID = "dvd-cosmic-gradient";

/**
 * Inline DVD logo with a "painted-on" reveal. The outer SVG <g>
 * keeps the original potrace transform (do not modify) — we only
 * decorate the child <path> elements with motion variants.
 *
 * Reveal uses CSS `clip-path: inset()` on each glyph's wrapping <g>.
 * Each <g>'s `inset()` is interpolated against its OWN bounding box,
 * so each glyph is wiped left-to-right within its own footprint —
 * giving a real "graffiti per letter" feel instead of one global wipe.
 *
 * Fill: cosmic gradient by default. The `<linearGradient>` uses
 * `gradientUnits="userSpaceOnUse"` so it spans the full viewBox
 * once (across all 3 glyphs) instead of repeating per-path bbox.
 */
export function DvdLogo({ className, color }: DvdLogoProps) {
  const useGradient = color === undefined;
  const fill = useGradient ? `url(#${GRADIENT_ID})` : color;

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1407 704"
      className={className}
      fill={fill}
      initial="hidden"
      animate="visible"
      role="img"
      aria-label="dvd"
      style={
        useGradient
          ? {
              // Purple aurora glow — sits behind the painted glyphs, so
              // it expands with them rather than appearing pre-baked.
              // Two soft drop-shadows layered: a tight inner that hugs
              // the silhouette + a wider halo for the spatial feel.
              filter:
                "drop-shadow(0 0 12px rgba(168, 85, 247, 0.55)) drop-shadow(0 0 28px rgba(217, 70, 239, 0.35))",
            }
          : undefined
      }
    >
      {useGradient && (
        <defs>
          <linearGradient
            id={GRADIENT_ID}
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="1407"
            y2="704"
          >
            {COSMIC_STOPS.map((stop) => (
              <stop
                key={stop.offset}
                offset={stop.offset}
                stopColor={stop.color}
              />
            ))}
          </linearGradient>
        </defs>
      )}

      <g transform="translate(0,731) scale(0.1,-0.1)">
        {mainGlyphs.map((d, i) => (
          // Each glyph gets its own motion.g so clip-path inset() is
          // computed relative to that glyph's bbox, not the whole SVG.
          <motion.g
            key={`glyph-${i}`}
            custom={i}
            variants={glyphVariants}
            style={{
              // fill-box anchors inset() to the path's geometry, which is
              // what we want for per-glyph reveal. Without this, Safari
              // can default to the SVG viewport box and break the wipe.
              clipRule: "evenodd",
            }}
          >
            <path d={d} />
          </motion.g>
        ))}

        {verticalTicks.map((d, i) => (
          <motion.path
            key={`tick-${i}`}
            d={d}
            custom={i}
            variants={tickVariants}
            // Anchor scale to each tick's own center, not the SVG origin.
            style={{
              transformBox: "fill-box",
              transformOrigin: "center",
            }}
          />
        ))}
      </g>
    </motion.svg>
  );
}
