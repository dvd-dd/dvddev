"use client";

import { useCallback, useMemo, useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Html, useTexture } from "@react-three/drei";
import {
  AdditiveBlending,
  BackSide,
  Color,
  DoubleSide,
  MathUtils,
  SRGBColorSpace,
  type Mesh,
  type ShaderMaterial,
} from "three";
import {
  atmosphereFragmentShader,
  atmosphereVertexShader,
} from "./AtmosphereMaterial";
import type { Project } from "@/lib/projects";

interface PlanetProps {
  project: Project;
  hovered: boolean;
  active: boolean;
  onClick: () => void;
  onPointerOver: () => void;
  onPointerOut: () => void;
}

/*
 * Atmosphere intensity targets. Hovered planets pop harder so the
 * user gets feedback before clicking. Active (panel open) drops back
 * to a steady mid value so it reads as "selected" without screaming.
 */
const IDLE_INTENSITY = 1.0;
const HOVER_INTENSITY = 2.2;
const ACTIVE_INTENSITY = 1.7;
// Lerp speed for the intensity transition; tuned so hover feels
// snappy (~5 frames to commit) without ever clipping.
const INTENSITY_LERP = 0.12;

/**
 * Single planet rendering — textured sphere + Fresnel atmosphere
 * shader, optional ring system, and an HTML designation label that
 * appears on hover. Designed to be mapped over <Project> entries
 * by <ProjectsScene>.
 */
export function Planet({
  project,
  hovered,
  active,
  onClick,
  onPointerOver,
  onPointerOut,
}: PlanetProps) {
  const planetRef = useRef<Mesh>(null);
  const atmosphereMaterialRef = useRef<ShaderMaterial>(null);

  const texture = useTexture(project.planet.texture);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 8;

  // Memoized uniforms keep the same object stable across renders so
  // useFrame can mutate uIntensity.value without React tearing it down.
  const atmosphereUniforms = useMemo(
    () => ({
      uColor: { value: new Color(project.planet.atmosphereColor) },
      uPower: { value: 2.5 },
      uIntensity: { value: IDLE_INTENSITY },
    }),
    [project.planet.atmosphereColor]
  );

  useFrame(() => {
    // Spin the body itself.
    if (planetRef.current) {
      planetRef.current.rotation.y += project.planet.rotationSpeed;
    }
    // Lerp atmosphere glow toward the current target state.
    if (atmosphereMaterialRef.current) {
      const target = hovered
        ? HOVER_INTENSITY
        : active
          ? ACTIVE_INTENSITY
          : IDLE_INTENSITY;
      const u = atmosphereMaterialRef.current.uniforms.uIntensity;
      u.value = MathUtils.lerp(u.value, target, INTENSITY_LERP);
    }
  });

  // Cursor feedback — sit outside R3F's event handler chain because
  // we want to toggle the body cursor (not just the canvas's).
  const handleOver = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      // Stop propagation so a planet behind doesn't also receive
      // the hover (R3F bubbles 3D events the same way the DOM does).
      e.stopPropagation();
      document.body.style.cursor = "pointer";
      onPointerOver();
    },
    [onPointerOver]
  );
  const handleOut = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      document.body.style.cursor = "";
      onPointerOut();
    },
    [onPointerOut]
  );
  const handleClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      onClick();
    },
    [onClick]
  );

  const { radius } = project.planet;

  return (
    <group position={project.planet.position}>
      {/* Planet body — textured sphere, hit target for events. */}
      <mesh
        ref={planetRef}
        onPointerOver={handleOver}
        onPointerOut={handleOut}
        onClick={handleClick}
      >
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.85}
          metalness={0}
        />
      </mesh>

      {/* Atmosphere halo — slightly larger BackSide sphere with the
          Fresnel shader. Intensity is animated by useFrame above. */}
      <mesh scale={1.04}>
        <sphereGeometry args={[radius, 32, 32]} />
        <shaderMaterial
          ref={atmosphereMaterialRef}
          vertexShader={atmosphereVertexShader}
          fragmentShader={atmosphereFragmentShader}
          uniforms={atmosphereUniforms}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
          side={BackSide}
        />
      </mesh>

      {/* Optional Saturn-style ring (used by Phoenix). Sized
          relative to the planet radius so it scales sensibly. */}
      {project.planet.ringEnabled && (
        <mesh rotation={[Math.PI / 2.4, 0, 0.4]}>
          <ringGeometry args={[radius * 1.3, radius * 2.0, 128, 1]} />
          <meshBasicMaterial
            color={project.planet.ringColor ?? "#ffffff"}
            side={DoubleSide}
            transparent
            opacity={0.6}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Designation HUD label — only mounted when hovered. drei's
          <Html> portals real DOM into the canvas's world-space, so
          the label tracks the planet at the correct screen position
          with sub-pixel accuracy. */}
      {hovered && (
        <Html
          position={[0, radius + 0.4, 0]}
          center
          distanceFactor={8}
          style={{ pointerEvents: "none" }}
        >
          <span className="whitespace-nowrap rounded-sm border border-saturn-gold/50 bg-space-black/70 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-saturn-cream backdrop-blur-sm">
            {project.designation}
          </span>
        </Html>
      )}
    </group>
  );
}
