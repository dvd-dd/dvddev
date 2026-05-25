"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HUDPanel } from "@/components/ui/HUDPanel";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { DvdLogo, DVD_LOGO_TOTAL_DURATION } from "@/components/ui/DvdLogo";
import { useTranslation } from "@/hooks/useTranslation";
import { useLightMode } from "@/hooks/useLightMode";
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

  // On mobile / reduce-motion: skip the 2.5 MB video entirely and show
  // the poster JPG as a static backdrop. Saves the MP4 download, the
  // decoder context, AND the scroll-driven zoom spring chain below.
  const lightMode = useLightMode();

  // Pause the video when the hero scrolls out of view. Even at 720p
  // h.264, a running decoder context burns ~5% CPU on a quiet thread
  // and prevents the browser from going idle. IntersectionObserver
  // via Framer's useInView is the cheapest viewport gate available.
  // `margin: "0px"` = strict viewport intersection — no pre-warm
  // needed for this one because the user has to scroll past it
  // before pause is desirable.
  const heroInView = useInView(sectionRef, { margin: "0px" });

  /**
   * Two responsibilities here, both keyed off `heroInView`:
   *
   *   1. First entry: gate the initial play() until after the DVD
   *      logo paint completes (DVD_LOGO_TOTAL_DURATION + 0.2s) so
   *      the brand moment happens on a frozen poster frame. We also
   *      seek to 0.5s before playing to match the poster offset and
   *      hide the poster→video handoff.
   *
   *   2. Subsequent entries / exits: pause when offscreen, resume
   *      when back in view. Doesn't reset currentTime, so the loop
   *      picks up where it left off — feels like the scene was
   *      always running, but the decoder costs nothing while you're
   *      reading About / Projects / etc.
   */
  useEffect(() => {
    const video = videoRef.current;
    // Light mode renders no <video> — bail before touching anything.
    if (!video || lightMode) return;

    if (!heroInView) {
      video.pause();
      return;
    }

    // In view: schedule (or immediately re-trigger) playback. The
    // setTimeout handles the first-mount "wait for the logo paint"
    // case; on subsequent re-entries the wait is already past so
    // play() fires immediately.
    const delay = video.currentTime === 0
      ? (DVD_LOGO_TOTAL_DURATION + 0.2) * 1000
      : 0;
    const start = window.setTimeout(() => {
      if (video.currentTime === 0) video.currentTime = 0.5;
      void video.play().catch(() => undefined);
    }, delay);
    return () => window.clearTimeout(start);
  }, [heroInView, lightMode]);

  // Scroll-driven cinematic. Offset maps "hero top at top of viewport"
  // → "hero bottom at top of viewport" to scrollYProgress 0 → 1 across
  // exactly one section-height of scroll.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Raw scroll-driven targets. y is in pixels (number) instead of "%"
  // strings — Framer Motion doesn't have to parse the unit each frame
  // and the spring layer below can interpolate scalars cleanly.
  const rawScale = useTransform(scrollYProgress, [0, 1], [1, 1.22]);
  const rawY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  // Spring layer: scrollYProgress can jitter slightly (especially under
  // Lenis's lerp + native scroll event timing differences). Piping it
  // through a stiff spring smooths any micro-stutter into continuous
  // motion. Tuned for "responsive but never sloppy":
  //   stiffness 220 = catches up to target within ~150ms
  //   damping 32    = no perceptible overshoot
  //   mass 0.45     = light feel, snappy follow-through
  const springConfig = { stiffness: 220, damping: 32, mass: 0.45 };
  const videoScale = useSpring(rawScale, springConfig);
  const videoY = useSpring(rawY, springConfig);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-space-black"
    >
      {lightMode ? (
        // Light path: just the poster JPG as a static background. No
        // MP4 download, no decoder, no scroll-driven spring chain.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/hero-rings-poster.jpg"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
      ) : (
        <motion.video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="metadata"
          poster="/hero-rings-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            scale: videoScale,
            y: videoY,
            willChange: "transform",
          }}
        >
          <source src="/hero-rings-loop.mp4" type="video/mp4" />
        </motion.video>
      )}

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
          <div className="w-[80vw] max-w-[1300px] md:w-[65vw] lg:w-[58vw]">
            {/* Sized up from 70/55/50vw → 80/65/58vw so the logo owns
                more of the frame against the Saturn backdrop. No
                `color` prop = pink-galaxy gradient with tight nebula
                glow (see DvdLogo). */}
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
