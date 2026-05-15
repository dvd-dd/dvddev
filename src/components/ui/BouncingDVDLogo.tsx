"use client";

import { useEffect, useRef, useState } from "react";

interface BouncingDVDLogoProps {
  /** Pixels per frame. Classic feel is 1.5–2.5. */
  speed?: number;
  /** Pixel tolerance for "perfect corner hit". */
  cornerTolerance?: number;
  /** Optional callback for the rare perfect corner. */
  onCornerHit?: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

/**
 * Faithful 2000s screensaver bounce. The logo carries an HSL hue
 * that rotates on every wall bounce, so it cycles through colors
 * the same way the original Pioneer DVD player did.
 *
 * Math: position += velocity; when an edge is crossed, mirror the
 * relevant component of velocity AND clamp position inside bounds
 * (the clamp prevents the "stuck wiggling at the wall" bug that
 * naive implementations have).
 *
 * Perfect corner detection: if BOTH walls are hit on the same frame
 * AND the impact point is within `cornerTolerance` px of a corner,
 * we emit a particle burst. This event was the holy grail of the
 * original — we celebrate it.
 *
 * Not auto-mounted anywhere yet: import + render where needed.
 */
export function BouncingDVDLogo({
  speed = 1.8,
  cornerTolerance = 8,
  onCornerHit,
}: BouncingDVDLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  // Live motion state in refs — we don't want React re-rendering 60 times/sec.
  const motionRef = useRef({
    x: 100,
    y: 100,
    vx: speed,
    vy: speed,
    hue: 45,
  });

  // Particles ARE state because we need React to render them.
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const logo = logoRef.current;
    if (!container || !logo) return;

    const spawnBurst = (x: number, y: number) => {
      const burst: Particle[] = Array.from({ length: 24 }, () => {
        const angle = Math.random() * Math.PI * 2;
        const velocity = 2 + Math.random() * 3;
        return {
          id: particleIdRef.current++,
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          life: 1,
        };
      });
      setParticles((prev) => [...prev, ...burst]);
    };

    const tick = () => {
      const bounds = container.getBoundingClientRect();
      const logoBounds = logo.getBoundingClientRect();
      const maxX = bounds.width - logoBounds.width;
      const maxY = bounds.height - logoBounds.height;

      const m = motionRef.current;
      m.x += m.vx;
      m.y += m.vy;

      let hitX = false;
      let hitY = false;

      if (m.x <= 0) {
        m.x = 0;
        m.vx = Math.abs(m.vx);
        hitX = true;
      } else if (m.x >= maxX) {
        m.x = maxX;
        m.vx = -Math.abs(m.vx);
        hitX = true;
      }

      if (m.y <= 0) {
        m.y = 0;
        m.vy = Math.abs(m.vy);
        hitY = true;
      } else if (m.y >= maxY) {
        m.y = maxY;
        m.vy = -Math.abs(m.vy);
        hitY = true;
      }

      if (hitX || hitY) {
        // Rotate hue — gives the color-cycling feel of the original.
        m.hue = (m.hue + 47) % 360;
      }

      // Corner hit: both axes flipped on the same frame and the impact
      // point sits within tolerance of a true corner.
      if (hitX && hitY) {
        const nearCornerX = m.x <= cornerTolerance || m.x >= maxX - cornerTolerance;
        const nearCornerY = m.y <= cornerTolerance || m.y >= maxY - cornerTolerance;
        if (nearCornerX && nearCornerY) {
          spawnBurst(m.x + logoBounds.width / 2, m.y + logoBounds.height / 2);
          onCornerHit?.();
        }
      }

      logo.style.transform = `translate3d(${m.x}px, ${m.y}px, 0)`;
      logo.style.color = `hsl(${m.hue}, 80%, 60%)`;

      // Advance particles (small enough count that mapping in JS is fine).
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.05, // gentle gravity
            life: p.life - 0.02,
          }))
          .filter((p) => p.life > 0)
      );

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [speed, cornerTolerance, onCornerHit]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div
        ref={logoRef}
        className="absolute left-0 top-0 select-none font-display text-3xl font-black italic tracking-tighter will-change-transform"
        style={{ color: "hsl(45, 80%, 60%)" }}
      >
        dvd
      </div>

      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute h-1 w-1 rounded-full bg-saturn-cream"
          style={{
            transform: `translate3d(${p.x}px, ${p.y}px, 0)`,
            opacity: p.life,
          }}
        />
      ))}
    </div>
  );
}
