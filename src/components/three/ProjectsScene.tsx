"use client";

import { Suspense, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Bloom,
  EffectComposer,
  Vignette,
} from "@react-three/postprocessing";
import { ACESFilmicToneMapping, Vector3 } from "three";
import { Planet } from "./Planet";
import { PROJECTS, getProjectById, type Project } from "@/lib/projects";
import { lerp } from "@/lib/utils";

interface ProjectsSceneProps {
  /** Which project is currently "in focus". Drives camera framing
   *  and the active-state styling on each planet. Controlled by
   *  the parent so closing the panel can reset the camera. */
  activeId: string | null;
  /** Called when user clicks a planet — opens the info panel. */
  onActivate: (project: Project) => void;
}

/**
 * Camera-only helper inside the Canvas. Lerps the camera toward a
 * target position + look-at every frame. When `activeId` is set,
 * frames the active planet in 3/4 view; when null, returns to the
 * neutral overview.
 *
 * Target framing math:
 *   targetPos = [px * 0.6, py * 0.7, pz + 3.5]
 *   The 0.6/0.7 scaling means the camera doesn't fly to the exact
 *   planet position — it stays partway out so the planet appears
 *   centered AND visibly in 3D space, not flat against the camera.
 */
function CameraController({ activeId }: { activeId: string | null }) {
  const { camera } = useThree();
  // Reused vectors — avoid garbage churn in the per-frame loop.
  const targetPos = new Vector3(0, 0, 9);
  const targetLook = new Vector3(0, 0, 0);

  useFrame(() => {
    const project = getProjectById(activeId);
    if (project) {
      const [px, py, pz] = project.planet.position;
      targetPos.set(px * 0.6, py * 0.7, pz + 3.5);
      targetLook.set(px, py, pz);
    } else {
      targetPos.set(0, 0, 9);
      targetLook.set(0, 0, 0);
    }

    camera.position.x = lerp(camera.position.x, targetPos.x, 0.04);
    camera.position.y = lerp(camera.position.y, targetPos.y, 0.04);
    camera.position.z = lerp(camera.position.z, targetPos.z, 0.04);
    camera.lookAt(targetLook);
  });

  return null;
}

/**
 * Full-bleed scene rendering all 6 project planets. Transparent
 * canvas — the section gradient behind it shows through, which
 * lets the global HyperspaceStreaks layer remain visible through
 * the planets' negative space.
 *
 * Bloom intensity 0.45 (vs hero's 0.6) — six planets vs one means
 * bloom adds up; staying conservative keeps the textures legible
 * instead of washing them into uniform glow bulbs.
 */
export function ProjectsScene({ activeId, onActivate }: ProjectsSceneProps) {
  // Hover stays internal — only the canvas cares about hover state.
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true, // gradient section bg shows through
        powerPreference: "high-performance",
        toneMapping: ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
      }}
    >
      {/* Soft fill so no planet hemisphere goes pitch black. */}
      <ambientLight intensity={0.4} />

      {/* Warm key light — same direction as the hero scene to keep
          a consistent sunlight angle across the page. */}
      <directionalLight
        position={[3, 4, 5]}
        intensity={1.2}
        color="#fff4d6"
      />

      {/* Cool back rim from the far side — distant nebula bounce. */}
      <pointLight
        position={[-5, -2, -3]}
        intensity={0.5}
        color="#5577aa"
      />

      <Suspense fallback={null}>
        {PROJECTS.map((project) => (
          <Planet
            key={project.id}
            project={project}
            hovered={hoveredId === project.id}
            active={activeId === project.id}
            onPointerOver={() => setHoveredId(project.id)}
            onPointerOut={() =>
              setHoveredId((prev) => (prev === project.id ? null : prev))
            }
            onClick={() => onActivate(project)}
          />
        ))}

        <EffectComposer>
          <Bloom
            intensity={0.45}
            luminanceThreshold={0.55}
            luminanceSmoothing={0.9}
          />
          <Vignette eskil={false} offset={0.2} darkness={0.7} />
        </EffectComposer>
      </Suspense>

      <CameraController activeId={activeId} />
    </Canvas>
  );
}
