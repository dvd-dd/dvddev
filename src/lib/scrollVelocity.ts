/**
 * Shared mutable ref for the current Lenis scroll velocity.
 *
 * Why a plain ref and not a context / motion-value:
 *   • Visual layers (HyperspaceStreaks) read this every animation
 *     frame; a re-render-driven mechanism would either thrash React
 *     60 times/sec or force the consumer to subscribe manually.
 *   • The producer is Lenis's RAF tick — no React involvement at all.
 *
 * Convention: `current` carries the signed velocity Lenis reports.
 * Positive = scrolling down, negative = scrolling up. Magnitude is
 * the per-frame delta in scroll pixels (give-or-take Lenis's units).
 */
export const scrollVelocityRef = { current: 0 };
