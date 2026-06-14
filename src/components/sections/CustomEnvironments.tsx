"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  ArrowUp,
  ChevronDown,
  Globe,
  Image as ImageIcon,
  Info,
  Languages,
  Menu,
  MoreHorizontal,
  RotateCcw,
  RotateCw,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useTypewriter } from "@/hooks/useTypewriter";
import { BRIEFS_EN, BRIEFS_PT } from "@/lib/briefs";

/**
 * Custom build environments — literal visual clone of sanity.io's
 * editorial-environments showcase, dvddev-flavored. Four panels in
 * a single equal-baseline row over an ambient violet-cyan gradient
 * mesh + SVG grain bg.
 *
 *   eyebrow  ┊  heading left / subhead right
 *   ─────────────────────────────────────────────
 *   ╭ brief.ts ╮ ╭ Studio ╮ ╭ History ╮ ╭ Release ╮
 *   │ schema   │ │ Title  │ │ ● CV    │ │ EN-US   │
 *   │ defineTy │ │ Desc.  │ │ ● WF    │ │ PT-BR   │
 *   │ pe (…)   │ │ Image  │ │ ● LX    │ │ navbar  │
 *   │          │ │        │ │ ● PA    │ │ Run     │
 *   ╰──────────╯ ╰────────╯ ╰─────────╯ ╰─────────╯
 *
 * Sanity-fidelity per user spec ("identico totalmente"):
 * - Code panel is the static schema definition (defineType + nested
 *   defineFields), 18 lines visible, syntax-highlighted. NOT a
 *   typewriter target — it describes what the form fields ARE.
 * - Studio form is where the typewriter title + description values
 *   appear, in matching input/textarea controls. Image field is a
 *   decorative placeholder beneath, same as Sanity.
 * - History is a stylized publish log — 5 dvddev project initials
 *   (CV/WF/LX/PA/PH) with relative times. The top row gets a
 *   highlighted bg row treatment like Sanity's selected revision.
 * - New Brief Release is the deploy panel — date + 4 documents/action
 *   rows. Run Release fires the brand-violet confetti easter egg.
 *
 * Layout differences from V1: panels are baseline-aligned (no Y
 * stagger). Depth comes entirely from the ambient backdrop +
 * translucent panel surfaces + hover swell.
 */
export function CustomEnvironments() {
  const { t, locale } = useTranslation();
  const ce = t.sections.customEnvironments;
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: "-10% 0px -10% 0px" });

  const pairs = locale === "pt" ? BRIEFS_PT : BRIEFS_EN;
  const { title, description } = useTypewriter({ pairs, enabled: inView });

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative isolate w-full overflow-hidden py-24 md:py-32"
    >
      <AmbientBackdrop />

      {/* Heading stays in the tighter 1248 column — page rhythm. */}
      <div className="relative mx-auto max-w-[1248px] px-6 md:px-12">
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
      </div>

      {/* Editor frame, sanity.io structure: the dashed outline is
          NARROWER than the panel row and passes BEHIND it — the four
          mini terminals overflow the frame on both sides, and the
          frame has no bottom edge ("sem fim"). The frame is drawn as
          an absolutely-positioned ghost so its geometry NEVER moves
          when the typewriter text reflows. */}
      <div className="relative mx-auto max-w-[1800px] px-4 md:px-8">
        {/* Dashed ghost frame — thinner than the panels, full height
            of the block, open at the bottom. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-12 right-12 border-l border-r border-t border-dotted border-fg-base/25 md:left-24 md:right-24"
        />

        {/* Live browser preview — constrained to the frame's column. */}
        <div className="relative mx-auto max-w-[1248px] px-6 pt-8 md:px-12 md:pt-12">
          <BrowserPreview title={title} description={description} />
        </div>

        {/* Panel row — WIDER than the dashed frame, drawn on top of
            its vertical lines (z stacking via position relative). */}
        <div className="relative mt-10 grid grid-cols-1 gap-4 md:mt-14 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          <FloatingPanel>
            <CodeEditorPanel />
          </FloatingPanel>
          <FloatingPanel interactive>
            <StudioFormPanel title={title} description={description} />
          </FloatingPanel>
          <FloatingPanel interactive>
            <HistoryPanel />
          </FloatingPanel>
          <FloatingPanel interactive>
            <ReleasePanel />
          </FloatingPanel>
        </div>
      </div>
    </section>
  );
}

