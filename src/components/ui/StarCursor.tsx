"use client";

import { useEffect, useRef } from "react";

/*
 * Pointer trail rendered as a fullscreen <canvas> overlay. As the
 * cursor moves, small glowing "stars" spawn at the cursor position
 * with a slight outward velocity (matching the cursor's direction +
 * jitter) and minor gravity. Each star fades over ~1s.
 *
 * The shooting-star FEEL comes from never fully clearing the canvas:
 * each frame we paint a transparent black with
 * `globalCompositeOperation: destination-out` which "erases" 18% of
 * whatever's currently on the canvas. The result is that the dot
 * trails of moving stars decay across multiple frames, reading as a
 * motion-blurred streak instead of discrete dots.
 *
 * Performance / a11y guards:
 *   • Skip on touch / coarse-pointer devices (matchMedia pointer:fine).
 *   • Skip if user prefers reduced motion.
 *   • Throttle spawn to every 12ms (≈80Hz max) regardless of how fast
 *     the OS reports mousemove (high-refresh displays can fire 240Hz).
 *   • Hard cap MAX_STARS so cursor whips don't unbound the array.
 */

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  color: string;
}

// Palette tuned to the brand: warm cream + pink-galaxy hits + the
// saturn-gold accent. Randomly picked per star so the trail reads
// as a multi-colored sparkle, not a monochrome streak.
const STAR_COLORS = [
  "#fafafa", // star-white
  "#fce7f3", // pink-100
  "#fbcfe8", // pink-200
  "#f472b6", // pink-400
  "#d4a574", // saturn-gold
];

const MAX_STARS = 120;
const SPAWN_INTERVAL_MS = 12;
const TRAIL_FADE_ALPHA = 0.18; // higher = shorter trail

export function StarCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Touch devices: cursor trails are pointless and burn battery.
    if (!window.matchMedia("(pointer: fine)").matches) return;
    // Honor user motion prefs.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /**
     * Match the canvas bitmap size to the viewport AND to the device
     * pixel ratio, then `setTransform` (not `scale`) so re-running
     * resize doesn't compound the scale on repeated calls.
     */
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const stars: Star[] = [];
    let lastX = 0;
    let lastY = 0;
    let lastSpawn = 0;

    const onMove = (event: MouseEvent) => {
      const now = performance.now();
      if (now - lastSpawn < SPAWN_INTERVAL_MS) return;
      lastSpawn = now;

      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      lastX = event.clientX;
      lastY = event.clientY;

      const speed = Math.hypot(dx, dy);
      // No stars when the cursor is essentially stationary — without
      // this, idle micro-movements (Mac trackpad noise) leak a slow
      // drip of stars at the resting cursor position.
      if (speed < 1.5) return;

      // Faster cursor → more stars per event (capped at 3).
      const count = Math.min(3, Math.max(1, Math.floor(speed / 8)));

      for (let i = 0; i < count; i++) {
        if (stars.length >= MAX_STARS) break;
        stars.push({
          x: event.clientX,
          y: event.clientY,
          // Inherit a fraction of cursor velocity + jitter so the
          // streak orientation follows the gesture but each star
          // diverges slightly (sparkle, not laser).
          vx: dx * 0.2 + (Math.random() - 0.5) * 1.5,
          vy: dy * 0.2 + (Math.random() - 0.5) * 1.5 + 0.3,
          life: 1,
          size: 1 + Math.random() * 1.8,
          color: STAR_COLORS[(Math.random() * STAR_COLORS.length) | 0],
        });
      }
    };
    window.addEventListener("mousemove", onMove);

    let rafId = 0;

    const tick = () => {
      // Erase a slice of the previous frame instead of clearing it
      // outright. This is what creates the trailing streak — moving
      // stars leave faint copies behind that decay over ~6 frames.
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = `rgba(0, 0, 0, ${TRAIL_FADE_ALPHA})`;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.globalCompositeOperation = "source-over";

      // Walk backwards so splice() doesn't skip the next index.
      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.06; // gentle gravity → "shooting star falls" feel
        s.life -= 0.025;

        if (s.life <= 0) {
          stars.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = s.life;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 12 * s.life;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      // z-index above all content (HUD chrome maxes at z-20). Pointer
      // events off so it never intercepts clicks/hovers.
      className="pointer-events-none fixed inset-0 z-[60]"
    />
  );
}
