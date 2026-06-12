"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/**
 * Three theme modes per the redesign brief — Sanity-style 3-way toggle
 * (Light / System / Dark). "System" means "follow prefers-color-scheme",
 * stored in localStorage as the literal string "system" so the user's
 * choice persists even when their OS theme flips at sunset.
 */
export type ThemeMode = "light" | "system" | "dark";
export type EffectiveTheme = "light" | "dark";

const STORAGE_KEY = "dvddev-theme";

interface ThemeContextValue {
  /** What the user picked (could be "system"). */
  mode: ThemeMode;
  /** What's actually rendered after resolving "system" → light or dark. */
  effective: EffectiveTheme;
  setMode: (mode: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

function resolveSystem(): EffectiveTheme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function readStored(): ThemeMode {
  if (typeof window === "undefined") return "system";
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === "light" || raw === "dark" || raw === "system") return raw;
  } catch {
    // localStorage blocked — fall through.
  }
  return "system";
}

/**
 * Sets `data-theme` on <html> so the CSS `[data-theme="light"]` /
 * `[data-theme="dark"]` selectors (defined in globals.css once Phase 2
 * lands the light palette) take effect site-wide.
 */
function applyTheme(effective: EffectiveTheme) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", effective);
  // Helps native form controls + scrollbar render matching the theme.
  document.documentElement.style.colorScheme = effective;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Default to "dark" during SSR + first paint. The actual stored choice
  // is loaded in the effect below — there's a one-frame flicker possible
  // on first load for light-mode users, accepted because the redesign's
  // default theme is dark.
  const [mode, setModeState] = useState<ThemeMode>("dark");
  const [effective, setEffective] = useState<EffectiveTheme>("dark");

  // Read stored mode + system preference on mount.
  useEffect(() => {
    const stored = readStored();
    setModeState(stored);
    const next: EffectiveTheme =
      stored === "system" ? resolveSystem() : stored;
    setEffective(next);
    applyTheme(next);
  }, []);

  // Listen for OS theme changes when in "system" mode.
  useEffect(() => {
    if (mode !== "system") return;
    const mql = window.matchMedia("(prefers-color-scheme: light)");
    const handler = () => {
      const next = resolveSystem();
      setEffective(next);
      applyTheme(next);
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [mode]);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Silent — private mode etc.
    }
    const resolved: EffectiveTheme =
      next === "system" ? resolveSystem() : next;
    setEffective(resolved);
    applyTheme(resolved);
  }, []);

  const value = useMemo(
    () => ({ mode, effective, setMode }),
    [mode, effective, setMode]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
