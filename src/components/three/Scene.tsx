"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, type RefObject } from "react";
import { ACESFilmicToneMapping } from "three";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Vignette,
} from "@react-three/postprocessing";
import { Saturn } from "./Saturn";
import { MilkyWayBackground } from "./MilkyWayBackground";
import { useMousePosition } from "@/hooks/useMousePosition";
import { lerp } from "@/lib/utils";
import type { MousePosition } from "@/hooks/useMousePosition";

/**
 * Camera-only component: reads the shared mouse ref each frame and
 * lerps the camera into the target offset. Kept inside <Canvas> so
 * `useThree` / `useFrame` have a valid R3F context.
 */
function CameraParallax({ mouse }: { mouse: RefObject<MousePosition> }) {
  const { camera } = useThree();

  useFrame(() => {
    // Smaller amplitudes now that the camera sits further out (z=8).
    // The earlier 0.4/0.25 would translate to a more aggressive shake
    // at this distance and overshoot the framing of the Saturn corner.
    const targetX = mouse.current.x * 0.25;
    const targetY = mouse.current.y * 0.15;

    camera.position.x = lerp(camera.position.x, targetX, 0.05);
    camera.position.y = lerp(camera.position.y, targetY, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/**
 * Full-bleed cinematic scene. The Milky Way panorama is the background
 * (no more solid color attach — the texture provides every pixel).
 * Saturn is intentionally offset to the lower-right back of frame so
 * the centered DVD logo gets its own optical real estate.
 *
 * Tone mapping: ACES Filmic gives cinema-feel highlights and rolls off
 * blown-out values gracefully — important because the warm key light
 * + atmosphere additive blending can otherwise push the planet's lit
 * side into clipping white.
 */
export function Scene() {
  const mouse = useMousePosition();

  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 8], fov: 50 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: false,
        toneMapping: ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
    >
      {/* Subtle base fill so the unlit hemisphere of Saturn isn't
          pitch black — without this, the planet reads as a crescent. */}
      <ambientLight intensity={0.15} />

      {/* Warm "sun" key light — gives the planet a cinematic golden
          cast on the camera-facing side. */}
      <directionalLight
        position={[5, 2, 5]}
        intensity={1.8}
        color="#fff4d6"
      />

      {/* Cool rim light from the opposite side: reads as bounced light
          from distant nebulae and gives the dark side a faint blue
          contour. Without it, the unlit half merges into the Milky Way. */}
      <pointLight
        position={[-6, 0, -3]}
        intensity={0.4}
        color="#6688ff"
      />

      <Suspense fallback={null}>
        <MilkyWayBackground />
        <group position={[2.8, -0.8, -1]}>
          <Saturn />
        </group>
      </Suspense>

      <CameraParallax mouse={mouse} />

      {/* Post-processing pipeline.
            Bloom: extracts highlights above the luminance threshold and
              haloes them — picks up the Milky Way's brightest stars and
              the lit edge of the planet.
            ChromaticAberration: tiny RGB offset on the corners gives a
              real-lens feel without smearing the center.
            Vignette: darkens corners; "eskil=false" uses the smoother
              Gaussian falloff instead of Eskil's harder cosine. */}
      <EffectComposer>
        <Bloom
          intensity={0.7}
          luminanceThreshold={0.4}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <ChromaticAberration offset={[0.0006, 0.0006]} />
        <Vignette eskil={false} offset={0.15} darkness={0.85} />
      </EffectComposer>
    </Canvas>
  );
}