/* ─── Ambient backdrop ──────────────────────────────────────────── */

function AmbientBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 bg-bg-base"
    >
      {/* Sanity.io's actual editorial-environments bg, scraped from
          cdn.sanity.io via the Playwright network sniffer (the user
          asked: "usa ela igual ao sanity.io"). It's a heavily
          motion-blurred photo with built-in film grain — using their
          original asset reads as the silky organic smear we couldn't
          fake with pure CSS gradients.

          object-position bottom keeps the warm subject hovering
          where it naturally sits relative to the panels — same
          composition Sanity uses on their home page. */}
      <img
        src="/textures/sanity-bg-violet.webp"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-bottom"
      />

      {/* Top + bottom vignettes contain the warm wash to this section,
          stopping it from bleeding into the hero reel above or the
          Projects grid below. */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg-base to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg-base to-transparent" />
    </div>
  );
}

/* ─── Browser preview (live frame above the editor row) ────────── */

function BrowserPreview({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  // No outer border anymore — the parent EditorFrame in the section
  // owns the dotted box. This component is just nav + faux hero.
  return (
    <div className="relative">
      {/* Faux site chrome — window dots, draft indicator, nav links,
          locale switcher. */}
      <div className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-dim">
        <div className="flex items-center gap-3">
          <span className="flex gap-1" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-fg-faint/50" />
            <span className="h-2 w-2 rounded-full bg-fg-faint/50" />
            <span className="h-2 w-2 rounded-full bg-fg-faint/50" />
          </span>
          <span className="text-yellow-500">draft</span>
        </div>
        <ul className="hidden gap-6 md:flex">
          <li>home</li>
          <li>work</li>
          <li>about</li>
          <li>contact</li>
        </ul>
        <div className="flex items-center gap-3">
          <span>en</span>
          <span className="text-fg-faint" aria-hidden>
            |
          </span>
          <span className="text-fg-faint">pt</span>
        </div>
      </div>

      {/* Faux hero — typewriter title rendered large, description in a
          selection-style outlined box (mirrors Sanity's blue focus
          ring on the field being edited). Both slots carry FIXED
          min-heights sized to the longest brief in lib/briefs.ts so
          the frame geometry never reflows while the typewriter
          types/deletes. */}
      <div className="mt-14 flex flex-col gap-10 md:mt-20 md:flex-row md:items-start md:justify-between md:gap-12">
        <h3 className="min-h-[2.4em] max-w-[20ch] flex-1 text-balance text-3xl font-normal leading-[1.1] tracking-[-0.03em] text-fg-base md:text-4xl lg:text-5xl">
          {title}
          <Caret />
        </h3>
        <div className="w-full md:max-w-md md:shrink-0">
          <div className="rounded-md border-2 border-blue-500/60 px-4 py-3 ring-1 ring-blue-500/20">
            <p className="min-h-[6.5em] text-sm leading-relaxed text-fg-base md:text-base">
              {description}
              <Caret />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Floating panel wrapper (hover swell + shadow) ─────────────── */

function FloatingPanel({
  children,
  interactive = false,
}: {
  children: React.ReactNode;
  interactive?: boolean;
}) {
  return (
    <div className="relative h-full transform-gpu">
      {/* Yellow sticky tag — sanity.io drops one on each panel that
          accepts input. Sits OUTSIDE PanelShell (which clips overflow)
          so it can hang over the top edge. */}
      {interactive && (
        <span className="absolute -top-2.5 right-5 z-20 rotate-2 rounded-[3px] bg-yellow-500 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-ink-base shadow-md">
          Click to interact
        </span>
      )}
      <div className="h-full transform-gpu shadow-[0_20px_48px_-16px_rgba(0,0,0,0.45)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:scale-[1.025] hover:shadow-[0_28px_56px_-12px_rgba(168,85,247,0.35)]">
        {children}
      </div>
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

/* ─── Panel 1 · brief.ts (Sanity-style static schema) ────────────── */

function CodeEditorPanel() {
  return (
    <PanelShell>
      <PanelHeader>
        <span className="text-fg-base">brief.ts</span>
        <span className="text-fg-faint">terminal</span>
        <span className="ml-auto text-fg-faint">⎘</span>
      </PanelHeader>
      {/* Line layout mirrors sanity.io's hero.ts panel 1:1 — the
          import sits on ONE line and clips at the panel edge (theirs
          does too), and the visible code cuts off mid-block at line
          18 (`rows: 3,`). */}
      <pre className="overflow-hidden whitespace-pre p-5 font-mono text-[12px] leading-relaxed md:text-[13px]">
        <code>
          <CodeLine n={1}>
            <Kw>import</Kw>
            {" {"}
            <Var>defineField</Var>, <Var>defineType</Var>
            {"} "}
            <Kw>from</Kw> <Str>{`'@dvddev/core'`}</Str>
          </CodeLine>
          <CodeLine n={2} />
          <CodeLine n={3}>
            <Kw>export const</Kw> <Var>briefType</Var> ={" "}
            <Var>defineType</Var>({"{"}
          </CodeLine>
          <CodeLine n={4}>
            {"  "}name: <Str>{`'brief'`}</Str>,
          </CodeLine>
          <CodeLine n={5}>
            {"  "}title: <Str>{`'Brief'`}</Str>,
          </CodeLine>
          <CodeLine n={6}>
            {"  "}type: <Str>{`'document'`}</Str>,
          </CodeLine>
          <CodeLine n={7}>{"  "}fields: [</CodeLine>
          <CodeLine n={8}>
            {"    "}
            <Var>defineField</Var>({"{"}
          </CodeLine>
          <CodeLine n={9}>
            {"      "}name: <Str>{`'title'`}</Str>,
          </CodeLine>
          <CodeLine n={10}>
            {"      "}title: <Str>{`'Title'`}</Str>,
          </CodeLine>
          <CodeLine n={11}>
            {"      "}type: <Str>{`'string'`}</Str>,
          </CodeLine>
          <CodeLine n={12}>
            {"      "}validation: (<Var>Rule</Var>)<Op>{` =>`}</Op>{" "}
            Rule.<Var>required</Var>(),
          </CodeLine>
          <CodeLine n={13}>{"    "}{`}),`}</CodeLine>
          <CodeLine n={14}>
            {"    "}
            <Var>defineField</Var>({"{"}
          </CodeLine>
          <CodeLine n={15}>
            {"      "}name: <Str>{`'description'`}</Str>,
          </CodeLine>
          <CodeLine n={16}>
            {"      "}title: <Str>{`'Description'`}</Str>,
          </CodeLine>
          <CodeLine n={17}>
            {"      "}type: <Str>{`'text'`}</Str>,
          </CodeLine>
          <CodeLine n={18}>
            {"      "}rows: <Num>3</Num>,
          </CodeLine>
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
const Str = ({ children }: { children: React.ReactNode }) => (
  <span className="text-green-500">{children}</span>
);
const Op = ({ children }: { children: React.ReactNode }) => (
  <span className="text-magenta-500">{children}</span>
);
const Num = ({ children }: { children: React.ReactNode }) => (
  <span className="text-yellow-500">{children}</span>
);

/* ─── Panel 2 · Studio / dvddev / hero ──────────────────────────── */

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
          Studio <span className="text-fg-faint">/</span> dvddev{" "}
          <span className="text-fg-faint">/</span>{" "}
          <span className="text-fg-base">Hero</span>
        </span>
        <MoreHorizontal
          className="ml-auto h-3.5 w-3.5 text-fg-faint"
          strokeWidth={2}
          aria-hidden
        />
      </PanelHeader>
      <div className="flex flex-col gap-5 p-5">
        <FormField label="Title">
          <div className="font-sans text-[15px] text-fg-base">
            {title}
            <Caret />
          </div>
        </FormField>
        <FormField label="Description">
          {/* min-h sized for the longest brief so the panel (and the
              shared grid row) never reflows while typing/deleting. */}
          <div className="min-h-[8em] whitespace-pre-wrap break-words font-sans text-[15px] leading-relaxed text-fg-base">
            {description}
            <Caret />
          </div>
        </FormField>
        <ImageField />
        <div className="flex items-center justify-between border-t border-border-faint pt-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-ink-base">
              D
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-faint">
              @dvddev: just now
            </span>
          </div>
          <button
            type="button"
            disabled
            className="rounded-md bg-bg-elevated px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-dim"
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
    <label className="flex flex-col gap-2">
      <span className="font-sans text-[13px] text-fg-dim">{label}</span>
      <div className="rounded-md border border-border-faint bg-bg-elevated px-3.5 py-2.5">
        {children}
      </div>
    </label>
  );
}

function ImageField() {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-sans text-[13px] text-fg-dim">Image</span>
      <div className="flex items-center gap-3 rounded-md border border-border-faint bg-bg-elevated px-3.5 py-2.5">
        <div className="flex h-10 w-14 shrink-0 items-center justify-center rounded-sm bg-bg-dim">
          <ImageIcon
            className="h-4 w-4 text-fg-faint"
            strokeWidth={1.75}
            aria-hidden
          />
        </div>
        <span className="font-sans text-[13px] text-fg-faint">
          hero-cover.webp
        </span>
        <MoreHorizontal
          className="ml-auto h-3.5 w-3.5 text-fg-faint"
          strokeWidth={2}
          aria-hidden
        />
      </div>
    </div>
  );
}

/* ─── Panel 3 · History (publish log) ───────────────────────────── */

const HISTORY_ROWS: Array<{
  initials: string;
  bg: string;
  fg: string;
  when: string;
  label?: string;
  highlighted?: boolean;
}> = [
  {
    initials: "CV",
    bg: "bg-brand",
    fg: "text-ink-base",
    when: "just now",
    highlighted: true,
  },
  {
    initials: "WF",
    bg: "bg-yellow-500",
    fg: "text-ink-base",
    when: "1 minute ago",
  },
  {
    initials: "LX",
    bg: "bg-blue-500",
    fg: "text-ink-base",
    when: "2 minutes ago",
  },
  {
    initials: "DD",
    bg: "bg-bg-elevated",
    fg: "text-fg-base",
    when: "14 minutes ago",
    label: "me: updated",
  },
  {
    initials: "PA",
    bg: "bg-magenta-500",
    fg: "text-ink-base",
    when: "15 minutes ago",
  },
  {
    initials: "PH",
    bg: "bg-green-500",
    fg: "text-ink-base",
    when: "16 minutes ago",
  },
  {
    initials: "SF",
    bg: "bg-blue-300",
    fg: "text-ink-base",
    when: "21 minutes ago",
  },
  {
    initials: "UP",
    bg: "bg-green-300",
    fg: "text-ink-base",
    when: "25 minutes ago",
  },
];

function HistoryPanel() {
  return (
    <PanelShell>
      <PanelHeader>
        <span className="text-fg-base">History</span>
        <RotateCcw
          className="ml-auto h-3.5 w-3.5 text-fg-faint"
          strokeWidth={2}
          aria-hidden
        />
      </PanelHeader>
      <div className="flex flex-col gap-2.5 p-5">
        <div className="mb-1 flex items-start gap-2 rounded-md border border-border-faint bg-bg-elevated px-3.5 py-2.5">
          <Info
            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-fg-faint"
            strokeWidth={2}
            aria-hidden
          />
          <span className="font-sans text-[13px] leading-relaxed text-fg-dim">
            dvddev ships every project under version control.
          </span>
        </div>
        <ul className="flex flex-col">
          {HISTORY_ROWS.map((row, i) => (
            <li
              key={`${row.initials}-${i}`}
              className={`flex items-center gap-3 rounded-md px-2 py-2.5 ${
                row.highlighted ? "bg-bg-elevated" : ""
              }`}
            >
              <span className="relative">
                <span
                  className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${row.bg} ${row.fg} text-[11px] font-bold tracking-tight`}
                >
                  {row.initials}
                </span>
                <ArrowUp
                  className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-green-500 p-0.5 text-ink-base"
                  strokeWidth={3}
                  aria-hidden
                />
              </span>
              <span className="flex-1 font-sans text-[14px] text-fg-base">
                {row.label ?? "Published"}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-faint">
                {row.when}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </PanelShell>
  );
}

/* ─── Panel 4 · New brief release (with confetti easter egg) ───── */

const RELEASE_ROWS: Array<{
  Icon: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
    "aria-hidden"?: boolean;
  }>;
  label: string;
  action: string;
  actionColor: string;
}> = [
  {
    Icon: Languages,
    label: "Locale: EN-US",
    action: "Add",
    actionColor: "text-green-500",
  },
  {
    Icon: Languages,
    label: "Locale: PT-BR",
    action: "Add",
    actionColor: "text-green-500",
  },
  {
    Icon: Menu,
    label: "Site nav bar",
    action: "Change",
    actionColor: "text-yellow-500",
  },
  {
    Icon: RotateCw,
    label: "AI hero generator",
    action: "Publish",
    actionColor: "text-green-500",
  },
];

function ReleasePanel() {
  const [bursts, setBursts] = useState<number[]>([]);

  const handleRunRelease = () => {
    const id = Date.now();
    setBursts((b) => [...b, id]);
    setTimeout(() => {
      setBursts((b) => b.filter((x) => x !== id));
    }, 1500);
  };

  return (
    <PanelShell>
      <PanelHeader>
        <span className="text-fg-base">New brief release</span>
        <Info
          className="ml-auto h-3.5 w-3.5 text-fg-faint"
          strokeWidth={2}
          aria-hidden
        />
      </PanelHeader>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex flex-col gap-2">
          <span className="font-sans text-[13px] text-fg-dim">
            Set publishing date
          </span>
          <div className="flex items-center justify-between rounded-md border border-border-faint bg-bg-elevated px-3.5 py-2.5 font-sans text-[14px] text-fg-faint">
            <span>dd/mm/aaaa</span>
            <ChevronDown className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-border-faint pb-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">
            <span>Documents</span>
            <span>Action</span>
          </div>
          {RELEASE_ROWS.map((row, i) => (
            <div
              key={`${row.label}-${i}`}
              className="flex items-center justify-between border-b border-border-faint/40 py-2.5 last:border-b-0"
            >
              <span className="flex items-center gap-2.5 font-sans text-[14px] text-fg-base">
                <row.Icon
                  className="h-4 w-4 text-fg-faint"
                  strokeWidth={2}
                  aria-hidden
                />
                {row.label}
              </span>
              <button
                type="button"
                disabled
                className={`font-mono text-[11px] uppercase tracking-[0.14em] ${row.actionColor}`}
              >
                {row.action}
              </button>
            </div>
          ))}
        </div>
        <div className="relative self-start">
          <button
            type="button"
            onClick={handleRunRelease}
            className="rounded-md border border-border-faint bg-bg-elevated px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-base transition-colors hover:border-brand hover:text-brand"
          >
            Run release
          </button>
          <AnimatePresence>
            {bursts.map((id) => (
              <ConfettiBurst key={id} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </PanelShell>
  );
}

/* ─── Confetti burst ────────────────────────────────────────────── */

const CONFETTI_COLORS = ["#a855f7", "#7c3aed", "#38bdf8", "#f472b6", "#fde047"];

function ConfettiBurst() {
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
  // Solid ink-base ("real terminal color") so the panels read as
  // small editor windows on top of the Sanity-style warm bg, exactly
  // how sanity.io paints them. No backdrop-blur — the gradient mesh
  // shouldn't bleed through the surface anymore.
  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-[11px] border bg-ink-base ${
        highlight ? "border-fg-base/20" : "border-fg-base/10"
      }`}
    >
      {children}
    </div>
  );
}

function PanelHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 border-b border-border-faint px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em]">
      {children}
    </div>
  );
}
