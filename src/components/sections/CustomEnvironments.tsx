"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { ChevronDown, Info, MoreHorizontal, RotateCcw } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useTypewriter } from "@/hooks/useTypewriter";
import { BRIEFS_EN, BRIEFS_PT } from "@/lib/briefs";

/**
 * Custom build environments — Sanity's editorial-environments
 * showcase, dvddev-flavored. Replaces the older 5-card UseCases
 * section. Four panels arranged in a CMS-editor mockup; the two
 * "writable" panels (code editor + Studio form) stream live values
 * from useTypewriter, which paged-cycles the 20 briefs in
 * `src/lib/briefs.ts` while the section is in view.
 *
 *   eyebrow  ┊  heading left / subhead right
 *   ─────────────────────────────────────────────
 *   ╭ brief.ts ╮ ╭ Studio ╮ ╭ History ╮ ╭ Release ╮
 *   │ "title": │ │ Title: │ │ ▴ SF    │ │ EN-US   │
 *   │ "${TW}"  │ │ {TW}   │ │ ▴ LX    │ │ PT-BR   │
 *   │ "scope": │ │ Desc:  │ │ ▴ UP    │ │ Run     │
 *   │ "${TW}"  │ │ {TW}   │ │ ⋯        │ │ Release │
 *   ╰──────────╯ ╰────────╯ ╰─────────╯ ╰─────────╯
 *
 * Panel chrome labels are deliberately English (IDE/CMS convention);
 * only the section heading + typewriter content is bilingual. The
 * caret blink is a single keyframe in globals.css (`caret-blink`).
 */
export function CustomEnvironments() {
  const { t, locale } = useTranslation();
  const ce = t.sections.customEnvironments;
  const sectionRef = useRef<HTMLElement>(null);
  // Run the typewriter while ANY part of the section is in view; pause
  // when scrolled fully off-screen.
  const inView = useInView(sectionRef, { margin: "-10% 0px -10% 0px" });

  const pairs = locale === "pt" ? BRIEFS_PT : BRIEFS_EN;
  const { title, description } = useTypewriter({ pairs, enabled: inView });

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative w-full px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-[1248px]">
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

        {/* Mockup grid — 4 panels */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <CodeEditorPanel title={title} description={description} />
          <StudioFormPanel title={title} description={description} />
          <HistoryPanel />
          <ReleasePanel />
        </div>
      </div>
    </section>
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
            <Kw>from</Kw>
            {" "}
            <Str>{`"@dvddev/core"`}</Str>;
          </CodeLine>
          <CodeLine n={2} />
          <CodeLine n={3}>
            <Kw>export const</Kw>
            {" "}
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
            <Prop>stack</Prop>:{"  "}[
            <Str>{`"next.js"`}</Str>,{" "}
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

/* ─── Panel 3 · History ─────────────────────────────────────────── */

const HISTORY_ROWS: Array<{
  initials: string;
  bg: string;
  fg: string;
  when: string;
}> = [
  { initials: "CV", bg: "bg-brand", fg: "text-ink-base", when: "just now" },
  { initials: "WF", bg: "bg-yellow-500", fg: "text-ink-base", when: "a few seconds ago" },
  { initials: "LX", bg: "bg-blue-500", fg: "text-ink-base", when: "a minute ago" },
  { initials: "PA", bg: "bg-magenta-500", fg: "text-ink-base", when: "a minute ago" },
  { initials: "PH", bg: "bg-green-500", fg: "text-ink-base", when: "a minute ago" },
];

function HistoryPanel() {
  return (
    <PanelShell>
      <div className="absolute -top-2 right-3 z-10 rotate-[3deg] rounded-sm bg-yellow-500 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-base shadow-md">
        Click to interact
      </div>
      <PanelHeader>
        <span className="text-fg-base">History</span>
        <RotateCcw
          className="ml-auto h-3.5 w-3.5 text-fg-faint"
          strokeWidth={2}
          aria-hidden
        />
      </PanelHeader>
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-start gap-2 rounded-md border border-border-faint bg-bg-elevated px-3 py-2">
          <Info
            className="mt-0.5 h-3 w-3 shrink-0 text-fg-faint"
            strokeWidth={2}
            aria-hidden
          />
          <span className="font-sans text-[11px] leading-relaxed text-fg-dim">
            dvddev ships every project under version control.
          </span>
        </div>
        <ul className="flex flex-col gap-2">
          {HISTORY_ROWS.map((row, i) => (
            <li
              key={`${row.initials}-${i}`}
              className="flex items-center gap-3 rounded-md px-1 py-1"
            >
              <span
                className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${row.bg} ${row.fg} text-[10px] font-bold tracking-tight`}
              >
                {row.initials}
              </span>
              <span className="flex-1 font-sans text-[12px] text-fg-base">
                Shipped
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-faint">
                {row.when}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </PanelShell>
  );
}

/* ─── Panel 4 · New Release ─────────────────────────────────────── */

const RELEASE_ROWS: Array<{
  symbol: string;
  label: string;
  action: string;
  actionColor: string;
}> = [
  { symbol: "⌘", label: "Locale: EN-US", action: "Add", actionColor: "text-green-500" },
  { symbol: "⌘", label: "Locale: PT-BR", action: "Add", actionColor: "text-green-500" },
  { symbol: "≡", label: "Site nav bar", action: "Change", actionColor: "text-yellow-500" },
  { symbol: "↻", label: "Brand promo", action: "Publish", actionColor: "text-green-500" },
];

function ReleasePanel() {
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
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-1.5">
          <span className="font-sans text-[11px] text-fg-dim">
            Set publishing date
          </span>
          <div className="flex items-center justify-between rounded-md border border-border-faint bg-bg-elevated px-3 py-2 font-sans text-[12px] text-fg-faint">
            <span>dd/mm/aaaa</span>
            <ChevronDown className="h-3 w-3" strokeWidth={2} aria-hidden />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between border-b border-border-faint pb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-faint">
            <span>Documents</span>
            <span>Action</span>
          </div>
          {RELEASE_ROWS.map((row, i) => (
            <div
              key={`${row.label}-${i}`}
              className="flex items-center justify-between border-b border-border-faint/40 py-1.5 last:border-b-0"
            >
              <span className="flex items-center gap-2 font-sans text-[12px] text-fg-base">
                <span className="text-fg-faint" aria-hidden>
                  {row.symbol}
                </span>
                {row.label}
              </span>
              <button
                type="button"
                disabled
                className={`font-mono text-[10px] uppercase tracking-[0.14em] ${row.actionColor}`}
              >
                {row.action}
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          disabled
          className="self-start rounded-md border border-border-faint bg-bg-elevated px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-dim"
        >
          Run release
        </button>
      </div>
    </PanelShell>
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
  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-[11px] border bg-bg-dim ${
        highlight ? "border-border-dim" : "border-border-faint"
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
