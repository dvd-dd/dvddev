/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PEÇAAÍ — i18n (EN / PT)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function () {
  "use strict";

  const DICT = {
    en: {
      meta: {
        title: "PeçaAí — Auto parts at the speed of an app",
        description:
          "PeçaAí connects auto repair shops to parts suppliers in real time. Tap, find, delivered. The B2B marketplace that moved the parts hunt off the phone and into the app.",
      },
      nav: {
        how: "How it works",
        mech: "For shops",
        sellers: "For suppliers",
        coverage: "Coverage",
        cta: "Get the app",
      },
      hero: {
        badge: "10,482 parts shipped right now",
        titleHtml:
          'The part you<br />need, <span class="grad">in the app.</span><br /><span class="hero-alt">Same day.</span>',
        lede:
          "PeçaAí is the marketplace that connects auto repair shops to the best parts suppliers in their city — in real time, with transparent pricing and same-day delivery.",
        appStore: "App Store",
        googlePlay: "Google Play",
        trust: {
          shops: "active shops",
          suppliers: "suppliers",
          delivery: "avg delivery",
          deliverySuffix: "min",
        },
      },
      how: {
        eyebrow: "How it works",
        titleHtml:
          'Three taps<br />and the part is <span class="grad">on the way.</span>',
        lede:
          "Forget the group chat, forget the counter. We turned that 40-minute phone hunt into three simple steps on your phone.",
        s1: {
          title: "Search the part",
          desc:
            "Type the name, the car model, or scan the barcode on the old packaging. The app finds it in milliseconds.",
        },
        s2: {
          title: "Compare and order",
          desc:
            "See every supplier in your area side by side. Price, rating, delivery time — all transparent. Pick one and order.",
        },
        s3: {
          title: "Arrives at the shop",
          desc:
            "The supplier's courier leaves right away. Track live on the map and receive it straight at your bay — in 45 minutes, on average.",
        },
      },
      mech: {
        eyebrow: "For shops",
        titleHtml:
          'Less phone.<br />More cars<br /><span class="grad">back on the road.</span>',
        lede:
          "Every minute idle is an upset customer and a booked bay. We cut the average time to find a part from 38 minutes to 4.",
        l1: "Prices from up to 5 suppliers side by side, instantly",
        l2: "Full part history per vehicle serviced",
        l3: "Automatic warranty — no paperwork, no arguments",
        l4: "Month-end billing, one single invoice",
        l5: "Human support 24/7 by chat",
        cta: "Register my shop",
        ascLabel: "Average time per part",
        ascRow1: "Phone, chat, counter",
        ascRow2: "PeçaAí",
        ascSaveHtml:
          '<strong>−89%</strong> time spent searching.<br /><span>That\u2019s cars getting back on the road.</span>',
      },
      sellers: {
        eyebrow: "For suppliers",
        titleHtml:
          'Your inventory<br />in front of the<br /><span class="grad">entire city.</span>',
        lede:
          "Stop waiting for the shop to call. We put your stock in the hands of thousands of mechanics at once — with fair pricing and guaranteed settlements.",
        l1: "One-click catalog import from your spreadsheet",
        l2: "Orders drop straight into your dashboard, no phone",
        l3: "Simple commission, no fine print",
        l4: "Guaranteed payout in 2 business days",
        l5: "Sales analytics by part, area, and customer",
        cta: "Become a supplier",
        spTitle: "Supplier dashboard",
        spLive: "live",
        spLabel: "sales today",
        spDelta: "▲ 23% vs yesterday",
      },
      coverage: {
        eyebrow: "Coverage",
        titleHtml:
          'Live in <span class="grad">14 cities.</span><br />Yours could be next.',
        hq: "TX · HQ",
        comingSoon: "coming soon",
      },
      testi: {
        eyebrow: "Who's using it",
        titleHtml: 'Shops saying<br /><span class="grad">what nobody asks.</span>',
        q1:
          "I used to have one guy just chasing parts on the phone. Today he's back at the bench with me. PeçaAí freed up a whole mechanic for the work that actually matters.",
        s1: "Martins Auto · Austin",
        q2:
          "What sold me was the transparent pricing. Before, each supplier charged whatever they felt like. Now I see every quote side by side and pick the best one for my customer.",
        s2: "Box 14 Auto · San Diego",
        q3:
          "I place 180 orders a month. At month-end I get a single invoice, pay it, done. No more receipts all over the desk, no more random bills to track.",
        s3: "Lopes Mechanics · Phoenix",
      },
      faq: {
        eyebrow: "Questions",
        titleHtml: 'Before<br /><span class="grad">you ask.</span>',
        q1: "How much does it cost for a shop?",
        a1:
          "Zero. Shops pay nothing to use the app — no subscription, no fee per order. Our revenue comes from the supplier side, who wins by selling more without a sales team.",
        q2: "What if the wrong part shows up?",
        a2:
          "We swap it, no questions. Warranty is automatic in the app and the courier comes back with the correct part the same day. If we can't deliver, you're refunded within 24 hours.",
        q3: "What are the payment options?",
        a3:
          "Pay per order by card or ACH, or roll everything into a single end-of-month invoice for all your purchases. No paperwork, no separate bills from each supplier.",
        q4: "Does it work with any car?",
        a4:
          "Yes. We cover more than 240 popular models and over 18,000 cataloged parts. If a part isn't in the app, our team tracks it down within 2 hours and reports back.",
        q5: "I want to be a supplier. How?",
        a5:
          "Send your business details through the contact form (or by chat) and one of our account managers will reach out within 24 hours. Catalog integration takes about 2 days on average.",
      },
      fc: {
        eyebrow: "Download now",
        titleHtml: 'Tap, <span class="grad-light">find,</span><br />delivered.',
        lede:
          "Free on the App Store and Google Play. Your first PeçaAí order ships with free delivery on us.",
        appStore: "Download on App Store",
        googlePlay: "Get it on Google Play",
      },
      footer: {
        tagline:
          "The auto-parts marketplace that moved the parts hunt out of the shop phone and into the mechanic's pocket.",
        col: { product: "Product", company: "Company", support: "Support" },
        prod: {
          how: "How it works",
          mech: "For shops",
          sellers: "For suppliers",
          coverage: "Coverage",
        },
        co: { about: "About", blog: "Blog", careers: "Careers", press: "Press" },
        sup: {
          help: "Help center",
          chat: "24/7 chat",
          terms: "Terms",
          privacy: "Privacy",
        },
        copyright: "© 2026 PeçaAí Technologies",
        builtBy: "Built with care for shops everywhere.",
      },
    },

    pt: {
      meta: {
        title: "PeçaAí — Autopeças na velocidade de um app",
        description:
          "PeçaAí conecta oficinas a fornecedores de autopeças em tempo real. Toca, encontra, recebe. O marketplace B2B que tirou a caça por peças do telefone e colocou no app.",
      },
      nav: {
        how: "Como funciona",
        mech: "Para oficinas",
        sellers: "Para fornecedores",
        coverage: "Cobertura",
        cta: "Baixar o app",
      },
      hero: {
        badge: "10.482 peças sendo enviadas agora",
        titleHtml:
          'A peça que você<br />precisa, <span class="grad">no app.</span><br /><span class="hero-alt">No mesmo dia.</span>',
        lede:
          "O PeçaAí é o marketplace que conecta oficinas aos melhores fornecedores de autopeças da sua cidade — em tempo real, com preços transparentes e entrega no mesmo dia.",
        appStore: "App Store",
        googlePlay: "Google Play",
        trust: {
          shops: "oficinas ativas",
          suppliers: "fornecedores",
          delivery: "entrega média",
          deliverySuffix: "min",
        },
      },
      how: {
        eyebrow: "Como funciona",
        titleHtml:
          'Três toques<br />e a peça já <span class="grad">está a caminho.</span>',
        lede:
          "Esqueça o grupo do WhatsApp, esqueça o balcão. A gente transformou aquela caça de 40 minutos no telefone em três passos simples no celular.",
        s1: {
          title: "Busque a peça",
          desc:
            "Digite o nome, o modelo do carro ou escaneie o código de barras da embalagem antiga. O app encontra em milissegundos.",
        },
        s2: {
          title: "Compare e peça",
          desc:
            "Veja todos os fornecedores da sua região lado a lado. Preço, avaliação, tempo de entrega — tudo transparente. Escolha um e peça.",
        },
        s3: {
          title: "Chega na oficina",
          desc:
            "O entregador do fornecedor sai imediatamente. Acompanhe ao vivo no mapa e receba direto na sua box — em 45 minutos, na média.",
        },
      },
      mech: {
        eyebrow: "Para oficinas",
        titleHtml:
          'Menos telefone.<br />Mais carros<br /><span class="grad">de volta à rua.</span>',
        lede:
          "Cada minuto parado é um cliente irritado e uma box ocupada. Cortamos o tempo médio de achar uma peça de 38 minutos para 4.",
        l1: "Preços de até 5 fornecedores lado a lado, na hora",
        l2: "Histórico completo de peças por veículo atendido",
        l3: "Garantia automática — sem papelada, sem discussão",
        l4: "Faturamento no fim do mês, uma única nota",
        l5: "Suporte humano 24/7 por chat",
        cta: "Cadastrar minha oficina",
        ascLabel: "Tempo médio por peça",
        ascRow1: "Telefone, chat, balcão",
        ascRow2: "PeçaAí",
        ascSaveHtml:
          '<strong>−89%</strong> de tempo procurando.<br /><span>Isso é carro voltando para a rua.</span>',
      },
      sellers: {
        eyebrow: "Para fornecedores",
        titleHtml:
          'Seu estoque<br />na frente da<br /><span class="grad">cidade inteira.</span>',
        lede:
          "Pare de esperar a oficina ligar. A gente coloca seu estoque na mão de milhares de mecânicos de uma vez — com preço justo e repasse garantido.",
        l1: "Importação do catálogo em um clique a partir da sua planilha",
        l2: "Pedidos caem direto no seu painel, sem telefone",
        l3: "Comissão simples, sem letra miúda",
        l4: "Repasse garantido em 2 dias úteis",
        l5: "Análises de venda por peça, região e cliente",
        cta: "Quero ser fornecedor",
        spTitle: "Painel do fornecedor",
        spLive: "ao vivo",
        spLabel: "vendas hoje",
        spDelta: "▲ 23% vs ontem",
      },
      coverage: {
        eyebrow: "Cobertura",
        titleHtml:
          'Em <span class="grad">14 cidades.</span><br />A sua pode ser a próxima.',
        hq: "TX · Sede",
        comingSoon: "em breve",
      },
      testi: {
        eyebrow: "Quem usa",
        titleHtml: 'Oficinas dizendo<br /><span class="grad">o que ninguém pergunta.</span>',
        q1:
          "Eu tinha um cara só caçando peça no telefone. Hoje ele voltou para a bancada comigo. O PeçaAí me devolveu um mecânico inteiro para o trabalho que importa.",
        s1: "Martins Auto · Austin",
        q2:
          "O que me convenceu foi o preço transparente. Antes, cada fornecedor cobrava o que queria. Agora vejo todas as cotações lado a lado e escolho a melhor para o cliente.",
        s2: "Box 14 Auto · San Diego",
        q3:
          "Eu faço 180 pedidos por mês. No fim do mês recebo uma única nota, pago, pronto. Sem mais recibos espalhados na mesa, sem mais boletos avulsos para controlar.",
        s3: "Lopes Mechanics · Phoenix",
      },
      faq: {
        eyebrow: "Perguntas",
        titleHtml: 'Antes<br /><span class="grad">de perguntar.</span>',
        q1: "Quanto custa para uma oficina?",
        a1:
          "Zero. Oficinas não pagam nada para usar o app — sem mensalidade, sem taxa por pedido. Nossa receita vem do lado do fornecedor, que ganha vendendo mais sem precisar de equipe comercial.",
        q2: "E se vier a peça errada?",
        a2:
          "A gente troca, sem perguntas. A garantia é automática no app e o entregador volta com a peça certa no mesmo dia. Se não conseguirmos entregar, o reembolso cai em 24 horas.",
        q3: "Quais as formas de pagamento?",
        a3:
          "Pague por pedido no cartão ou Pix, ou junte tudo em uma única nota no fim do mês. Sem papelada, sem boletos separados de cada fornecedor.",
        q4: "Funciona com qualquer carro?",
        a4:
          "Sim. Cobrimos mais de 240 modelos populares e mais de 18.000 peças catalogadas. Se uma peça não está no app, nosso time procura em até 2 horas e dá retorno.",
        q5: "Quero ser fornecedor. Como faço?",
        a5:
          "Envie os dados do seu negócio pelo formulário de contato (ou pelo chat) e um dos nossos gerentes de conta retorna em até 24 horas. A integração do catálogo leva cerca de 2 dias em média.",
      },
      fc: {
        eyebrow: "Baixe agora",
        titleHtml: 'Toca, <span class="grad-light">encontra,</span><br />recebe.',
        lede:
          "Grátis na App Store e Google Play. Seu primeiro pedido no PeçaAí sai com entrega grátis por nossa conta.",
        appStore: "Baixar na App Store",
        googlePlay: "Disponível no Google Play",
      },
      footer: {
        tagline:
          "O marketplace de autopeças que tirou a caça por peças do telefone da oficina e colocou no bolso do mecânico.",
        col: { product: "Produto", company: "Empresa", support: "Suporte" },
        prod: {
          how: "Como funciona",
          mech: "Para oficinas",
          sellers: "Para fornecedores",
          coverage: "Cobertura",
        },
        co: { about: "Sobre", blog: "Blog", careers: "Carreiras", press: "Imprensa" },
        sup: {
          help: "Central de ajuda",
          chat: "Chat 24/7",
          terms: "Termos",
          privacy: "Privacidade",
        },
        copyright: "© 2026 PeçaAí Technologies",
        builtBy: "Feito com carinho para oficinas em todo lugar.",
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
      localStorage.setItem("pecaai-lang", lang);
    } catch (_) {}
    window.currentLang = lang;
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
  }

  let saved = "en";
  try {
    saved = localStorage.getItem("pecaai-lang") || "en";
  } catch (_) {}
  applyLang(saved);

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-lang]");
    if (!btn) return;
    e.preventDefault();
    applyLang(btn.getAttribute("data-lang"));
  });

  window.pecaaiI18n = {
    setLang: applyLang,
    t: (k) => getPath(DICT[window.currentLang || "en"], k),
    locale: () => (window.currentLang === "pt" ? "pt-BR" : "en-US"),
  };
})();
