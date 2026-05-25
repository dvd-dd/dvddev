"use client";

import { useEffect, useState } from "react";

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
