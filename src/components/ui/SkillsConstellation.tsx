"use client";

import { useMemo, useRef, useState, type ComponentType } from "react";
import { motion, useInView } from "framer-motion";
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
import { CONSTELLATIONS, SKILLS, type Skill } from "@/lib/skills";
import { useTranslation } from "@/hooks/useTranslation";

/*
 * SKILLS CONSTELLATION — premium star-chart of the stack + workflow.
 *
 * Visual layers (back → front):
 *   1. Nebula clouds — per-cluster radial gradient blurs in the
 *      cluster's tint color. Soft cosmic atmosphere behind each.
 *   2. Connection lines — dashed polylines tying related stars
 *      together. Brighten when the hovered icon is in their cluster.
 *   3. Constellation labels — mono-caps floating beneath each cluster
 *      in the cluster's accent color.
 *   4. Per-skill icons — REAL brand logos in REAL brand colors with
 *      a pulsing brand-colored halo, idle float, hover scale.
 *
 * Interactions:
 *   • Stagger entry: icons fade-in one-by-one in viewport intersection
 *     (lights flicker on across the chart).
 *   • Hover an icon: brand glow swells, label brightens, all siblings
 *     in the same constellation dim slightly less / get highlighted
 *     halo, and connection lines for that cluster brighten.
 *   • Cross-cluster icons keep their idle pulse, so the chart never
 *     feels static.
 */

const VIEWBOX = "-600 -350 1200 700";
const BASE_ICON_SIZE = 30;

/* ─── Brand color map ─────────────────────────────────────────── */

/**
 * Official Simple Icons brand hexes. Brands whose mark is black on
 * white (Next.js, GitHub, Vercel, Resend, OpenAI) are remapped to
 * saturn-cream so they stay visible on the dark cosmic background
 * without losing brand recognition (the silhouette carries it).
 */
const BRAND_COLORS: Record<string, string> = {
  // CORE STACK
  nextjs: "#f5e6d3",
  react: "#61DAFB",
  ts: "#3178C6",
  tailwind: "#06B6D4",
  nodejs: "#5FA04E",
  // FRONTEND CRAFT
  framer: "#0099FF",
  html: "#E34F26",
  css: "#1572B6",
  js: "#F7DF1E",
  python: "#3776AB",
  // AI WORKFLOW
  claude: "#D97757",
  gemini: "#4285F4",
  chatgpt: "#10A37F",
  // DESIGN
  figma: "#F24E1E",
  canva: "#00C4CC",
  // TOOLING
  git: "#F05032",
  github: "#f5e6d3",
  pnpm: "#F69220",
  eslint: "#4B32C3",
  // INFRA & DEPLOY
  vercel: "#f5e6d3",
  resend: "#f5e6d3",
  hostgator: "#FF6600",
};

/* ─── Icon mapping ─────────────────────────────────────────── */

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
  hostgator: HiServer,
};

/* ─── Single skill star ────────────────────────────────────── */

interface SkillStarProps {
  skill: Skill;
  hovered: boolean;
  /** True when another skill in the same constellation is hovered. */
  siblingHovered: boolean;
  /** Stagger index for the entry animation. */
  index: number;
  inView: boolean;
  onPointerOver: () => void;
  onPointerOut: () => void;
}

