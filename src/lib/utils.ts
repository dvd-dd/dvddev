import { clsx, type ClassValue } from "clsx";

/**
 * Merge conditional class names. Lightweight stand-in for `cn` —
 * we don't need tailwind-merge yet because our tailwind classes don't
 * conflict in problematic ways. Swap in tailwind-merge when needed.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Linear interpolation. Used by the camera parallax. */
export function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

/** Clamp `value` to the [min, max] range. */
export function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}
