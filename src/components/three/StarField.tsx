"use client";

import { Stars } from "@react-three/drei";

/**
 * Thin wrapper around drei's <Stars>. Centralised here so the
 * parameters (count, radius, depth) live with the rest of our
 * cosmic constants instead of being inlined inside <Scene>.
 */
export function StarField() {
  return (
    <Stars
      radius={100}
      depth={50}
      count={5000}
      factor={4}
      saturation={0}
      fade
      speed={1}
    />
  );
}
