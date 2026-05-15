"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import {
  AdditiveBlending,
  BackSide,
  Color,
  SRGBColorSpace,
  type Mesh,
} from "three";
import { RingSystem } from "./RingSystem";
import {
  atmosphereFragmentShader,
  atmosphereVertexShader,
} from "./AtmosphereMaterial";

// Real axial tilt of Saturn (26.73°) in radians. Applied at the group
// level so the body, the atmosphere shell, and the rings all share the
// exact same lean.
const SATURN_AXIAL_TILT = 0.466;

export function Saturn() {
  const planetRef = useRef<Mesh>(null);

  const saturnTexture = useTexture("/textures/8k_saturn.jpg");
  // Inline texture conditioning. Assigning the same values on every
  // render is idempotent and cheaper than wrapping in useEffect; the
  // texture instance is stable across renders.
  saturnTexture.colorSpace = SRGBColorSpace;
  // 8 ≈ visually indistinguishable from 16 for our viewing distance,
  // at half the per-fragment sampling cost.
  saturnTexture.anisotropy = 8;

  const atmosphereUniforms = useMemo(
    () => ({
      uColor: { value: new Color("#d4a574") },
      uPower: { value: 2.5 },
      uIntensity: { value: 1.3 },
    }),
    []
  );

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group rotation={[0, 0, SATURN_AXIAL_TILT]}>
      {/* Planet body. 64 segments (down from 128) — the silhouette is
          still circular to the eye and the banding stays sharp because
          the detail is in the texture, not the geometry. */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={saturnTexture}
          roughness={0.85}
          metalness={0}
        />
      </mesh>

      {/* Atmosphere halo. 32 segments is plenty; the Fresnel rim is
          a fragment-shader effect, so geometry density only affects the
          smoothness of the silhouette — which the planet itself owns. */}
      <mesh scale={1.04}>
        <sphereGeometry args={[2, 32, 32]} />
        <shaderMaterial
          vertexShader={atmosphereVertexShader}
          fragmentShader={atmosphereFragmentShader}
          uniforms={atmosphereUniforms}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
          side={BackSide}
        />
      </mesh>

      <RingSystem />
    </group>
  );
}
