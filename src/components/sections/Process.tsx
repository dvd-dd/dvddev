"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MessageCircle,
  PencilRuler,
  Radio,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * "How I Work" — the four-step process, reimagined as a front-end
 * showcase over a dimmed cosmic video. Glassmorphism cards (the moving
 * bg frosts through each one), a gradient-clipped step number, a
 * lucide motif per step, a cursor-following violet spotlight, a
 * hover lift + a growing underline, and an animated "pipeline" of
 * violet dots flowing left→right through the steps. Keyframes are
 * injected inline so the flow runs regardless of the globals.css cache.
 */
const STEPS: { title: string; body: string; Icon: LucideIcon }[] = [
  {
    title: "Discovery call",
    body:
      'A 30-minute talk to understand the product, the audience, and what "shipped" actually means. No deck, no pitch — questions and clarity.',
    Icon: MessageCircle,
  },
  {
    title: "Wireframes + tech plan",
    body:
      "Low-fidelity layouts paired with a stack proposal and timeline. You see the structure before any pixels move.",
    Icon: PencilRuler,
  },
  {
    title: "Build in public",
    body:
      "Daily preview URL, async updates, a private Slack/WhatsApp channel. You watch the site grow — no surprises at handoff.",
    Icon: Radio,
  },
  {
    title: "Ship + handoff",
    body:
      "Production deploy, docs, source-repo access, plus 14 days of post-launch support for anything that surfaces in real traffic.",
    Icon: Rocket,
  },
];

export function Process() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: "0px" });

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative isolate w-full overflow-hidden py-24 md:py-32"
    >
      <ProcessVideo active={inView} />

      {/* Scrims — keep the cards readable + contain the video to the section */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0 bg-ink-base/75" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(70%_55%_at_50%_0%,rgba(168,85,247,0.2),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-28 bg-gradient-to-b from-bg-base to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-0 h-28 bg-gradient-to-t from-bg-base to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1248px] px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14 max-w-2xl md:mb-20"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand">
            {t.chrome.nav.links.process} · 04
          </p>
          <h2 className="mt-4 text-balance text-4xl font-normal leading-[1.05] tracking-[-0.03em] text-fg-base md:text-6xl">
            How I work.
          </h2>
        </motion.div>

        <div className="relative">
          {/* Pipeline connector — a violet line with flowing dots (lg) */}
          <div
            aria-hidden
            className="absolute left-[8%] right-[8%] top-[34px] hidden h-px lg:block"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(168,85,247,0.45) 10%, rgba(168,85,247,0.45) 90%, transparent)",
            }}
          >
            {[0, 1, 2].map((d) => (
              <span
                key={d}
                className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-brand shadow-[0_0_10px_2px_rgba(168,85,247,0.8)]"
                style={{ animation: `process-flow 5s linear ${d * 1.6}s infinite` }}
              />
            ))}
          </div>

          <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <ProcessCard key={step.title} step={step} index={i} />
            ))}
          </ol>
        </div>
      </div>

      <style>{`
        @keyframes process-flow {
          0%   { left: 0%;   opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes ice-spin { to { transform: rotate(360deg); } }
        @keyframes ice-glare {
          0%   { transform: translateX(-140%) skewX(-20deg); }
          60%  { transform: translateX(240%)  skewX(-20deg); }
          100% { transform: translateX(240%)  skewX(-20deg); }
        }
      `}</style>
    </section>
  );
}

/* ─── One step card ─────────────────────────────────────────────── */

function ProcessCard({
  step,
  index,
}: {
  step: { title: string; body: string; Icon: LucideIcon };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { Icon } = step;
  const nn = String(index + 1).padStart(2, "0");

  // Cursor → 3D tilt + highlight position (the "ice slab" turns toward
  // the pointer and the specular sheen tracks it).
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${(px - 0.5) * 18}deg`);
    el.style.setProperty("--rx", `${(0.5 - py) * 18}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-full [perspective:1100px]"
    >
      {/* Rotating iridescent refraction glow — leaks at the ice edges */}
      <div
        aria-hidden
        className="absolute -inset-[2px] -z-10 rounded-[22px] opacity-45 blur-[11px] transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "conic-gradient(from 0deg,#a855f7,#67e8f9,#f988ff,#a855f7)",
          animation: "ice-spin 6s linear infinite",
        }}
      />

      {/* The frozen-glass slab — tilts in 3D toward the cursor, bright
          edge highlights catch the light, frosted backdrop, glossy
          specular + glare sweep + frost grain, content floating above. */}
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative flex h-full flex-col overflow-hidden rounded-[20px] border border-white/20 bg-gradient-to-br from-white/[0.12] via-white/[0.05] to-white/[0.02] p-6 backdrop-blur-xl transition-transform duration-200 ease-out [box-shadow:inset_1.5px_1.5px_0_rgba(255,255,255,0.3),inset_-1px_-1.5px_2px_rgba(140,160,255,0.12),0_24px_60px_-24px_rgba(0,0,0,0.7)] [transform-style:preserve-3d] [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))]"
      >
        {/* Glare sweep — a light bar gliding across the ice on a loop */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[20px]">
          <div
            className="absolute -inset-y-6 left-0 w-1/4 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{ animation: "ice-glare 5s ease-in-out infinite" }}
          />
        </div>

        {/* Frost grain — subtle crystalline texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23f)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Icy specular highlight (glossy reflection) following the cursor */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(180px circle at var(--mx,50%) var(--my,0%), rgba(255,255,255,0.22), transparent 55%)",
          }}
        />
        {/* Cool blue-violet inner glow on hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(260px circle at var(--mx,50%) var(--my,0%), rgba(150,160,255,0.22), transparent 65%)",
          }}
        />
        {/* Frost sheen along the top edge */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/55 to-transparent"
        />

        <div className="relative flex items-center justify-between [transform:translateZ(45px)]">
          <span
            className="font-mono text-[40px] font-normal leading-none [text-shadow:0_2px_12px_rgba(168,85,247,0.4)]"
            style={{
              backgroundImage: "linear-gradient(135deg,#a855f7,#f988ff 55%,#bc4ed8)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            {nn}
          </span>
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-fg-base shadow-[inset_1px_1px_0_rgba(255,255,255,0.35)] transition-colors duration-300 group-hover:border-brand/60">
            <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
          </span>
        </div>

        <h3 className="relative mt-7 text-xl font-normal leading-tight tracking-tight text-fg-base [transform:translateZ(28px)]">
          {step.title}
        </h3>
        <p className="relative mt-3 text-sm leading-relaxed text-fg-dim [transform:translateZ(16px)]">
          {step.body}
        </p>

        {/* Underline that draws in on hover */}
        <span
          aria-hidden
          className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-brand to-magenta-500 transition-[width] duration-500 ease-out group-hover:w-full"
        />
      </div>
    </motion.li>
  );
}

/* ─── Dimmed cosmic background video (pauses off-screen) ─────────── */

function ProcessVideo({ active }: { active: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (active) void v.play().catch(() => undefined);
    else v.pause();
  }, [active]);

  return (
    <video
      ref={ref}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
    >
      <source src="/hero-rings-loop.mp4" type="video/mp4" />
    </video>
  );
}
