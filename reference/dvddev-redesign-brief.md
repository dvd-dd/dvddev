# dvddev redesign brief

> Source of truth for the Sanity-inspired refresh.
> All decisions captured 2026-06-12 across 6 decision batches against `reference/sanity-spec.md`.
> Open this in a fresh session and the redesign is fully specified — no further questions needed unless something specific blocks.

---

## 1. Direction (1-line summary)

**Drop the Saturn-specific motifs, keep the deep-dark mood, swap saturn-gold for electric mint `#00FF9D`, adopt Sanity's typographic discipline + footer architecture, replace StellarConsole with an image-led 3-up case study grid.** Still David's portfolio — not a Sanity clone — but the structural moves are intentionally close enough that an Upwork client reads "engineer who ships polished work."

---

## 2. Color system

Replace the current `--color-saturn-*` tokens entirely. New palette:

```css
@theme {
  /* Brand */
  --color-brand: #00FF9D;                  /* electric mint, CTAs + accents + the 'live' dot */
  --color-brand-p3: color(display-p3 0 1 0.616);
  --color-brand-dim: #00CC7E;              /* hover state for brand fills */

  /* Inks (warm near-black, NOT pure) */
  --color-ink-base: #0B0B0B;
  --color-ink-dim: #212121;
  --color-ink-faint: #353535;

  /* Surfaces */
  --color-bg-base: #0B0B0B;                /* dark default */
  --color-bg-dim: #1A1A1A;
  --color-bg-elevated: #212121;

  /* Foregrounds */
  --color-fg-base: #FFFFFF;
  --color-fg-dim: #B9B9B9;
  --color-fg-faint: #797979;

  /* Borders */
  --color-border-base: #FFFFFF;
  --color-border-dim: #353535;
  --color-border-faint: #212121;

  /* Light theme inverse (for the 3-way theme toggle) */
  --color-bg-light-base: #FFFFFF;
  --color-bg-light-dim: #EDEDED;
  --color-fg-light-base: #0B0B0B;
  --color-fg-light-dim: #4A4A4A;
  --color-fg-light-faint: #797979;
}
```

**Saturn-gold (`#D4A574` / `#F5E6D3` / `#C89860`) is deleted.** Anywhere it appears in code, replace with brand mint OR fg-base depending on role.

---

## 3. Typography

