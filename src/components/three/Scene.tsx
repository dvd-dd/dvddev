"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, type RefObject } from "react";
import { Saturn } from "./Saturn";
import { StarField } from "./StarField";
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
    // Small offset — too much breaks the "framed shot" feel.
    const targetX = mouse.current.x * 0.4;
    const targetY = mouse.current.y * 0.25;

    camera.position.x = lerp(camera.position.x, targetX, 0.05);
    camera.position.y = lerp(camera.position.y, targetY, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/**
 * Full-bleed cinematic scene. Sits behind the hero overlay. The
 * Canvas itself is mounted on a positioned wrapper so it can be
 * absolutely overlaid by the hero copy. `dpr` capped at 2 keeps
 * retina sharp without nuking GPUs at 3x+.
 */
export function Scene() {
  const mouse = useMousePosition();

  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false }}
    >
      {/* Tinted dark void — slightly bluer than pure black to read as space. */}
      <color attach="background" args={["#050510"]} />

      {/* Subtle base fill so the unlit side of Saturn isn't pitch black. */}
      <ambientLight intensity={0.2} />

      {/* Warm "sun" key light — gives the planet a cinematic golden cast. */}
      <directionalLight
        position={[5, 3, 5]}
        intensity={2}
        color="#fff4d6"
      />

      <Suspense fallback={null}>
        <Saturn />
        <StarField />
      </Suspense>

      <CameraParallax mouse={mouse} />
    </Canvas>
  );
}
