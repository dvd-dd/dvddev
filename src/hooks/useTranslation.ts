"use client";

import { useContext } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";

/**
 * Read translations + locale state from the LanguageProvider.
 * Throws if no provider is in scope — that's intentional: a silent
 * fallback would let the wrong copy ship to prod undetected.
 */
export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error(
      "useTranslation must be used inside a <LanguageProvider>"
    );
  }
  return ctx;
}
