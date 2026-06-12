"use client";

import { motion } from "framer-motion";
import {
  Boxes,
  Megaphone,
  MousePointerClick,
  Sparkles,
  Store,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * Capabilities — five-card grid in the spirit of sanity.io's use-case
 * block (spec §1 home block 4). Each card carries an eyebrow, icon,
 * headline, two-sentence body, and a "Learn more →" affordance.
 *
 * Layout: 1 col mobile / 2 cols tablet / 3 cols desktop. The last two
 * cards land on the bottom row at desktop, matching Sanity's
 * intentional asymmetry. Card surface: bg-bg-dim + faint border +
 * rounded-[11px] + 4px left accent stripe in brand orange.
 */
interface UseCaseCard {
  key: string;
  Icon: LucideIcon;
}

const CARDS: UseCaseCard[] = [
  { key: "landing", Icon: MousePointerClick },
  { key: "marketing", Icon: Megaphone },
  { key: "brand", Icon: Sparkles },
  { key: "ecommerce", Icon: Store },
  { key: "designSystem", Icon: Boxes },
];

export function UseCases() {
  const { t } = useTranslation();
  const u = t.sections.useCases;

  return (
    <section
      id="capabilities"
      className="relative w-full px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-[1248px]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="mb-12 max-w-2xl md:mb-16"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand">
            {u.eyebrow}
          </p>
          <h2 className="mt-4 max-w-[18ch] text-balance text-4xl font-normal leading-[1.05] tracking-[-0.03em] text-fg-base md:text-6xl">
            {u.heading}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-dim md:text-lg">
            {u.subhead}
          </p>
        </motion.div>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CARDS.map(({ key, Icon }, i) => {
            const card = u.cards[key as keyof typeof u.cards];
            return (
              <motion.li
                key={key}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: 0.05 * (i % 3),
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="group relative flex h-full flex-col gap-6 overflow-hidden rounded-[11px] border border-border-faint bg-bg-dim p-6 transition-colors duration-500 hover:border-border-dim md:p-8"
              >
                {/* 4px left accent stripe (Sanity's signature) */}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-full w-1 bg-brand"
                />

                <Icon
                  className="h-7 w-7 text-brand transition-colors duration-500 group-hover:text-fg-base"
                  strokeWidth={1.75}
                  aria-hidden
                />

                <div className="flex flex-col gap-3">
                  <h3 className="font-display text-2xl font-normal leading-tight tracking-[-0.02em] text-fg-base">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-fg-dim md:text-base">
                    {card.body}
                  </p>
                </div>

                <span className="mt-auto inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-brand transition-colors group-hover:text-fg-base">
                  <span>{u.learnMore}</span>
                  <span aria-hidden>→</span>
                </span>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
