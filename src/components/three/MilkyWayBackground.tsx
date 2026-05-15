"use client";

import { useMemo } from "react";
import { useTexture } from "@react-three/drei";
import {
  BackSide,
  EquirectangularReflectionMapping,
  SRGBColorSpace,
} from "three";

/**
 * Massive inside-out sphere wearing the 8K Milky Way equirectangular
 * panorama as a skybox. Replaces drei's procedural <Stars> with a
 * real photographic background — the difference is the dust lanes,
 * the galactic core, and the soft cluster glow you can't fake with
 * particle dots.
 *
 * `scale={[-1, 1, 1]}` flips the geometry horizontally so the texture
 * reads correctly from the inside of the sphere instead of mirrored.
 * The alternative (negating the texture's UVs) is more invasive; this
 * one-liner achieves the same thing at zero shader cost.
 *
 * Radius 500 is comfortably outside any plausible camera or Saturn
 * position — the skybox stays "at infinity" no matter the parallax.
 */
export function MilkyWayBackground() {
  const milkyWayTexture = useTexture("/textures/8k_stars_milky_way.jpg");

  useMemo(() => {
    milkyWayTexture.mapping = EquirectangularReflectionMapping;
    milkyWayTexture.colorSpace = SRGBColorSpace;
  }, [milkyWayTexture]);

  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[500, 64, 64]} />
      <meshBasicMaterial map={milkyWayTexture} side={BackSide} />
    </mesh>
  );
}
