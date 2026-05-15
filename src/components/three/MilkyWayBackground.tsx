"use client";

import { useTexture } from "@react-three/drei";
import {
  BackSide,
  EquirectangularReflectionMapping,
  SRGBColorSpace,
} from "three";

/**
 * Massive inside-out sphere wearing the 8K Milky Way equirectangular
 * panorama as a skybox. The texture carries all the visual detail —
 * the geometry just needs to be a sphere convincing enough that the
 * eye reads it as infinitely distant.
 *
 * 32 segments (down from 64) is plenty for a skybox: the texture
 * dominates every pixel and the polygonal edges sit at the screen
 * silhouette where nothing else competes for resolution.
 *
 * `scale={[-1, 1, 1]}` flips the X axis so the texture reads
 * correctly from the INSIDE of the sphere (otherwise it would be
 * mirrored). One-liner UV-equivalent at zero shader cost.
 */
export function MilkyWayBackground() {
  const milkyWayTexture = useTexture("/textures/8k_stars_milky_way.jpg");
  milkyWayTexture.mapping = EquirectangularReflectionMapping;
  milkyWayTexture.colorSpace = SRGBColorSpace;

  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[500, 32, 32]} />
      <meshBasicMaterial map={milkyWayTexture} side={BackSide} />
    </mesh>
  );
}
