"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HUDPanel } from "@/components/ui/HUDPanel";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { DvdLogo, DVD_LOGO_TOTAL_DURATION } from "@/components/ui/DvdLogo";
import { useTranslation } from "@/hooks/useTranslation";
import { SITE } from "@/lib/constants";

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
  const videoRef = useRef<HTMLVideoElement>(null);

  // Hold the video on its poster frame while the DVD logo paints in.
  // The logo's reveal is the brand moment — letting the orbital video
  // animate underneath at the same time fought it for attention. We
  // start playback once the paint reveal finishes (+ a 200ms beat).
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    const timer = window.setTimeout(() => {
      // .play() returns a Promise that rejects if the browser refuses
      // autoplay (e.g. battery-saver mode). Swallow it silently — the
      // poster still gives a usable hero state.
      void video.play().catch(() => undefined);
    }, (DVD_LOGO_TOTAL_DURATION + 0.2) * 1000);
    return () => window.clearTimeout(timer);
  }, []);

  // Scroll-driven cinematic. Offset maps "hero top at top of viewport"
  // → "hero bottom at top of viewport" to scrollYProgress 0 → 1 across
  // exactly one section-height of scroll.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Only the video reads from scroll. Previously the overlay also bound
  // its opacity + y to scrollYProgress, but on initial mount the motion
  // value sequence (uninitialized → 0 → measured) flickered the overlay
  // to opacity 0 and never recovered, making logo + HUDs disappear.
  // Solution: leave the overlay in normal document flow — it scrolls
  // out with the section naturally, no extra transforms required.
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.22]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-space-black"
    >
      <motion.video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="auto"
        poster="/hero-orbit-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ scale: videoScale, y: videoY }}
      >
        <source src="/hero-orbit.mp4" type="video/mp4" />
      </motion.video>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(5,5,16,0.55)_75%,rgba(5,5,16,0.85)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-t from-space-black/80 to-transparent"
      />

      <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col items-center justify-between px-6 py-8 md:px-12 md:py-12">
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

        <div className="flex flex-col items-center text-center">
          <div className="w-[70vw] max-w-[1100px] md:w-[55vw] lg:w-[50vw]">
            {/* No `color` prop → cosmic violet→magenta gradient with
                purple aurora glow. Pops against the warm-gold Saturn
                video underneath via complementary contrast. */}
            <DvdLogo className="h-auto w-full" />
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
