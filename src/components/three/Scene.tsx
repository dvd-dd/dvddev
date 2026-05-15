"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, type RefObject } from "react";
import { ACESFilmicToneMapping } from "three";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
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
    const targetX = mouse.current.x * 0.25;
    const targetY = mouse.current.y * 0.15;

    camera.position.x = lerp(camera.position.x, targetX, 0.05);
    camera.position.y = lerp(camera.position.y, targetY, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/**
 * Full-bleed cinematic scene.
 *
 * Performance notes (after first-pass tuning revealed lag + flicker on
 * mid-tier GPUs):
 *
 * • DPR capped at 1.5 — retina at 2.0 means 4x the fragment cost for a
 *   barely-perceptible quality lift at this content density.
 * • Composer lives INSIDE <Suspense>. With it outside, the composer
 *   would try to initialize before textures resolved and intermittently
 *   throw `Cannot read properties of null (reading 'alpha')` from the
 *   Bloom blend-mode — that race was the source of the early flicker.
 * • Bloom mipmapBlur and ChromaticAberration both removed: the former
 *   runs multi-pass downsamples per frame, the latter adds a full-
 *   screen shader pass for a sub-pixel visual gain. Vignette + Bloom
 *   alone keep the cinematic feel for ~40% of the GPU cost.
 * • `alpha: false` is gone: with opaque canvas + EffectComposer some
 *   builds of `postprocessing` mis-read the framebuffer alpha channel.
 *   Defaulting to alpha:true is harmless here (skybox covers every
 *   pixel) and dodges the bug entirely.
 * • `powerPreference: "high-performance"` nudges Chrome/Edge to pick
 *   the discrete GPU when one exists.
 */
export function Scene() {
  const mouse = useMousePosition();

  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 8], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        toneMapping: ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
    >
      <ambientLight intensity={0.15} />
      <directionalLight
        position={[5, 2, 5]}
        intensity={1.8}
        color="#fff4d6"
      />
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

        {/* Inside Suspense so the composer only initialises once the
            scene has at least one valid material to read from. */}
        <EffectComposer>
          <Bloom
            intensity={0.6}
            luminanceThreshold={0.6}
            luminanceSmoothing={0.9}
          />
          <Vignette eskil={false} offset={0.15} darkness={0.85} />
        </EffectComposer>
      </Suspense>

      <CameraParallax mouse={mouse} />
    </Canvas>
  );
}
