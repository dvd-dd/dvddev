"use client";

import { useEffect, useRef } from "react";

export interface MousePosition {
  /** Normalized -1..1 horizontal position. */
  x: number;
  /** Normalized -1..1 vertical position. */
  y: number;
}

/**
 * Tracks the mouse as normalized [-1, 1] coords in a mutable ref.
 * Returning a ref (not state) means we never re-render the consumer —
 * the Three.js render loop reads `ref.current` each frame instead.
 */
export function useMousePosition() {
  const positionRef = useRef<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      positionRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      positionRef.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return positionRef;
}
