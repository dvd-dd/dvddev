/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   LUXOR — i18n (EN / PT)
   Loaded before script.js so the hero split sees translated text.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function () {
  "use strict";

  const DICT = {
    en: {
      meta: {
        title: "Luxor — The Private Membership",
        description:
          "An invitation-only private membership curating the world's most exclusive experiences. Not for everyone. That's the point.",
      },
      nav: {
        experiences: "Experiences",
        membership: "Membership",
        ateliers: "Ateliers",
        apply: "Apply",
      },
      hero: {
        marquee:
          "EXCLUSIVITY · SOPHISTICATION · PRESTIGE · EXCLUSIVITY · SOPHISTICATION · PRESTIGE · ",
        eyebrow: "— A Private Membership",
        title: "Not for everyone.",
        sub: "For those who have already arrived.",
        cta: "Request an invitation",
        scroll: "SCROLL",
      },
      manifesto: {
        eyebrow: "— Manifesto",
        quoteHtml: "We are not a brand.<br />We are a <em>standard.</em>",
        body1:
          "A private world built for those who no longer need to prove anything — only to live it. Every door, opened. Every detail, curated. Every silence, respected.",
        body2:
          "We do not chase trends. We define the rooms in which trends are born. And we do not announce ourselves. We are recognized by those who already know.",
        signature: "— The House of Luxor",
        caption: "Atelier II — Monaco, 2024",
      },
      experiences: {
        eyebrow: "— The Six Worlds",
        titleHtml: "Six worlds.<br /><em>One key.</em>",
        lede:
          "A curated universe of experiences reserved exclusively for members. Scroll to discover.",
        explore: "Explore",
        scrollHint: "scroll",
        aviation: {
          title: "Private Aviation",
          lede: "A fleet on call. Takeoff within ninety minutes, anywhere on Earth.",
        },
        yachts: {
          title: "Yacht Charters",
          lede:
            "Forty-seven vessels across the Mediterranean and Caribbean. Crews trained in Luxor standards.",
        },
        michelin: {
          title: "Michelin Access",
          lede:
            "A guaranteed seat at every three-star table in the world — on any night, without notice.",
        },
        art: {
          title: "Art Acquisitions",
          lede:
            "Preview auctions before the world sees them. Private curators dispatched on request.",
        },
        grandPrix: {
          title: "Grand Prix Suites",
          lede:
            "Balcony access at Monaco, Silverstone, Spa, and Suzuka. Paddock passes included.",
        },
        fashion: {
          title: "Private Fashion",
          lede:
            "Front-row seating at every couture week. Ateliers opened for members before the collections ship.",
        },
      },
      ateliers: {
        eyebrow: "— Behind the Curtain",
        title: "The Ateliers.",
        lede:
          "Every experience we deliver passes through four silent rooms. These are ours.",
        curation: {
          title: "Curation",
          body:
            "A committee of nine meets quarterly in Monaco. They decide what enters the Luxor universe, and what is quietly refused.",
        },
        sourcing: {
          title: "Sourcing",
          body:
            "Our sourcing team speaks thirteen languages and holds keys to rooms no press release has ever mentioned.",
        },
        experience: {
          title: "Experience Design",
          body:
            "Every journey is scripted by hand. From the temperature of the car at arrival to the music in the suite — nothing is accidental.",
        },
        discretion: {
          title: "Discretion",
          body:
            "The first principle of the house. No names, no photographs, no records beyond what the member requires. Silence is our signature.",
        },
      },
      membership: {
        eyebrow: "— Three Keys",
        titleHtml: "Three doors.<br /><em>None public.</em>",
        lede:
          "Every tier is capped. Every seat is reviewed individually. No membership is purchased — only granted.",
        featured: "Most Requested",
        period: "/year",
        note:
          "Applications are reviewed quarterly. Seats are never guaranteed.",
        obsidian: {
          seats: "12 seats available",
          f1: "Full access to Ateliers I–IV",
          f2: "One private concierge",
          f3: "48-hour request window",
          f4: "Quarterly events — global",
        },
        crown: {
          seats: "6 seats available",
          f1: "Everything in Obsidian",
          f2: "Team of three concierges",
          f3: "12-hour request window",
          f4: "Private aviation allowance",
          f5: "Invitations to founders' events",
        },
        noir: {
          seats: "3 seats — by invitation only",
          f1: "Everything in Crown",
          f2: "A dedicated house director",
          f3: "Immediate request fulfillment",
          f4: "Private aviation — unlimited",
          f5: "A seat at the house committee",
        },
      },
      voices: {
        eyebrow: "— Voices",
        title: "Spoken softly.",
        q1: {
          text:
            "I stopped planning trips. I simply tell Luxor what I want to feel — and the feeling arrives on time.",
          meta: "Art Collector · Paris",
        },
        q2: {
          text:
            "There is a difference between being served and being understood. Luxor understood on the first call.",
          meta: "Hotelier · Monaco",
        },
        q3: {
          text:
            "They do not ask who you are. They already know — and they act as if they have known for years.",
          meta: "Industrialist · Tokyo",
        },
      },
      gallery: {
        como: "Villa IX · Lake Como · MMXXIV",
        milano: "Atelier · Milano",
        kyoto: "Private Dinner · Kyoto",
        saintTropez: "Regatta · Saint-Tropez",
        bordeaux: "Reserve · Bordeaux",
        monaco: "House Detail · Monaco",
        paris: "Couture Week · Paris",
        london: "Cognac Room · London",
      },
      apply: {
        eyebrow: "— Admission",
        titleHtml: "Tell us<br /><em>who you are.</em>",
        lede:
          "Every application is read personally. We reply within fourteen days.",
        name: "Full Name",
        email: "Email",
        city: "City of Residence",
        story: "Why Luxor",
        referredHtml: 'Referred by <span class="optional">(optional)</span>',
        submit: "Submit Application",
        submitted: "Application Received",
        disclaimer:
          "By submitting, you accept our discretion policy. All correspondence is confidential.",
      },
      footer: {
        col: {
          experiences: "Experiences",
          membership: "Membership",
          ateliers: "Ateliers",
          house: "House",
        },
        link: {
          aviation: "Private Aviation",
          yachts: "Yacht Charters",
          michelin: "Michelin Access",
          art: "Art Acquisitions",
          obsidian: "Obsidian",
          crown: "Crown",
          noir: "Noir",
          apply: "Apply",
          monaco: "Monaco",
          paris: "Paris",
          newYork: "New York",
          tokyo: "Tokyo",
          contact: "Contact",
          press: "Press",
          legal: "Legal",
          discretion: "Discretion",
        },
        copyright:
          "© MMXXV Luxor Private Membership · Discretion is our first principle.",
      },
    },

    pt: {
      meta: {
        title: "Luxor — A Membresia Privada",
        description:
          "Uma membresia privada somente por convite, curando as experiências mais exclusivas do mundo. Não é para todos. Esse é o ponto.",
      },
      nav: {
        experiences: "Experiências",
        membership: "Membresia",
        ateliers: "Ateliês",
        apply: "Candidatar-se",
      },
      hero: {
        marquee:
          "EXCLUSIVIDADE · SOFISTICAÇÃO · PRESTÍGIO · EXCLUSIVIDADE · SOFISTICAÇÃO · PRESTÍGIO · ",
        eyebrow: "— Uma Membresia Privada",
        title: "Não é para todos.",
        sub: "Para aqueles que já chegaram.",
        cta: "Solicitar um convite",
        scroll: "ROLAR",
      },
      manifesto: {
        eyebrow: "— Manifesto",
        quoteHtml: "Não somos uma marca.<br />Somos um <em>padrão.</em>",
        body1:
          "Um mundo privado construído para aqueles que não precisam mais provar nada — apenas vivê-lo. Cada porta, aberta. Cada detalhe, curado. Cada silêncio, respeitado.",
        body2:
          "Não perseguimos tendências. Definimos os salões em que as tendências nascem. E não nos anunciamos. Somos reconhecidos por aqueles que já sabem.",
        signature: "— A Casa Luxor",
        caption: "Ateliê II — Mônaco, 2024",
      },
      experiences: {
        eyebrow: "— Os Seis Mundos",
        titleHtml: "Seis mundos.<br /><em>Uma chave.</em>",
        lede:
          "Um universo curado de experiências reservado exclusivamente aos membros. Role para descobrir.",
        explore: "Explorar",
        scrollHint: "role",
        aviation: {
          title: "Aviação Privada",
          lede:
            "Uma frota à disposição. Decolagem em até noventa minutos, em qualquer lugar da Terra.",
        },
        yachts: {
          title: "Fretamento de Iates",
          lede:
            "Quarenta e sete embarcações pelo Mediterrâneo e Caribe. Tripulações treinadas nos padrões Luxor.",
        },
        michelin: {
          title: "Acesso Michelin",
          lede:
            "Um lugar garantido em toda mesa três estrelas do mundo — em qualquer noite, sem aviso prévio.",
        },
        art: {
          title: "Aquisições de Arte",
          lede:
            "Prévias de leilões antes do mundo vê-los. Curadores privados despachados sob demanda.",
        },
        grandPrix: {
          title: "Suítes Grand Prix",
          lede:
            "Acesso a camarotes em Mônaco, Silverstone, Spa e Suzuka. Passes de paddock incluídos.",
        },
        fashion: {
          title: "Moda Privada",
          lede:
            "Assentos na primeira fila em toda couture week. Ateliês abertos a membros antes das coleções embarcarem.",
        },
      },
      ateliers: {
        eyebrow: "— Por Trás da Cortina",
        title: "Os Ateliês.",
        lede:
          "Cada experiência que entregamos passa por quatro salas silenciosas. Estas são as nossas.",
        curation: {
          title: "Curadoria",
          body:
            "Um comitê de nove pessoas se reúne trimestralmente em Mônaco. Eles decidem o que entra no universo Luxor, e o que é silenciosamente recusado.",
        },
        sourcing: {
          title: "Sourcing",
          body:
            "Nossa equipe de sourcing fala treze idiomas e guarda as chaves de salas que nenhum press release jamais mencionou.",
        },
        experience: {
          title: "Design de Experiência",
          body:
            "Cada jornada é escrita à mão. Da temperatura do carro na chegada à música na suíte — nada é acidental.",
        },
        discretion: {
          title: "Discrição",
          body:
            "O primeiro princípio da casa. Sem nomes, sem fotografias, sem registros além do que o membro exige. O silêncio é a nossa assinatura.",
        },
      },
      membership: {
        eyebrow: "— Três Chaves",
        titleHtml: "Três portas.<br /><em>Nenhuma pública.</em>",
        lede:
          "Cada tier tem limite. Cada lugar é revisado individualmente. Nenhuma membresia é comprada — apenas concedida.",
        featured: "Mais Requisitado",
        period: "/ano",
        note:
          "Candidaturas são revisadas trimestralmente. Os lugares nunca são garantidos.",
        obsidian: {
          seats: "12 lugares disponíveis",
          f1: "Acesso completo aos Ateliês I–IV",
          f2: "Um concierge privado",
          f3: "Janela de solicitação de 48 horas",
          f4: "Eventos trimestrais — globais",
        },
        crown: {
          seats: "6 lugares disponíveis",
          f1: "Tudo do Obsidian",
          f2: "Equipe de três concierges",
          f3: "Janela de solicitação de 12 horas",
          f4: "Permissão para aviação privada",
          f5: "Convites para eventos dos fundadores",
        },
        noir: {
          seats: "3 lugares — apenas por convite",
          f1: "Tudo do Crown",
          f2: "Um diretor de casa dedicado",
          f3: "Atendimento imediato de solicitações",
          f4: "Aviação privada — ilimitada",
          f5: "Um assento no comitê da casa",
        },
      },
      voices: {
        eyebrow: "— Vozes",
        title: "Ditas em voz baixa.",
        q1: {
          text:
            "Parei de planejar viagens. Simplesmente digo ao Luxor o que quero sentir — e a sensação chega na hora.",
          meta: "Colecionador de Arte · Paris",
        },
        q2: {
          text:
            "Existe uma diferença entre ser atendido e ser compreendido. O Luxor compreendeu na primeira chamada.",
          meta: "Hoteleiro · Mônaco",
        },
        q3: {
          text:
            "Eles não perguntam quem você é. Já sabem — e agem como se soubessem há anos.",
          meta: "Industrial · Tóquio",
        },
      },
      gallery: {
        como: "Villa IX · Lago de Como · MMXXIV",
        milano: "Ateliê · Milão",
        kyoto: "Jantar Privado · Kyoto",
        saintTropez: "Regata · Saint-Tropez",
        bordeaux: "Reserva · Bordeaux",
        monaco: "Detalhe da Casa · Mônaco",
        paris: "Semana de Alta-Costura · Paris",
        london: "Sala de Cognac · Londres",
      },
      apply: {
        eyebrow: "— Admissão",
        titleHtml: "Conte-nos<br /><em>quem você é.</em>",
        lede:
          "Cada candidatura é lida pessoalmente. Respondemos em até quatorze dias.",
        name: "Nome Completo",
        email: "Email",
        city: "Cidade de Residência",
        story: "Por que Luxor",
        referredHtml: 'Indicado por <span class="optional">(opcional)</span>',
        submit: "Enviar Candidatura",
        submitted: "Candidatura Recebida",
        disclaimer:
          "Ao enviar, você aceita nossa política de discrição. Toda correspondência é confidencial.",
      },
      footer: {
        col: {
          experiences: "Experiências",
          membership: "Membresia",
          ateliers: "Ateliês",
          house: "Casa",
        },
        link: {
          aviation: "Aviação Privada",
          yachts: "Fretamento de Iates",
          michelin: "Acesso Michelin",
          art: "Aquisições de Arte",
          obsidian: "Obsidian",
          crown: "Crown",
          noir: "Noir",
          apply: "Candidatar-se",
          monaco: "Mônaco",
          paris: "Paris",
          newYork: "Nova York",
          tokyo: "Tóquio",
          contact: "Contato",
          press: "Imprensa",
          legal: "Legal",
          discretion: "Discrição",
        },
        copyright:
          "© MMXXV Luxor Private Membership · A discrição é nosso primeiro princípio.",
      },
    },
  };

  function getPath(obj, path) {
    return path
      .split(".")
      .reduce((o, k) => (o && o[k] != null ? o[k] : null), obj);
  }

  function applyLang(lang) {
    if (!DICT[lang]) lang = "en";
    const d = DICT[lang];

    document.documentElement.lang = lang;

    const title = getPath(d, "meta.title");
    if (title) document.title = title;
    const desc = document.querySelector('meta[name="description"]');
    const descText = getPath(d, "meta.description");
    if (desc && descText) desc.setAttribute("content", descText);

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const v = getPath(d, el.getAttribute("data-i18n"));
      if (v != null) el.textContent = v;
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const v = getPath(d, el.getAttribute("data-i18n-html"));
      if (v != null) el.innerHTML = v;
    });

    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      el.getAttribute("data-i18n-attr")
        .split(",")
        .forEach((pair) => {
          const [attr, key] = pair.split(":").map((s) => s.trim());
          const v = getPath(d, key);
          if (v != null) el.setAttribute(attr, v);
        });
    });

    document.querySelectorAll("[data-lang]").forEach((b) => {
      b.classList.toggle("active", b.getAttribute("data-lang") === lang);
    });

    try {
      localStorage.setItem("luxor-lang", lang);
    } catch (_) {}
    window.currentLang = lang;

    document.dispatchEvent(
      new CustomEvent("langchange", { detail: { lang } })
    );
  }

  let saved = "en";
  try {
    saved = localStorage.getItem("luxor-lang") || "en";
  } catch (_) {}
  applyLang(saved);

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-lang]");
    if (!btn) return;
    e.preventDefault();
    applyLang(btn.getAttribute("data-lang"));
  });

  window.luxorI18n = { setLang: applyLang, t: (k) => getPath(DICT[window.currentLang || "en"], k) };
})();
