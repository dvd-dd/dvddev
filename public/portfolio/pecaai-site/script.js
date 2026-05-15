/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PEÇAAÍ — script.js
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

  /* ─── Nav shrink on scroll ─── */
  const nav = document.getElementById("nav");
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 30) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

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

  /* ─── IntersectionObserver reveals ─── */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("is-revealed"), i * 50);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-revealed"));
  }

  /* ─── Counter animation ─── */
  const getLocale = () =>
    (window.pecaaiI18n && window.pecaaiI18n.locale && window.pecaaiI18n.locale()) || "en-US";
  const formatNumber = (n) => n.toLocaleString(getLocale());
  const animateCounter = (el) => {
    const target = parseFloat(el.getAttribute("data-counter")) || 0;
    const prefix = el.getAttribute("data-prefix") || "";
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 2200;
    const start = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      el.textContent = prefix + formatNumber(current) + suffix;
      if (progress < 1) requestAnimationFrame(step);
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
    document.querySelectorAll("[data-counter]").forEach((c) => counterIo.observe(c));
  }

  /* ─── FAQ single-open accordion ─── */
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (item.open) {
        faqItems.forEach((other) => {
          if (other !== item) other.open = false;
        });
      }
    });
  });
})();
