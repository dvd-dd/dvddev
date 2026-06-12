"use client";

import { motion } from "framer-motion";
import { SiWhatsapp, SiInstagram } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import type { ComponentType } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { SOCIAL_CHANNELS } from "@/lib/constants";

/**
 * Open-a-channel cockpit.
 *
 * Three brand-colored cards (WhatsApp · LinkedIn · Instagram), each
 * a single anchor so the whole card is clickable. Status indicator
 * above the heading communicates availability — substitutes the
 * "book a call" CTA most freelance sites have.
 *
 * The WhatsApp link prefills a locale-aware greeting so the visitor
 * doesn't have to think about what to write; that's the conversion
 * killer for most contact widgets.
 */

interface Channel {
  id: "whatsapp" | "linkedin" | "instagram";
  Icon: ComponentType<{ size?: number | string }>;
  color: string;
  href: string;
}

export function Contact() {
  const { t } = useTranslation();
  const c = t.sections.contact;

  const channels: Channel[] = [
    {
      id: "whatsapp",
      Icon: SiWhatsapp,
      color: "#25D366",
      href: `https://wa.me/${SOCIAL_CHANNELS.whatsappPhone}?text=${encodeURIComponent(c.channels.whatsapp.prefill)}`,
    },
    {
      id: "linkedin",
      Icon: FaLinkedin,
      color: "#0A66C2",
      href: SOCIAL_CHANNELS.linkedinUrl,
    },
    {
      id: "instagram",
      Icon: SiInstagram,
      color: "#E1306C",
      href: SOCIAL_CHANNELS.instagramUrl,
    },
  ];

  return (
    <section
      id="contact"
      className="relative w-full px-6 py-24 md:py-32"
    >
      {/* Heading block */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 mx-auto mb-12 max-w-3xl text-center md:mb-16"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand">
          {c.chapter}
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold leading-[0.95] tracking-tight text-fg-base md:text-6xl">
          {c.heading}
        </h2>

        {/* Status indicator — pulsing green dot + label. */}
        <div className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-emerald-400/30 bg-emerald-400/[0.06] px-3.5 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-300/90">
            {c.statusLabel}
          </span>
        </div>

        <p className="mx-auto mt-6 max-w-xl font-mono text-sm leading-relaxed text-fg-base/55">
          {c.subheading}
        </p>
      </motion.div>

      {/* Channel cards */}
      <div className="relative z-10 mx-auto grid w-full max-w-4xl gap-4 md:grid-cols-3">
        {channels.map((ch, i) => {
          const copy = c.channels[ch.id];
          return (
            <motion.a
              key={ch.id}
              href={ch.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: 0.1 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col items-start gap-4 overflow-hidden rounded-md border border-fg-base/10 bg-fg-base/[0.02] p-6 transition-colors duration-300 hover:border-fg-base/30"
              style={
                {
                  ["--brand" as string]: ch.color,
                } as React.CSSProperties
              }
            >
              {/* Brand glow on hover — radial that lifts the card. */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at 30% 0%, ${ch.color}1f, transparent 60%)`,
                }}
              />

              {/* Mono-caps frequency label up top. */}
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-fg-base/40">
                CH/{String(i + 1).padStart(2, "0")} · {copy.label}
              </span>

              {/* Brand icon + handle row */}
              <div className="flex items-center gap-4">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-md border border-fg-base/10 transition-all duration-300 group-hover:border-[var(--brand)] group-hover:shadow-[0_0_24px_-4px_var(--brand)]"
                  style={{ color: ch.color }}
                >
                  <ch.Icon size={24} />
                </span>
                <span className="font-mono text-sm text-fg-base/90">
                  {copy.handle}
                </span>
              </div>

              {/* Action prompt — feels like a button without being one. */}
              <span className="mt-auto inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-base/70 transition-colors duration-300 group-hover:text-fg-base">
                {copy.action}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
