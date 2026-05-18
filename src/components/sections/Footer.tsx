"use client";

import { SITE, TEXTURE_CREDITS } from "@/lib/constants";
import { useTranslation } from "@/hooks/useTranslation";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="relative w-full border-t border-saturn-gold/20 px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3">
        <div className="flex w-full flex-col items-center justify-between gap-6 font-mono text-[10px] uppercase tracking-[0.3em] text-saturn-cream/50 md:flex-row">
          <span>
            © {new Date().getFullYear()} {SITE.domain}
          </span>
          <span className="text-saturn-gold/80">{t.footer.copyright}</span>
        </div>
        <a
          href={TEXTURE_CREDITS.license}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[9px] uppercase tracking-[0.2em] text-saturn-cream/30 transition-colors hover:text-saturn-cream/60"
        >
          {TEXTURE_CREDITS.short}
        </a>
      </div>
    </footer>
  );
}