function SkillStar({
  skill,
  hovered,
  siblingHovered,
  index,
  inView,
  onPointerOver,
  onPointerOut,
}: SkillStarProps) {
  const Icon = ICON_MAP[skill.id] ?? HiServer;
  const brandColor = BRAND_COLORS[skill.id] ?? "#f5e6d3";
  const scale = skill.scale ?? 1;
  const size = BASE_ICON_SIZE * scale;
  const half = size / 2;

  /** Active "lit-up" state: hovered self OR sibling in same group. */
  const active = hovered || siblingHovered;

  /** Per-skill float phase — deterministic from id, so it's stable.
   *  Spread across 0..3s so adjacent stars don't bob in sync. */
  const floatDelay = (skill.id.charCodeAt(0) % 30) / 10;

  return (
    <motion.g
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      style={{ cursor: "pointer" }}
      initial={{ opacity: 0, scale: 0.3 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.3 }}
      transition={{
        delay: 0.05 * index,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Idle float bob — applied via a nested <g> so it composes
          with the entry scale animation above without fighting. */}
      <g
        style={{
          animation: `skill-float 3.5s ease-in-out infinite`,
          animationDelay: `-${floatDelay}s`,
          transformOrigin: `${skill.x}px ${skill.y}px`,
        }}
      >
        {/* Outer pulse halo — brand-colored breathing glow. */}
        <circle
          cx={skill.x}
          cy={skill.y}
          r={size * 0.95}
          fill={brandColor}
          fillOpacity={active ? 0.28 : 0.12}
          style={{
            filter: "blur(8px)",
            transition: "fill-opacity 0.25s",
            animation: `skill-pulse 3.2s ease-in-out infinite`,
            animationDelay: `-${floatDelay * 0.7}s`,
            transformOrigin: `${skill.x}px ${skill.y}px`,
          }}
        />

        {/* Hover ring — only when actively hovered (not sibling). */}
        {hovered && (
          <circle
            cx={skill.x}
            cy={skill.y}
            r={size * 0.85}
            fill="none"
            stroke={brandColor}
            strokeOpacity={0.65}
            strokeWidth={0.9}
          />
        )}

        {/* Invisible hit area — bigger than the icon for forgiving
            clicks on the no-action stars (hover-only interaction). */}
        <rect
          x={skill.x - size}
          y={skill.y - size}
          width={size * 2}
          height={size * 2 + 22}
          fill="transparent"
        />

        {/* The actual brand logo. <foreignObject> lets us drop a
            React icon component into the SVG. Color = brand hex. */}
        <foreignObject
          x={skill.x - half}
          y={skill.y - half}
          width={size}
          height={size}
          style={{
            color: brandColor,
            pointerEvents: "none",
            overflow: "visible",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: hovered ? "scale(1.18)" : "scale(1)",
              transition: "transform 0.25s ease-out",
              filter: `drop-shadow(0 0 6px ${brandColor}${active ? "99" : "55"})`,
            }}
          >
            <Icon size="100%" />
          </div>
        </foreignObject>

        {/* Always-visible name label. */}
        <text
          x={skill.x}
          y={skill.y + half + 18}
          textAnchor="middle"
          fill="#f5e6d3"
          fillOpacity={hovered ? 1 : active ? 0.85 : 0.6}
          fontSize="11"
          letterSpacing="0.14em"
          style={{
            fontFamily: "var(--font-mono)",
            textTransform: "uppercase",
            transition: "fill-opacity 0.25s",
            pointerEvents: "none",
          }}
        >
          {skill.name}
        </text>
      </g>
    </motion.g>
  );
}

/* ─── Main component ─────────────────────────────────────── */

export function SkillsConstellation() {
  const { locale } = useTranslation();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  /** Map skill.id → its constellation id (for sibling lookup). */
  const skillToConstellation = useMemo(() => {
    const map = new Map<string, string>();
    SKILLS.forEach((s) => map.set(s.id, s.constellation));
    return map;
  }, []);

  const hoveredConstellation = hoveredId
    ? skillToConstellation.get(hoveredId)
    : null;

  return (
    <div ref={ref} className="mx-auto w-full max-w-6xl">
      <svg
        viewBox={VIEWBOX}
        className="h-auto w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* One radial-gradient per constellation, used for the
              nebula cloud behind that cluster. */}
          {CONSTELLATIONS.map((c) => (
            <radialGradient key={`grad-${c.id}`} id={`nebula-${c.id}`}>
              <stop offset="0%" stopColor={c.color} stopOpacity="0.18" />
              <stop offset="50%" stopColor={c.color} stopOpacity="0.06" />
              <stop offset="100%" stopColor={c.color} stopOpacity="0" />
            </radialGradient>
          ))}
        </defs>

        {/* Nebula clouds — soft elliptical washes behind each cluster.
            Brighten when the cluster has a hovered skill. */}
        <g style={{ mixBlendMode: "screen" }}>
          {CONSTELLATIONS.map((c) => {
            const isActive = hoveredConstellation === c.id;
            // Center of the cloud = average of cluster skill positions.
            const clusterSkills = SKILLS.filter(
              (s) => s.constellation === c.id
            );
            const cx =
              clusterSkills.reduce((sum, s) => sum + s.x, 0) /
              clusterSkills.length;
            const cy =
              clusterSkills.reduce((sum, s) => sum + s.y, 0) /
                clusterSkills.length -
              10;
            return (
              <ellipse
                key={`nebula-${c.id}`}
                cx={cx}
                cy={cy}
                rx="220"
                ry="140"
                fill={`url(#nebula-${c.id})`}
                style={{
                  opacity: isActive ? 1.6 : 1,
                  transition: "opacity 0.4s",
                }}
              />
            );
          })}
        </g>

        {/* Connection lines */}
        <g>
          {CONSTELLATIONS.flatMap((c) =>
            c.links.map(([fromId, toId], i) => {
              const from = SKILLS.find((s) => s.id === fromId);
              const to = SKILLS.find((s) => s.id === toId);
              if (!from || !to) return null;
              const active = hoveredConstellation === c.id;
              return (
                <motion.line
                  key={`${c.id}-${i}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={c.color}
                  strokeWidth={active ? 1.1 : 0.7}
                  strokeDasharray="3 6"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={
                    inView
                      ? { pathLength: 1, opacity: active ? 0.55 : 0.22 }
                      : { pathLength: 0, opacity: 0 }
                  }
                  transition={{
                    delay: 0.05 * SKILLS.length + 0.04 * i,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                />
              );
            })
          )}
        </g>

        {/* Constellation labels */}
        <g>
          {CONSTELLATIONS.map((c, i) => {
            const active = hoveredConstellation === c.id;
            return (
              <motion.text
                key={c.id}
                x={c.labelX}
                y={c.labelY}
                textAnchor="middle"
                fill={c.color}
                fillOpacity={active ? 1 : 0.7}
                fontSize="11"
                letterSpacing="0.3em"
                style={{
                  fontFamily: "var(--font-mono)",
                  textTransform: "uppercase",
                  transition: "fill-opacity 0.25s",
                }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{
                  delay: 0.05 * SKILLS.length + 0.6 + 0.05 * i,
                  duration: 0.5,
                }}
              >
                · {locale === "pt" ? c.labelPt : c.label} ·
              </motion.text>
            );
          })}
        </g>

        {/* Skill stars */}
        <g>
          {SKILLS.map((skill, i) => (
            <SkillStar
              key={skill.id}
              skill={skill}
              index={i}
              inView={inView}
              hovered={hoveredId === skill.id}
              siblingHovered={
                hoveredConstellation === skill.constellation &&
                hoveredId !== skill.id
              }
              onPointerOver={() => setHoveredId(skill.id)}
              onPointerOut={() =>
                setHoveredId((prev) => (prev === skill.id ? null : prev))
              }
            />
          ))}
        </g>
      </svg>

      {/* Keyframes for per-skill pulse + float. Scoped via <style>
          so they ship with the component instead of polluting globals.css. */}
      <style>{`
        @keyframes skill-pulse {
          0%, 100% { transform: scale(0.92); }
          50%      { transform: scale(1.08); }
        }
        @keyframes skill-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-3px); }
        }
      `}</style>
    </div>
  );
}

/* ─── Animation wrapper (kept for backwards compatibility) ─── */

export function AnimatedSkillsConstellation() {
  return <SkillsConstellation />;
}
