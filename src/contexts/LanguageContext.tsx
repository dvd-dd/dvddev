"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_STORAGE_KEY,
  translations,
  type Locale,
  type TranslationKeys,
} from "@/lib/translations";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: TranslationKeys;
}

export const LanguageContext = createContext<LanguageContextValue | null>(
  null
);

/**
 * Persists a locale choice in localStorage. SSR-safe: we render the
 * default locale on the server and the first client paint, then a
 * single state update swaps in the persisted value (mounted ref
 * gates the write-back so the hydration tick can't clobber storage).
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // Hydrate from localStorage exactly once on mount.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
      if (stored && (LOCALES as readonly string[]).includes(stored)) {
        setLocaleState(stored as Locale);
      }
    } catch {
      // localStorage unavailable (private mode, etc.) — silently fall
      // back to the default. The toggle still works in-memory.
    }
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      /* see hydration note */
    }
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({ locale, setLocale, t: translations[locale] }),
    [locale, setLocale]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
