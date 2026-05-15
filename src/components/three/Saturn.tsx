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
// exact same lean — without this, ring math (which lives in horizontal
// space) drifts out of phase with the planet's banding.
const SATURN_AXIAL_TILT = 0.466; // 26.73°

/**
 * Saturn: textured body + Fresnel atmosphere + ring system.
 * All three live under a single tilted <group> so the planetary
 * axis stays consistent and the auto-rotation only animates the
 * body's spin (not the tilt).
 */
export function Saturn() {
  const planetRef = useRef<Mesh>(null);

  const saturnTexture = useTexture("/textures/8k_saturn.jpg");

  // Texture conditioning runs once. We can't set these inline as JSX
  // attributes because `useTexture` returns a mutable Three.js Texture
  // instance — mutating it is the standard pattern.
  useMemo(() => {
    saturnTexture.colorSpace = SRGBColorSpace;
    // anisotropy=16 keeps the equatorial bands sharp at grazing angles
    // where bilinear filtering alone would smear them into mush.
    saturnTexture.anisotropy = 16;
  }, [saturnTexture]);

  // Atmosphere uniforms: memoized so we don't allocate a new Color on
  // every render (Three.js wouldn't notice, but it churns garbage).
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
      // Spin only the planet body — the atmosphere shell and rings
      // share the parent group, so they orbit-lock visually with it.
      planetRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group rotation={[0, 0, SATURN_AXIAL_TILT]}>
      {/* Planet body */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[2, 128, 128]} />
        <meshStandardMaterial
          map={saturnTexture}
          roughness={0.85}
          metalness={0}
        />
      </mesh>

      {/* Atmosphere halo: a slightly larger inside-out sphere whose
          fragment shader paints only the rim (Fresnel) and additively
          blends into the scene. Depth-write off so it never occludes
          the body or rings stacked behind it. */}
      <mesh scale={1.04}>
        <sphereGeometry args={[2, 64, 64]} />
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
