"use client";

import { useEffect, useMemo, useRef } from "react";
import { useTexture } from "@react-three/drei";
import {
  DoubleSide,
  SRGBColorSpace,
  Vector3,
  type BufferGeometry,
} from "three";

// Inner / outer radii of the ring annulus. Tuned so the inner edge
// hovers just outside Saturn's body (radius 2.0) and the outer edge
// gives the rings cinematic prominence at our camera distance.
const RING_INNER_RADIUS = 2.5;
const RING_OUTER_RADIUS = 4.8;

/**
 * Saturn's rings, rendered as a single annulus with the real 8K
 * ring-alpha texture mapped radially.
 *
 * The catch: Three.js' RingGeometry builds UVs as if the ring were a
 * flat square in (x,y) — which means the texture wraps awkwardly,
 * stretching tangentially and pinching radially. The Solar System
 * Scope ring texture, on the other hand, is laid out radially:
 * inner edge → outer edge runs along U (0 → 1), V is mostly redundant.
 *
 * The useEffect below remaps every vertex UV so:
 *   U = (distance_from_center - inner) / (outer - inner)
 *   V = 0.5                              (any constant; texture is 1D-ish)
 *
 * Without this, the famous Cassini Division shows up as a blurry
 * smear instead of a crisp dark band. WITH it, every gap and band
 * in the NASA-derived texture lands at the correct radius.
 *
 * NOTE: the parent group in Saturn.tsx already applies the 26.7°
 * axial tilt. We rotate the mesh by π/2 on X to lay it flat in the
 * planet's equatorial plane. Don't add tilt here — that would double
 * up with the parent's rotation.
 */
export function RingSystem() {
  const geomRef = useRef<BufferGeometry>(null);
  const ringTexture = useTexture("/textures/8k_saturn_ring_alpha.png");

  useMemo(() => {
    ringTexture.colorSpace = SRGBColorSpace;
    // High anisotropy is critical here: when the rings are viewed at
    // shallow angles (i.e. almost always, given the tilt), the radial
    // bands compress dramatically in screen space. Anything < 16
    // makes the Cassini Division blur into the surrounding band.
    ringTexture.anisotropy = 16;
  }, [ringTexture]);

  useEffect(() => {
    const geom = geomRef.current;
    if (!geom) return;
    const pos = geom.attributes.position;
    const uv = geom.attributes.uv;
    const v = new Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const dist = v.length();
      const t = (dist - RING_INNER_RADIUS) / (RING_OUTER_RADIUS - RING_INNER_RADIUS);
      uv.setXY(i, t, 0.5);
    }
    uv.needsUpdate = true;
  }, []);

  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry
        ref={geomRef}
        args={[RING_INNER_RADIUS, RING_OUTER_RADIUS, 256, 4]}
      />
      {/* Rings don't have surface normals worth lighting — the texture
          already encodes the ice/dust shading. BasicMaterial is the
          honest choice; it also dodges the rim-light bleed-through
          that StandardMaterial would otherwise pick up from the
          atmosphere's back-side shader. */}
      <meshBasicMaterial
        map={ringTexture}
        side={DoubleSide}
        transparent
        // alphaTest discards near-fully-transparent pixels so the
        // ring's outer halo doesn't write false depth and clip the
        // atmosphere glow behind it.
        alphaTest={0.01}
        depthWrite={false}
      />
    </mesh>
  );
}
