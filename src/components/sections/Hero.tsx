"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HUDPanel } from "@/components/ui/HUDPanel";
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

// Stagger keeps the entrance feeling deliberate — title first, then
// supporting copy, then CTA. The values are tuned to feel snappy at
// 60fps without dropping into the uncanny "too fast" zone.
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.4 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
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
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-20 mx-auto flex h-full max-w-7xl flex-col items-center justify-between px-6 py-8 md:px-12 md:py-12"
      >
        {/* Top HUD bar */}
        <motion.div
          variants={item}
          className="flex w-full items-start justify-between"
        >
          <HUDPanel label={`SYS://${SITE.domain}`} />
          <HUDPanel label="STATUS — ONLINE" />
        </motion.div>

        {/* Center: title + sub + CTA */}
        <div className="flex flex-col items-center text-center">
          <motion.h1
            variants={item}
            className="font-display font-bold leading-[0.85] tracking-tighter text-saturn-cream"
            style={{
              // 200px+ at desktop, fluid down to mobile.
              fontSize: "clamp(6rem, 22vw, 18rem)",
            }}
          >
            {SITE.brand}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl font-mono text-saturn-cream/70"
            style={{ fontSize: "clamp(0.875rem, 1.4vw, 1.125rem)" }}
          >
            {SITE.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-10">
            <Button
              variant="outline"
              onClick={() => {
                const next = document.querySelector("#about");
                next?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Initiate Mission
              <ArrowDown className="h-4 w-4" aria-hidden />
            </Button>
          </motion.div>
        </div>

        {/* Bottom HUD bar */}
        <motion.div
          variants={item}
          className="flex w-full items-end justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-saturn-cream/50"
        >
          <span>LAT 0.000 · LON 0.000</span>
          <span className="hidden sm:inline">SCROLL TO EXPLORE</span>
          <span>v0.1 · COSMIC EDITION</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
