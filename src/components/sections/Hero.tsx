"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HUDPanel } from "@/components/ui/HUDPanel";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { DvdLogo, DVD_LOGO_TOTAL_DURATION } from "@/components/ui/DvdLogo";
import { useTranslation } from "@/hooks/useTranslation";
import { SITE } from "@/lib/constants";

// HUD chips animate in early — framing chrome, not the headliner.
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

// Subtitle + CTA stagger — fires only after the logo's paint reveal.
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
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-driven cinematic: as the hero section moves from "fully
  // in view" to "fully scrolled past", we slowly push the camera in
  // by scaling the video and gently fade everything out. This is the
  // Apple-product-page treatment — subtle, never gimmicky.
  //
  // Offset: "start start" → hero top sits at viewport top (scroll 0).
  //         "end start"   → hero bottom hits viewport top  (scroll 1).
  // So `scrollYProgress` runs 0 → 1 across exactly one section-height
  // of scroll, which is one viewport on h-screen.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Subtle scale: 1.0 → 1.15. Higher than this starts feeling cheesy.
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  // Slight vertical drift gives a "diving down into Saturn" feel that
  // pure scaling alone doesn't sell.
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  // Fade out the video before the section is fully gone so the dark
  // void of the About section blooms in instead of a hard cut.
  const videoOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.5, 0]);

  // The HTML overlay (logo + HUD + CTA) fades faster than the video —
  // the centerpiece copy clears so the planet can take over briefly
  // before the next section arrives.
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const overlayY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-space-black"
    >
      {/* Background video. Autoplay rules across browsers require
          `muted` AND `playsInline` (iOS won't autoplay otherwise and
          will hijack the screen with native controls). The poster
          image shows the moment the connection opens, so first paint
          isn't an awkward black flash. */}
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/hero-orbit-poster.jpg"
        // object-cover crops to fill — keeps the framing tight on
        // every aspect ratio without ever letterboxing.
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          scale: videoScale,
          y: videoY,
          opacity: videoOpacity,
        }}
      >
        <source src="/hero-orbit.mp4" type="video/mp4" />
      </motion.video>

      {/* Cinematic grade layers — all CSS, GPU-cheap.
          1. Radial vignette pulls focus to center.
          2. Bottom-up gradient bleeds into the next section's deep-space.
          3. Subtle warm wash maintains the saturn-gold mood. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(5,5,16,0.55)_75%,rgba(5,5,16,0.85)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-t from-space-black/80 to-transparent"
      />

      {/* Overlay grid: HUD topo, copy center, scroll cue bottom. */}
      <motion.div
        style={{ opacity: overlayOpacity, y: overlayY }}
        className="relative z-20 mx-auto flex h-full max-w-7xl flex-col items-center justify-between px-6 py-8 md:px-12 md:py-12"
      >
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
          <div className="w-[70vw] max-w-[1100px] md:w-[55vw] lg:w-[50vw]">
            <DvdLogo className="h-auto w-full" color="#f5e6d3" />
          </div>

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
      </motion.div>
    </section>
  );
}
