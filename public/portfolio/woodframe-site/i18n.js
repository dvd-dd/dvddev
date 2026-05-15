/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   WOOD FRAME — i18n (EN / PT)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function () {
  "use strict";

  const DICT = {
    en: {
      meta: {
        title: "Wood Frame — Objects & Interiors",
        description:
          "Wood Frame is a boutique studio of natural design. Hand-carved objects and bespoke interiors, born from the forest.",
      },
      nav: {
        objects: "Objects",
        process: "Process",
        atelier: "Atelier",
        commission: "Commission",
      },
      hero: {
        eyebrow: "— Est. 2014 · Minas Gerais · Brazil",
        line1: "Objects",
        line2: "of",
        line3Html: "<em>nature.</em>",
        ledeHtml: "Each piece is carved once.<br />Owned for a lifetime.",
        ctaPrimary: "See the collection",
        ctaSecondary: "Commission a piece",
        captionNo: "№ 01",
        caption: "Rovere stool — European oak — 2024",
        m1Num: "11 yrs",
        m1Label: "of quiet practice",
        m2Num: "1 of 1",
        m2Label: "every piece unique",
        m3Num: "~40",
        m3Label: "objects per year",
        m4Num: "∞",
        m4Label: "lifetime repair",
      },
      manifesto: {
        rail: "ESSENCE · SHAPE · NATURE · BALANCE · ESSENCE · SHAPE · NATURE · BALANCE",
        eyebrow: "— A few words",
        quoteHtml:
          "<em>\"We don't decorate spaces.<br />We bring the forest indoors —<br />one piece, one grain,<br />one breath at a time.\"</em>",
        body1:
          "Wood Frame began in a small shed at the edge of a Minas Gerais forest. One carpenter. One chisel. One idea — that a well-made object should feel like it was always meant to exist.",
        body2:
          "Eleven years later, we are still a studio of three. We refuse mass production, because mass production refuses the grain. Every piece leaves our atelier with the marks of the hand that shaped it, the species that grew it, and the season it was sourced in.",
        body3Html:
          "If you are looking for fast, we are not for you. If you are looking for <em>forever</em>, welcome.",
        signature: "— Caio & Helena, founders",
      },
      collection: {
        chapterHtml: "<em>Chapter I</em> — Objects",
        titleHtml: "Six pieces<br /><em>in circulation.</em>",
        lede:
          "A small rotating collection — each one hand-carved, numbered, signed on the underside. When they sell, we start again from a fresh block. Drag to explore.",
        trackHint: "drag · scroll · swipe",
        items: {
          rovere: {
            species: "European Oak",
            name: "Rovere",
            sub: "Carved stool · 42cm · Edition of 4",
          },
          faggio: {
            species: "Beechwood",
            name: "Faggio",
            sub: "Entrance bench · 140cm · Single piece",
          },
          quercus: {
            species: "Brazilian Oak",
            name: "Quercus",
            sub: "Wall frame · 60×80cm · Edition of 8",
          },
          larix: {
            species: "Larch",
            name: "Larix",
            sub: "Floating shelf · 120cm · Edition of 6",
          },
          cedro: {
            species: "Cedar",
            name: "Cedro",
            sub: "Low table · 110×60cm · Single piece",
          },
          ulmo: {
            species: "Elm",
            name: "Ulmo",
            sub: "Standing mirror · 180cm · Edition of 3",
          },
        },
      },
      materials: {
        chapterHtml: "<em>Chapter II</em> — Materials",
        titleHtml: "Four species.<br /><em>No substitutes.</em>",
        lede:
          "We work with four species, and four only. Each has a temperament, a density, a way of receiving oil. We learn them like old friends.",
        density: "Density",
        hardness: "Hardness",
        finish: "Finish",
        oak: {
          name: "Oak",
          origin: "Minas Gerais · Brazil",
          hardness: "High",
          finish: "Raw oil",
        },
        walnut: {
          name: "Walnut",
          origin: "Paraná · Brazil",
          hardness: "Medium-high",
          finish: "Dark wax",
        },
        ash: {
          name: "Ash",
          origin: "Santa Catarina · Brazil",
          hardness: "Medium",
          finish: "Natural soap",
        },
        teak: {
          name: "Teak",
          origin: "Bahia · Brazil",
          hardness: "High",
          finish: "Tung oil",
        },
      },
      craft: {
        chapterHtml: "<em>Chapter III</em> — Craft",
        titleHtml: "Four acts.<br /><em>Six months. Sometimes longer.</em>",
        sourcing: {
          title: "Sourcing",
          desc:
            "We walk the forests ourselves. Every tree is chosen standing, and never felled before its time. A single sourcing trip can take two weeks — and come back with nothing.",
        },
        carving: {
          title: "Carving",
          desc:
            "The block is allowed to dry for 90 days before the first cut. Then the hand takes over — chisel, plane, rasp, palm. No CNC. No shortcut. The grain decides what is possible.",
        },
        finishing: {
          title: "Finishing",
          desc:
            "Three layers of oil, each one rubbed in by hand and allowed to cure for 48 hours. The surface is polished with beeswax until it feels warm. This is the slowest part. It cannot be hurried.",
        },
        delivery: {
          title: "Delivery",
          desc:
            "Each object is wrapped in unbleached cotton, boxed in reclaimed cedar, and signed by the carver. A small card travels with it, telling the story of the tree it came from.",
        },
      },
      atelier: {
        chapterHtml: "<em>Chapter IV</em> — The Atelier",
        quoteHtml:
          "<em>\"Our studio is a quiet room<br />in the countryside of Minas Gerais.<br />We answer the phone slowly.\"</em>",
        meta: "— 21°S · 44°W · 1,140m elevation",
      },
      recognition: {
        chapterHtml: "<em>A few kind words</em>",
        title: "Quietly noticed.",
        q1: {
          text:
            "A studio that measures time in grain rings, not quarters. Wood Frame is the most considered object brand to come out of South America in a decade.",
          source: "Dezeen — March 2024",
        },
        q2: {
          text:
            "There is a hush around these pieces. You feel the forest before you feel the furniture. That is rare, and it is the whole point.",
          source: "Wallpaper* — Issue 287",
        },
        q3: {
          text:
            "No showroom. No catalogue. No rush. Wood Frame has rewritten what a Brazilian design studio can refuse to be.",
          source: "Casa Vogue Brasil — Jan 2025",
        },
      },
      commission: {
        eyebrow: "— Bespoke",
        titleHtml: "Want one<br /><em>of your own?</em>",
        lede:
          "Every Wood Frame object starts with a conversation. Tell us what you are imagining — a piece, a room, a whole home — and we will write back within a week.",
        name: "Your name",
        namePh: "Helena Ribeiro",
        email: "Email",
        emailPh: "hello@example.com",
        species: "Preferred species",
        kind: "Kind of piece",
        message: "What are you imagining?",
        messagePh:
          "A low walnut table for a reading corner. Something warm and quiet.",
        submit: "Start the conversation",
        submitted: "Message received · Thank you ✓",
        undecided: "Undecided",
        stool: "Stool / chair",
        table: "Table",
        shelf: "Shelf / cabinet",
        wall: "Wall object",
        interior: "Full interior",
        reachHtml:
          'or reach us at <a href="mailto:atelier@woodframe.studio">atelier@woodframe.studio</a> · <a href="#">@woodframe.studio</a>',
      },
      footer: {
        tag: "Hand-carved in Brazil · Shipped worldwide",
        col: { studio: "Studio", visit: "Visit", follow: "Follow" },
        link: {
          appointment: "By appointment only",
          location: "Minas Gerais, BR",
          directions: "Directions",
          instagram: "Instagram",
          journal: "Journal",
          newsletter: "Newsletter",
        },
        copyright: "© 2025 Wood Frame Studio · All pieces are one of a kind",
        colophon: "Set in Clash Display, Instrument Serif, Inter",
      },
    },

    pt: {
      meta: {
        title: "Wood Frame — Objetos & Interiores",
        description:
          "Wood Frame é um estúdio boutique de design natural. Objetos esculpidos à mão e interiores sob medida, nascidos da floresta.",
      },
      nav: {
        objects: "Objetos",
        process: "Processo",
        atelier: "Ateliê",
        commission: "Encomendar",
      },
      hero: {
        eyebrow: "— Fundado em 2014 · Minas Gerais · Brasil",
        line1: "Objetos",
        line2: "da",
        line3Html: "<em>natureza.</em>",
        ledeHtml:
          "Cada peça é esculpida uma única vez.<br />Para durar uma vida.",
        ctaPrimary: "Ver a coleção",
        ctaSecondary: "Encomendar uma peça",
        captionNo: "Nº 01",
        caption: "Banquinho Rovere — carvalho europeu — 2024",
        m1Num: "11 anos",
        m1Label: "de prática silenciosa",
        m2Num: "1 de 1",
        m2Label: "cada peça é única",
        m3Num: "~40",
        m3Label: "objetos por ano",
        m4Num: "∞",
        m4Label: "reparo vitalício",
      },
      manifesto: {
        rail: "ESSÊNCIA · FORMA · NATUREZA · EQUILÍBRIO · ESSÊNCIA · FORMA · NATUREZA · EQUILÍBRIO",
        eyebrow: "— Algumas palavras",
        quoteHtml:
          "<em>\"Não decoramos espaços.<br />Trazemos a floresta para dentro —<br />uma peça, um veio,<br />uma respiração por vez.\"</em>",
        body1:
          "A Wood Frame começou num pequeno galpão à beira de uma mata em Minas Gerais. Um marceneiro. Um formão. Uma ideia — a de que um objeto bem feito deve parecer que sempre esteve destinado a existir.",
        body2:
          "Onze anos depois, ainda somos um estúdio de três. Recusamos a produção em massa, porque a produção em massa recusa o veio da madeira. Cada peça deixa nosso ateliê com as marcas da mão que a moldou, da espécie que a fez crescer e da estação em que foi colhida.",
        body3Html:
          "Se você procura rapidez, não somos para você. Se você procura <em>para sempre</em>, seja bem-vindo.",
        signature: "— Caio & Helena, fundadores",
      },
      collection: {
        chapterHtml: "<em>Capítulo I</em> — Objetos",
        titleHtml: "Seis peças<br /><em>em circulação.</em>",
        lede:
          "Uma pequena coleção rotativa — cada uma esculpida à mão, numerada e assinada na parte de baixo. Quando vendem, começamos de novo a partir de um bloco novo. Arraste para explorar.",
        trackHint: "arraste · role · deslize",
        items: {
          rovere: {
            species: "Carvalho Europeu",
            name: "Rovere",
            sub: "Banquinho esculpido · 42cm · Edição de 4",
          },
          faggio: {
            species: "Faia",
            name: "Faggio",
            sub: "Banco de entrada · 140cm · Peça única",
          },
          quercus: {
            species: "Carvalho Brasileiro",
            name: "Quercus",
            sub: "Moldura de parede · 60×80cm · Edição de 8",
          },
          larix: {
            species: "Lariço",
            name: "Larix",
            sub: "Prateleira flutuante · 120cm · Edição de 6",
          },
          cedro: {
            species: "Cedro",
            name: "Cedro",
            sub: "Mesa baixa · 110×60cm · Peça única",
          },
          ulmo: {
            species: "Olmo",
            name: "Ulmo",
            sub: "Espelho de pé · 180cm · Edição de 3",
          },
        },
      },
      materials: {
        chapterHtml: "<em>Capítulo II</em> — Materiais",
        titleHtml: "Quatro espécies.<br /><em>Sem substitutos.</em>",
        lede:
          "Trabalhamos com quatro espécies, e apenas quatro. Cada uma tem um temperamento, uma densidade, um modo de receber o óleo. Aprendemos com elas como com velhas amigas.",
        density: "Densidade",
        hardness: "Dureza",
        finish: "Acabamento",
        oak: {
          name: "Carvalho",
          origin: "Minas Gerais · Brasil",
          hardness: "Alta",
          finish: "Óleo puro",
        },
        walnut: {
          name: "Nogueira",
          origin: "Paraná · Brasil",
          hardness: "Média-alta",
          finish: "Cera escura",
        },
        ash: {
          name: "Freixo",
          origin: "Santa Catarina · Brasil",
          hardness: "Média",
          finish: "Sabão natural",
        },
        teak: {
          name: "Teca",
          origin: "Bahia · Brasil",
          hardness: "Alta",
          finish: "Óleo de tungue",
        },
      },
      craft: {
        chapterHtml: "<em>Capítulo III</em> — Ofício",
        titleHtml:
          "Quatro atos.<br /><em>Seis meses. Às vezes mais.</em>",
        sourcing: {
          title: "Coleta",
          desc:
            "Percorremos as matas nós mesmos. Cada árvore é escolhida em pé, e nunca derrubada antes da hora. Uma única viagem de coleta pode levar duas semanas — e voltar sem nada.",
        },
        carving: {
          title: "Entalhe",
          desc:
            "O bloco seca por 90 dias antes do primeiro corte. Então a mão assume — formão, plaina, raspador, palma. Nada de CNC. Nada de atalhos. O veio decide o que é possível.",
        },
        finishing: {
          title: "Acabamento",
          desc:
            "Três camadas de óleo, cada uma aplicada à mão e deixada curar por 48 horas. A superfície é polida com cera de abelha até ficar quente ao toque. Esta é a parte mais lenta. Não pode ser apressada.",
        },
        delivery: {
          title: "Entrega",
          desc:
            "Cada objeto é embrulhado em algodão cru, acondicionado em cedro reaproveitado e assinado pelo entalhador. Um pequeno cartão viaja junto, contando a história da árvore que o originou.",
        },
      },
      atelier: {
        chapterHtml: "<em>Capítulo IV</em> — O Ateliê",
        quoteHtml:
          "<em>\"Nosso estúdio é uma sala silenciosa<br />no interior de Minas Gerais.<br />Atendemos o telefone com calma.\"</em>",
        meta: "— 21°S · 44°O · 1.140m de altitude",
      },
      recognition: {
        chapterHtml: "<em>Algumas palavras gentis</em>",
        title: "Silenciosamente notados.",
        q1: {
          text:
            "Um estúdio que mede o tempo em anéis de crescimento, não em trimestres. A Wood Frame é a marca de objetos mais pensada a sair da América do Sul na última década.",
          source: "Dezeen — Março 2024",
        },
        q2: {
          text:
            "Existe um silêncio em torno destas peças. Você sente a floresta antes de sentir o móvel. Isso é raro, e é exatamente o ponto.",
          source: "Wallpaper* — Edição 287",
        },
        q3: {
          text:
            "Sem showroom. Sem catálogo. Sem pressa. A Wood Frame reescreveu o que um estúdio brasileiro de design pode se recusar a ser.",
          source: "Casa Vogue Brasil — Jan 2025",
        },
      },
      commission: {
        eyebrow: "— Sob medida",
        titleHtml: "Quer uma<br /><em>só sua?</em>",
        lede:
          "Todo objeto Wood Frame começa com uma conversa. Diga-nos o que você está imaginando — uma peça, um cômodo, uma casa inteira — e respondemos em até uma semana.",
        name: "Seu nome",
        namePh: "Helena Ribeiro",
        email: "Email",
        emailPh: "ola@exemplo.com",
        species: "Espécie preferida",
        kind: "Tipo de peça",
        message: "O que você está imaginando?",
        messagePh:
          "Uma mesa baixa de nogueira para um canto de leitura. Algo quente e silencioso.",
        submit: "Começar a conversa",
        submitted: "Mensagem recebida · Obrigado ✓",
        undecided: "Indeciso",
        stool: "Banqueta / cadeira",
        table: "Mesa",
        shelf: "Prateleira / armário",
        wall: "Objeto de parede",
        interior: "Interior completo",
        reachHtml:
          'ou escreva para <a href="mailto:atelier@woodframe.studio">atelier@woodframe.studio</a> · <a href="#">@woodframe.studio</a>',
      },
      footer: {
        tag: "Esculpido à mão no Brasil · Enviado para o mundo",
        col: { studio: "Estúdio", visit: "Visitar", follow: "Siga" },
        link: {
          appointment: "Apenas com agendamento",
          location: "Minas Gerais, BR",
          directions: "Como chegar",
          instagram: "Instagram",
          journal: "Diário",
          newsletter: "Newsletter",
        },
        copyright: "© 2025 Wood Frame Studio · Todas as peças são únicas",
        colophon: "Composto em Clash Display, Instrument Serif, Inter",
      },
    },
  };

  function getPath(obj, path) {
    return path.split(".").reduce((o, k) => (o && o[k] != null ? o[k] : null), obj);
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
      localStorage.setItem("woodframe-lang", lang);
    } catch (_) {}
    window.currentLang = lang;
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
  }

  let saved = "en";
  try {
    saved = localStorage.getItem("woodframe-lang") || "en";
  } catch (_) {}
  applyLang(saved);

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-lang]");
    if (!btn) return;
    e.preventDefault();
    applyLang(btn.getAttribute("data-lang"));
  });

  window.woodframeI18n = { setLang: applyLang, t: (k) => getPath(DICT[window.currentLang || "en"], k) };
})();
