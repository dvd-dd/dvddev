"use client";

import { useSmoothScroll } from "@/hooks/useSmoothScroll";

/**
 * Mounts the global Lenis smooth-scroll instance once at the root.
 * Render-transparent: children pass through unchanged.
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useSmoothScroll();
  return <>{children}</>;
}
