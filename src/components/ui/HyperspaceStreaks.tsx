"use client";

import { useEffect, useRef } from "react";
import { scrollVelocityRef } from "@/lib/scrollVelocity";

/*
 * Fullscreen Canvas 2D layer behind all page content. At rest, draws
 * 240 faint dots scattered randomly. As the page scrolls, those dots
 * elongate into directional streaks proportional to Lenis's reported
 * scroll velocity — the "warp drive engaged" feel. Direction inverts
 * with scroll direction so scrolling up streaks upward.
 *
 * Why Canvas 2D (not WebGL/SVG):
 *   • 240 lines is well within Canvas 2D's per-frame budget.
 *   • No GPU contention with the hero video / planet scene.
 *   • Zero shader compilation cost on first paint.
 */

const STAR_COUNT = 240;
const MAX_STREAK_LENGTH = 80;
const VELOCITY_MULTIPLIER = 6;
const STAR_COLOR = "245, 230, 211"; // saturn-cream RGB

interface Star {
  x: number;
  y: number;
  brightness: number;
}

export function HyperspaceStreaks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: Star[] = [];

    /** (Re)spawn stars across the new viewport size on resize. */
    const spawnStars = () => {
      stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        // Brightness biased toward dim; only a few stars are bright.
        // Skews the look toward "deep space with occasional pinpoints"
        // rather than "every star screaming".
        brightness: Math.pow(Math.random(), 1.4),
      }));
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      spawnStars();
    };
    resize();
    window.addEventListener("resize", resize);

    let rafId = 0;
    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const velocity = scrollVelocityRef.current;
      const streakLength = Math.min(
        Math.abs(velocity) * VELOCITY_MULTIPLIER,
        MAX_STREAK_LENGTH
      );
      // Inverse: positive velocity = scrolling down = streaks go UP
      // (relative motion of stars is opposite to the camera).
      const direction = velocity > 0 ? -1 : 1;

      for (const star of stars) {
        const alpha = star.brightness * 0.5;
        if (streakLength < 1) {
          // Rest state: faint dots. Tiny circles draw cheaper than
          // 1×1 rects on most browsers due to fillStyle reuse.
          ctx.fillStyle = `rgba(${STAR_COLOR}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, 0.8, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Streak state: line from star position along scroll axis.
          // Stroke is the same color/alpha as the dot it replaced —
          // brightness variance carries through to streak intensity.
          ctx.strokeStyle = `rgba(${STAR_COLOR}, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(star.x, star.y + streakLength * direction);
          ctx.stroke();
        }
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      // z-5: above page background, below all content (which sits at
      // z-10+). pointer-events off so it never blocks interactions.
      className="pointer-events-none fixed inset-0 z-[5]"
    />
  );
}
