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
        chapter: "· Chapter 02 · Portfolio",
        heading: "Six worlds. One trajectory.",
        instruction: "Each planet is a real site I built — click to investigate.",
        statusLive: "◉ LIVE",
        statusCase: "◌ CASE STUDY",
        ctaVisit: "Visit Surface →",
        ctaClose: "Close",
        signatureFeature: "SIGNATURE FEATURE",
        techStackLabel: "TECH STACK",
        caseStudyDisclaimer:
          "Case study — not deployed publicly. Source available on request.",
        screenshotPending: "Screenshot pending",
        items: {
          upward: {
            tagline:
              "Full-service digital agency engineered for performance",
            description:
              "Full-stack site I built for my own digital studio. Multi-route Next.js architecture with dynamic case study pages, native EN/PT i18n, and a content layer tuned for rapid client onboarding.",
            highlight:
              "Multi-route portfolio with dynamic case studies + native bilingual i18n",
          },
          smartfloors: {
            tagline: "Family-run hardwood flooring services in Connecticut",
            description:
              "Production marketing site for a family-run Connecticut flooring business — installation, sanding, and refinishing across hardwood, epoxy, vinyl, tile, and carpet. EN/ES bilingual, built around a single-team promise: the crew that estimates the job is the crew that does the work.",
            highlight:
              "Project gallery carousel walking through real completed jobs across material types — the social proof that does the closing for a regional home-services brand.",
          },
          phoenix: {
            tagline: "AI-native cybersecurity platform",
            description:
              "Marketing site for a fictional SaaS in the spirit of Vercel + Linear, but tuned for security ops: dashboard mockup, terminal UI, live-ticking counters, threat feed.",
            highlight:
              "Live-ticking ops counter that keeps incrementing in real time after the reveal",
          },
          pecaai: {
            tagline: "Auto parts at the speed of an app",
            description:
              "Landing page for a B2B marketplace app connecting mechanics to parts suppliers in real time. Clean app-marketing aesthetic with dual narratives.",
            highlight:
              "CSS-only phone mockup with orbit ring — pure CSS, no images, even the notch",
          },
          luxor: {
            tagline: "Private membership for an invitation-only world",
            description:
              "Editorial-luxury institutional site for a fictional ultra-exclusive club. Soho House / NoMad territory. Monastic minimalism, Roman numerals, four-city geography.",
            highlight:
              "Cursor spotlight with lerp + char-by-char hero stagger + SVG film grain overlay",
          },
          woodframe: {
            tagline: "Objects & interiors hand-carved in Minas Gerais",
            description:
              "Institutional site for a fictional design boutique — handcrafted furniture and bespoke interiors from Minas Gerais, Brazil. Kinfolk magazine territory.",
            highlight:
              "Triple typography stack — Clash Display + Inter + Instrument Serif italic — for editorial-magazine personality",
          },
        },
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
        chapter: "· Capítulo 02 · Portfólio",
        heading: "Seis mundos. Uma trajetória.",
        instruction: "Cada planeta é um site real que construí — clique para investigar.",
        statusLive: "◉ NO AR",
        statusCase: "◌ ESTUDO DE CASO",
        ctaVisit: "Visitar Superfície →",
        ctaClose: "Fechar",
        signatureFeature: "DIFERENCIAL",
        techStackLabel: "STACK TÉCNICA",
        caseStudyDisclaimer:
          "Estudo de caso — não publicado online. Código disponível mediante pedido.",
        screenshotPending: "Screenshot em breve",
        items: {
          upward: {
            tagline: "Agência digital full-service focada em performance",
            description:
              "Site full-stack que construí pra minha própria agência digital. Arquitetura Next.js multi-rota com páginas de case dinâmicas, i18n bilíngue EN/PT nativo, e camada de conteúdo afinada pra onboarding rápido de clientes.",
            highlight:
              "Portfólio multi-rota com cases dinâmicos + i18n bilíngue nativo",
          },
          smartfloors: {
            tagline: "Empresa familiar de pisos em Connecticut",
            description:
              "Site institucional em produção pra empresa familiar de pisos em Connecticut — instalação, lixamento e acabamento em madeira, epoxy, vinil, cerâmica e carpete. Bilíngue EN/ES, construído em torno da promessa one-team: a mesma equipe que orça é a que executa.",
            highlight:
              "Carrossel de galeria percorrendo projetos reais entregues em vários tipos de material — a prova social que fecha a venda em marca de serviços residenciais.",
          },
          phoenix: {
            tagline: "Plataforma de cibersegurança AI-native",
            description:
              "Site institucional pra SaaS fictício no espírito Vercel + Linear, mas afinado pra security ops: dashboard mockup, terminal UI, contadores live, threat feed.",
            highlight:
              "Contador live de ops que continua incrementando em tempo real depois do reveal",
          },
          pecaai: {
            tagline: "Peças automotivas na velocidade de um app",
            description:
              "Landing page de app marketplace B2B conectando oficinas a fornecedores em tempo real. Estética app-marketing limpa com narrativas duplas.",
            highlight:
              "Phone mockup em CSS puro com orbit decorativo — sem imagens, até o notch é CSS",
          },
          luxor: {
            tagline:
              "Membership privado pra um mundo que só entra por convite",
            description:
              "Site institucional editorial-luxury pra clube privado fictício ultra-exclusivo. Território Soho House / NoMad. Minimalismo monástico, algarismos romanos, geografia de quatro cidades.",
            highlight:
              "Cursor spotlight com lerp + stagger char-por-char + SVG film grain overlay",
          },
          woodframe: {
            tagline:
              "Objetos e interiores entalhados à mão em Minas Gerais",
            description:
              "Site institucional pra boutique fictícia de design — móveis entalhados à mão e interiores sob encomenda de Minas Gerais, Brasil. Território Kinfolk magazine.",
            highlight:
              "Stack tipográfico tripla — Clash Display + Inter + Instrument Serif itálico — pra personalidade editorial-revista",
          },
        },
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
