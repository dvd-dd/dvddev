/**
 * Sanity-style trust strip directly under the hero — one infinite
 * horizontal scroll combining three idea categories:
 *
 *   • client / project wordmarks, each in its project's OWN typeface
 *     (Phoenix → Space Grotesk, Luxor → Italiana, Corvin → Cinzel, …)
 *   • flag glyphs (🇺🇸 🇧🇷 🇬🇧) for regions shipped for
 *   • tech-stack logos, each in its real brand wordmark (Next.js,
 *     tailwindcss, Vercel, …)
 *
 * Every logo is a pre-rendered black SVG (brand wordmarks under
 * public/brand/stack, client names rendered text→path in their display
 * font under public/brand/clients) so the whole strip reads as solid
 * ink-base black on the violet brand bg — exactly like sanity.io paints
 * its customer marquee, where each brand keeps its own logotype but all
 * flatten to one color. Pre-rendered SVGs (vs live web fonts) also keep
 * the marquee width stable so the `translateX(-50%)` loop never desyncs.
 *
 * CSS `@keyframes marqueeL` drives the infinite linear translate; the
 * item list is rendered twice so the loop is seamless; pause-on-hover
 * lets a visitor stop and read.
 */

type Logo = { name: string; src: string };

const STACK: Logo[] = [
  { name: "Next.js", src: "/brand/stack/nextjs.svg" },
  { name: "React", src: "/brand/stack/react.svg" },
  { name: "TypeScript", src: "/brand/stack/typescript.svg" },
  { name: "Tailwind CSS", src: "/brand/stack/tailwind.svg" },
  { name: "Framer Motion", src: "/brand/stack/framer.svg" },
  { name: "Node.js", src: "/brand/stack/nodejs.svg" },
  { name: "Vercel", src: "/brand/stack/vercel.svg" },
  { name: "Git", src: "/brand/stack/git.svg" },
  { name: "pnpm", src: "/brand/stack/pnpm.svg" },
  { name: "Figma", src: "/brand/stack/figma.svg" },
  { name: "Claude", src: "/brand/stack/claude.svg" },
];

const CLIENTS: Logo[] = [
  { name: "Upward Media", src: "/brand/clients/upward.svg" },
  { name: "Smart Hardwood Floors", src: "/brand/clients/smartfloors.svg" },
  { name: "Phoenix", src: "/brand/clients/phoenix.svg" },
  { name: "PeçaAí", src: "/brand/clients/pecaai.svg" },
  { name: "Luxor", src: "/brand/clients/luxor.svg" },
  { name: "Wood Frame", src: "/brand/clients/woodframe.svg" },
  { name: "Corvin Protection", src: "/brand/clients/corvin.svg" },
];

// Flag only (no city) — rendered large so the region reads at a glance.
const FLAGS = [
  { emoji: "🇺🇸", label: "United States" },
  { emoji: "🇧🇷", label: "Brazil" },
  { emoji: "🇬🇧", label: "United Kingdom" },
];

const Divider = ({ label }: { label: string }) => (
  <span className="mx-8 font-mono text-[11px] uppercase tracking-[0.22em]">
    {label}
  </span>
);

export function TrustMarquee() {
  // Build the inline strip once; rendered twice for the seamless loop.
  const items = (
    <>
      <Divider label="Shipped for" />
      {CLIENTS.map((c) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`client-${c.name}`}
          src={c.src}
          alt={c.name}
          loading="lazy"
          className="mx-7 h-10 w-auto shrink-0"
        />
      ))}

      <Divider label="·" />
      <Divider label="Clients in" />
      {FLAGS.map((f) => (
        <span
          key={`flag-${f.label}`}
          role="img"
          aria-label={f.label}
          className="mx-5 select-none text-[34px] leading-none"
        >
          {f.emoji}
        </span>
      ))}

      <Divider label="·" />
      <Divider label="Stack" />
      {STACK.map((s) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`stack-${s.name}`}
          src={s.src}
          alt={s.name}
          loading="lazy"
          className="mx-6 h-7 w-auto shrink-0"
        />
      ))}
    </>
  );

  return (
    <div
      data-theme="light"
      aria-label="Selected work, regions, and stack"
      className="group relative w-full overflow-hidden bg-brand py-7 text-ink-base"
    >
      <div className="flex w-max items-center gap-x-0 [animation:marqueeL_48s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:[animation:none]">
        <div className="flex items-center">{items}</div>
        <div aria-hidden className="flex items-center">
          {items}
        </div>
      </div>

      <style>{`
        @keyframes marqueeL {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
