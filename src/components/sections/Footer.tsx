"use client";

import { ArrowUpRight, Rss } from "lucide-react";
import { SiGithub, SiInstagram, SiWhatsapp } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { DvdWordmark } from "@/components/ui/DvdWordmark";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { StatusPill } from "@/components/ui/StatusPill";
import { useTranslation } from "@/hooks/useTranslation";
import { SOCIAL_CHANNELS } from "@/lib/constants";

/**
 * Three-block footer modeled on sanity.io's signature footer move:
 *
 *   BLOCK 1 — top row:
 *     - left: two display-size CTAs treated as mini-headlines
 *     - right: 4-column link nav grid (Work / About / Channels / Trust)
 *
 *   BLOCK 2 — GIANT centered DVD wordmark with 256px breathing room.
 *     The emotional payload. No manifesto line, no tagline. Silence
 *     and scale do the work.
 *
 *   BLOCK 3 — meta row:
 *     - left: "Keep in touch" + 5 social icons
 *     - right: © DVDDEV · flags pair · status pill · 3-way theme toggle
 *
 * Forced `bg-ink-base` regardless of the site theme so the footer
 * always reads as the closing dark chapter.
 */

const SOCIALS: Array<{
  key: string;
  href: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number; size?: number }>;
  label: string;
}> = [
  {
    key: "github",
    href: "https://github.com/dvd-dd",
    Icon: SiGithub as React.ComponentType<{ className?: string; size?: number }>,
    label: "GitHub",
  },
  {
    key: "linkedin",
    href: SOCIAL_CHANNELS.linkedinUrl,
    Icon: FaLinkedin as React.ComponentType<{ className?: string; size?: number }>,
    label: "LinkedIn",
  },
  {
    key: "instagram",
    href: SOCIAL_CHANNELS.instagramUrl,
    Icon: SiInstagram as React.ComponentType<{ className?: string; size?: number }>,
    label: "Instagram",
  },
  {
    key: "whatsapp",
    href: `https://wa.me/${SOCIAL_CHANNELS.whatsappPhone}`,
    Icon: SiWhatsapp as React.ComponentType<{ className?: string; size?: number }>,
    label: "WhatsApp",
  },
  {
    key: "rss",
    href: "#",
    Icon: Rss,
    label: "RSS",
  },
];

const FLAGS: Array<{ emoji: string; city: string; country: string }> = [
  { emoji: "🇺🇸", city: "Connecticut", country: "USA" },
  { emoji: "🇧🇷", city: "São Paulo", country: "BRA" },
  { emoji: "🇬🇧", city: "Birmingham", country: "GBR" },
];

export function Footer() {
  const { t } = useTranslation();
  const f = t.footer;
  const cols = [f.columns.work, f.columns.about, f.columns.channels, f.columns.trust];

  return (
    <footer
      data-theme="dark"
      className="relative w-full bg-ink-base px-6 py-12 text-fg-base md:px-12 md:py-16"
    >
      <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-y-12 md:gap-y-16">
        {/* ─── BLOCK 1: CTAs + link grid ─────────────────────── */}
        <div className="flex flex-col justify-between gap-y-12 xl:flex-row xl:gap-y-0">
          {/* Left rail — 32px display CTAs */}
          <div className="flex flex-col gap-y-6 xl:max-w-md">
            <a
              href={SOCIAL_CHANNELS.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-start gap-2 text-balance text-2xl font-normal leading-[1.2] text-fg-base transition-colors hover:text-brand md:text-[32px]"
            >
              <span>{f.ctas.community}</span>
            </a>

            <p className="text-balance text-2xl font-normal leading-[1.2] text-fg-base md:text-[32px]">
              {f.ctas.newsletter}{" "}
              <a
                href="mailto:nextnumberdev@gmail.com?subject=Newsletter"
                className="ml-2 inline-flex h-12 items-center rounded-full bg-brand px-6 align-middle font-mono text-sm font-medium uppercase tracking-[0.18em] text-ink-base transition-colors hover:bg-brand-dim"
              >
                {f.ctas.newsletterButton}
              </a>
            </p>
          </div>

          {/* Right — 4-col link nav */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-x-10 xl:max-w-3xl">
            {cols.map((col) => (
              <div key={col.heading}>
                <h3 className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-faint">
                  {col.heading}
                </h3>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="font-sans text-sm text-fg-base transition-colors hover:underline"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ─── BLOCK 2: GIANT wordmark + 256px breathing ───── */}
        <div className="flex items-center justify-center py-12 md:py-24 lg:pb-64">
          <DvdWordmark
            ariaLabel="dvddev"
            className="h-9 w-auto text-fg-base md:h-16 lg:h-[120px]"
          />
        </div>

        {/* ─── BLOCK 3: socials + meta ────────────────────── */}
        <div className="flex flex-col items-start gap-y-8 lg:flex-row lg:items-end lg:justify-between">
          {/* Left: socials */}
          <div className="flex flex-col gap-3">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-faint">
              {f.socials.heading}
            </h3>
            <ul className="flex items-center gap-5">
              {SOCIALS.map(({ key, href, Icon, label }) => (
                <li key={key}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    className="inline-flex h-6 w-6 items-center justify-center text-fg-dim transition-colors hover:text-fg-base"
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} size={20} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: copyright + flags + status + theme */}
          <div className="flex flex-col items-start gap-y-6 lg:flex-row lg:items-end lg:gap-x-10">
            {/* Copyright + flags stacked */}
            <div className="flex flex-col gap-y-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-faint">
                {f.copyright}
              </span>
              <div className="flex items-center gap-x-3 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-dim">
                <span>{f.flags.heading}</span>
                <span aria-hidden className="inline-flex items-center gap-1 text-base leading-none">
                  {FLAGS.map((flag) => (
                    <span
                      key={flag.country}
                      title={`${flag.city}, ${flag.country}`}
                    >
                      {flag.emoji}
                    </span>
                  ))}
                </span>
                <span className="sr-only">
                  {FLAGS.map((flag) => `${flag.city}, ${flag.country}`).join(", ")}
                </span>
              </div>
            </div>

            {/* Status pill */}
            <StatusPill href="#contact" />

            {/* Theme toggle */}
            <ThemeToggle />
          </div>
        </div>

        {/* Optional: tiny credit row at the very bottom */}
        <div className="mt-2 flex flex-col items-start gap-y-2 border-t border-border-faint/40 pt-6 md:flex-row md:justify-between">
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-faint hover:text-fg-dim"
          >
            Textures · Solar System Scope · CC BY 4.0
          </a>
          <a
            href="https://github.com/dvd-dd/dvddev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-faint hover:text-fg-dim"
          >
            <span>Source on GitHub</span>
            <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
          </a>
        </div>
      </div>
    </footer>
  );
}
