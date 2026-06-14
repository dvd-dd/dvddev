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
  const ref = useRef<HTMLLIElement>(null);
  const { Icon } = step;
  const nn = String(index + 1).padStart(2, "0");

  const onMove = (e: React.MouseEvent<HTMLLIElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.li
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transition-[transform,border-color] duration-300 hover:-translate-y-1.5 hover:border-brand/40"
    >
      {/* Cursor-following violet spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(240px circle at var(--mx, 50%) var(--my, 0px), rgba(168,85,247,0.22), transparent 65%)",
        }}
      />

      <div className="relative flex items-center justify-between">
        <span
          className="font-mono text-[40px] font-normal leading-none"
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
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-brand transition-colors duration-300 group-hover:border-brand/50 group-hover:text-fg-base">
          <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </span>
      </div>

      <h3 className="relative mt-7 text-xl font-normal leading-tight tracking-tight text-fg-base">
        {step.title}
      </h3>
      <p className="relative mt-3 text-sm leading-relaxed text-fg-dim">
        {step.body}
      </p>

      {/* Underline that draws in on hover */}
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-brand to-magenta-500 transition-[width] duration-500 ease-out group-hover:w-full"
      />
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
