"use client";

import { ExternalLink } from "lucide-react";
import type { Project } from "@/lib/projects";

interface WorkCardProps {
  project: Project;
  copy: { tagline: string; description: string };
  visitLabel: string;
}

/**
 * Image-led case study card — Sanity's customers-grid pattern adapted
 * for dvddev. Each card is a single anchor so the whole tile is the
 * affordance. Hover: image scale 1.03 + brand-mint underline + slight
 * arrow shift. No bouncy scale, no rotation — chromatic + tiny
 * translate only, per the motion contract.
 */
export function WorkCard({ project, copy, visitLabel }: WorkCardProps) {
  const isLive = project.status === "live";

  return (
    <a
      href={project.url ?? "#"}
      target={project.url?.startsWith("http") ? "_blank" : undefined}
      rel={project.url?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
    >
      {/* Image well */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md border border-border-faint bg-bg-elevated">
        {project.screenshot ? (
          <picture>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.screenshot}
              alt={`${project.name} screenshot`}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </picture>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-fg-faint">
            <span className="font-mono text-xs uppercase tracking-[0.18em]">
              {project.name}
            </span>
          </div>
        )}

        {/* Top-left overlay — designation + live indicator */}
        <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-ink-base/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-base backdrop-blur-sm">
          <span>{project.designation.replace(/^PROJ-\d+ \/\/ /, "")}</span>
          <span
            className={isLive ? "text-brand" : "text-fg-faint"}
            aria-label={isLive ? "Live" : "Case study"}
          >
            {isLive ? "● LIVE" : "○ CASE"}
          </span>
        </div>
      </div>

      {/* Below image */}
      <div className="mt-5 flex flex-col gap-3">
        <h3 className="font-display text-2xl font-normal leading-tight tracking-tight text-fg-base transition-colors group-hover:text-brand">
          {project.name}
        </h3>

        <p className="line-clamp-2 text-sm leading-relaxed text-fg-dim">
          {copy.tagline}
        </p>

        {/* Tech-stack chip row */}
        {project.techStack.length > 0 && (
          <ul className="mt-1 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 5).map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-border-faint px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-faint"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}

        {/* Visit affordance */}
        <span className="mt-2 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-brand">
          <span>{visitLabel.replace(" →", "")}</span>
          <ExternalLink
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
            strokeWidth={2}
            aria-hidden
          />
        </span>
      </div>
    </a>
  );
}
