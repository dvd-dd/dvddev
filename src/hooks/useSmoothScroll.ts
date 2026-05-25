"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Boots a Lenis instance that drives the page scroll on every RAF tick.
 * Returns nothing — consumers just mount it once at the root.
 *
 * Skipped on touch devices and when `prefers-reduced-motion: reduce`
 * is set: native momentum scrolling on iOS/Android is already smooth
 * and fights with Lenis's lerp; running both at once costs a RAF for
 * no visual gain. Reduced-motion users explicitly opted out of this
 * kind of inertial drift.
 *
 * Why a hook (not just a component): the cleanup in `useEffect` is the
 * cleanest way to guarantee we destroy Lenis on unmount, even under
 * React 18+ strict-mode double-invocation.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)")
      .matches;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (isTouch || prefersReduced) return;

    const lenis = new Lenis({
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
