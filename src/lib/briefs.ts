import type { TypewriterPair } from "@/hooks/useTypewriter";

/**
 * 20 paired briefs used by <CustomEnvironments /> to drive the
 * typewriter mockup. Each pair reads as an inbound client line: a
 * project title + a one-sentence description that anchors to a real
 * piece of the stack the build would touch. The randomized cycle
 * surfaces the breadth of work a freelance front-end dev sees in a
 * given month without resorting to a static discipline taxonomy.
 *
 * Constraints honored:
 *   • title ≤ 32 chars   (fits one form-input line)
 *   • description ≤ 140  (types + deletes in ≤ 6s without dragging)
 *
 * Edit freely — pairs are independent. Pruning the list to N still
 * works; the cycle picks a different random index each round and
 * gracefully no-ops if N ≤ 1.
 */

export const BRIEFS_EN: TypewriterPair[] = [
  {
    title: "Indie SaaS landing page",
    description:
      "Single-decision conversion page tuned to ship sub-1s LCP on a $5 VPS.",
  },
  {
    title: "Founder personal site",
    description:
      "Editorial brand site with MDX-driven essays and OG-image generation per post.",
  },
  {
    title: "Brazilian roastery e-com",
    description:
      "Headless Shopify Hydrogen storefront, Stripe checkout, BR shipping API.",
  },
  {
    title: "Healthcare marketing site",
    description:
      "Full-funnel storytelling across pricing, customers, and HIPAA-grade docs.",
  },
  {
    title: "Photographer portfolio",
    description:
      "Image-led grid with slow horizontal scroll and Next/Image edge-cached delivery.",
  },
  {
    title: "Restaurant menu site",
    description:
      "Translation-aware menu with Supabase reservations and dietary-tag filters.",
  },
  {
    title: "Conference site",
    description:
      "Schedule, speakers, ticketing, press kit — all backed by a typed CMS.",
  },
  {
    title: "Newsletter homepage",
    description:
      "Substack-style landing with archive grid, signup-first hero, Resend email API.",
  },
  {
    title: "Indie game promo",
    description:
      "Trailer-first hero, Steam + Itch deep links, press-kit zip generated at build.",
  },
  {
    title: "Design-system docs",
    description:
      "Component library with copyable code, Storybook embeds, dark-first defaults.",
  },
  {
    title: "Architecture firm site",
    description:
      "Project carousel with floorplan SVGs, metadata, and zero-CLS captions.",
  },
  {
    title: "Wedding site",
    description:
      "RSVP form, gift registry, photo gallery — bilingual EN/PT, mobile-first.",
  },
  {
    title: "Real-estate listings",
    description:
      "Map-driven catalog with saved searches, email alerts, Algolia search.",
  },
  {
    title: "Open-source project page",
    description:
      "GitHub stats via API, install commands, contributor wall, MDX docs.",
  },
  {
    title: "Tattoo studio booking",
    description:
      "Calendar, Stripe deposits, per-artist galleries, SMS confirmation.",
  },
  {
    title: "Climbing gym membership",
    description:
      "Schedule, intro lessons, day-pass flow, Memberstack auth.",
  },
  {
    title: "Crypto wallet docs",
    description:
      "Searchable, versioned, dark-first technical reference with code playgrounds.",
  },
  {
    title: "Music album landing",
    description:
      "Track previews, streaming-platform deep links, tour calendar, MailerLite.",
  },
  {
    title: "Web3 DAO governance hub",
    description:
      "Proposal list, voting flow via wagmi, treasury dashboard from on-chain data.",
  },
  {
    title: "B2B auto-parts marketplace",
    description:
      "VIN search, location-aware results, B2B account tiers, ERP webhooks.",
  },
];

export const BRIEFS_PT: TypewriterPair[] = [
  {
    title: "Landing de SaaS indie",
    description:
      "Página de uma decisão só, calibrada pra LCP sub-1s num VPS de $5.",
  },
  {
    title: "Site pessoal de founder",
    description:
      "Site editorial de marca com ensaios em MDX e OG-image gerada por post.",
  },
  {
    title: "E-com de roastery brasileiro",
    description:
      "Storefront headless em Shopify Hydrogen, checkout Stripe, API de envio BR.",
  },
  {
    title: "Site de marketing de saúde",
    description:
      "Storytelling de funil completo — pricing, customers e docs de nível HIPAA.",
  },
  {
    title: "Portfolio de fotógrafo",
    description:
      "Grid image-led com scroll horizontal lento e Next/Image entregue do edge.",
  },
  {
    title: "Site de cardápio de restaurante",
    description:
      "Menu com tradução, reservas via Supabase e filtro por restrição alimentar.",
  },
  {
    title: "Site de conferência",
    description:
      "Agenda, speakers, ticketing, press kit — tudo num CMS tipado.",
  },
  {
    title: "Homepage de newsletter",
    description:
      "Landing estilo Substack com grid de arquivo, hero de signup e Resend pro email.",
  },
  {
    title: "Promo de jogo indie",
    description:
      "Hero com trailer, deep links pra Steam + Itch, press-kit gerado no build.",
  },
  {
    title: "Docs de design system",
    description:
      "Biblioteca de componentes com código copy-paste, embeds do Storybook, dark-first.",
  },
  {
    title: "Site de escritório de arquitetura",
    description:
      "Carrossel de projetos com plantas em SVG, metadados, captions zero-CLS.",
  },
  {
    title: "Site de casamento",
    description:
      "RSVP, lista de presentes, galeria de fotos — bilíngue EN/PT, mobile-first.",
  },
  {
    title: "Listings de imóveis",
    description:
      "Catálogo guiado por mapa com buscas salvas, alertas por email, busca Algolia.",
  },
  {
    title: "Página de projeto open source",
    description:
      "Stats do GitHub via API, comandos de install, mural de contribuidores, docs MDX.",
  },
  {
    title: "Booking de estúdio de tatuagem",
    description:
      "Calendário, sinal via Stripe, galerias por tatuador, confirmação por SMS.",
  },
  {
    title: "Site de academia de escalada",
    description:
      "Schedule, aulas intro, day-pass, auth via Memberstack.",
  },
  {
    title: "Docs de crypto wallet",
    description:
      "Referência técnica buscável e versionada, dark-first, com code playgrounds.",
  },
  {
    title: "Landing de álbum musical",
    description:
      "Previews de track, deep links pras plataformas, calendário de turnê, MailerLite.",
  },
  {
    title: "Hub de governança Web3 DAO",
    description:
      "Lista de propostas, fluxo de voto via wagmi, dashboard de tesouro on-chain.",
  },
  {
    title: "Marketplace B2B de autopeças",
    description:
      "Busca por chassi, resultados por localização, contas B2B em camadas, webhooks ERP.",
  },
];
