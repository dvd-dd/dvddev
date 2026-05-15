/**
 * Portfolio project registry. Each entry binds project metadata
 * (id, name, status, optional URL, tech stack) to its planetary
 * representation (texture, 3D position, radius, atmosphere color).
 *
 * Why split planet config inside Project (instead of a parallel
 * planets[] array): every project IS a planet, and the 1:1 binding
 * keeps the component code from juggling two indexed arrays.
 */

export type ProjectStatus = "live" | "case-study";

export interface PlanetConfig {
  texture: string;
  /** World position [x, y, z] inside the ProjectsScene group. */
  position: [number, number, number];
  /** Sphere radius. Bigger = visually more prominent in the layout. */
  radius: number;
  /** Hex color used by the Fresnel atmosphere shader's uColor. */
  atmosphereColor: string;
  /** Radians per frame on Y axis. */
  rotationSpeed: number;
  /** Optional Saturn-style ring. */
  ringEnabled?: boolean;
  ringColor?: string;
}

export interface Project {
  id: string;
  /** Displayed designation, e.g. "PROJ-001 // UPWARD". */
  designation: string;
  /** Human name shown on the info panel. */
  name: string;
  status: ProjectStatus;
  /** Live URL when status === "live". */
  url?: string;
  techStack: string[];
  planet: PlanetConfig;
}

export const PROJECTS: Project[] = [
  {
    id: "upward",
    designation: "PROJ-001 // UPWARD",
    name: "Upward Media",
    status: "live",
    url: "https://upwardbr.com",
    techStack: ["Next.js", "Tailwind", "i18n PT/EN", "Dynamic Routes"],
    planet: {
      // Jupiter — the "anchor world" at the center of the system.
      texture: "/textures/8k_jupiter.jpg",
      position: [0, 0, 0],
      radius: 1.45,
      atmosphereColor: "#d4a574", // saturn-gold echo
      rotationSpeed: 0.0012,
    },
  },
  {
    id: "smartfloors",
    designation: "PROJ-002 // SMARTFLOORS",
    name: "Smart Floors Services",
    status: "live",
    url: "https://smartfloorservices.com",
    techStack: ["Next.js", "i18n EN/ES", "3D Configurator", "Image Optim"],
    planet: {
      texture: "/textures/8k_mars.jpg",
      position: [-3.5, -0.4, -0.5],
      radius: 1.05,
      atmosphereColor: "#c4623a", // mars red-orange
      rotationSpeed: 0.0008,
    },
  },
  {
    id: "phoenix",
    designation: "PROJ-003 // PHOENIX",
    name: "Phoenix",
    status: "case-study",
    techStack: ["HTML", "CSS", "Vanilla JS", "i18n", "Dual Theme"],
    planet: {
      // Uranus + a violet ring drives the security/cyberpunk read.
      texture: "/textures/8k_uranus.jpg",
      position: [3.5, 0.5, -0.5],
      radius: 1.1,
      atmosphereColor: "#7c3aed", // phoenix purple
      rotationSpeed: 0.0010,
      ringEnabled: true,
      ringColor: "#7c3aed",
    },
  },
  {
    id: "pecaai",
    designation: "PROJ-004 // PEÇAÍ",
    name: "PeçaAí",
    status: "case-study",
    techStack: ["HTML", "CSS", "Vanilla JS", "i18n PT/EN"],
    planet: {
      texture: "/textures/8k_neptune.jpg",
      position: [-2.4, 1.0, -2.2],
      radius: 0.85,
      atmosphereColor: "#1f6bff", // pecaai electric blue
      rotationSpeed: 0.0009,
    },
  },
  {
    id: "luxor",
    designation: "PROJ-005 // LUXOR",
    name: "Luxor",
    status: "case-study",
    techStack: ["HTML", "CSS", "Vanilla JS", "Custom i18n", "Cursor FX"],
    planet: {
      // Mercury — quiet, monastic, gold-lit. Matches Luxor's
      // editorial-luxury palette without forcing a custom texture.
      texture: "/textures/8k_mercury.jpg",
      position: [2.5, -1.1, -2.0],
      radius: 0.8,
      atmosphereColor: "#d4a853", // luxor gold
      rotationSpeed: 0.0006,
    },
  },
  {
    id: "woodframe",
    designation: "PROJ-006 // WOODFRAME",
    name: "Wood Frame",
    status: "case-study",
    techStack: ["HTML", "CSS", "Vanilla JS", "i18n", "Light/Dark"],
    planet: {
      // Venus surface (no clouds) — warm rust/cream banding matches
      // Wood Frame's natural-material palette better than a gas giant.
      texture: "/textures/8k_venus_surface.jpg",
      position: [0.4, 1.6, -3],
      radius: 0.7,
      atmosphereColor: "#b8956a", // wood-accent brown
      rotationSpeed: 0.0005,
    },
  },
];

/** Lookup helper used by the slide-in panel + case study modal. */
export function getProjectById(id: string | null): Project | null {
  if (!id) return null;
  return PROJECTS.find((p) => p.id === id) ?? null;
}
