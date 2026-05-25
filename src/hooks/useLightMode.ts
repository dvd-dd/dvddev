"use client";

import { useEffect, useState } from "react";

/**
 * Strict mobile viewport check (≤ 767px wide). Use this when the
 * decision is STRUCTURAL — swap whole UIs out for a mobile-tailored
 * one — rather than just "lighten the effects." For animation/effect
 * gating use [[useLightMode]] which ALSO honors prefers-reduced-motion.
 *
 * Defaults to `true` during SSR + first client paint, same rationale
 * as useLightMode: never serve the heavy desktop layout to a phone
 * even for one frame.
 */
export function useIsMobile(): boolean {
  const [mobile, setMobile] = useState(true);

  useEffect(() => {
    const m = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(m.matches);
    update();
    m.addEventListener("change", update);
    return () => m.removeEventListener("change", update);
  }, []);

  return mobile;
}

/**
 * Returns true when the site should ship the LIGHT path:
 *   - viewport ≤ 767px (mobile), OR
 *   - user has `prefers-reduced-motion: reduce` enabled.
 *
 * Consumers use it to swap heavy effects (SVG blur filters, looping
 * pulse animations, the hero video) for cheaper substitutes (no
 * filter, static halos, poster image).
 *
 * Default is `true` during SSR + first client paint. This is the
 * intentionally safer side: slow phones never get a frame of the
 * heavy version, and accessibility-sensitive users never see motion
 * even briefly. Desktops with regular motion flip to `false` on the
 * first effect tick — imperceptible at 60fps on a real desktop.
 */
export function useLightMode(): boolean {
  const [light, setLight] = useState(true);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setLight(mobile.matches || reduce.matches);
    update();
    mobile.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      mobile.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  return light;
}
