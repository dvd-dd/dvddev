/**
 * Single source of truth for site-wide values.
 * Keep marketing copy and brand identifiers here so SEO,
 * structured data and UI labels stay aligned.
 */

export const SITE = {
  name: "dvddev",
  brand: "DVD",
  domain: "dvddev.com",
  url: "https://dvddev.com",
  title: "dvddev — Junior Software Developer | Landing Pages",
  description:
    "Crafting universes from code. Conversion-driven landing pages with React, Next.js and Tailwind CSS.",
  tagline: "Junior Software Developer crafting universes from code",
  ogImage: "/og.png",
  themeColor: "#0a0a1a",
  locale: "en_US",
  twitterHandle: "@dvddev",
} as const;

export const COLORS = {
  spaceBlack: "#050510",
  deepSpace: "#0a0a1a",
  saturnGold: "#d4a574",
  saturnCream: "#f5e6d3",
  ringAmber: "#c89860",
  starWhite: "#fafafa",
} as const;

export const TEXTURE_CREDITS = {
  planet: "Saturn & ring textures: Solar System Scope (CC BY 4.0)",
  milkyWay:
    "Milky Way panorama: Solar System Scope / NASA / ESO (CC BY 4.0)",
  license: "https://creativecommons.org/licenses/by/4.0/",
  /** Single-line copy used in the footer. */
  short: "Textures by Solar System Scope (CC BY 4.0)",
} as const;

export const NAV_LINKS = [
  { label: "Mission", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;
