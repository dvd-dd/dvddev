"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronDown, MoreHorizontal, Sparkles } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useTypewriter } from "@/hooks/useTypewriter";
import { BRIEFS_EN, BRIEFS_PT } from "@/lib/briefs";

/**
 * Custom build environments — Sanity's editorial-environments
 * showcase, dvddev-flavored. Replaces the older 5-card UseCases
 * section. Four panels arranged in a CMS-editor mockup over an
 * ambient violet-cyan gradient mesh + SVG grain bg.
 *
 *   eyebrow  ┊  heading left / subhead right
 *   ─────────────────────────────────────────────
 *   ╭ brief.ts ╮ ╭ Studio ╮ ╭ terminal ╮ ╭ release ╮
 *   │ TW       │ │ TW     │ │ pnpm dev │ │ Run     │  ← each panel
 *   │          │ │        │ │ output   │ │ release │    sits on its
 *   ╰──────────╯ ╰────────╯ ╰──────────╯ ╰─────────╯    own Y offset
 *
 * Panels intentionally NOT same-height: each has a static lg+ Y
 * translate (−12 / +8 / −16 / +14) + a drop shadow tuned to suggest
 * the layer is closer or further from the viewer. No cursor-tilt JS;
 * the depth read is from the bg + offsets alone, which is what Sanity
 * does too.
 *
 * Honesty pass: a previous V1 had a fake "History" panel timeline
 * (Shipped — just now, Shipped — a minute ago) for projects that
 * weren't actually shipping. Replaced with a stylized `pnpm dev`
 * terminal output — no false claim, anchored to actual dev work. The
 * one interactive moment is the "Run release" button, which throws
 * a small brand-violet confetti burst on click (purely cosmetic).
 */
export function CustomEnvironments() {
  const { t, locale } = useTranslation();
  const ce = t.sections.customEnvironments;
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: "-10% 0px -10% 0px" });

  const pairs = locale === "pt" ? BRIEFS_PT : BRIEFS_EN;
  const { title, description, pairIdx } = useTypewriter({
    pairs,
    enabled: inView,
  });

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative isolate w-full overflow-hidden px-6 py-24 md:px-12 md:py-32"
    >
      {/* ─── Ambient bg: gradient mesh + SVG grain ────────────────── */}
      <AmbientBackdrop />

      <div className="relative mx-auto max-w-[1248px]">
        {/* Header row: heading left, subhead right (Sanity layout) */}
        <div className="mb-12 flex flex-col gap-8 md:mb-16 md:flex-row md:items-end md:justify-between md:gap-16">
          <div className="md:max-w-[640px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand">
              {ce.eyebrow}
            </p>
            <h2 className="mt-4 max-w-[14ch] text-balance text-4xl font-normal leading-[1.05] tracking-[-0.03em] text-fg-base md:text-6xl">
              {ce.heading}
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-fg-dim md:text-lg">
            {ce.subhead}
          </p>
        </div>

        {/* Mockup grid — 4 panels at staggered Y offsets on lg+ */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          <FloatingPanel offsetClass="lg:-translate-y-3">
            <CodeEditorPanel title={title} description={description} />
          </FloatingPanel>
          <FloatingPanel offsetClass="lg:translate-y-2">
            <StudioFormPanel title={title} description={description} />
          </FloatingPanel>
          <FloatingPanel offsetClass="lg:-translate-y-4">
            <TerminalPanel />
          </FloatingPanel>
          <FloatingPanel offsetClass="lg:translate-y-4">
            <AIStudioPanel title={title} pairIdx={pairIdx} />
          </FloatingPanel>
        </div>
      </div>
    </section>
  );
}

/* ─── Ambient backdrop ──────────────────────────────────────────── */

function AmbientBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {/* Gradient mesh — violet + cyan + magenta blobs */}
      <div
        className="absolute inset-0 opacity-70 [filter:blur(80px)]"
        style={{
          background: [
            "radial-gradient(45% 40% at 25% 35%, rgba(168, 85, 247, 0.55), transparent 70%)",
            "radial-gradient(40% 35% at 75% 55%, rgba(56, 189, 248, 0.30), transparent 70%)",
            "radial-gradient(35% 30% at 50% 80%, rgba(244, 114, 182, 0.25), transparent 70%)",
            "radial-gradient(50% 45% at 95% 15%, rgba(124, 58, 237, 0.30), transparent 70%)",
          ].join(", "),
        }}
      />

      {/* SVG turbulence grain — gives depth, hides the seams between
          the radial gradients, matches Sanity's grainy bg texture. */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.18] mix-blend-overlay"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="dvddev-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0.55 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#dvddev-grain)" />
      </svg>

      {/* Vignette so the gradient doesn't bleed into trust marquee
          above or projects below. */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-bg-base to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg-base to-transparent" />
    </div>
  );
}

/* ─── Floating panel wrapper (Y offset + shadow) ────────────────── */

function FloatingPanel({
  children,
  offsetClass,
}: {
  children: React.ReactNode;
  offsetClass: string;
}) {
  return (
    <div
      className={`relative transform-gpu shadow-[0_20px_48px_-16px_rgba(0,0,0,0.45)] transition-transform duration-500 ${offsetClass}`}
    >
      {children}
    </div>
  );
}

/* ─── Caret ──────────────────────────────────────────────────────── */

function Caret() {
  return (
    <span
      aria-hidden
      className="ml-px inline-block h-[0.9em] w-[2px] translate-y-[2px] bg-brand [animation:caret-blink_1s_steps(2,end)_infinite]"
    />
  );
}

/* ─── Panel 1 · brief.ts (code editor) ──────────────────────────── */

function CodeEditorPanel({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <PanelShell>
      <PanelHeader>
        <span className="text-fg-base">brief.ts</span>
        <span className="text-fg-faint">terminal</span>
        <span className="ml-auto text-fg-faint">⎘</span>
      </PanelHeader>
      <pre className="overflow-hidden whitespace-pre-wrap break-words p-4 font-mono text-[11px] leading-relaxed md:text-[12px]">
        <code>
          <CodeLine n={1}>
            <Kw>import</Kw>
            {" { "}
            <Var>defineBrief</Var>
            {" } "}
            <Kw>from</Kw>{" "}
            <Str>{`"@dvddev/core"`}</Str>;
          </CodeLine>
          <CodeLine n={2} />
          <CodeLine n={3}>
            <Kw>export const</Kw>{" "}
            <Var>brief</Var>
            {" = "}
            <Var>defineBrief</Var>
            ({"{"}
          </CodeLine>
          <CodeLine n={4}>
            {"  "}
            <Prop>client</Prop>:{" "}
            <Str>
              {'"'}
              {title}
              <Caret />
              {'"'}
            </Str>
            ,
          </CodeLine>
          <CodeLine n={5}>
            {"  "}
            <Prop>scope</Prop>:{"  "}
            <Str>
              {'"'}
              {description}
              <Caret />
              {'"'}
            </Str>
            ,
          </CodeLine>
          <CodeLine n={6}>
            {"  "}
            <Prop>stack</Prop>:{"  "}[<Str>{`"next.js"`}</Str>,{" "}
            <Str>{`"tailwind"`}</Str>],
          </CodeLine>
          <CodeLine n={7}>
            {"  "}
            <Prop>ship</Prop>:{"   "}
            <Str>{`"soon"`}</Str>
          </CodeLine>
          <CodeLine n={8}>{"}"});</CodeLine>
        </code>
      </pre>
    </PanelShell>
  );
}

function CodeLine({ n, children }: { n: number; children?: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className="select-none text-fg-faint" aria-hidden>
        {String(n).padStart(2, " ")}
      </span>
      <span className="min-w-0 flex-1 text-fg-base">{children}</span>
    </div>
  );
}

const Kw = ({ children }: { children: React.ReactNode }) => (
  <span className="text-magenta-500">{children}</span>
);
const Var = ({ children }: { children: React.ReactNode }) => (
  <span className="text-blue-500">{children}</span>
);
const Prop = ({ children }: { children: React.ReactNode }) => (
  <span className="text-fg-base">{children}</span>
);
const Str = ({ children }: { children: React.ReactNode }) => (
  <span className="text-green-500">{children}</span>
);

/* ─── Panel 2 · dvddev/brief/hero (Studio form) ─────────────────── */

