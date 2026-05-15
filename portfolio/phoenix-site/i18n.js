/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PHOENIX — i18n (EN / PT)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function () {
  "use strict";

  const DICT = {
    en: {
      meta: {
        title: "Phoenix — The Security Network",
        description:
          "AI-native threat detection, response, and protection. Phoenix sees what others miss — and learns from every signal.",
      },
      nav: {
        platform: "Platform",
        how: "How it works",
        dashboard: "Dashboard",
        developers: "Developers",
        cta: "Request Access",
      },
      hero: {
        status: "All systems operational",
        version: "v4.12 — released today",
        titleHtml: 'We see what<br /><span class="grad">others miss.</span>',
        sub: "Phoenix is an AI-native security network that detects, analyzes, and responds to threats in real time — and learns from every signal, across every endpoint, every second of every day.",
        ctaPrimary: "Request Access",
        ctaSecondary: "View live dashboard",
        counterLabel: "Threats neutralized — last 24 hours",
      },
      feed: {
        eyebrow: "— Live Network",
        title: "A planet under watch.",
        lede:
          "Every dot is a real-time signal from our global sensor network. Every line is a threat being neutralized while you read this.",
        mapTitle: "Global Sensor Network",
        mapMeta: "237 nodes online",
        tickerHeader: "Recent activity",
        live: "LIVE",
        stats: {
          detection: "Avg detection time",
          accuracy: "Detection accuracy",
          breaches: "Successful breaches",
          soc: "SOC analysts on call",
        },
        sev: { h: "HIGH", m: "MED", l: "LOW" },
        threats: [
          { sev: "h", text: "Suspicious payload blocked", loc: "node-412 · us-east" },
          { sev: "m", text: "Anomalous DNS query pattern", loc: "node-877 · eu-west" },
          { sev: "l", text: "Outdated agent quarantined", loc: "node-203 · ap-south" },
          { sev: "h", text: "Lateral movement intercepted", loc: "node-091 · us-west" },
          { sev: "m", text: "Port scan detected", loc: "node-558 · sa-east" },
          { sev: "l", text: "Cert rotation completed", loc: "node-720 · eu-north" },
          { sev: "h", text: "Credential stuffing blocked", loc: "node-303 · ap-northeast" },
          { sev: "m", text: "Data exfil attempt halted", loc: "node-444 · us-central" },
          { sev: "l", text: "Patch deployed across cluster", loc: "node-612 · eu-central" },
          { sev: "h", text: "Ransomware behavior contained", loc: "node-129 · af-south" },
          { sev: "m", text: "Privilege escalation flagged", loc: "node-388 · me-south" },
          { sev: "l", text: "Anomaly resolved automatically", loc: "node-512 · ap-east" },
          { sev: "h", text: "Phishing domain blackholed", loc: "node-274 · us-east" },
          { sev: "m", text: "Brute force lockout triggered", loc: "node-905 · eu-west" },
        ],
      },
      platform: {
        eyebrow: "— The Platform",
        titleHtml: 'One network. <span class="grad">Six instincts.</span>',
        lede:
          "Every Phoenix module talks to every other module. Together they form a single nervous system — built to detect, decide, and respond without human latency.",
      },
      modules: {
        sentinel: {
          tag: "01 — Endpoint",
          name: "Sentinel",
          tagline: "The agent that never blinks.",
          desc:
            "Lightweight agent on every device. Behavior-based detection without signatures. Self-quarantines in milliseconds.",
          full:
            "Sentinel is a 12MB native agent that runs on every endpoint in your fleet — laptops, servers, containers, IoT. It models normal behavior per device, per user, per process, then flags deviations the same millisecond they happen. No signatures. No daily definitions. No console babysitting. When something looks wrong, Sentinel quarantines the host before the threat can pivot.",
          features: [
            "Behavior-based detection (no signatures)",
            "Sub-10ms quarantine on suspicious activity",
            "Native agents for macOS, Linux, Windows, ARM",
            "Container & Kubernetes-aware",
            "Tamper-proof self-defense",
            "Offline mode with cached intelligence",
          ],
          statValue: "<8ms",
          statLabel: "detection latency",
        },
        compass: {
          tag: "02 — Network",
          name: "Compass",
          tagline: "See every packet. Map every path.",
          desc:
            "Deep packet inspection across cloud, edge, and on-prem. Maps every connection, flags every anomaly.",
          full:
            "Compass performs deep packet inspection across hybrid environments — cloud VPCs, on-prem data centers, edge sites, remote workers. It builds a live topology of every connection your organization makes, then uses that map to spot lateral movement, exfiltration channels, and anomalies the firewall would never catch.",
          features: [
            "Deep packet inspection at line rate",
            "Live network topology mapping",
            "East-west traffic analysis",
            "Encrypted traffic fingerprinting",
            "Cloud-native sensors (AWS, GCP, Azure)",
            "Zero-config service discovery",
          ],
          statValue: "40Gb/s",
          statLabel: "per sensor throughput",
        },
        aegis: {
          tag: "03 — Firewall",
          name: "Aegis",
          tagline: "Policy by intent, not by checkbox.",
          desc:
            "Adaptive policy engine. Rules generated by intent, not by checkbox. Blocks zero-day attacks before they have a name.",
          full:
            'Aegis replaces your stack of legacy firewall rules with an intent-based engine. You describe what you want — "finance can talk to billing, nothing else" — and Aegis generates, deploys, and audits the rules across every enforcement point. Zero-day attacks get blocked before they have a CVE because Aegis enforces what should happen, not what shouldn\'t.',
          features: [
            "Intent-based policy authoring",
            "Automatic rule generation & cleanup",
            "Zero-day blocking via behavior baselines",
            "Multi-cloud enforcement",
            "Real-time policy simulation",
            "Built-in compliance templates (SOC2, ISO, HIPAA)",
          ],
          statValue: "0",
          statLabel: "manual rule writing",
        },
        forge: {
          tag: "04 — Response",
          name: "Forge",
          tagline: "From alert to containment in seconds.",
          desc:
            "Automated playbooks built by the SOC, executed by the network. Containment in seconds, full forensics in minutes.",
          full:
            "Forge is the playbook engine that closes the loop. When Sentinel or Compass spots something, Forge doesn't ping a human — it executes. Isolate the host, kill the process, rotate the credentials, snapshot the disk, page the analyst, file the ticket. Every action is logged, every decision auditable, every playbook authored by your SOC.",
          features: [
            "Visual playbook builder",
            "200+ pre-built response actions",
            "Full forensic capture on trigger",
            "Integration with 80+ tools (PagerDuty, Slack, Jira, etc.)",
            "Chain-of-custody timeline",
            "One-click rollback",
          ],
          statValue: "4s",
          statLabel: "median response time",
        },
        oracle: {
          tag: "05 — Intelligence",
          name: "Oracle",
          tagline: "Threat intel, fused and fresh.",
          desc:
            "Threat intel fused from 12,000 sources. Updated in real time and piped to every agent in the network within 90 seconds.",
          full:
            "Oracle ingests threat intelligence from 12,000 sources — commercial feeds, open source, dark web crawlers, ISAC sharing groups, and our own customer telemetry — then deduplicates, scores, and pipes it to every Phoenix module within 90 seconds. The network learns from one customer's incident before the next customer is ever attacked.",
          features: [
            "12,000 ingested intel sources",
            "90-second propagation across the fleet",
            "Anonymous cross-customer learning",
            "Custom IOC ingestion (STIX/TAXII)",
            "Confidence scoring per indicator",
            "Historical intel replay",
          ],
          statValue: "90s",
          statLabel: "intel propagation",
        },
        vault: {
          tag: "06 — Encryption",
          name: "Vault",
          tagline: "Quantum-ready, by default.",
          desc:
            "Post-quantum encryption for data at rest and in flight. Keys rotated automatically. Compliance built in, not bolted on.",
          full:
            "Vault encrypts data at rest and in flight using post-quantum algorithms standardized by NIST. Keys rotate automatically on a schedule you control. Compliance reports generate themselves. When the quantum computers arrive, your data was already ready.",
          features: [
            "NIST-standardized post-quantum algorithms",
            "Automatic key rotation",
            "Hardware security module integration",
            "Encryption-at-rest for every datastore",
            "TLS 1.3 + PQ hybrid ciphers",
            "Compliance reports on demand",
          ],
          statValue: "PQ",
          statLabel: "quantum resistant",
        },
      },
      modal: {
        capabilities: "Capabilities",
      },
      how: {
        eyebrow: "— The Loop",
        titleHtml: 'Detect. Decide. Respond. <span class="grad">Evolve.</span>',
        lede:
          "Phoenix is not a product. It is a closed loop that gets smarter every minute it runs — and runs every minute.",
        detect: {
          title: "Detect",
          desc:
            "Every signal — network, endpoint, identity, cloud — streams into Phoenix in real time. Nothing is filtered out before analysis.",
        },
        decide: {
          title: "Decide",
          desc:
            "A federated AI model scores every signal in under 80 milliseconds. False positives are filtered. True threats are prioritized.",
        },
        respond: {
          title: "Respond",
          desc:
            "Containment runs automatically — quarantine, block, isolate. The SOC takes over only when human judgment is required.",
        },
        evolve: {
          title: "Evolve",
          desc:
            "Every response feeds back into the model. Phoenix tomorrow is not the Phoenix of today. The network reinvents itself.",
        },
      },
      dashboard: {
        eyebrow: "— Inside the Console",
        titleHtml: 'Built for analysts. <span class="grad">Loved by them.</span>',
        lede:
          "A single pane of glass for every signal in your environment. No tabs to chase. No alerts to babysit.",
        workspace: "WORKSPACE",
        side: {
          overview: "Overview",
          threats: "Threats",
          network: "Network",
          endpoints: "Endpoints",
          identity: "Identity",
          reports: "Reports",
        },
        kpi: {
          activeThreats: "Active Threats",
          activeDelta: "↓ 38% vs last 24h",
          endpoints: "Endpoints",
          endpointsDelta: "all healthy",
          queue: "SOC Queue",
          queueDelta: "avg 2.4 min",
        },
        chartLabel: "Threat surface — last 24h",
        alerts: {
          label: "Recent alerts",
          a1: "Lateral movement detected — node 412",
          a2: "Anomalous DNS pattern — region eu-west",
          a3: "Outdated agent — 4 endpoints",
        },
        health: {
          label: "Network health",
          na: "North America",
          eu: "Europe",
          ap: "Asia-Pacific",
          latam: "LATAM",
        },
      },
      numbers: {
        endpoints: "Endpoints protected",
        clients: "Enterprise clients",
        countries: "Countries served",
        accuracy: "Detection accuracy",
      },
      why: {
        eyebrow: "— Why Phoenix",
        titleHtml: 'Security that <span class="grad">evolves with you.</span>',
        aiNative: {
          title: "AI-Native",
          desc:
            "Built around models from day one — not bolted on as a feature. Every layer of the stack speaks the same language as the brain.",
        },
        realtime: {
          title: "Real-Time",
          desc:
            "From signal to containment in under one second. Every other metric is theater compared to time-to-action.",
        },
        evolving: {
          title: "Self-Evolving",
          desc:
            "Phoenix re-trains nightly on every new attack pattern observed across the entire network. Customers benefit from each other.",
        },
        humanLed: {
          title: "Human-Led SOC",
          desc:
            "A 24/7 team of analysts watches every escalation. AI does the volume; humans do the judgment. We don't replace either.",
        },
      },
      trusted: {
        eyebrow: "— Trusted By",
        titleHtml: 'Banks. Hospitals. <span class="grad">Governments.</span>',
        lede:
          "Phoenix protects organizations where downtime is not measured in dollars but in lives, votes, and treaties.",
      },
      developers: {
        eyebrow: "— For Developers",
        titleHtml: 'An API <span class="grad">that gets out of your way.</span>',
        lede:
          "Stream events. Trigger playbooks. Pull threat intel. Phoenix is REST-first, gRPC-ready, and fully typed in nine SDKs.",
        f1: "Event streaming via WebSocket or Kafka",
        f2: "99.99% uptime SLA on all endpoints",
        f3: "SDKs: Go, Python, Rust, TypeScript, Java, Ruby, C#, PHP, Swift",
        f4: "Webhooks for every threat lifecycle event",
        docs: "Read the docs",
      },
      cta: {
        eyebrow: "— Get Started",
        titleHtml: 'Start protecting <span class="grad">in sixty seconds.</span>',
        lede:
          "Drop your work email. We'll send a sandbox key, a quick-start guide, and a calendar link to a Phoenix engineer.",
        emailPh: "you@company.com",
        submit: "Request Access",
        submitted: "Access Requested ✓",
        note: "SOC2 · ISO27001 · HIPAA · GDPR — compliance is the floor, not the ceiling.",
      },
      footer: {
        tagline: "The security network that learns.",
        col: {
          platform: "Platform",
          solutions: "Solutions",
          developers: "Developers",
          company: "Company",
        },
        sol: {
          finance: "Finance",
          healthcare: "Healthcare",
          government: "Government",
          saas: "SaaS",
        },
        dev: {
          api: "API",
          sdks: "SDKs",
          status: "Status",
          changelog: "Changelog",
        },
        co: {
          about: "About",
          careers: "Careers",
          press: "Press",
          contact: "Contact",
        },
        copyright: "© 2025 Phoenix Security Networks · All rights reserved",
        status: "All systems operational",
      },
    },

    pt: {
      meta: {
        title: "Phoenix — A Rede de Segurança",
        description:
          "Detecção, resposta e proteção contra ameaças nativas de IA. O Phoenix vê o que os outros não veem — e aprende com cada sinal.",
      },
      nav: {
        platform: "Plataforma",
        how: "Como funciona",
        dashboard: "Painel",
        developers: "Desenvolvedores",
        cta: "Solicitar Acesso",
      },
      hero: {
        status: "Todos os sistemas operacionais",
        version: "v4.12 — lançada hoje",
        titleHtml: 'Vemos o que<br /><span class="grad">os outros não veem.</span>',
        sub: "O Phoenix é uma rede de segurança nativa de IA que detecta, analisa e responde a ameaças em tempo real — e aprende com cada sinal, em cada endpoint, a cada segundo de cada dia.",
        ctaPrimary: "Solicitar Acesso",
        ctaSecondary: "Ver painel ao vivo",
        counterLabel: "Ameaças neutralizadas — últimas 24 horas",
      },
      feed: {
        eyebrow: "— Rede Ao Vivo",
        title: "Um planeta sob vigilância.",
        lede:
          "Cada ponto é um sinal em tempo real da nossa rede global de sensores. Cada linha é uma ameaça sendo neutralizada enquanto você lê isto.",
        mapTitle: "Rede Global de Sensores",
        mapMeta: "237 nós online",
        tickerHeader: "Atividade recente",
        live: "AO VIVO",
        stats: {
          detection: "Tempo médio de detecção",
          accuracy: "Precisão de detecção",
          breaches: "Violações bem-sucedidas",
          soc: "Analistas SOC de plantão",
        },
        sev: { h: "ALTA", m: "MÉD", l: "BAIXA" },
        threats: [
          { sev: "h", text: "Payload suspeito bloqueado", loc: "node-412 · us-east" },
          { sev: "m", text: "Padrão anômalo de consulta DNS", loc: "node-877 · eu-west" },
          { sev: "l", text: "Agente desatualizado em quarentena", loc: "node-203 · ap-south" },
          { sev: "h", text: "Movimento lateral interceptado", loc: "node-091 · us-west" },
          { sev: "m", text: "Varredura de portas detectada", loc: "node-558 · sa-east" },
          { sev: "l", text: "Rotação de certificado concluída", loc: "node-720 · eu-north" },
          { sev: "h", text: "Credential stuffing bloqueado", loc: "node-303 · ap-northeast" },
          { sev: "m", text: "Tentativa de exfiltração barrada", loc: "node-444 · us-central" },
          { sev: "l", text: "Patch implantado no cluster", loc: "node-612 · eu-central" },
          { sev: "h", text: "Comportamento de ransomware contido", loc: "node-129 · af-south" },
          { sev: "m", text: "Escalonamento de privilégio sinalizado", loc: "node-388 · me-south" },
          { sev: "l", text: "Anomalia resolvida automaticamente", loc: "node-512 · ap-east" },
          { sev: "h", text: "Domínio de phishing em blackhole", loc: "node-274 · us-east" },
          { sev: "m", text: "Bloqueio por força bruta acionado", loc: "node-905 · eu-west" },
        ],
      },
      platform: {
        eyebrow: "— A Plataforma",
        titleHtml: 'Uma rede. <span class="grad">Seis instintos.</span>',
        lede:
          "Cada módulo do Phoenix conversa com todos os outros. Juntos, formam um único sistema nervoso — feito para detectar, decidir e responder sem latência humana.",
      },
      modules: {
        sentinel: {
          tag: "01 — Endpoint",
          name: "Sentinel",
          tagline: "O agente que nunca pisca.",
          desc:
            "Agente leve em cada dispositivo. Detecção baseada em comportamento, sem assinaturas. Auto-quarentena em milissegundos.",
          full:
            "O Sentinel é um agente nativo de 12MB que roda em cada endpoint da sua frota — notebooks, servidores, containers, IoT. Ele modela o comportamento normal por dispositivo, por usuário, por processo, e sinaliza desvios no mesmo milissegundo em que acontecem. Sem assinaturas. Sem definições diárias. Sem babá de console. Quando algo parece errado, o Sentinel coloca o host em quarentena antes que a ameaça consiga se mover.",
          features: [
            "Detecção baseada em comportamento (sem assinaturas)",
            "Quarentena abaixo de 10ms em atividade suspeita",
            "Agentes nativos para macOS, Linux, Windows, ARM",
            "Ciente de containers e Kubernetes",
            "Auto-defesa à prova de adulteração",
            "Modo offline com inteligência em cache",
          ],
          statValue: "<8ms",
          statLabel: "latência de detecção",
        },
        compass: {
          tag: "02 — Rede",
          name: "Compass",
          tagline: "Veja cada pacote. Mapeie cada caminho.",
          desc:
            "Inspeção profunda de pacotes em cloud, edge e on-premise. Mapeia cada conexão, sinaliza cada anomalia.",
          full:
            "O Compass realiza inspeção profunda de pacotes em ambientes híbridos — VPCs de cloud, data centers on-prem, sites de edge, trabalhadores remotos. Constrói uma topologia ao vivo de cada conexão que sua organização faz e usa esse mapa para detectar movimento lateral, canais de exfiltração e anomalias que o firewall nunca pegaria.",
          features: [
            "Inspeção profunda de pacotes a line rate",
            "Mapeamento de topologia de rede ao vivo",
            "Análise de tráfego leste-oeste",
            "Fingerprinting de tráfego criptografado",
            "Sensores cloud-native (AWS, GCP, Azure)",
            "Descoberta de serviços sem configuração",
          ],
          statValue: "40Gb/s",
          statLabel: "throughput por sensor",
        },
        aegis: {
          tag: "03 — Firewall",
          name: "Aegis",
          tagline: "Política por intenção, não por checkbox.",
          desc:
            "Motor de política adaptativo. Regras geradas por intenção, não por checkbox. Bloqueia ataques zero-day antes de terem nome.",
          full:
            'O Aegis substitui sua pilha de regras de firewall legadas por um motor baseado em intenção. Você descreve o que quer — "finanças pode falar com billing, nada mais" — e o Aegis gera, implanta e audita as regras em cada ponto de aplicação. Ataques zero-day são bloqueados antes de terem um CVE, porque o Aegis aplica o que deve acontecer, não o que não deve.',
          features: [
            "Autoria de políticas baseadas em intenção",
            "Geração e limpeza automática de regras",
            "Bloqueio de zero-day via baselines de comportamento",
            "Aplicação multi-cloud",
            "Simulação de política em tempo real",
            "Templates de compliance integrados (SOC2, ISO, HIPAA)",
          ],
          statValue: "0",
          statLabel: "regras escritas à mão",
        },
        forge: {
          tag: "04 — Resposta",
          name: "Forge",
          tagline: "Do alerta à contenção em segundos.",
          desc:
            "Playbooks automatizados criados pelo SOC, executados pela rede. Contenção em segundos, forense completa em minutos.",
          full:
            "O Forge é o motor de playbooks que fecha o ciclo. Quando o Sentinel ou o Compass detectam algo, o Forge não avisa um humano — ele executa. Isola o host, mata o processo, rotaciona as credenciais, tira snapshot do disco, aciona o analista, abre o chamado. Cada ação é registrada, cada decisão auditável, cada playbook escrito pelo seu SOC.",
          features: [
            "Construtor visual de playbooks",
            "Mais de 200 ações de resposta pré-construídas",
            "Captura forense completa no gatilho",
            "Integração com 80+ ferramentas (PagerDuty, Slack, Jira, etc.)",
            "Linha do tempo de cadeia de custódia",
            "Rollback em um clique",
          ],
          statValue: "4s",
          statLabel: "tempo mediano de resposta",
        },
        oracle: {
          tag: "05 — Inteligência",
          name: "Oracle",
          tagline: "Threat intel, fundida e fresca.",
          desc:
            "Inteligência de ameaças fundida de 12.000 fontes. Atualizada em tempo real e distribuída a cada agente em 90 segundos.",
          full:
            "O Oracle ingere inteligência de ameaças de 12.000 fontes — feeds comerciais, open source, crawlers da dark web, grupos ISAC e nossa própria telemetria de clientes — depois deduplica, pontua e envia para cada módulo do Phoenix em 90 segundos. A rede aprende com o incidente de um cliente antes que o próximo seja sequer atacado.",
          features: [
            "12.000 fontes de intel ingeridas",
            "Propagação de 90 segundos pela frota",
            "Aprendizado cross-cliente anônimo",
            "Ingestão de IOC customizados (STIX/TAXII)",
            "Pontuação de confiança por indicador",
            "Replay histórico de intel",
          ],
          statValue: "90s",
          statLabel: "propagação de intel",
        },
        vault: {
          tag: "06 — Criptografia",
          name: "Vault",
          tagline: "Pronto para o quântico, por padrão.",
          desc:
            "Criptografia pós-quântica para dados em repouso e em trânsito. Chaves rotacionadas automaticamente. Compliance embutido, não parafusado.",
          full:
            "O Vault criptografa dados em repouso e em trânsito usando algoritmos pós-quânticos padronizados pelo NIST. As chaves rotacionam automaticamente em um cronograma que você controla. Relatórios de compliance se geram sozinhos. Quando os computadores quânticos chegarem, seus dados já estavam prontos.",
          features: [
            "Algoritmos pós-quânticos padronizados pelo NIST",
            "Rotação automática de chaves",
            "Integração com HSM",
            "Criptografia em repouso para cada datastore",
            "TLS 1.3 + cifras híbridas PQ",
            "Relatórios de compliance sob demanda",
          ],
          statValue: "PQ",
          statLabel: "resistente a quântica",
        },
      },
      modal: {
        capabilities: "Capacidades",
      },
      how: {
        eyebrow: "— O Ciclo",
        titleHtml: 'Detectar. Decidir. Responder. <span class="grad">Evoluir.</span>',
        lede:
          "O Phoenix não é um produto. É um ciclo fechado que fica mais esperto a cada minuto em que roda — e roda a cada minuto.",
        detect: {
          title: "Detectar",
          desc:
            "Cada sinal — rede, endpoint, identidade, cloud — entra no Phoenix em tempo real. Nada é filtrado antes da análise.",
        },
        decide: {
          title: "Decidir",
          desc:
            "Um modelo de IA federado pontua cada sinal em menos de 80 milissegundos. Falsos positivos são filtrados. Ameaças reais são priorizadas.",
        },
        respond: {
          title: "Responder",
          desc:
            "A contenção roda automaticamente — quarentena, bloqueio, isolamento. O SOC entra em cena apenas quando é necessário julgamento humano.",
        },
        evolve: {
          title: "Evoluir",
          desc:
            "Cada resposta volta para o modelo. O Phoenix de amanhã não é o Phoenix de hoje. A rede se reinventa.",
        },
      },
      dashboard: {
        eyebrow: "— Dentro do Console",
        titleHtml: 'Feito para analistas. <span class="grad">Amado por eles.</span>',
        lede:
          "Uma única tela para cada sinal no seu ambiente. Sem abas para perseguir. Sem alertas para babá.",
        workspace: "ESPAÇO DE TRABALHO",
        side: {
          overview: "Visão Geral",
          threats: "Ameaças",
          network: "Rede",
          endpoints: "Endpoints",
          identity: "Identidade",
          reports: "Relatórios",
        },
        kpi: {
          activeThreats: "Ameaças Ativas",
          activeDelta: "↓ 38% vs últimas 24h",
          endpoints: "Endpoints",
          endpointsDelta: "todos saudáveis",
          queue: "Fila SOC",
          queueDelta: "média 2,4 min",
        },
        chartLabel: "Superfície de ameaças — últimas 24h",
        alerts: {
          label: "Alertas recentes",
          a1: "Movimento lateral detectado — node 412",
          a2: "Padrão DNS anômalo — região eu-west",
          a3: "Agente desatualizado — 4 endpoints",
        },
        health: {
          label: "Saúde da rede",
          na: "América do Norte",
          eu: "Europa",
          ap: "Ásia-Pacífico",
          latam: "LATAM",
        },
      },
      numbers: {
        endpoints: "Endpoints protegidos",
        clients: "Clientes corporativos",
        countries: "Países atendidos",
        accuracy: "Precisão de detecção",
      },
      why: {
        eyebrow: "— Por que Phoenix",
        titleHtml: 'Segurança que <span class="grad">evolui com você.</span>',
        aiNative: {
          title: "Nativo de IA",
          desc:
            "Construído em torno de modelos desde o primeiro dia — não parafusado como feature. Cada camada da stack fala a mesma língua que o cérebro.",
        },
        realtime: {
          title: "Tempo Real",
          desc:
            "Do sinal à contenção em menos de um segundo. Qualquer outra métrica é teatro comparada ao tempo de ação.",
        },
        evolving: {
          title: "Auto-Evolutivo",
          desc:
            "O Phoenix se retreina toda noite com cada novo padrão de ataque observado na rede inteira. Os clientes se beneficiam uns dos outros.",
        },
        humanLed: {
          title: "SOC Liderado por Humanos",
          desc:
            "Uma equipe 24/7 de analistas observa cada escalonamento. A IA cuida do volume; os humanos do julgamento. Não substituímos nenhum dos dois.",
        },
      },
      trusted: {
        eyebrow: "— Confiam Em Nós",
        titleHtml: 'Bancos. Hospitais. <span class="grad">Governos.</span>',
        lede:
          "O Phoenix protege organizações onde o downtime não é medido em dólares, mas em vidas, votos e tratados.",
      },
      developers: {
        eyebrow: "— Para Desenvolvedores",
        titleHtml: 'Uma API <span class="grad">que sai do seu caminho.</span>',
        lede:
          "Faça stream de eventos. Dispare playbooks. Puxe threat intel. O Phoenix é REST-first, gRPC-ready e totalmente tipado em nove SDKs.",
        f1: "Streaming de eventos via WebSocket ou Kafka",
        f2: "SLA de uptime de 99,99% em todos os endpoints",
        f3: "SDKs: Go, Python, Rust, TypeScript, Java, Ruby, C#, PHP, Swift",
        f4: "Webhooks para cada evento do ciclo de vida da ameaça",
        docs: "Ler a documentação",
      },
      cta: {
        eyebrow: "— Comece Agora",
        titleHtml: 'Comece a proteger <span class="grad">em sessenta segundos.</span>',
        lede:
          "Deixe seu email corporativo. Enviaremos uma chave de sandbox, um guia rápido e um link de calendário para um engenheiro Phoenix.",
        emailPh: "voce@empresa.com",
        submit: "Solicitar Acesso",
        submitted: "Acesso Solicitado ✓",
        note: "SOC2 · ISO27001 · HIPAA · GDPR — compliance é o piso, não o teto.",
      },
      footer: {
        tagline: "A rede de segurança que aprende.",
        col: {
          platform: "Plataforma",
          solutions: "Soluções",
          developers: "Desenvolvedores",
          company: "Empresa",
        },
        sol: {
          finance: "Finanças",
          healthcare: "Saúde",
          government: "Governo",
          saas: "SaaS",
        },
        dev: {
          api: "API",
          sdks: "SDKs",
          status: "Status",
          changelog: "Changelog",
        },
        co: {
          about: "Sobre",
          careers: "Carreiras",
          press: "Imprensa",
          contact: "Contato",
        },
        copyright: "© 2025 Phoenix Security Networks · Todos os direitos reservados",
        status: "Todos os sistemas operacionais",
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
      localStorage.setItem("phoenix-lang", lang);
    } catch (_) {}
    window.currentLang = lang;
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
  }

  let saved = "en";
  try {
    saved = localStorage.getItem("phoenix-lang") || "en";
  } catch (_) {}
  applyLang(saved);

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-lang]");
    if (!btn) return;
    e.preventDefault();
    applyLang(btn.getAttribute("data-lang"));
  });

  window.phoenixI18n = {
    setLang: applyLang,
    t: (k) => getPath(DICT[window.currentLang || "en"], k),
    raw: (k) => getPath(DICT[window.currentLang || "en"], k),
    locale: () => (window.currentLang === "pt" ? "pt-BR" : "en-US"),
  };
})();
