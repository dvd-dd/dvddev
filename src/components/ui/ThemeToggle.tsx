"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { type ThemeMode } from "@/contexts/ThemeContext";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";

type ToggleOption = {
  mode: ThemeMode;
  Icon: typeof Sun;
};

const OPTIONS: ToggleOption[] = [
  { mode: "light", Icon: Sun },
  { mode: "system", Icon: Monitor },
  { mode: "dark", Icon: Moon },
];

/**
 * 3-way segmented control — Light / System / Dark — modeled on
 * Sanity's footer theme switcher. Single visual button that hosts
 * three radio inputs; the active mode gets the brand mint accent
 * + an inverted contrast.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { mode, setMode } = useTheme();
  const { t } = useTranslation();

  return (
    <fieldset
      className={cn(
        "inline-flex items-center gap-px rounded-full border border-fg-faint/40 bg-bg-elevated/60 p-0.5",
        className
      )}
    >
      <legend className="sr-only">{t.chrome.themeToggle.legend}</legend>
      {OPTIONS.map(({ mode: m, Icon }) => {
        const active = mode === m;
        const labelKey: "light" | "system" | "dark" = m;
        const label = t.chrome.themeToggle[labelKey];
        return (
          <label
            key={m}
            className={cn(
              "relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-fg-faint transition-colors hover:text-fg-base",
              active && "bg-brand text-ink-base hover:text-ink-base"
            )}
            title={label}
          >
            <input
              type="radio"
              name="theme-switch"
              value={m}
              checked={active}
              onChange={() => setMode(m)}
              className="sr-only"
            />
            <Icon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            <span className="sr-only">{label}</span>
          </label>
        );
      })}
    </fieldset>
  );
}
