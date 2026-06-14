"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * Reviews — sanity.io's "Loved by 1M+ users" cinematic testimonial,
 * dvddev-flavored. A full-bleed background that is a screen-RECORDING of
 * the client's actual site being scrolled ("video mexendo no site dele")
 * — dimmed with scrim layers like the hero — over which sits the section
 * heading, a 5-star row, the real client quote + attribution, the client
 * wordmark, the verified-review badges, and a slide indicator (01/02/03)
 * for when more clients land.
 *
 * Built as a slider over REVIEWS so future clients append with their own
 * site-recording background + quote. V1 = Corvin (a real Upwork-verified
 * client review; price/budget lines intentionally omitted).
 */

type Review = {
  id: string; // translation key under sections.reviews.items
  webm: string;
  mp4: string;
  poster: string;
  wordmark: string;
  /** Permalink to the original review (opens in a new tab). */
  reviewUrl?: string;
};

const REVIEWS: Review[] = [
  {
    id: "corvin",
    webm: "/corvin-reel.webm",
    mp4: "/corvin-reel.mp4",
    poster: "/corvin-reel-poster.jpg",
    wordmark: "/brand/clients/corvin.svg",
    reviewUrl:
      "https://www.upwork.com/freelancers/~01d8af8bffe7ae5a35#:~:text=Website%20development%20for-,professional,-security%20services%20company",
  },
];

type ReviewCopy = {
  quote: string;
  author: string;
  role: string;
  source: string;
  rating: number;
  badges: readonly string[];
};

export function Reviews() {
  const { t } = useTranslation();
  const r = t.sections.reviews;
  const items = r.items as Record<string, ReviewCopy>;
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: "0px" });
  const [current, setCurrent] = useState(0);

  const review = REVIEWS[current];
  const copy = items[review.id];

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="relative isolate flex min-h-[88vh] w-full items-stretch overflow-hidden bg-ink-base"
    >
      {/* Background: the client's site being scrolled, dimmed */}
      <ReviewVideo review={review} active={inView} />

      {/* Scrims — left-biased so the copy reads on the left while the
          site recording stays clearly visible on the right. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 bg-ink-base/25"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 bg-gradient-to-r from-ink-base via-ink-base/55 to-ink-base/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-0 h-1/3 bg-gradient-to-t from-ink-base to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(70%_60%_at_15%_85%,rgba(168,85,247,0.16),transparent_70%)]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1248px] flex-col justify-between gap-16 px-6 py-20 md:px-12 md:py-24">
        {/* Header row: heading + slide indicator */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand">
              {r.eyebrow}
            </p>
            <h2 className="mt-4 max-w-[16ch] text-balance text-4xl font-normal leading-[1.05] tracking-[-0.03em] text-fg-base md:text-6xl">
              {r.heading}
            </h2>
          </div>
          <div className="flex shrink-0 items-center gap-2 pt-2 font-mono text-[12px] tracking-[0.14em]">
            {REVIEWS.map((rev, i) => (
              <button
                key={rev.id}
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={`Review ${i + 1}`}
                className={`tabular-nums transition-colors ${
                  i === current
                    ? "text-fg-base underline underline-offset-4"
                    : "text-fg-faint hover:text-fg-dim"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </button>
            ))}
            {/* ghost future slots, like Sanity's 01 02 03 */}
            {REVIEWS.length < 3 &&
              Array.from({ length: 3 - REVIEWS.length }).map((_, i) => (
                <span key={`ghost-${i}`} className="text-fg-faint/40 tabular-nums">
                  {String(REVIEWS.length + i + 1).padStart(2, "0")}
                </span>
              ))}
          </div>
        </div>

        {/* Quote block */}
        <motion.figure
          key={review.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-3xl"
        >
          {/* Stars */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={
                  i < Math.round(copy.rating)
                    ? "h-4 w-4 fill-brand text-brand"
                    : "h-4 w-4 text-fg-faint"
                }
                strokeWidth={1.5}
                aria-hidden
              />
            ))}
            <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-dim">
              {copy.rating.toFixed(1)} · {copy.source}
            </span>
            {review.reviewUrl && (
              <a
                href={review.reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group ml-1 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.14em] text-brand transition-colors hover:text-fg-base"
              >
                {r.readMore}
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                  aria-hidden
                />
              </a>
            )}
          </div>

          <blockquote className="mt-6 text-balance text-xl font-normal leading-relaxed text-fg-base md:text-[28px] md:leading-[1.4]">
            “{copy.quote}”
          </blockquote>

          <figcaption className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Image
              src={review.wordmark}
              alt={copy.role}
              width={132}
              height={28}
              className="h-6 w-auto [filter:brightness(0)_invert(1)]"
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-dim">
              {copy.author} · {copy.role}
            </span>
          </figcaption>

          {/* Endorsement badges */}
          <ul className="mt-7 flex flex-wrap gap-2">
            {copy.badges.map((b) => (
              <li
                key={b}
                className="rounded-full border border-border-faint bg-ink-base/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-dim backdrop-blur-sm"
              >
                {b}
              </li>
            ))}
          </ul>
        </motion.figure>
      </div>
    </section>
  );
}

/* ─── Background video (pauses off-screen) ───────────────────────── */

function ReviewVideo({ review, active }: { review: Review; active: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (active) void v.play().catch(() => undefined);
    else v.pause();
  }, [active]);

  return (
    <video
      key={review.id}
      ref={ref}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      poster={review.poster}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.72]"
    >
      <source src={review.webm} type="video/webm" />
      <source src={review.mp4} type="video/mp4" />
    </video>
  );
}
