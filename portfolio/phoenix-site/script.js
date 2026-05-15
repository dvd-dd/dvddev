/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PHOENIX — script.js
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

(function () {
  "use strict";

  /* ─── Mobile nav toggle ─── */
  const burger = document.querySelector(".nav-burger");
  const navMobile = document.querySelector(".nav-mobile");
  if (burger && navMobile) {
    const closeMobile = () => {
      burger.classList.remove("is-open");
      navMobile.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };
    burger.addEventListener("click", () => {
      const isOpen = burger.classList.toggle("is-open");
      navMobile.classList.toggle("is-open", isOpen);
      burger.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
    const closeBtn = navMobile.querySelector(".nav-mobile-close");
    if (closeBtn) closeBtn.addEventListener("click", closeMobile);
    navMobile.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", closeMobile)
    );
  }

  /* ─── Theme toggle (persisted) ─── */
  const root = document.documentElement;
  const stored = localStorage.getItem("phoenix-theme");
  if (stored === "light" || stored === "dark") {
    root.setAttribute("data-theme", stored);
  }
  const toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const next =
        root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      localStorage.setItem("phoenix-theme", next);
    });
  }

  /* ─── IntersectionObserver reveals ─── */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-revealed"));
  }

  /* ─── Counter animation (triggered on first visibility) ─── */
  const counters = document.querySelectorAll("[data-counter]");
  const getLocale = () =>
    (window.phoenixI18n && window.phoenixI18n.locale && window.phoenixI18n.locale()) || "en-US";
  const formatNumber = (n) => n.toLocaleString(getLocale());
  const animateCounter = (el) => {
    const target = parseFloat(el.getAttribute("data-counter")) || 0;
    const divide = parseFloat(el.getAttribute("data-divide")) || 1;
    const fixed = parseInt(el.getAttribute("data-fixed") || "0", 10);
    const suffix = el.getAttribute("data-suffix") || "";
    const tick = el.getAttribute("data-counter-tick") === "true";
    const duration = 2200;
    const start = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      const display = current / divide;
      el.textContent =
        (fixed > 0 ? display.toFixed(fixed) : formatNumber(Math.round(display))) +
        suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else if (tick) {
        // Live tick after intro: increment slowly forever
        let live = target;
        setInterval(() => {
          live += Math.floor(Math.random() * 7) + 1;
          el.textContent = formatNumber(live) + suffix;
        }, 1400);
      }
    };
    requestAnimationFrame(step);
  };

  if ("IntersectionObserver" in window) {
    const counterIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterIo.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((c) => counterIo.observe(c));
  } else {
    counters.forEach(animateCounter);
  }

  /* ─── Live ticker ─── */
  const ticker = document.querySelector("[data-ticker]");
  if (ticker) {
    const fallbackThreats = [
      { sev: "h", text: "Suspicious payload blocked", loc: "node-412 · us-east" },
      { sev: "m", text: "Anomalous DNS query pattern", loc: "node-877 · eu-west" },
      { sev: "l", text: "Outdated agent quarantined", loc: "node-203 · ap-south" },
      { sev: "h", text: "Lateral movement intercepted", loc: "node-091 · us-west" },
      { sev: "m", text: "Port scan detected", loc: "node-558 · sa-east" },
      { sev: "l", text: "Cert rotation completed", loc: "node-720 · eu-north" },
      { sev: "h", text: "Credential stuffing blocked", loc: "node-303 · ap-northeast" },
    ];
    const fallbackSev = { h: "HIGH", m: "MED", l: "LOW" };

    const getThreats = () =>
      (window.phoenixI18n && window.phoenixI18n.t("feed.threats")) || fallbackThreats;
    const getSevLabel = (s) =>
      (window.phoenixI18n && window.phoenixI18n.t("feed.sev." + s)) || fallbackSev[s];

    let cursor = 0;
    const renderRow = (entry) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span class="t-sev sev-${entry.sev}">${getSevLabel(entry.sev)}</span>
        <span class="t-text">${entry.text}</span>
        <span class="t-loc">${entry.loc}</span>
      `;
      return li;
    };

    const seed = () => {
      ticker.innerHTML = "";
      const threats = getThreats();
      for (let i = 0; i < 7; i++) {
        ticker.appendChild(renderRow(threats[i % threats.length]));
      }
      cursor = 7;
    };
    seed();

    setInterval(() => {
      const threats = getThreats();
      const li = renderRow(threats[cursor % threats.length]);
      ticker.insertBefore(li, ticker.firstChild);
      cursor = (cursor + 1) % threats.length;
      while (ticker.children.length > 7) {
        ticker.removeChild(ticker.lastChild);
      }
    }, 2400);

    document.addEventListener("langchange", seed);
  }

  /* ─── Smooth anchor scroll ─── */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - 60;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  /* ─── Module modal ─── */
  const modal = document.getElementById("moduleModal");
  if (modal) {
    const modalTag = document.getElementById("modalTag");
    const modalName = document.getElementById("modalName");
    const modalTagline = document.getElementById("modalTagline");
    const modalFull = document.getElementById("modalFull");
    const modalFeatures = document.getElementById("modalFeatures");
    const modalStatValue = document.getElementById("modalStatValue");
    const modalStatLabel = document.getElementById("modalStatLabel");
    let lastTrigger = null;

    const openModule = (key, trigger) => {
      const data =
        window.phoenixI18n && window.phoenixI18n.t("modules." + key);
      if (!data) return;
      modalTag.textContent = data.tag;
      modalName.textContent = data.name;
      modalTagline.textContent = data.tagline;
      modalFull.textContent = data.full;
      modalFeatures.innerHTML = "";
      (data.features || []).forEach((f) => {
        const li = document.createElement("li");
        li.textContent = f;
        modalFeatures.appendChild(li);
      });
      modalStatValue.textContent = data.statValue;
      modalStatLabel.textContent = data.statLabel;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-locked");
      lastTrigger = trigger || null;
      const closeBtn = modal.querySelector(".modal-close");
      if (closeBtn) closeBtn.focus();
    };

    const closeModal = () => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-locked");
      if (lastTrigger && typeof lastTrigger.focus === "function") {
        lastTrigger.focus();
      }
    };

    document.querySelectorAll("[data-module]").forEach((card) => {
      card.addEventListener("click", () => openModule(card.getAttribute("data-module"), card));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openModule(card.getAttribute("data-module"), card);
        }
      });
    });

    modal.querySelectorAll("[data-modal-close]").forEach((el) => {
      el.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open")) {
        closeModal();
      }
    });
  }

  /* ─── Fake CTA submit ─── */
  const ctaForm = document.querySelector(".cta-form");
  if (ctaForm) {
    ctaForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = ctaForm.querySelector(".cta-submit");
      const input = ctaForm.querySelector(".cta-input");
      if (!btn) return;
      const original = btn.innerHTML;
      btn.innerHTML =
        (window.phoenixI18n && window.phoenixI18n.t("cta.submitted")) ||
        "Access Requested ✓";
      btn.disabled = true;
      btn.style.opacity = "0.85";
      if (input) input.disabled = true;
      setTimeout(() => {
        btn.innerHTML = original;
        btn.disabled = false;
        btn.style.opacity = "";
        if (input) {
          input.disabled = false;
          input.value = "";
        }
      }, 4500);
    });
  }
})();
