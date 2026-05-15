"use client";

import { useTranslation } from "@/hooks/useTranslation";

export function Skills() {
  const { t } = useTranslation();
  return (
    <section
      id="skills"
      className="relative flex min-h-screen w-full items-center justify-center bg-deep-space px-6 py-32"
    >
      <div className="max-w-3xl text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-saturn-gold">
          {t.sections.skills.chapter}
        </p>
        <h2 className="mt-4 font-display text-5xl font-bold text-saturn-cream md:text-7xl">
          {t.sections.skills.heading}
        </h2>
        <p className="mt-6 font-mono text-saturn-cream/60">
          {t.sections.skills.placeholder}
        </p>
      </div>
    </section>
  );
}
