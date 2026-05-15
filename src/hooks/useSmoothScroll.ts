"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Boots a Lenis instance that drives the page scroll on every RAF tick.
 * Returns nothing — consumers just mount it once at the root.
 *
 * Why a hook (not just a component): the cleanup in `useEffect` is the
 * cleanest way to guarantee we destroy Lenis on unmount, even under
 * React 18+ strict-mode double-invocation.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      // 0.8s lerp catches up to wheel input fast enough that scroll-
      // driven transforms (hero zoom, helmet parallax) feel TIED to
      // the wheel motion, not chasing it. 1.2s was technically
      // smoother but introduced a perceptible delay between scroll
      // input and the visual response — which read as "desynced".
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}
