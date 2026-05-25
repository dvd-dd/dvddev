/**
 * Skills constellation registry. Each skill is a "star" on the
 * stellar chart in the Skills section; constellations group related
 * stars and connect them with thin lines (literal star-chart vibe).
 *
 * Add a tool = push to SKILLS with x/y coords and a constellation id.
 * Position is in the SVG viewBox -600..600 × -350..350 (16:9 frame).
 *
 * Icons come from react-icons (Simple Icons set under `si`). For
 * tools without an official brand mark we fall back to a generic
 * silhouette from heroicons or fa6. The actual icon component is
 * resolved in SkillsConstellation.tsx so this file stays data-only.
 */

export type ConstellationId =
  | "core"
  | "craft"
  | "vanilla"
  | "ai"
  | "tooling"
  | "infra";

export interface Skill {
  id: string;
  name: string;
  constellation: ConstellationId;
  /** SVG viewBox coords (-600..600 / -350..350). */
  x: number;
  y: number;
  /** Icon scale multiplier — bigger = more prominent in the cluster. */
  scale?: number;
}

export interface Constellation {
  id: ConstellationId;
  /** Label shown floating beneath the cluster. */
  label: string;
  labelPt: string;
  /** Tint for label + connection lines + hover glow. */
  color: string;
  /** Label position in viewBox coords. */
  labelX: number;
  labelY: number;
  /** Pairs of skill ids to connect with dashed lines. */
  links: [string, string][];
}

/* ─── Skills ───────────────────────────────────────────────────── */

export const SKILLS: Skill[] = [
  // CORE STACK — top-left cluster (saturn-gold)
  { id: "nextjs", name: "Next.js", constellation: "core", x: -430, y: -210, scale: 1.2 },
  { id: "react", name: "React", constellation: "core", x: -340, y: -270, scale: 1.2 },
  { id: "ts", name: "TypeScript", constellation: "core", x: -250, y: -200, scale: 1.1 },
  { id: "tailwind", name: "Tailwind", constellation: "core", x: -360, y: -130, scale: 1.1 },
  { id: "nodejs", name: "Node.js", constellation: "core", x: -160, y: -260 },

  // FRONTEND CRAFT — top-right (violet)
  { id: "framer", name: "Framer Motion", constellation: "craft", x: 200, y: -260, scale: 1.1 },
  { id: "html", name: "HTML5", constellation: "craft", x: 290, y: -200 },
  { id: "css", name: "CSS3", constellation: "craft", x: 380, y: -260 },
  { id: "js", name: "JavaScript", constellation: "craft", x: 460, y: -180, scale: 1.1 },
  { id: "python", name: "Python", constellation: "craft", x: 380, y: -130 },

  // AI WORKFLOW — middle-right (blue)
  { id: "claude", name: "Claude Code", constellation: "ai", x: 220, y: 30, scale: 1.25 },
  { id: "gemini", name: "Gemini", constellation: "ai", x: 340, y: 90, scale: 1.1 },
  { id: "chatgpt", name: "ChatGPT", constellation: "ai", x: 460, y: 40, scale: 1.1 },

  // DESIGN — middle-left (warm)
  { id: "figma", name: "Figma", constellation: "vanilla", x: -440, y: 30 },
  { id: "canva", name: "Canva", constellation: "vanilla", x: -340, y: 90, scale: 1.1 },

  // TOOLING — bottom-left (cream)
  { id: "git", name: "Git", constellation: "tooling", x: -250, y: 260, scale: 1.1 },
  { id: "github", name: "GitHub", constellation: "tooling", x: -150, y: 220 },
  { id: "pnpm", name: "pnpm", constellation: "tooling", x: -60, y: 280 },
  { id: "eslint", name: "ESLint", constellation: "tooling", x: 40, y: 240 },

  // INFRA / DEPLOY — bottom-right (rose)
  { id: "vercel", name: "Vercel", constellation: "infra", x: 200, y: 260, scale: 1.15 },
  { id: "resend", name: "Resend", constellation: "infra", x: 320, y: 220 },
  { id: "hostgator", name: "HostGator", constellation: "infra", x: 420, y: 270 },
];

/* ─── Constellations ─────────────────────────────────────────── */

export const CONSTELLATIONS: Constellation[] = [
  {
    id: "core",
    label: "CORE STACK",
    labelPt: "STACK PRINCIPAL",
    color: "#d4a574",
    labelX: -300,
    labelY: -75,
    links: [
      ["nextjs", "react"],
      ["react", "ts"],
      ["ts", "tailwind"],
      ["tailwind", "nextjs"],
      ["ts", "nodejs"],
    ],
  },
  {
    id: "craft",
    label: "FRONTEND CRAFT",
    labelPt: "CRAFT FRONTEND",
    color: "#a78bfa",
    labelX: 350,
    labelY: -75,
    links: [
      ["framer", "html"],
      ["html", "css"],
      ["css", "js"],
      ["css", "python"],
    ],
  },
  {
    id: "ai",
    label: "AI WORKFLOW",
    labelPt: "WORKFLOW IA",
    color: "#7da7ff",
    labelX: 340,
    labelY: 165,
    links: [
      ["claude", "gemini"],
      ["gemini", "chatgpt"],
      ["claude", "chatgpt"],
    ],
  },
  {
    id: "vanilla",
    label: "DESIGN",
    labelPt: "DESIGN",
    color: "#f5c89a",
    labelX: -390,
    labelY: 165,
    links: [["figma", "canva"]],
  },
  {
    id: "tooling",
    label: "TOOLING",
    labelPt: "FERRAMENTAS",
    color: "#e8d4b0",
    labelX: -110,
    labelY: 320,
    links: [
      ["git", "github"],
      ["github", "pnpm"],
      ["pnpm", "eslint"],
    ],
  },
  {
    id: "infra",
    label: "INFRA & DEPLOY",
    labelPt: "INFRA & DEPLOY",
    color: "#f472b6",
    labelX: 310,
    labelY: 320,
    links: [
      ["vercel", "resend"],
      ["resend", "hostgator"],
    ],
  },
];

/** Lookup helper. */
export function getSkillById(id: string): Skill | null {
  return SKILLS.find((s) => s.id === id) ?? null;
}

export function getConstellationById(
  id: ConstellationId
): Constellation | null {
  return CONSTELLATIONS.find((c) => c.id === id) ?? null;
}
