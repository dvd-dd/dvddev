/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   WOOD FRAME — script.js
   light-first · no dependencies
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

  /* ─── Theme toggle (light default, persisted) ─── */
  const root = document.documentElement;
  const stored = localStorage.getItem("woodframe-theme");
  if (stored === "light" || stored === "dark") {
    root.setAttribute("data-theme", stored);
  } else {
    root.setAttribute("data-theme", "light");
  }
  const toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const next =
        root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("woodframe-theme", next);
    });
  }

  /* ─── Nav shrink on scroll ─── */
  const nav = document.getElementById("nav");
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ─── IntersectionObserver reveals ─── */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("is-revealed");
            }, i * 40);
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

  /* ─── Smooth anchor scroll with nav offset ─── */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - 70;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  /* ─── Horizontal scroll (Collection): wheel + drag ─── */
  const tracks = document.querySelectorAll("[data-horizontal]");
  tracks.forEach((track) => {
    // Note: no wheel hijacking — it traps the page scroll when the cursor is
    // over the track. Drag + native horizontal swipe are enough.

    // Pointer drag
    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    track.addEventListener("pointerdown", (e) => {
      isDown = true;
      startX = e.pageX;
      startScroll = track.scrollLeft;
      track.classList.add("is-dragging");
      track.setPointerCapture(e.pointerId);
    });
    track.addEventListener("pointermove", (e) => {
      if (!isDown) return;
      const dx = e.pageX - startX;
      track.scrollLeft = startScroll - dx;
    });
    const release = (e) => {
      if (!isDown) return;
      isDown = false;
      track.classList.remove("is-dragging");
      try { track.releasePointerCapture(e.pointerId); } catch (_) {}
    };
    track.addEventListener("pointerup", release);
    track.addEventListener("pointercancel", release);
    track.addEventListener("pointerleave", release);

    // Prevent click-drag on images
    track.querySelectorAll("img").forEach((img) => {
      img.addEventListener("dragstart", (e) => e.preventDefault());
    });

    // Progress indicator
    const fill = document.querySelector("[data-track-fill]");
    const updateFill = () => {
      if (!fill) return;
      const max = track.scrollWidth - track.clientWidth;
      const pct = max > 0 ? (track.scrollLeft / max) : 0;
      const visible = Math.max((track.clientWidth / track.scrollWidth) * 100, 12);
      fill.style.width = `${visible}%`;
      fill.style.left = `${pct * (100 - visible)}%`;
    };
    track.addEventListener("scroll", updateFill, { passive: true });
    window.addEventListener("resize", updateFill);
    updateFill();
  });

  /* ─── Magnetic tilt on object cards ─── */
  const tiltEls = document.querySelectorAll("[data-tilt]");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (!prefersReducedMotion) {
    tiltEls.forEach((el) => {
      let rafId = null;
      let targetRx = 0;
      let targetRy = 0;
      let curRx = 0;
      let curRy = 0;

      const animate = () => {
        curRx += (targetRx - curRx) * 0.12;
        curRy += (targetRy - curRy) * 0.12;
        el.style.transform = `perspective(900px) rotateX(${curRx}deg) rotateY(${curRy}deg) translateY(${Math.abs(curRx) * -0.5}px)`;
        if (Math.abs(targetRx - curRx) > 0.01 || Math.abs(targetRy - curRy) > 0.01) {
          rafId = requestAnimationFrame(animate);
        } else {
          rafId = null;
        }
      };

      el.addEventListener("pointermove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        targetRy = (x - 0.5) * 6;
        targetRx = (0.5 - y) * 5;
        if (!rafId) rafId = requestAnimationFrame(animate);
      });

      el.addEventListener("pointerleave", () => {
        targetRx = 0;
        targetRy = 0;
        if (!rafId) rafId = requestAnimationFrame(animate);
      });
    });
  }

  /* ─── Commission form (fake submit) ─── */
  const form = document.querySelector(".commission-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector("button[type='submit']");
      if (!btn) return;
      const original = btn.innerHTML;
      const submitted =
        (window.woodframeI18n && window.woodframeI18n.t("commission.submitted")) ||
        "Message received · Thank you ✓";
      btn.innerHTML = submitted;
      btn.disabled = true;
      btn.style.opacity = "0.85";
      setTimeout(() => {
        btn.innerHTML = original;
        btn.disabled = false;
        btn.style.opacity = "";
        form.reset();
      }, 4500);
    });
  }
})();
