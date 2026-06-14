/**
 * Portfolio project registry. Each entry binds project metadata to an
 * orbital position on the StellarMap (SVG + CSS). Pivoted from 3D
 * WebGL planets because (a) 6 textures = ~5MB GPU + flaky crashes on
 * mid-tier hardware, (b) adding a project required manual 3D
 * positioning, (c) browser GPU resource limits cap us at small N.
 *
 * Adding a project now: push to PROJECTS with a `ring` + `startAngle`
 * pair. Done — the StellarMap renders it on the correct orbit
 * automatically and rotation speed comes from getRingSpeedSeconds().
 */

export type ProjectStatus = "live" | "case-study";

export interface OrbitConfig {
  /** 1, 2, 3, ... — orbital ring (1 = innermost, closer to the sun). */
  ring: number;
  /** Initial angle on the ring in degrees, 0–360. */
  startAngle: number;
  /** Planet color hex — drives the atmosphere glow + accent. */
  color: string;
  /** Visual diameter in px. */
  size: number;
  /** Path to the planet texture (equirectangular projection from
   *  Solar System Scope, resized to 512px max for mobile-friendly
   *  payload). Rendered as background-image with a sphere-shading
   *  gradient overlay on top to fake the 3D look. */
  texture: string;
  /** Optional Saturn-style ring decoration. */
  hasRing?: boolean;
  ringColor?: string;
}

export interface Project {
  id: string;
  designation: string;
  name: string;
  status: ProjectStatus;
  url?: string;
  techStack: string[];
  orbit: OrbitConfig;
  /** Path to a web-optimized screenshot rendered in the telemetry
   *  panel. Optional — projects without a screenshot just show the
   *  planet + telemetry without the preview tile. */
  screenshot?: string;
  /** Ordered set of project images for the Selected Work scroll
   *  showcase (each variant arranges them differently). Falls back to
   *  the single `screenshot` when absent. */
  screenshots?: string[];
  /** Position in the Selected Work showcase (1-based). Drives the
   *  sticky 01…07 index + block order; unset → excluded from it. */
  featureOrder?: number;
}

