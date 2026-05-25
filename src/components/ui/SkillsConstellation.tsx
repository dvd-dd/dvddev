"use client";

import { useMemo, useState, type ComponentType } from "react";
import { motion } from "framer-motion";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiFramer,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiPython,
  SiAnthropic,
  SiGooglegemini,
  SiOpenai,
  SiFigma,
  SiCanva,
  SiGit,
  SiGithub,
  SiPnpm,
  SiEslint,
  SiVercel,
  SiResend,
} from "react-icons/si";
import { HiServer } from "react-icons/hi2";
import {
  CONSTELLATIONS,
  SKILLS,
  type Skill,
} from "@/lib/skills";
import { useTranslation } from "@/hooks/useTranslation";

/*
 * SKILLS CONSTELLATION — SVG star chart of the tools David uses.
 *
 * Six constellations grouped by purpose (CORE STACK / FRONTEND CRAFT /
 * AI WORKFLOW / DESIGN / TOOLING / INFRA & DEPLOY). Each tool renders
 * as its real brand logo (via react-icons Simple Icons set) sized
 * by `scale`, with the tool name as an always-visible label below.
 * Dashed lines connect related tools within a constellation, just
 * like a real star chart.
 *
 * Hover a tool: it brightens, ring of constellation color appears.
 * No click-to-detail panel — the chart is the artifact. Tooltip
 * could be added later if specific tools warrant a "years used /
 * relevant projects" callout.
 */

const VIEWBOX = "-600 -350 1200 700";
const BASE_ICON_SIZE = 28; // px in viewBox units; scaled per skill

/* ─── Icon mapping ──────────────────────────────────────────── */

// Tools without a Simple Icons brand mark fall back to a generic
// server silhouette so the chart still renders cleanly.
const ICON_MAP: Record<string, ComponentType<{ size?: number | string }>> = {
  nextjs: SiNextdotjs,
  react: SiReact,
  ts: SiTypescript,
  tailwind: SiTailwindcss,
  nodejs: SiNodedotjs,
  framer: SiFramer,
  html: SiHtml5,
  css: SiCss,
  js: SiJavascript,
  python: SiPython,
  claude: SiAnthropic,
  gemini: SiGooglegemini,
  chatgpt: SiOpenai,
  figma: SiFigma,
  canva: SiCanva,
  git: SiGit,
  github: SiGithub,
  pnpm: SiPnpm,
  eslint: SiEslint,
  vercel: SiVercel,
  resend: SiResend,
  hostgator: HiServer, // no SI mark for HostGator — generic server
};

/* ─── Single skill star (icon + label) ───────────────────────── */

interface SkillStarProps {
  skill: Skill;
  color: string;
  hovered: boolean;
  onPointerOver: () => void;
  onPointerOut: () => void;
}

function SkillStar({
  skill,
  color,
  hovered,
  onPointerOver,
  onPointerOut,
}: SkillStarProps) {
  const Icon = ICON_MAP[skill.id] ?? HiServer;
  const scale = skill.scale ?? 1;
  const size = BASE_ICON_SIZE * scale;
  const half = size / 2;

  return (
    <g
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      style={{ cursor: "pointer" }}
    >
      {/* Hover halo — soft glow ring tinted with constellation color. */}
      {hovered && (
        <circle
          cx={skill.x}
          cy={skill.y}
          r={size * 0.85}
          fill={color}
          fillOpacity={0.12}
          stroke={color}
          strokeOpacity={0.45}
          strokeWidth={0.7}
        />
      )}

      {/* Invisible enlarged hit-rect for forgiving click target. */}
      <rect
        x={skill.x - size}
        y={skill.y - size}
        width={size * 2}
        height={size * 2 + 22}
        fill="transparent"
      />

      {/* Brand logo rendered via foreignObject so we can drop a React
          icon component into the SVG tree. The logo inherits color
          via currentColor; we drive that via the parent <g>'s
          `color` style or directly on the foreignObject. */}
      <foreignObject
        x={skill.x - half}
        y={skill.y - half}
        width={size}
        height={size}
        style={{
          color: hovered ? color : "#f5e6d3",
          transition: "color 0.2s",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: hovered ? 1 : 0.85,
            transition: "opacity 0.2s, transform 0.2s",
            transform: hovered ? "scale(1.12)" : "scale(1)",
          }}
        >
          <Icon size="100%" />
        </div>
      </foreignObject>

      {/* Always-visible label below the icon. */}
      <text
        x={skill.x}
        y={skill.y + half + 18}
        textAnchor="middle"
        fill="#f5e6d3"
        fillOpacity={hovered ? 1 : 0.65}
        fontSize="11"
        letterSpacing="0.12em"
        style={{
          fontFamily: "var(--font-mono)",
          textTransform: "uppercase",
          transition: "fill-opacity 0.2s",
          pointerEvents: "none",
        }}
      >
        {skill.name}
      </text>
    </g>
  );
}

/* ─── Main component ─────────────────────────────────────────── */

export function SkillsConstellation() {
  const { locale } = useTranslation();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  /** Lookup of skill id → constellation color, computed once. */
  const skillColors = useMemo(() => {
    const map = new Map<string, string>();
    SKILLS.forEach((s) => {
      const c = CONSTELLATIONS.find((x) => x.id === s.constellation);
      if (c) map.set(s.id, c.color);
    });
    return map;
  }, []);

  return (
    <div className="mx-auto w-full max-w-6xl">
      <svg
        viewBox={VIEWBOX}
        className="h-auto w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Dashed connection lines between paired stars in each
            constellation. Drawn first so the icons paint on top. */}
        <g>
          {CONSTELLATIONS.flatMap((c) =>
            c.links.map(([fromId, toId], i) => {
              const from = SKILLS.find((s) => s.id === fromId);
              const to = SKILLS.find((s) => s.id === toId);
              if (!from || !to) return null;
              return (
                <line
                  key={`${c.id}-${i}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={c.color}
                  strokeOpacity={0.22}
                  strokeWidth={0.7}
                  strokeDasharray="3 6"
                />
              );
            })
          )}
        </g>

        {/* Constellation category labels floating near each cluster. */}
        <g>
          {CONSTELLATIONS.map((c) => (
            <text
              key={c.id}
              x={c.labelX}
              y={c.labelY}
              textAnchor="middle"
              fill={c.color}
              fillOpacity={0.78}
              fontSize="11"
              letterSpacing="0.3em"
              style={{
                fontFamily: "var(--font-mono)",
                textTransform: "uppercase",
              }}
            >
              · {locale === "pt" ? c.labelPt : c.label} ·
            </text>
          ))}
        </g>

        {/* Skill stars. Each is a <g> with icon + label + hover state. */}
        <g>
          {SKILLS.map((skill) => (
            <SkillStar
              key={skill.id}
              skill={skill}
              color={skillColors.get(skill.id) ?? "#f5e6d3"}
              hovered={hoveredId === skill.id}
              onPointerOver={() => setHoveredId(skill.id)}
              onPointerOut={() =>
                setHoveredId((prev) => (prev === skill.id ? null : prev))
              }
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

/* ─── Static animation wrapper ─────────────────────────────── */

/** Fade-in on viewport entry. */
export function AnimatedSkillsConstellation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <SkillsConstellation />
    </motion.div>
  );
}
