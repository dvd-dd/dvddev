"use client";

import { SITE } from "@/lib/constants";
import { useTranslation } from "@/hooks/useTranslation";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="relative w-full border-t border-saturn-gold/20 bg-space-black px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 font-mono text-[10px] uppercase tracking-[0.3em] text-saturn-cream/50 md:flex-row">
        <span>
          © {new Date().getFullYear()} {SITE.domain}
        </span>
        <span className="text-saturn-gold/80">{t.footer.copyright}</span>
      </div>
    </footer>
  );
}
