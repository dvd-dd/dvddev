/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   LUXOR — script.js
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

  /* ─── Cursor spotlight ─── */
  const spot = document.querySelector(".cursor-spot");
  if (spot) {
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    window.addEventListener(
      "mousemove",
      (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
      },
      { passive: true }
    );

    function tick() {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      spot.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    }
    tick();
  }

  /* ─── Split hero title into words+chars for stagger reveal ─── */
  const splitEls = document.querySelectorAll("[data-split]");
  splitEls.forEach((el) => {
    const text = el.textContent;
    el.textContent = "";
    let charIndex = 0;
    const words = text.split(" ");
    words.forEach((word, wIdx) => {
      const wordSpan = document.createElement("span");
      wordSpan.className = "word";
      [...word].forEach((ch) => {
        const span = document.createElement("span");
        span.className = "char";
        span.textContent = ch;
        span.style.transitionDelay = `${charIndex * 35}ms`;
        wordSpan.appendChild(span);
        charIndex++;
      });
      el.appendChild(wordSpan);
      if (wIdx < words.length - 1) {
        const space = document.createElement("span");
        space.className = "char space";
        space.innerHTML = "&nbsp;";
        space.style.transitionDelay = `${charIndex * 35}ms`;
        el.appendChild(space);
        charIndex++;
      }
    });
  });

  /* Trigger hero title reveal shortly after load */
  window.addEventListener("load", () => {
    requestAnimationFrame(() => {
      document.querySelectorAll(".hero-title .char").forEach((c) => {
        c.classList.add("is-in");
      });
    });
  });

  /* ─── IntersectionObserver — reveal sections on scroll ─── */
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
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-revealed"));
  }

  /* ─── Manifesto gold rule — animate width when visible ─── */
  const rule = document.querySelector(".manifesto-rule");
  if (rule && "IntersectionObserver" in window) {
    const ruleIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            rule.style.width = "120px";
            ruleIo.unobserve(rule);
          }
        });
      },
      { threshold: 0.3 }
    );
    ruleIo.observe(rule);
  }

  /* ─── Experiences — pointer drag + native trackpad horizontal ─── */
  /* Wheel hijacking removed: it trapped the page scroll when the cursor was */
  /* over the track, which is unintuitive. */
  const track = document.querySelector("[data-scroll-track]");
  if (track) {
    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    track.addEventListener("pointerdown", (e) => {
      isDown = true;
      startX = e.pageX;
      startScroll = track.scrollLeft;
      track.classList.add("is-dragging");
      try { track.setPointerCapture(e.pointerId); } catch (_) {}
    });
    track.addEventListener("pointermove", (e) => {
      if (!isDown) return;
      track.scrollLeft = startScroll - (e.pageX - startX);
    });
    const release = (e) => {
      if (!isDown) return;
      isDown = false;
      track.classList.remove("is-dragging");
      try { track.releasePointerCapture(e.pointerId); } catch (_) {}
    };
    track.addEventListener("pointerup", release);
    track.addEventListener("pointercancel", release);
    track.querySelectorAll("img").forEach((img) => {
      img.addEventListener("dragstart", (e) => e.preventDefault());
    });
  }

  /* ─── Smooth anchor scroll (offset for fixed nav) ─── */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - 40;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  /* ─── Apply form — fake submit handler with inline confirmation ─── */
  const form = document.querySelector(".apply-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector(".apply-submit");
      if (!btn) return;
      const original = btn.textContent;
      const receivedText =
        (window.luxorI18n && window.luxorI18n.t("apply.submitted")) ||
        "Application Received";
      btn.textContent = receivedText;
      btn.disabled = true;
      btn.style.background = "transparent";
      btn.style.color = "var(--gold)";
      btn.style.border = "1px solid var(--gold)";
      setTimeout(() => {
        form.reset();
        btn.textContent = original;
        btn.disabled = false;
        btn.style.background = "";
        btn.style.color = "";
        btn.style.border = "";
      }, 4500);
    });
  }
})();