function StudioFormPanel({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <PanelShell highlight>
      <PanelHeader>
        <span className="font-sans normal-case tracking-normal text-fg-dim">
          Studio <span className="text-fg-faint">/</span> brief{" "}
          <span className="text-fg-faint">/</span>{" "}
          <span className="text-fg-base">hero</span>
        </span>
        <MoreHorizontal
          className="ml-auto h-3.5 w-3.5 text-fg-faint"
          strokeWidth={2}
          aria-hidden
        />
      </PanelHeader>
      <div className="flex flex-col gap-4 p-4">
        <FormField label="Title">
          <div className="font-sans text-[13px] text-fg-base">
            {title}
            <Caret />
          </div>
        </FormField>
        <FormField label="Description">
          <div className="min-h-[64px] whitespace-pre-wrap break-words font-sans text-[13px] leading-relaxed text-fg-base">
            {description}
            <Caret />
          </div>
        </FormField>
        <div className="flex items-center justify-between border-t border-border-faint pt-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-ink-base">
              D
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-faint">
              @dvddev · just now
            </span>
          </div>
          <button
            type="button"
            disabled
            className="rounded-md bg-bg-elevated px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-dim"
          >
            Publish
          </button>
        </div>
      </div>
    </PanelShell>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-sans text-[11px] text-fg-dim">{label}</span>
      <div className="rounded-md border border-border-faint bg-bg-elevated px-3 py-2">
        {children}
      </div>
    </label>
  );
}

/* ─── Panel 3 · Terminal (pnpm dev output) ──────────────────────── */

const TERMINAL_LINES: Array<{ text: string; tone?: "info" | "ok" | "warn" }> = [
  { text: "$ pnpm dev" },
  { text: "" },
  { text: "> dvddev@0.1.0 dev" },
  { text: "> next dev --turbopack" },
  { text: "" },
  { text: "  ▲ Next.js 16.0.4 (Turbopack)", tone: "info" },
  { text: "  - Local:        http://localhost:3000" },
  { text: "" },
  { text: " ✓ Ready in 1.4s", tone: "ok" },
  { text: " ✓ Compiled / in 287ms", tone: "ok" },
  { text: " ▲ Hot-reloaded brief.ts" },
];

function TerminalPanel() {
  return (
    <PanelShell>
      <PanelHeader>
        <span className="text-fg-base">terminal</span>
        <span className="text-fg-faint">~/dvddev</span>
        <span className="ml-auto inline-flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-yellow-500/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-green-500/70" />
        </span>
      </PanelHeader>
      <pre className="overflow-hidden whitespace-pre-wrap break-words p-4 font-mono text-[11px] leading-relaxed">
        <code>
          {TERMINAL_LINES.map((line, i) => (
            <div key={i} className="min-h-[1em]">
              <span
                className={
                  line.tone === "ok"
                    ? "text-green-500"
                    : line.tone === "info"
                      ? "text-blue-500"
                      : line.tone === "warn"
                        ? "text-yellow-500"
                        : "text-fg-base"
                }
              >
                {line.text}
              </span>
            </div>
          ))}
          <div>
            <span className="text-brand">›</span>{" "}
            <span className="text-fg-base">_</span>
            <Caret />
          </div>
        </code>
      </pre>
    </PanelShell>
  );
}

/* ─── Panel 4 · ai studio (with confetti easter egg) ────────────── */

const AI_SAMPLES = [
  "/ai-samples/01-cosmic.jpg",
  "/ai-samples/02-matrix.jpg",
  "/ai-samples/03-neon.jpg",
  "/ai-samples/04-sunset.jpg",
  "/ai-samples/05-rocket.jpg",
];

