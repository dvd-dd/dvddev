"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface HelmetVisorProps {
  className?: string;
}

/**
 * Visual anchor for the About section — astronaut helmet visor PNG
 * with two layered motions:
 *
 *   1. Idle float: 8s ease-in-out loop, ±8px Y. Conveys "in orbit".
 *   2. Scroll parallax: as the section moves through the viewport,
 *      the visor drifts -30px → +30px in Y. The combination feels
 *      anchored to the scene without locking to pixel-perfect spots.
 *
 * Both transforms are composed on the same element — Framer Motion
 * handles the addition because `y` accepts either a number or a
 * MotionValue; we keep float on a child wrapper and parallax on the
 * outer one so they don't collide.
 *
 * Edge fade is a CSS radial mask, not an extra DOM layer, so it
 * stays GPU-cheap and respects whatever sits behind.
 */
export function HelmetVisor({ className }: HelmetVisorProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Track the section's progress through the viewport: 0 when the
  // top hits the bottom of the screen, 1 when the bottom leaves
  // the top. That window gives a smooth drift across the scroll.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <motion.div
      ref={ref}
      style={{ y: parallaxY }}
      className={cn(
        "relative w-full overflow-hidden rounded-lg",
        className
      )}
    >
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{
          duration: 8,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        // Radial mask softens the rectangle into the dark background.
        // ~50% solid, fading to fully transparent at 95% radius.
        style={{
          maskImage:
            "radial-gradient(ellipse at center, black 50%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 50%, transparent 95%)",
        }}
        className="relative aspect-[16/9] w-full"
      >
        <Image
          src="/helmet-visor.png"
          alt=""
          fill
          priority={false}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </motion.div>
    </motion.div>
  );
}
