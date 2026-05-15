"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HUDPanel } from "@/components/ui/HUDPanel";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { DvdLogo, DVD_LOGO_TOTAL_DURATION } from "@/components/ui/DvdLogo";
import { useTranslation } from "@/hooks/useTranslation";
import { SITE } from "@/lib/constants";

/**
 * Three.js scene loaded client-side only — WebGL has no business
 * shipping to a Node SSR pass. `ssr: false` keeps the bundle out of
 * the server payload entirely.
 */
const Scene = dynamic(
  () => import("@/components/three/Scene").then((m) => m.Scene),
  { ssr: false }
);

// HUD chips (top + bottom) animate in early — they're framing chrome,
// not the headliner. The logo runs its own paint reveal next, and the
// supporting copy below waits for the logo to finish.
const hudContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.4 },
  },
};

const hudItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// Subtitle + CTA stagger — fires only after the logo's paint reveal
// has resolved. `delayChildren` is bound to the logo's exported total
// duration so the two animations stay in sync if the timing changes.
const copyContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: DVD_LOGO_TOTAL_DURATION - 0.15,
    },
  },
};

const copyItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-space-black"
    >
      {/* 3D background: Canvas mounts absolutely inside this section. */}
      <Scene />

      {/* Radial vignette gradient on top of the canvas — pulls focus
          to the center where the overlay copy lives. Pointer-events
          off so it never steals clicks from the canvas/cta. */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,5,16,0.75)_100%)]" />

      {/* Overlay grid: HUD chips top, hero copy center, scroll cue bottom. */}
      <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col items-center justify-between px-6 py-8 md:px-12 md:py-12">
        {/* Top HUD bar */}
        <motion.div
          variants={hudContainer}
          initial="hidden"
          animate="visible"
          className="flex w-full items-start justify-between"
        >
          <motion.div variants={hudItem}>
            <HUDPanel label={`${t.hud.sysPrefix}${SITE.domain}`} />
          </motion.div>
          <motion.div variants={hudItem}>
            <LanguageToggle />
          </motion.div>
        </motion.div>

        {/* Center: logo + sub + CTA */}
        <div className="flex flex-col items-center text-center">
          {/* Logo: ~70vw on mobile, ~50vw on desktop, capped on huge
              screens. Aspect ratio holds because the inline SVG carries
              viewBox 1407x704 (≈2:1). `h-auto` lets the height follow. */}
          <div className="w-[70vw] max-w-[1100px] md:w-[55vw] lg:w-[50vw]">
            <DvdLogo className="h-auto w-full" color="#f5e6d3" />
          </div>

          {/* Subtitle + CTA delayed until after the paint reveal. */}
          <motion.div
            variants={copyContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            <motion.p
              variants={copyItem}
              className="mt-8 max-w-2xl font-mono text-saturn-cream/70"
              style={{ fontSize: "clamp(0.875rem, 1.4vw, 1.125rem)" }}
            >
              {t.hero.tagline}
            </motion.p>

            <motion.div variants={copyItem} className="mt-10">
              <Button
                variant="outline"
                onClick={() => {
                  const next = document.querySelector("#about");
                  next?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t.hero.cta}
                <ArrowDown className="h-4 w-4" aria-hidden />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom HUD bar */}
        <motion.div
          variants={hudContainer}
          initial="hidden"
          animate="visible"
          className="flex w-full items-end justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-saturn-cream/50"
        >
          <motion.span variants={hudItem}>{t.hud.coords}</motion.span>
          <motion.span variants={hudItem} className="hidden sm:inline">
            {t.hud.scrollExplore}
          </motion.span>
          <motion.span variants={hudItem}>{t.hud.version}</motion.span>
        </motion.div>
      </div>
    </section>
  );
}
