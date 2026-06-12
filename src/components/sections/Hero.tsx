"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * Phase 3 hero — sanity-inspired typographic statement on top of a
 * dimmed full-bleed loop. Replaces the saturn-rings cinematic and
 * its scroll-spring chain with a much quieter brand moment:
 *
 *   eyebrow (mono caps)
 *   ─────────────────────────────
 *   Code shapes
 *   form.            ← H1 left-aligned, weight 400, max-w-[12ch]
 *
 *   subhead (40ch)
 *
 *   [ Start a project ] [ See selected work ] [ npx hire-david ]
 *
 * Background:
 *   The new direction is an "abstract glitch" WebM at 35% opacity on
 *   bg-ink-base. Until the new asset is dropped at /hero-glitch.webm,
 *   the existing /hero-rings-loop.mp4 fills in via the second <source>.
 *   The browser picks whichever it can decode + finds first.
 *
 * Motion:
 *   - DvdLogo paint is gone (the hero is typographic now; the wordmark
 *     lives in the nav + giant in the footer).
 *   - No more scroll-driven spring zoom. Per the redesign motion
 *     contract: color/opacity only. The video loop carries its own
 *     motion.
 *   - Entry: fade + 12px translate-y on each block, staggered by 100ms,
 *     600ms ease-out. Once-only via useInView.
 */
const HERO_GLITCH_WEBM = "/hero-glitch.webm";
const HERO_GLITCH_MP4 = "/hero-glitch.mp4";
const HERO_FALLBACK_MP4 = "/hero-rings-loop.mp4";
const HERO_POSTER = "/hero-glitch-poster.jpg";

// Per the motion contract (C7): material-standard curve, 500ms duration,
// 100ms stagger. No spring, no scale, no skew — color/opacity + a small
// translate-y on entry only.
const ENTRY = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 + i * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
  }),
};

export function Hero() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(sectionRef, { margin: "0px" });
  const [copied, setCopied] = useState(false);

  // Pause the video when the hero scrolls out of view to free the decoder.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [inView]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(t.hero.ctaCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard permission denied — silently fail (rare).
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-transparent-nav="true"
      className="relative isolate w-full overflow-hidden bg-ink-base"
    >
      {/* Background video. The `isolate` on the section above creates a
          new stacking context so `-z-0` here keeps the video tucked
          behind the headline content (z-10 below) without falling
          underneath the section's own bg-ink-base. Wrapper div removed
          — it was forming an extra stacking context that, paired with
          mix-blend-mode on the inner video, prevented the screen blend
          from reaching the section background. */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={HERO_POSTER}
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 h-full w-full object-cover opacity-65"
      >
        {/* Responsive contract — breakpoint media hint wired in for
            when a higher-res cosmic clip later replaces the current
            960×540 crop. */}
        <source src={HERO_GLITCH_WEBM} type="video/webm" media="(min-width: 1200px)" />
        <source src={HERO_GLITCH_WEBM} type="video/webm" />
        <source src={HERO_GLITCH_MP4} type="video/mp4" />
        <source src={HERO_FALLBACK_MP4} type="video/mp4" />
      </video>

      {/* Full-bleed flat tint + left-bias gradient. The reel now cycles
          through 11 wildly different clips (bright Chongqing daylight,
          golden-hour skater, orange race car) — without this scrim
          the lighter clips wash out the eyebrow + subhead. Stays subtle
          enough that the cool clips still read. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-ink-base/30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-ink-base/55 via-ink-base/20 to-transparent"
      />

      {/* Bottom gradient scrim so the trust marquee (Phase 5) can sit
          flush without the video bleeding into its top edge. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-1/4 bg-gradient-to-t from-ink-base/95 to-transparent"
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-80px)] max-w-[1248px] flex-col justify-center px-6 py-12 md:px-12 lg:py-16">
        {/* Eyebrow */}
        <motion.p
          custom={0}
          variants={ENTRY}
          initial="hidden"
          animate="visible"
          className="font-mono text-[14px] font-medium uppercase tracking-[0.16em] text-fg-base [text-shadow:0_1px_6px_rgba(0,0,0,0.7)]"
        >
          {t.hero.eyebrow}
        </motion.p>

        {/* Headline — left-aligned, weight 400, max-w-[12ch] cap forces
            the natural 2-line break. */}
        <motion.h1
          custom={1}
          variants={ENTRY}
          initial="hidden"
          animate="visible"
          className="mt-8 max-w-[12ch] text-balance text-[60px] font-normal leading-[1.05] tracking-[-0.04em] text-fg-base [text-shadow:0_2px_16px_rgba(0,0,0,0.45)] md:text-[72px] lg:text-[96px] xl:text-[112px]"
        >
          {t.hero.headline}
        </motion.h1>

        {/* Subhead */}
        <motion.p
          custom={2}
          variants={ENTRY}
          initial="hidden"
          animate="visible"
          className="mt-12 max-w-[44ch] text-lg leading-relaxed text-fg-base/95 [text-shadow:0_1px_8px_rgba(0,0,0,0.7)] md:text-xl"
        >
          {t.hero.subhead}
        </motion.p>

        {/* CTA cluster */}
        <motion.div
          custom={3}
          variants={ENTRY}
          initial="hidden"
          animate="visible"
          className="mt-12 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-3"
        >
          {/* Primary — brand orange fill, hover darkens to ink-base
              (Sanity's "darken to black" inversion on hover). */}
          <a
            href="#contact"
            className="inline-flex h-14 items-center justify-center rounded-full bg-brand border border-brand px-7 font-mono text-[13px] font-medium uppercase tracking-[0.18em] text-ink-base transition-colors hover:bg-ink-base hover:text-fg-base hover:border-fg-base"
          >
            {t.hero.ctaPrimary}
          </a>

          {/* Secondary — outline, hover inverts to white fill */}
          <a
            href="#projects"
            className="inline-flex h-14 items-center justify-center rounded-full border border-border-dim px-7 font-mono text-[13px] font-medium uppercase tracking-[0.18em] text-fg-base transition-colors hover:bg-fg-base hover:text-ink-base hover:border-fg-base"
          >
            {t.hero.ctaSecondary}
          </a>

          {/* Tertiary — mono code copy-snippet (Sanity's signature 3rd CTA) */}
          <button
            type="button"
            onClick={handleCopy}
            title={copied ? t.hero.ctaCopied : t.hero.ctaCopyHint}
            className="hidden h-14 items-center justify-center gap-3 rounded-full border border-border-faint px-5 font-mono text-[13px] text-fg-dim transition-colors hover:border-border-dim hover:text-fg-base md:inline-flex"
          >
            <span>{t.hero.ctaCommand}</span>
            {copied ? (
              <Check className="h-4 w-4 text-brand" strokeWidth={2} />
            ) : (
              <Copy className="h-4 w-4" strokeWidth={2} />
            )}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