**Keep Space Grotesk + JetBrains Mono** (user picked "keep Framer + enforce restraint" — same logic applies here: keep current font choices but enforce Sanity's contract on top).

The contract:
- **Headlines ALWAYS weight 400** (never bold). Confidence comes from size + tight tracking, not weight.
- **Mono everywhere** that isn't body text or headlines: eyebrows, badges, captions, metadata, button labels in chips, version stamps.
- **Negative tracking scales with size**: `-0.04em` at hero, `-0.03em` page heading, `-0.02em` section, `-0.01em` body, `0` mono.
- **`text-balance` on every H1/H2** for natural line breaks.
- **`max-w-[12ch]` cap on hero H1** so the 3-word headline breaks "Code / shapes / form." across 3 lines.
- **`text-box: trim-both cap alphabetic`** on display classes (cuts the optical air above caps).

Scale tokens (copy-paste into globals.css):
```css
/* Hero — 60→72→96→112px, lh 1.05, -0.04em, weight 400 */
--text-page-xl: clamp(60px, 8vw, 112px);
/* Page heading lg — 50→60→72px, lh 1.05, -0.04em */
--text-page-lg: clamp(50px, 6vw, 72px);
/* Section heading — 30px, lh 1.1, -0.02em */
--text-section: 30px;
/* Body xl — 24→28→32px, lh 1.2, weight 425 (custom) */
--text-body-xl: clamp(24px, 2.5vw, 32px);
/* Body md — 18px, lh 1.5 */
--text-body: 18px;
/* Body sm — 15px, lh 1.5 */
--text-body-sm: 15px;
/* Eyebrow / micro — mono 13px, UPPERCASE, lh 1.3, ZERO tracking */
--text-eyebrow: 13px;
/* Caption — mono 12-13px, sentence case */
--text-caption: 12px;
```

---

## 4. Spacing & grid

Adopt Sanity's PX-mapped ladder (NOT Tailwind's default 4px steps):
- Core: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128`
- Section vertical padding: `py-96 md:py-128`
- Container max-width: `max-w-[1248px]` (readable cap inside 1920px shell)
- Horizontal margin: `--margin-x: max(1.5rem, (100vw - 1920px) / 2)`
- Card padding: `p-24` default, `p-16` for image overlays, `p-12` for chips
- Radii: `rounded-[5px]` chips, `rounded-[6px]` rows, `rounded-[11px]` cards, `rounded-full` buttons

---

## 5. Page architecture (top to bottom)

| # | Section | Spec |
|---|---------|------|
| 0 | **Announcement bar** | `~36px`, inverse colors (white text on `bg-ink-base`), single line + arrow link. Copy: **"Currently shipping for clients in 🇺🇸 🇧🇷 🇬🇧 → add yours"**. Links to `#contact`. |
| 1 | **Top nav** | 67px sticky `bg-bg-base`, max-w-1920 inner cap. Logo DVD wordmark left at h-31px. Center: 4 ghost links — **Work / About / Process / Contact**. Right cluster: 3 buttons — `LinkedIn` (ghost) · `Email` (outline) · `Hire me` (brand mint fill). Mobile: hamburger after Hire me button → fullscreen `<dialog>`. |
| 2 | **Hero** | 100dvh − announcement bar. `bg-ink-base` with abstract glitch loop at 35-40% opacity. Headline left-aligned: **"Code shapes form."** in 60→72→96→112px weight 400, `max-w-[12ch]` cap (breaks into 3 lines). Subhead 40ch below: **"Engineer building landing pages that ship in the first 3 seconds. Available for product teams."** 3 CTAs row: `Start a project` (brand fill) · `See selected work` (outline) · `npx hire-david` (mono, click-to-copy). |
| 3 | **Trust marquee** | 72px tall, `bg-brand` (mint), horizontal infinite marquee. Logos render in `bg-ink-base` (filter brightness-0). Leading label baked into loop: "Currently shipping for". Logos: Upward · Smart Hardwood Floors · Luxor · Phoenix · PeçaAí · Wood Frame · (others). `data-pause-on-hover`. |
| 4 | **Selected work (replaces StellarConsole)** | Image-led card grid, 3-up on desktop, stacks on mobile. Each card: full-bleed screenshot hero (from `public/screenshots/*.webp`), overlaid wordmark at top-left, result-led headline below image ("Built and ship a digital studio" for Upward), tagline, tech-stack chip row, "Visit Surface →" link. Hover: image scale 1.03 + brand mint underline on headline. 6 cards (current PROJECTS array). |
| 5 | **How I Work** | 4-step process row. Each step: big mono numeral (01, 02, 03, 04) in brand mint, label, 2-3 sentence description. Steps: **01 Discovery & scope** → **02 Wireframes + tech plan** → **03 Build in the open** → **04 Ship + handoff**. Replaces a "Pricing" section. |
| 6 | **About** | Drop the helmet visor PNG. Keep the RadioTimeline (works in any palette). Bio in two columns: left = portrait photo (you'll need to provide one), right = 3 paragraphs (Origin / Mission / Trajectory) + Studio block (Upward co-founder link). |
| 7 | **Skills** | Repaint the existing constellation. Change line color from saturn-gold to brand mint. Change drop-shadow tint to mint. Keep the 6 clusters + brand-colored icons. Mobile fallback grid stays. |
| 8 | **Contact** | Same 3-channel cockpit (WhatsApp / LinkedIn / Instagram). Repaint border + glow to brand mint instead of saturn-gold. Status pill at top changes to mint dot. |
| 9 | **Footer** | **THE SIGNATURE MOVE.** Full clone of Sanity's 3-block structure. See section 6 below for exhaustive detail. |

---

## 6. Footer spec (priority section)

`bg-ink-base` forced dark regardless of theme. 3-block vertical stack with `gap-y-48`.

### Block 1 — Top row
**Left rail (32px display CTAs):**
1. `"Join the conversation on LinkedIn →"` — `text-[32px] leading-[1.2] text-balance` + arrow icon `h-30 w-30 -left-6`. Routes `https://linkedin.com/in/david-romualdo-a50b1231a/`.
2. `"Subscribe to my newsletter"` — same 32px sentence with **`Subscribe`** as an inline `data-size="lg" data-mode="primary"` mint pill. Routes `/newsletter` (placeholder page or mailto for now).

**Right side — 4-column nav grid:** `grid-cols-2 md:grid-cols-4 gap-24`. Column headers in `text-eyebrow text-fg-faint`. Link style: `text-fg-base hover:underline` (no color change on hover).

- **Column 1 — "Work"**: Upward · Smart Hardwood Floors · Phoenix · PeçaAí · Luxor · Wood Frame
- **Column 2 — "About"**: Origin · Mission · Studio (Upward) · Process · Stack · Timeline
- **Column 3 — "Channels"**: WhatsApp · LinkedIn · Instagram · GitHub · Email
- **Column 4 — "Trust"**: Privacy · Terms · Accessibility · License (CC BY 4.0 textures)

### Block 2 — GIANT centered DVD wordmark
- Centered SVG of the existing DVD logo
- Scales: `h-[36px] md:h-64 lg:h-[120px]` (NOTE: Sanity uses 82px but spec says scale to 82-120 — go 120px on lg)
- `fill="white"` — no glow, no gradient, no animation
- Container padding: `py-48 md:py-96 lg:pb-[256px]` — that 256px breath is THE move
- NO manifesto line above. Silence.

### Block 3 — Meta row
Wrapper: `flex flex-col items-center gap-y-24 lg:flex-row lg:justify-between`.

**Left group — "Keep in touch" socials:**
- Mini-heading `text-eyebrow text-fg-faint`
- Horizontal `<ul>` with 5 icons: GitHub · LinkedIn · Instagram · WhatsApp · X (or Bluesky if he prefers)
- Size: `h-icon-md w-icon-md`, color `text-fg-dim hover:text-fg-base`

**Right group — copyright + flags + status pill + theme toggle:**
- **Copyright**: `© DVDDEV` uppercase, no year, no "all rights reserved"
- **Flags row** (replaces Sanity's locale clock): mini-heading `Shipped for clients in` + 🇺🇸 🇧🇷 🇬🇧 (24px icons or unicode flags). Hover tooltip per flag with city/project: `Birmingham · Connecticut · São Paulo`. **Two lines, gap-y-8** baseline-aligned with © line.
- **Status pill** — small button: green dot (`bg-brand`, asymmetric blink 1.6s — opacity 1 → 0 at 60% keyframe) + label `Available for work`. Links to `#contact`.
- **Theme switcher** — 3-way segmented radio: Light (sun icon) · System (desktop icon) · Dark (moon icon). `<input type="radio" name="theme-switch">`. Persists in localStorage. Default: System.

### Negatives (don't add)
- No newsletter email input field (button → /newsletter page)
- No "back to top" button
- No version stamp
- No manifesto line
- No certification badges
- No language selector

---

## 7. Motion contract (enforce on existing Framer Motion)

Per Sanity restraint:
- **Hovers**: color/opacity only. NO scale, NO skew, NO translate (except 1-2px lift on case study cards), NO bounce.
- **Transitions**: 200ms (snappy UI), 500ms (slow editorial color swaps), 1000ms (very slow ambient). Easing: `cubic-bezier(.4, 0, .2, 1)` (material standard) — only one curve site-wide.
- **No springs** with bounce. Use `tween` with `ease: [0.4, 0, 0.2, 1]` or `easeOut`.
- **Card hover**: `scale(1.02)` max + brand mint underline reveal on title. Nothing else.
- **Pulse / blink**: status dot ONLY, asymmetric 1.6s with opacity dropping at 60% keyframe (Sanity's recording-heartbeat feel).
- **Marquee**: linear infinite, pause on hover.
- **Reveals**: `useInView` with `once: true`, fade + 12px translate-y, 600ms easeOut. No stagger > 100ms.
- **Cursor**: standard. No custom cursors, no magnetic hover.

---

## 8. New components needed

```
src/components/ui/
├── AnnouncementBar.tsx     [NEW] — 36px inverse strip with arrow link
├── NavBar.tsx              [NEW] — 67px sticky with 4 ghost links + 3 right CTAs
├── ThemeToggle.tsx         [NEW] — 3-way segmented Light/System/Dark
├── StatusPill.tsx          [NEW] — Available pill + asymmetric green dot
├── TrustMarquee.tsx        [NEW] — mint marquee of client wordmarks
├── WorkCard.tsx            [NEW] — image-led case study card
├── HowIWorkSteps.tsx       [NEW] — 4-step process row
├── FooterTopBlock.tsx      [NEW] — Block 1 of footer (CTAs + 4 cols)
├── FooterWordmark.tsx      [NEW] — Block 2: giant centered DVD
├── FooterMetaRow.tsx       [NEW] — Block 3: socials + flags + status + theme

DELETE / archive:
├── StellarConsole.tsx      → remove, replaced by WorkCard grid
├── HelmetVisor.tsx         → remove (drop the astronaut)
├── BouncingDVDLogo.tsx     → already deleted
└── (audit anything else saturn-gold-only after refresh)
```

Plus:
- `src/contexts/ThemeContext.tsx` — track theme, persist localStorage
- `src/hooks/useTheme.ts` — consume theme + setter

---

## 9. Hero video sourcing

Source: free-stock with explicit commercial license.

Specific query to try first (Pexels, no attribution required):
- `abstract glitch background loop` → filter Videos · Landscape · ≥1440p

Encoding plan (using ffmpeg locally):
1. Download MP4 in highest quality available.
2. Trim to 15-20s seamless loop point.
3. Encode TWO outputs:
   - **WebM (VP9)**: `ffmpeg -i in.mp4 -c:v libvpx-vp9 -crf 32 -b:v 0 -an -row-mt 1 hero-glitch.webm`
   - **MP4 (H.264)**: `ffmpeg -i in.mp4 -c:v libx264 -crf 25 -preset slow -an hero-glitch.mp4`
4. Extract poster JPG from frame at t=0.5s:
   - `ffmpeg -i in.mp4 -ss 0.5 -frames:v 1 -q:v 3 hero-glitch-poster.jpg`
5. Target sizes: WebM ≤ 4 MB mobile / ≤ 12 MB desktop. MP4 fallback for Safari < 14 if still needed.
6. Save to `public/hero-glitch.webm`, `public/hero-glitch.mp4`, `public/hero-glitch-poster.jpg`.

Update `HeroVideoBg.tsx` with `<video autoplay loop muted playsinline preload="metadata" poster="/hero-glitch-poster.jpg">` + two `<source>`. Opacity 40% on a `bg-ink-base` floor.

---

## 10. Execution phases (with rough token estimates)

| Phase | Scope | Tokens (out) | Build/push cycles | Notes |
|-------|-------|-------------:|-----:|-------|
| **0. Prep** | This brief committed; npm package optional (`npx hire-david`) | 5K | 1 | DONE if this file commits cleanly |
| **1. Token swap** | Replace globals.css palette/type/spacing tokens; mass `text-saturn-*` → semantic; build passes | 8K | 2 | Foundation. Site will look "wrong" mid-flight |
| **2. Chrome (nav + footer)** | NavBar + AnnouncementBar + Footer (all 3 blocks) + ThemeToggle + StatusPill + ThemeContext | 35K | 3 | Heaviest visual change; the "wow" |
| **3. Hero rewrite** | Hero copy + 3-CTA cluster + glitch video sourcing + encoding + integration | 18K | 2 | Includes hero video. ffmpeg locally |
| **4. Work section** | Drop StellarConsole; build WorkCard + grid; wire screenshots from public/screenshots/ | 15K | 2 | Reuses existing screenshot library |
| **5. Sections** | TrustMarquee + HowIWorkSteps + About refresh (drop helmet) + Skills repaint + Contact repaint | 25K | 2 | Bulk of content sections |
| **6. Motion audit** | Sweep existing animations to honor restraint contract (color/opacity only, single curve) | 8K | 1 | Smaller, mostly find/replace |
| **7. Polish + push** | A11y pass, mobile QA via Playwright screenshot script, performance check, sitemap update, final commit + push | 10K | 2 | Last-mile |
| **TOTAL** |  | **~124K** | ~15 | Plus all the input tokens. Realistically 1.5-2× output budget. |

**Recommendation if budget is tight:**
- Phase 0 + Phase 1 + Phase 2 is the MINIMUM viable refresh — that already changes 80% of the perceived identity. The new footer + nav + brand color is what people will notice. Sections can stay Saturn-themed temporarily without breaking.
- Phase 3-5 are deeper but can wait for a second session.
- Phase 6-7 are polish — defer to a third session.

---

## 11. Open items (need David input later)

1. **Portrait photo** for the About section (Phase 5). Any photo of David in formal/business-casual lighting, 1:1 crop at minimum 1200×1200. He'll drop it in `public/portrait.jpg`.
2. **`npx hire-david` package contents** — if we go ahead with publishing, what should it print? Email + WhatsApp + LinkedIn + "DM me on Instagram"? David picks the format.
3. **Which 5-6 client logos** for the TrustMarquee — currently only Upward + Smart Hardwood Floors are real clients. Phoenix/PeçaAí/Luxor/Wood Frame are case-study brands he built — borderline. Maybe label the marquee "Selected work" instead of "Trusted by".
4. **3-way theme toggle** requires a fully designed Light variant. Currently dvddev.com has NO light mode CSS. Phase 2 will design it from scratch. Confirm: text color in light = `#0B0B0B`, bg in light = `#FFFFFF`, brand stays mint? Or does brand become a darker mint in light mode?
5. **Newsletter button** in footer — does this route to a real `/newsletter` page (needs design), or just `mailto:nextnumberdev@gmail.com?subject=Newsletter`? Phase 2 decision.

---

## 12. Source of truth files

- `reference/sanity-spec.md` — 726-line extraction of sanity.io (input)
- `reference/dvddev-redesign-brief.md` — THIS FILE (decisions + spec)
- Future: `reference/redesign-changelog.md` — append-only log of phase commits as they ship

---

*End of brief. Open this file at the start of any redesign session — it's the contract.*
