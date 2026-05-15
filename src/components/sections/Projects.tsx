"use client";

import { useTranslation } from "@/hooks/useTranslation";

export function Projects() {
  const { t } = useTranslation();
  return (
    <section
      id="projects"
      className="relative flex min-h-screen w-full items-center justify-center bg-space-black px-6 py-32"
    >
      <div className="max-w-3xl text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-saturn-gold">
          {t.sections.projects.chapter}
        </p>
        <h2 className="mt-4 font-display text-5xl font-bold text-saturn-cream md:text-7xl">
          {t.sections.projects.heading}
        </h2>
        <p className="mt-6 font-mono text-saturn-cream/60">
          {t.sections.projects.placeholder}
        </p>
      </div>
    </section>
  );
}
