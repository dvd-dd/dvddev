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
      eyebrow: "DVDDEV — Front-end Developer",
      headline: "Code builds worlds.",
      subhead:
        "Engineer building landing pages that ship in the first 3 seconds. Available for product teams.",
      ctaPrimary: "Start a project",
      ctaSecondary: "See selected work",
      ctaCommand: "npx hire-david",
      ctaCopyHint: "Click to copy",
      ctaCopied: "Copied",
      // Legacy fields kept for any consumers still reading them — to be
      // deleted in Phase 5 once the Hero rewrite ships.
      tagline: "Front-end Developer crafting universes from code",
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
      studio: {
        title: "Studio",
        body: "Beyond freelance, I'm co-founder of Upward — a digital studio handling branding, rebranding, marketing and web development for partner brands. The Upward site itself is one of mine.",
        linkLabel: "Visit Upward",
        linkUrl: "https://upwardbr.com",
      },
      timeline: {
        heading: "Transmission log",
        events: [
          { year: "2025", label: "First contact with code" },
          { year: "2026", label: "First production project" },
          { year: "2026", label: "Front-end focus" },
          { year: "2026", label: "dvddev launched" },
        ],
      },
    },
    sections: {
      projects: {
        chapter: "Chapter 02 — Selected work",
        heading: "Selected work.",
        instruction: "Six sites I built. Click any to step in.",
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
              "Digital studio I co-founded — built end-to-end",
            description:
              "Full-stack site for the digital studio I co-founded. Multi-route Next.js architecture with dynamic case study pages, native EN/PT i18n, and a content layer tuned for rapid client onboarding.",
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
          corvin: {
            tagline: "Bespoke brand site for a UK close-protection firm",
            description:
              "Editorial brand site for a UK close-protection firm. Sanity-CMS backed, with a quietly animated contact section that contrasts the composed feel of the rest of the site.",
            highlight: "Animated contact backdrop",
          },
        },
      },
      customEnvironments: {
        eyebrow: "Capabilities",
        heading: "Custom build environments.",
        subhead:
          "Your tools shouldn't dictate the deliverable. The studio bends around your product — landing, brand, e-com, marketing, design system, and the dozens of shapes in between.",
      },
      skills: {
        chapter: "· Chapter 03 · Constellation",
        heading: "Mapped tools.",
        placeholder: "Interactive constellation incoming.",
      },
      contact: {
        chapter: "· Chapter 04 · Establish Comms",
        heading: "Open a channel.",
        subheading:
          "Available for new freelance projects worldwide. Pick a frequency below — fastest path is WhatsApp.",
        statusLabel: "AVAILABLE FOR NEW PROJECTS",
        channels: {
          whatsapp: {
            label: "WhatsApp",
            handle: "+55 35 98823-4633",
            action: "Send message",
            prefill:
              "Hi David, I saw your portfolio at dvddev.com and would like to talk about a project.",
          },
          linkedin: {
            label: "LinkedIn",
            handle: "david-romualdo",
            action: "Connect",
          },
          instagram: {
            label: "Instagram",
            handle: "@dvd_dd",
            action: "Follow",
          },
        },
      },
    },
    chrome: {
      announcement: {
        prefix: "Currently shipping for clients in",
        flags: "🇺🇸 🇧🇷 🇬🇧",
        suffix: "add yours",
      },
      nav: {
        links: {
          work: "Work",
          about: "About",
          process: "Process",
          contact: "Contact",
        },
        ctas: {
          linkedin: "LinkedIn",
          email: "Email",
          hire: "Hire me",
        },
        openMenu: "Open menu",
        closeMenu: "Close menu",
      },
      statusPill: "Available for work",
      themeToggle: {
        legend: "Change site theme",
        light: "Light",
        system: "System",
        dark: "Dark",
      },
    },
    footer: {
      copyright: "© DVDDEV",
      ctas: {
        community: "Join the conversation on LinkedIn →",
        newsletter: "Subscribe to my newsletter",
        newsletterButton: "Subscribe",
      },
      columns: {
        work: {
          heading: "Work",
          links: [
            { label: "Upward Media", href: "https://upwardbr.com" },
            { label: "Smart Hardwood Floors", href: "https://smartfloorservices.com" },
            { label: "Phoenix", href: "/phoenix" },
            { label: "PeçaAí", href: "/pecaai" },
            { label: "Luxor", href: "/luxor" },
            { label: "Wood Frame", href: "/woodframe" },
          ],
        },
        about: {
          heading: "About",
          links: [
            { label: "Origin", href: "#about" },
            { label: "Mission", href: "#about" },
            { label: "Studio (Upward)", href: "https://upwardbr.com" },
            { label: "Process", href: "#process" },
            { label: "Stack", href: "#skills" },
            { label: "Timeline", href: "#about" },
          ],
        },
        channels: {
          heading: "Channels",
          links: [
            { label: "WhatsApp", href: "https://wa.me/5535988234633" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/david-romualdo-a50b1231a/" },
            { label: "Instagram", href: "https://www.instagram.com/dvd_dd/" },
            { label: "GitHub", href: "https://github.com/dvd-dd" },
            { label: "Email", href: "mailto:nextnumberdev@gmail.com" },
          ],
        },
        trust: {
          heading: "Trust",
          links: [
            { label: "Privacy", href: "#contact" },
            { label: "Terms", href: "#contact" },
            { label: "Accessibility", href: "#contact" },
            { label: "Textures · CC BY 4.0", href: "https://creativecommons.org/licenses/by/4.0/" },
          ],
        },
      },
      socials: {
        heading: "Keep in touch",
      },
      flags: {
        heading: "Shipped for clients in",
        cities: ["Birmingham", "Connecticut", "São Paulo"],
      },
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
      eyebrow: "DVDDEV — Desenvolvedor Front-end",
      headline: "Código constrói mundos.",
      subhead:
        "Engenheiro construindo landing pages que entregam nos primeiros 3 segundos. Disponível para times de produto.",
      ctaPrimary: "Iniciar projeto",
      ctaSecondary: "Ver trabalho selecionado",
      ctaCommand: "npx hire-david",
      ctaCopyHint: "Clique para copiar",
      ctaCopied: "Copiado",
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
      studio: {
        title: "Estúdio",
        body: "Além do trabalho freelancer, sou co-fundador da Upward — estúdio digital que cuida de branding, rebranding, marketing e desenvolvimento web pra marcas parceiras. O próprio site da Upward é meu também.",
        linkLabel: "Visitar Upward",
        linkUrl: "https://upwardbr.com",
      },
      timeline: {
        heading: "Log de transmissão",
        events: [
          { year: "2025", label: "Primeiro contato com código" },
          { year: "2026", label: "Primeiro projeto em produção" },
          { year: "2026", label: "Foco em Front-end" },
          { year: "2026", label: "dvddev no ar" },
        ],
      },
    },
    sections: {
      projects: {
        chapter: "Capítulo 02 — Trabalho selecionado",
        heading: "Trabalho selecionado.",
        instruction: "Seis sites que construí. Clique em qualquer um pra entrar.",
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
            tagline: "Estúdio digital que co-fundei — construído ponta a ponta",
            description:
              "Site full-stack pro estúdio digital que co-fundei. Arquitetura Next.js multi-rota com páginas de case dinâmicas, i18n bilíngue EN/PT nativo, e camada de conteúdo afinada pra onboarding rápido de clientes.",
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
          corvin: {
            tagline:
              "Site de marca sob medida para empresa britânica de close protection",
            description:
              "Site editorial para uma firma britânica de close protection. Backend em Sanity CMS e seção de contato com fundo em movimento leve, contrastando com o tom composto do resto.",
            highlight: "Contato com fundo em movimento",
          },
        },
      },
      customEnvironments: {
        eyebrow: "Capacidades",
        heading: "Ambientes de build sob medida.",
        subhead:
          "Suas ferramentas não deveriam ditar o entregável. O estúdio dobra em volta do seu produto — landing, brand, e-com, marketing, design system, e as dezenas de formas no meio.",
      },
      skills: {
        chapter: "· Capítulo 03 · Constelação",
        heading: "Ferramentas mapeadas.",
        placeholder: "Constelação interativa em construção.",
      },
      contact: {
        chapter: "· Capítulo 04 · Estabelecer Comunicação",
        heading: "Abrir um canal.",
        subheading:
          "Disponível pra novos projetos freelancer. Escolha uma frequência abaixo — o caminho mais rápido é o WhatsApp.",
        statusLabel: "DISPONÍVEL PARA NOVOS PROJETOS",
        channels: {
          whatsapp: {
            label: "WhatsApp",
            handle: "+55 35 98823-4633",
            action: "Enviar mensagem",
            prefill:
              "Olá David, vi seu portfólio em dvddev.com e gostaria de conversar sobre um projeto.",
          },
          linkedin: {
            label: "LinkedIn",
            handle: "david-romualdo",
            action: "Conectar",
          },
          instagram: {
            label: "Instagram",
            handle: "@dvd_dd",
            action: "Seguir",
          },
        },
      },
    },
    chrome: {
      announcement: {
        prefix: "Entregando para clientes em",
        flags: "🇺🇸 🇧🇷 🇬🇧",
        suffix: "adicione o seu",
      },
      nav: {
        links: {
          work: "Trabalho",
          about: "Sobre",
          process: "Processo",
          contact: "Contato",
        },
        ctas: {
          linkedin: "LinkedIn",
          email: "Email",
          hire: "Me contrate",
        },
        openMenu: "Abrir menu",
        closeMenu: "Fechar menu",
      },
      statusPill: "Disponível para trabalho",
      themeToggle: {
        legend: "Trocar tema do site",
        light: "Claro",
        system: "Sistema",
        dark: "Escuro",
      },
    },
    footer: {
      copyright: "© DVDDEV",
      ctas: {
        community: "Entre na conversa no LinkedIn →",
        newsletter: "Assine minha newsletter",
        newsletterButton: "Assinar",
      },
      columns: {
        work: {
          heading: "Trabalho",
          links: [
            { label: "Upward Media", href: "https://upwardbr.com" },
            { label: "Smart Hardwood Floors", href: "https://smartfloorservices.com" },
            { label: "Phoenix", href: "/phoenix" },
            { label: "PeçaAí", href: "/pecaai" },
            { label: "Luxor", href: "/luxor" },
            { label: "Wood Frame", href: "/woodframe" },
          ],
        },
        about: {
          heading: "Sobre",
          links: [
            { label: "Origem", href: "#about" },
            { label: "Missão", href: "#about" },
            { label: "Estúdio (Upward)", href: "https://upwardbr.com" },
            { label: "Processo", href: "#process" },
            { label: "Stack", href: "#skills" },
            { label: "Timeline", href: "#about" },
          ],
        },
        channels: {
          heading: "Canais",
          links: [
            { label: "WhatsApp", href: "https://wa.me/5535988234633" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/david-romualdo-a50b1231a/" },
            { label: "Instagram", href: "https://www.instagram.com/dvd_dd/" },
            { label: "GitHub", href: "https://github.com/dvd-dd" },
            { label: "Email", href: "mailto:nextnumberdev@gmail.com" },
          ],
        },
        trust: {
          heading: "Trust",
          links: [
            { label: "Privacidade", href: "#contact" },
            { label: "Termos", href: "#contact" },
            { label: "Acessibilidade", href: "#contact" },
            { label: "Texturas · CC BY 4.0", href: "https://creativecommons.org/licenses/by/4.0/" },
          ],
        },
      },
      socials: {
        heading: "Mantenha contato",
      },
      flags: {
        heading: "Entregando para clientes em",
        cities: ["Birmingham", "Connecticut", "São Paulo"],
      },
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
