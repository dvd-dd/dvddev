"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { LOCALES, type Locale } from "@/lib/translations";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  className?: string;
}

const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  pt: "PT",
};

/**
 * Compact HUD-styled locale switcher. Sits where the STATUS chip
 * used to live in the hero — same corner-tick aesthetic, but
 * interactive. Renders both options inline with a thin divider so
 * the current state is glanceable (no opening/closing UI).
 */
export function LanguageToggle({ className }: LanguageToggleProps) {
  const { locale, setLocale, t } = useTranslation();

  return (
    <div
      className={cn(
        "relative inline-flex items-center border border-saturn-gold/40 font-mono text-[10px] uppercase tracking-[0.3em]",
        className
      )}
    >
      {/* Corner ticks — mirror the HUDPanel chrome so the toggle reads
          as part of the same UI family. */}
      <span className="pointer-events-none absolute -left-px -top-px h-2 w-2 border-l border-t border-saturn-gold" />
      <span className="pointer-events-none absolute -right-px -top-px h-2 w-2 border-r border-t border-saturn-gold" />
      <span className="pointer-events-none absolute -bottom-px -left-px h-2 w-2 border-b border-l border-saturn-gold" />
      <span className="pointer-events-none absolute -bottom-px -right-px h-2 w-2 border-b border-r border-saturn-gold" />

      {LOCALES.map((code, i) => {
        const active = code === locale;
        return (
          <div key={code} className="flex items-center">
            {/* Divider between the two options. Skip before the first. */}
            {i > 0 && (
              <span
                aria-hidden
                className="h-3 w-px bg-saturn-gold/30"
              />
            )}
            <button
              type="button"
              onClick={() => setLocale(code)}
              aria-pressed={active}
              aria-label={t.a11y.switchLanguage.replace(
                "{target}",
                LOCALE_LABELS[code]
              )}
              className={cn(
                "px-3 py-2 transition-colors duration-200",
                active
                  ? "bg-saturn-gold/10 text-saturn-cream"
                  : "text-saturn-cream/40 hover:text-saturn-cream/70"
              )}
            >
              {LOCALE_LABELS[code]}
            </button>
          </div>
        );
      })}
    </div>
  );
}
