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
  /** Planet color hex — drives the radial-gradient body fill + glow. */
  color: string;
  /** Visual diameter in px (the orbit wrapper counter-tilts so this
   *  reads as the rendered size on screen, not foreshortened). */
  size: number;
  /** Optional Saturn-style ring decoration (CSS pseudo-element). */
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
}

export const PROJECTS: Project[] = [
  {
    id: "upward",
    designation: "PROJ-001 // UPWARD",
    name: "Upward Media",
    status: "live",
    url: "https://upwardbr.com",
    techStack: ["Next.js", "Tailwind", "i18n PT/EN", "Dynamic Routes"],
    orbit: { ring: 1, startAngle: 0, color: "#d4a574", size: 56 },
  },
  {
    id: "smartfloors",
    designation: "PROJ-002 // SMARTFLOORS",
    name: "Smart Floors Services",
    status: "live",
    url: "https://smartfloorservices.com",
    techStack: ["Next.js", "i18n EN/ES", "3D Configurator", "Image Optim"],
    orbit: { ring: 1, startAngle: 180, color: "#c4623a", size: 52 },
  },
  {
    id: "phoenix",
    designation: "PROJ-003 // PHOENIX",
    name: "Phoenix",
    status: "case-study",
    url: "/portfolio/phoenix-site/index.html",
    techStack: ["HTML", "CSS", "Vanilla JS", "i18n", "Dual Theme"],
    orbit: {
      ring: 2,
      startAngle: 60,
      color: "#7c3aed",
      size: 46,
      hasRing: true,
      ringColor: "#7c3aed",
    },
  },
  {
    id: "pecaai",
    designation: "PROJ-004 // PEÇAÍ",
    name: "PeçaAí",
    status: "case-study",
    url: "/portfolio/pecaai-site/index.html",
    techStack: ["HTML", "CSS", "Vanilla JS", "i18n PT/EN"],
    orbit: { ring: 2, startAngle: 240, color: "#1f6bff", size: 44 },
  },
  {
    id: "luxor",
    designation: "PROJ-005 // LUXOR",
    name: "Luxor",
    status: "case-study",
    url: "/portfolio/luxor-site/index.html",
    techStack: ["HTML", "CSS", "Vanilla JS", "Custom i18n", "Cursor FX"],
    orbit: { ring: 3, startAngle: 30, color: "#d4a853", size: 36 },
  },
  {
    id: "woodframe",
    designation: "PROJ-006 // WOODFRAME",
    name: "Wood Frame",
    status: "case-study",
    url: "/portfolio/woodframe-site/index.html",
    techStack: ["HTML", "CSS", "Vanilla JS", "i18n", "Light/Dark"],
    orbit: { ring: 3, startAngle: 210, color: "#b8956a", size: 34 },
  },
];

/** Lookup helper used by the info panel + case study modal. */
export function getProjectById(id: string | null): Project | null {
  if (!id) return null;
  return PROJECTS.find((p) => p.id === id) ?? null;
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
