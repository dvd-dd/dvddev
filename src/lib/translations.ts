/**
 * Bilingual copy registry — every user-facing string lives here.
 * Adding a third locale = add a third key with the same shape; the
 * `as const` below + `TranslationKeys` type force exhaustiveness.
 *
 * Shape was authored once in EN and mirrored 1:1 in PT, including
 * the structured `timeline.events` arrays so the consumer can render
 * them by index without locale-specific branching.
 */
export const translations = {
  en: {
    hud: {
      sysPrefix: "SYS://",
      statusOnline: "STATUS — ONLINE",
      scrollExplore: "SCROLL TO EXPLORE",
      coords: "LAT 0.000 · LON 0.000",
      version: "v0.1 · COSMIC EDITION",
    },
    hero: {
      tagline: "Junior Software Developer crafting universes from code",
      cta: "Initiate Mission",
    },
    about: {
      chapter: "· Chapter 01 · About",
      heading: "Signal incoming.",
      origin: {
        title: "Origin",
        body: "I started in sales. A friend who programmed introduced me to web development — and that encounter changed everything. In code, I found a way to channel my creativity into something tangible.",
      },
      mission: {
        title: "Mission",
        body: "Today I'm a Front-end Developer focused on high-conversion landing pages. I work with React, Next.js, Tailwind CSS, and Three.js to build experiences that grab attention in the first seconds and turn visitors into customers.",
      },
      trajectory: {
        title: "Trajectory",
        body: "I'm looking for partnerships with founders, startups, and agencies who understand that great design and clean code are a competitive edge. Every project I ship is another planet on the map.",
      },
      timeline: {
        heading: "Transmission log",
        events: [
          { year: "20XX", label: "First contact with code" },
          { year: "20XX", label: "First production project" },
          { year: "20XX", label: "Front-end focus" },
          { year: "2026", label: "dvddev launched" },
        ],
      },
    },
    sections: {
      projects: {
        chapter: "· Chapter 02 · Discovered Planets",
        heading: "Worlds shipped.",
        placeholder: "Project catalog launching in the next deploy window.",
      },
      skills: {
        chapter: "· Chapter 03 · Constellation",
        heading: "Mapped tools.",
        placeholder: "Interactive constellation incoming.",
      },
      contact: {
        chapter: "· Chapter 04 · Establish Comms",
        heading: "Open a channel.",
        placeholder: "Contact form deploying soon.",
      },
    },
    footer: {
      copyright: "Transmission ends · Until next orbit.",
    },
    a11y: {
      switchLanguage: "Switch language to {target}",
    },
  },
  pt: {
    hud: {
      sysPrefix: "SYS://",
      statusOnline: "STATUS — ONLINE",
      scrollExplore: "ROLE PARA EXPLORAR",
      coords: "LAT 0.000 · LON 0.000",
      version: "v0.1 · EDIÇÃO CÓSMICA",
    },
    hero: {
      tagline:
        "Desenvolvedor Front-end criando universos a partir do código",
      cta: "Iniciar Missão",
    },
    about: {
      chapter: "· Capítulo 01 · Sobre",
      heading: "Sinal recebido.",
      origin: {
        title: "Origem",
        body: "Comecei como vendedor. Foi através de um amigo programador que descobri o desenvolvimento web — e esse encontro mudou tudo. No código encontrei o espaço pra canalizar minha criatividade de forma concreta.",
      },
      mission: {
        title: "Missão",
        body: "Hoje sou Front-end Developer focado em landing pages de alta conversão. Trabalho com React, Next.js, Tailwind CSS e Three.js pra construir experiências que prendem atenção nos primeiros segundos e transformam visitantes em clientes.",
      },
      trajectory: {
        title: "Trajetória",
        body: "Busco parcerias com fundadores, startups e agências que entendem que design e código bem feitos são vantagem competitiva. Cada projeto que entrego é mais um planeta no mapa.",
      },
      timeline: {
        heading: "Log de transmissão",
        events: [
          { year: "20XX", label: "Primeiro contato com código" },
          { year: "20XX", label: "Primeiro projeto em produção" },
          { year: "20XX", label: "Foco em Front-end" },
          { year: "2026", label: "dvddev no ar" },
        ],
      },
    },
    sections: {
      projects: {
        chapter: "· Capítulo 02 · Planetas Descobertos",
        heading: "Mundos lançados.",
        placeholder: "Catálogo de projetos em breve.",
      },
      skills: {
        chapter: "· Capítulo 03 · Constelação",
        heading: "Ferramentas mapeadas.",
        placeholder: "Constelação interativa em construção.",
      },
      contact: {
        chapter: "· Capítulo 04 · Estabelecer Comunicação",
        heading: "Abrir um canal.",
        placeholder: "Formulário de contato em breve.",
      },
    },
    footer: {
      copyright: "Transmissão encerrada · Até a próxima órbita.",
    },
    a11y: {
      switchLanguage: "Trocar idioma para {target}",
    },
  },
} as const;

export type Locale = keyof typeof translations;
/**
 * Union of locale dictionaries. We can't just use `typeof translations.en`
 * because `as const` narrows every value to a string literal, which then
 * fails to match the corresponding string literal in `translations.pt`.
 * Unioning them lets either dictionary flow through the context.
 */
export type TranslationKeys = (typeof translations)[Locale];

export const LOCALES: readonly Locale[] = ["en", "pt"] as const;
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_STORAGE_KEY = "dvddev-locale";
