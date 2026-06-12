"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Menu, X } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import { useTranslation } from "@/hooks/useTranslation";
import { LOCALES, type Locale } from "@/lib/translations";
import { SOCIAL_CHANNELS } from "@/lib/constants";
import { DvdWordmark } from "@/components/ui/DvdWordmark";
import { cn } from "@/lib/utils";

const NAV_HREFS = {
  work: "#projects",
  about: "#about",
  process: "#process",
  contact: "#contact",
} as const;

const EMAIL_HREF = "mailto:nextnumberdev@gmail.com";

/**
 * 67px sticky top nav inspired by sanity.io's chrome:
 *   - DVD wordmark (left), 4 ghost section links (center on desktop,
 *     drawer on mobile), 3-CTA cluster on the right
 *     (LinkedIn ghost · Email outline · Hire me brand-mint fill).
 *   - Locale switcher (EN/PT) sits before the CTAs as a small pill.
 *   - Mobile: hamburger after the brand CTA opens a full-bleed
 *     overlay holding the same links + CTAs stacked.
 *   - State-driven shadow: when the user scrolls past ~24px the nav
 *     gets a hairline bottom border + slight bg opacity bump, so the
 *     hero section's content doesn't bleed behind the chrome.
 */
export function NavBar() {
  const { t, locale, setLocale } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll state for the bg/border swap.
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile menu when an anchor is clicked.
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, [open]);

  const links = [
    { key: "work" as const, href: NAV_HREFS.work },
    { key: "about" as const, href: NAV_HREFS.about },
    { key: "process" as const, href: NAV_HREFS.process },
    { key: "contact" as const, href: NAV_HREFS.contact },
  ];

  return (
    <header
      data-scrolled={scrolled ? "true" : "false"}
      className={cn(
        "sticky top-0 z-50 flex h-[80px] w-full items-center transition-colors duration-200",
        scrolled
          ? "border-b border-border-faint bg-bg-base/95 backdrop-blur"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex w-full max-w-[1920px] items-center justify-between gap-6 px-6 md:px-12">
        {/* Brand / wordmark — orange crossbar accent + brand-color glow.
            Intro paints in left→right via clip-path, then idles. On
            hover the glow intensifies (no scale, per the motion
            contract). */}
        <a
          href="/"
          aria-label="dvddev — home"
          className="group flex items-center text-fg-base transition-colors hover:text-brand"
        >
          <motion.span
            initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
            className="block origin-center -translate-x-[16px] translate-y-[14px] -rotate-[12deg] [filter:drop-shadow(0_0_4px_rgba(168,85,247,0.35))_drop-shadow(0_0_10px_rgba(168,85,247,0.18))] transition-[filter] duration-500 group-hover:[filter:drop-shadow(0_0_6px_rgba(168,85,247,0.65))_drop-shadow(0_0_16px_rgba(168,85,247,0.35))]"
          >
            <DvdWordmark
              className="h-[64px] w-auto"
              thicken
            />
          </motion.span>
        </a>

        {/* Center: section links (desktop) */}
        <nav
          aria-label="Main navigation"
          className="hidden flex-1 justify-center md:flex"
        >
          <ul className="flex items-center gap-x-2">
            {links.map(({ key, href }) => (
              <li key={key}>
                <a
                  href={href}
                  className="rounded-full px-3 py-2 font-sans text-[14px] font-medium uppercase tracking-[0.01em] text-fg-dim transition-colors hover:text-fg-base"
                >
                  {t.chrome.nav.links[key]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right cluster: locale + CTAs */}
        <div className="flex items-center gap-2">
          <LocaleSwitcher locale={locale} setLocale={setLocale} t={t} />

          {/* Ghost LinkedIn */}
          <a
            href={SOCIAL_CHANNELS.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.chrome.nav.ctas.linkedin}
            className="hidden h-10 items-center justify-center rounded-full px-3 font-sans text-[14px] font-medium uppercase tracking-[0.01em] text-fg-dim transition-colors hover:text-fg-base md:inline-flex"
          >
            <FaLinkedin className="h-4 w-4" aria-hidden />
          </a>

          {/* Outline Email */}
          <a
            href={EMAIL_HREF}
            aria-label={t.chrome.nav.ctas.email}
            className="hidden h-10 items-center justify-center gap-1.5 rounded-full border border-border-dim px-4 font-sans text-[14px] font-medium uppercase tracking-[0.01em] text-fg-base transition-colors hover:border-fg-base md:inline-flex"
          >
            <Mail className="h-4 w-4" strokeWidth={2} aria-hidden />
          </a>

          {/* Brand fill — Hire me */}
          <a
            href="#contact"
            className="hidden h-10 items-center justify-center rounded-full bg-brand px-5 font-sans text-[14px] font-medium uppercase tracking-[0.01em] text-ink-base transition-colors hover:bg-brand-dim md:inline-flex"
          >
            {t.chrome.nav.ctas.hire}
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t.chrome.nav.openMenu}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-dim text-fg-base transition-colors hover:border-fg-base md:hidden"
          >
            <Menu className="h-4 w-4" strokeWidth={2} aria-hidden />
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-50 flex flex-col bg-bg-base"
        >
          <div className="flex h-[80px] items-center justify-between px-6">
            <a
              href="/"
              aria-label="dvddev — home"
              onClick={() => setOpen(false)}
              className="flex items-center text-fg-base"
            >
              <DvdWordmark
                className="h-[64px] w-auto origin-center -translate-x-[16px] translate-y-[14px] -rotate-[12deg] [filter:drop-shadow(0_0_4px_rgba(168,85,247,0.35))_drop-shadow(0_0_10px_rgba(168,85,247,0.18))]"
                thicken
              />
            </a>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.chrome.nav.closeMenu}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-dim text-fg-base transition-colors hover:border-fg-base"
            >
              <X className="h-4 w-4" strokeWidth={2} aria-hidden />
            </button>
          </div>

          <nav
            aria-label="Mobile navigation"
            className="flex flex-1 flex-col justify-center px-8"
          >
            <ul className="flex flex-col gap-y-6">
              {links.map(({ key, href }) => (
                <li key={key}>
                  <a
                    href={href}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl font-normal tracking-tight text-fg-base transition-colors hover:text-brand"
                  >
                    {t.chrome.nav.links[key]}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-12 flex flex-col gap-3">
              <a
                href={SOCIAL_CHANNELS.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex h-12 items-center justify-center gap-2 rounded-full border border-border-dim font-mono text-xs uppercase tracking-[0.18em] text-fg-base"
              >
                <FaLinkedin className="h-4 w-4" />
                {t.chrome.nav.ctas.linkedin}
              </a>
              <a
                href={EMAIL_HREF}
                onClick={() => setOpen(false)}
                className="flex h-12 items-center justify-center gap-2 rounded-full border border-border-dim font-mono text-xs uppercase tracking-[0.18em] text-fg-base"
              >
                <Mail className="h-4 w-4" strokeWidth={2} />
                {t.chrome.nav.ctas.email}
              </a>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="flex h-12 items-center justify-center rounded-full bg-brand font-mono text-xs font-medium uppercase tracking-[0.18em] text-ink-base"
              >
                {t.chrome.nav.ctas.hire}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

interface LocaleSwitcherProps {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: { a11y: { switchLanguage: string } };
}

function LocaleSwitcher({ locale, setLocale, t }: LocaleSwitcherProps) {
  return (
    <div
      className="inline-flex h-9 items-center rounded-full border border-border-dim bg-bg-elevated/60 p-0.5 font-mono text-[10px] uppercase tracking-[0.18em]"
      role="group"
      aria-label="Language"
    >
      {LOCALES.map((code) => {
        const active = code === locale;
        const target = code === "en" ? "English" : "Português";
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-label={t.a11y.switchLanguage.replace("{target}", target)}
            className={cn(
              "flex h-8 min-w-[2rem] items-center justify-center rounded-full px-2 transition-colors",
              active
                ? "bg-brand text-ink-base"
                : "text-fg-dim hover:text-fg-base"
            )}
          >
            {code.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
