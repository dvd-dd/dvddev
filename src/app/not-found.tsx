import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Signal Lost",
  description: "Transmission failed. The orbit you requested doesn't exist.",
};

/**
 * Cosmic 404 — keeps the radio-transmission vibe of the rest of the site
 * instead of Next.js's default plain page. No interactive flair, no
 * Framer Motion, no client component — pure server-rendered markup
 * styled with Tailwind so it's effectively free to deliver.
 */
export default function NotFound() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 py-24 text-center">
      {/* Big 404 ghost in the background. */}
      <span
        aria-hidden
        className="pointer-events-none absolute select-none font-display text-[28vw] font-bold leading-none text-saturn-gold/[0.04] md:text-[20vw]"
      >
        404
      </span>

      <div className="relative z-10 mx-auto max-w-xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-saturn-gold">
          ▸ Transmission failed · code 404
        </p>

        <h1 className="mt-5 font-display text-5xl font-bold leading-[0.95] tracking-tight text-saturn-cream md:text-6xl">
          Signal lost.
        </h1>

        <p className="mx-auto mt-5 max-w-md font-mono text-sm leading-relaxed text-saturn-cream/60">
          The orbit you requested isn&apos;t mapped on this chart. Maybe a
          typo in the URL, maybe a planet that was never deployed.
        </p>

        <Link
          href="/"
          className="group mt-9 inline-flex items-center gap-2 border border-saturn-gold/55 bg-saturn-gold/[0.06] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.25em] text-saturn-gold transition-all duration-300 hover:border-saturn-gold hover:bg-saturn-gold/[0.14] hover:text-saturn-cream"
        >
          <span>Return to surface</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </main>
  );
}