export const PROJECTS: Project[] = [
  {
    id: "upward",
    designation: "PROJ-001 // UPWARD",
    name: "Upward Media",
    status: "live",
    url: "https://upwardbr.com",
    techStack: ["Next.js", "Tailwind", "i18n PT/EN", "Dynamic Routes"],
    screenshot: "/screenshots/upward.webp",
    featureOrder: 2,
    screenshots: ["/screenshots/upward/01.webp", "/screenshots/upward/02.webp"],
    orbit: {
      ring: 1,
      startAngle: 0,
      color: "#d4a574",
      size: 56,
      texture: "/textures/planet_jupiter.jpg",
    },
  },
  {
    id: "smartfloors",
    designation: "PROJ-002 // SMART HARDWOOD FLOORS",
    name: "Smart Hardwood Floors",
    status: "live",
    url: "https://smartfloorservices.com",
    techStack: ["Next.js", "i18n EN/ES", "Image Optim"],
    screenshot: "/screenshots/smartfloors.webp",
    featureOrder: 7,
    screenshots: [
      "/screenshots/smartfloors/01.webp",
      "/screenshots/smartfloors/02.webp",
      "/screenshots/smartfloors/03.webp",
      "/screenshots/smartfloors/04.webp",
    ],
    orbit: {
      ring: 1,
      startAngle: 180,
      color: "#c4623a",
      size: 52,
      texture: "/textures/planet_mars.jpg",
    },
  },
  {
    id: "phoenix",
    designation: "PROJ-003 // PHOENIX",
    name: "Phoenix",
    status: "live",
    url: "/phoenix",
    techStack: ["HTML", "CSS", "Vanilla JS", "i18n", "Dual Theme"],
    screenshot: "/screenshots/phoenix.webp",
    featureOrder: 3,
    screenshots: [
      "/screenshots/phoenix/01.webp",
      "/screenshots/phoenix/02.webp",
      "/screenshots/phoenix/03.webp",
      "/screenshots/phoenix/04.webp",
    ],
    orbit: {
      ring: 2,
      startAngle: 60,
      color: "#7c3aed",
      size: 46,
      texture: "/textures/planet_uranus.jpg",
      hasRing: true,
      ringColor: "#7c3aed",
    },
  },
  {
    id: "pecaai",
    designation: "PROJ-004 // PEÇAÍ",
    name: "PeçaAí",
    status: "live",
    url: "/pecaai",
    techStack: ["HTML", "CSS", "Vanilla JS", "i18n PT/EN"],
    screenshot: "/screenshots/pecaai.webp",
    featureOrder: 5,
    screenshots: ["/screenshots/pecaai/01.webp", "/screenshots/pecaai/02.webp"],
    orbit: {
      ring: 2,
      startAngle: 240,
      color: "#1f6bff",
      size: 44,
      texture: "/textures/planet_neptune.jpg",
    },
  },
  {
    id: "luxor",
    designation: "PROJ-005 // LUXOR",
    name: "Luxor",
    status: "live",
    url: "/luxor",
    techStack: ["HTML", "CSS", "Vanilla JS", "Custom i18n", "Cursor FX"],
    screenshot: "/screenshots/luxor.webp",
    featureOrder: 4,
    screenshots: ["/screenshots/luxor/01.webp", "/screenshots/luxor/02.webp"],
    orbit: {
      ring: 3,
      startAngle: 30,
      color: "#d4a853",
      size: 36,
      texture: "/textures/planet_mercury.jpg",
    },
  },
  {
    id: "woodframe",
    designation: "PROJ-006 // WOODFRAME",
    name: "Wood Frame",
    status: "live",
    url: "/woodframe",
    techStack: ["HTML", "CSS", "Vanilla JS", "i18n", "Light/Dark"],
    screenshot: "/screenshots/woodframe.webp",
    featureOrder: 6,
    screenshots: [
      "/screenshots/woodframe/01.webp",
      "/screenshots/woodframe/02.webp",
    ],
    orbit: {
      ring: 3,
      startAngle: 210,
      color: "#b8956a",
      size: 34,
      texture: "/textures/planet_venus_surface.jpg",
    },
  },
  {
    id: "corvin",
    designation: "PROJ-007 // CORVIN",
    name: "Corvin Protection",
    status: "live",
    url: "https://www.corvinprotection.com/",
    techStack: ["Web design", "Next.js", "Sanity CMS", "Animated contact"],
    screenshot: "/screenshots/corvin.webp",
    featureOrder: 1,
    screenshots: ["/screenshots/corvin/01.webp"],
    orbit: {
      ring: 2,
      startAngle: 120,
      color: "#5b7c99",
      size: 48,
      texture: "/textures/planet_uranus.jpg",
    },
  },
];

/** Lookup helper used by the info panel + case study modal. */
export function getProjectById(id: string | null): Project | null {
  if (!id) return null;
  return PROJECTS.find((p) => p.id === id) ?? null;
}

/** Projects shown in the Selected Work scroll showcase, in order. */
export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featureOrder != null).sort(
    (a, b) => (a.featureOrder ?? 0) - (b.featureOrder ?? 0),
  );
}

/**
 * Radius of a ring in CSS pixels (SVG userspace units too — SVG
 * viewBox matches 1:1). Ring 1 = 165, 2 = 250, 3 = 335. Sized for
 * the 800px-max container that the user dialed back to after the
 * previous 1100px version felt too dominant. With planets at
 * ~34-56px, this keeps the rings visually distinct without
 * crowding the planet bodies against the container edge.
 */
export function getRingRadius(ring: number): number {
  return 80 + ring * 85;
}

/**
 * Orbital period in seconds for a given ring. Inner rings rotate
 * faster (real orbital mechanics — Kepler's third law in spirit).
 * Range: ring 1 = 70s, ring 2 = 100s, ring 3 = 130s. Each step adds
 * 30s, so motion stays perceptible across the layout without anything
 * spinning fast enough to feel chaotic.
 */
export function getRingSpeedSeconds(ring: number): number {
  return 40 + ring * 30;
}
