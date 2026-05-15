"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";
import { RingSystem } from "./RingSystem";

/**
 * Saturn — sphere body + tilted ring system. Drives its own slow
 * Y-axis spin via `useFrame` so the hero feels alive even when the
 * user is still. Imported rings live in a sibling component so we can
 * later texture / animate them independently.
 */
export function Saturn() {
  const planetRef = useRef<Mesh>(null);

  useFrame(() => {
    if (planetRef.current) {
      // 0.001 rad/frame ≈ subtle drift; matches the "almost-still" feel
      // a real planet has at this camera distance.
      planetRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      <mesh ref={planetRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#d4a574"
          roughness={0.7}
          metalness={0.15}
        />
      </mesh>
      <RingSystem />
    </group>
  );
}