function AIStudioPanel({
  title,
  pairIdx,
}: {
  title: string;
  pairIdx: number;
}) {
  // The "regenerate" click bumps a manual offset on top of pairIdx so
  // clicking the button visibly swaps the image without waiting for
  // the typewriter cycle.
  const [manualOffset, setManualOffset] = useState(0);
  const [bursts, setBursts] = useState<number[]>([]);

  const imageIdx = (pairIdx + manualOffset) % AI_SAMPLES.length;
  const currentImage = AI_SAMPLES[imageIdx];

  const handleRegenerate = () => {
    setManualOffset((o) => o + 1);
    const id = Date.now();
    setBursts((b) => [...b, id]);
    setTimeout(() => {
      setBursts((b) => b.filter((x) => x !== id));
    }, 1500);
  };

  return (
    <PanelShell>
      <PanelHeader>
        <Sparkles
          className="h-3 w-3 text-brand"
          strokeWidth={2}
          aria-hidden
        />
        <span className="text-fg-base">ai studio</span>
        <span className="text-fg-faint">generate</span>
        <span className="ml-auto text-fg-faint">⌘K</span>
      </PanelHeader>
      <div className="flex flex-col gap-3 p-4">
        {/* Model selector (decorative) */}
        <FormField label="Model">
          <div className="flex items-center justify-between font-sans text-[13px] text-fg-base">
            <span>Claude Fable 5</span>
            <ChevronDown
              className="h-3 w-3 text-fg-faint"
              strokeWidth={2}
              aria-hidden
            />
          </div>
        </FormField>

        {/* Prompt — interpolates the current typewriter title */}
        <FormField label="Prompt">
          <div className="font-sans text-[12px] leading-relaxed text-fg-base">
            Hero image for{" "}
            <span className="text-brand">
              {title ? `"${title}"` : "..."}
            </span>
            <Caret />
          </div>
        </FormField>

        {/* Generated image preview — fades between samples as the
            brief cycles, plus on manual regen. */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-border-faint bg-bg-elevated">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage}
              src={currentImage}
              alt=""
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          </AnimatePresence>
          <div className="absolute bottom-2 left-2 inline-flex items-center gap-1.5 rounded-full bg-ink-base/70 px-2 py-1 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 [animation:caret-blink_1.4s_steps(2,end)_infinite]" />
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-fg-base">
              generated · 1024×640
            </span>
          </div>
        </div>

        {/* Footer: token meter + regenerate button (with confetti) */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-faint">
            ~1.4k tokens
          </span>
          <div className="relative">
            <button
              type="button"
              onClick={handleRegenerate}
              className="rounded-md border border-border-faint bg-bg-elevated px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-base transition-colors hover:border-brand hover:text-brand"
            >
              Regenerate
            </button>
            <AnimatePresence>
              {bursts.map((id) => (
                <ConfettiBurst key={id} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PanelShell>
  );
}

/* ─── Confetti burst ────────────────────────────────────────────── */

const CONFETTI_COLORS = ["#a855f7", "#7c3aed", "#38bdf8", "#f472b6", "#fde047"];

function ConfettiBurst() {
  // 14 particles, each gets a random angle + distance + color. Frozen
  // at mount (no re-randomization on re-render) so the burst is
  // deterministic from mount to unmount.
  const particles = Array.from({ length: 14 }, (_, i) => {
    const angle = (i / 14) * Math.PI * 2 + Math.random() * 0.5;
    const distance = 40 + Math.random() * 30;
    return {
      i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      delay: Math.random() * 0.05,
    };
  });

  return (
    <span
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 z-10"
    >
      {particles.map((p) => (
        <motion.span
          key={p.i}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.9,
            delay: p.delay,
            ease: [0.2, 0.7, 0.3, 1],
          }}
          className="absolute h-1.5 w-1.5 rounded-full"
          style={{ background: p.color }}
        />
      ))}
    </span>
  );
}

/* ─── Shared panel shell ────────────────────────────────────────── */

function PanelShell({
  children,
  highlight = false,
}: {
  children: React.ReactNode;
  highlight?: boolean;
}) {
  // Translucent frosted-glass surface — the gradient mesh + grain
  // behind the section bleeds through, which is the whole point of
  // having an ambient bg in the first place. backdrop-blur-md picks up
  // enough of the surface to keep text readable without sealing the
  // panel into a flat black tile.
  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-[11px] border bg-bg-dim/45 backdrop-blur-xl ${
        highlight ? "border-fg-base/15" : "border-fg-base/10"
      }`}
    >
      {children}
    </div>
  );
}

function PanelHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 border-b border-border-faint px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em]">
      {children}
    </div>
  );
}
