"use client";

import { useMemo } from "react";
import * as THREE from "three";

/**
 * Saturn's ring system. Built from 3 stacked rings with descending
 * opacity to suggest layered ice/dust bands. Each ring uses a
 * DoubleSide material so it stays visible regardless of camera angle.
 */
export function RingSystem() {
  // Memoize ring configs — they're static, no need to rebuild per frame.
  const rings = useMemo(
    () => [
      { inner: 1.4, outer: 2.0, opacity: 0.8, color: "#d4a574" },
      { inner: 2.05, outer: 2.45, opacity: 0.5, color: "#c89860" },
      { inner: 2.5, outer: 2.85, opacity: 0.3, color: "#f5e6d3" },
    ],
    []
  );

  return (
    // Tilt the entire ring system so it reads as a planetary plane,
    // not a flat disc straight-on. -0.4 rad ≈ 23° (Saturn's real tilt).
    <group rotation={[-0.4, 0, 0.1]}>
      {rings.map((ring, index) => (
        <mesh key={index} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[ring.inner, ring.outer, 128]} />
          <meshStandardMaterial
            color={ring.color}
            side={THREE.DoubleSide}
            transparent
            opacity={ring.opacity}
            roughness={0.8}
            metalness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}
