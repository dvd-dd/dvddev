# Sanity.io reference spec
> Captured for dvddev.com redesign inspiration.

## 1. Page inventory

**Home (`/`)** — Top-of-funnel awareness + activation. Frames Sanity as "The Content Operating System for the AI era" with a dimmed video hero, a value-prop ladder (structured content → automation → Content Agent), a tabbed AI-bot demo (Marketing/Learn/Pricing personas), a 5-card product-pillar grid, a metrics-plus-quote social-proof mosaic, an enterprise trust block, and a final dual-CTA with three install pathway cards (CLI / MCP / Agent Toolkit). Funnel role: capture → educate → push to /get-started.

**Studio (`/studio`)** — Mid-funnel product education. Hero pairs a TypeScript schema snippet with a Studio screenshot to sell the "all-code, customizable headless CMS" pitch. Sub-sections cycle through customization carousels, collaboration carousels, an AI-included Content Agent block, a DX feature carousel, and a 4-tab "out of the box" feature matrix (Authoring / Schema / Collaboration / AI). Funnel role: convince technical buyer to start a project.

**Customers (`/customers`)** — Mid/bottom social proof. Featured PUMA hero with metric callouts, a "Behind the Experience" video series, a faceted-filter card grid of ~30+ named customer stories, and a 60+ logo wall. Funnel role: credibility for enterprise buyers and self-segment by industry/integration.

**Pricing (`/pricing`)** — Bottom-of-funnel activation. Three-tier card row (Free / Growth recommended / Enterprise), Growth add-ons, a customer logo strip, then an exhaustive ~11-category comparison table with hard quotas and overage pricing, a PUMA testimonial, and a ~30-question FAQ accordion. Funnel role: self-serve conversion or qualify into sales.

**Enterprise (`/enterprise`)** — Sales-assisted bottom funnel. Hero with omni-channel mockup collage, customer logo grid, Mejuri case study, four pillar feature blocks (structured content, custom workflows, scale, managed infra), an enterprise feature checklist, a Morning Brew quote, reliability pillars (SOC 2, GDPR, CCPA, 99.9% uptime), G2 badge grid, a PUMA testimonial carousel, and a dedicated demo-request form. Funnel role: lead capture for enterprise sales.

**Docs (`/docs`)** — Activation/retention for developers. Cmd+K AI-powered search hero, framework quickstart grid (Next.js / Astro / Nuxt / React Router), popular-destination guide cards, an AI-powered development promo card, three platform pillar cards, a 6-card Sanity Apps showcase, and reference docs grid. No carousels — pure link-grid driven. Funnel role: reduce time-to-first-success.

**Blog (`/blog`)** — Awareness + retention. Featured article hero with category pills + author meta, category filter row, vertical card feed of ~18 reverse-chronological posts (product / engineering / AI), load-more pagination, and Discord + newsletter engagement block. Funnel role: SEO, brand authority, ongoing developer engagement.

**About (effective home variant)** — Same content as Home in this capture; reinforces the "Structure powers intelligence" positioning with use-case grid, social proof mosaic, enterprise band, and install-pathway final CTA.

---

## 2. Design system

### 2a. Color palette

**Signature brand color**
- `--color-brand: #ff560a` (electric traffic-cone orange, the 2024-25 rebrand). Wide-gamut companion: `color(display-p3 1 .3333 0)`. Fallback shorthand `#f50`. Used on primary CTAs and the trust-marquee strip under hero.

**Core neutrals**
- `--color-black: #0b0b0b` (warm near-black, deliberately not pure)
- `--color-white: #fff`
- `--color-gray-100: #ededed`
- `--color-gray-200: #d6d6d6`
- `--color-gray-300: #b9b9b9`
- `--color-gray-500: #797979`
- `--color-gray-700: #4a4a4a`
- `--color-gray-800: #353535`
- `--color-gray-900: #212121`

**Semantic tokens — LIGHT theme** (`[data-theme=light]`)
- bg-base `#fff` / bg-dim `#ededed` / bg-inverse-base `#0b0b0b` / bg-inverse-dim `#212121`
- fg-base `#0b0b0b` / fg-dim `#4a4a4a` / fg-faint `#797979`
- border-base `#0b0b0b` / border-dim `#d6d6d6` / border-faint `#ededed`
- focus-ring `#0b0b0b`

**Semantic tokens — DARK theme** (`[data-theme=dark]`)
- bg-base `#0b0b0b` / bg-dim `#212121` / bg-inverse-base `#fff` / bg-inverse-dim `#ededed`
- fg-base `#fff` / fg-dim `#b9b9b9` / fg-faint `#797979`
- border-base `#fff` / border-dim `#353535` / border-faint `#212121`
- focus-ring `#fff`

**Accent ramps (4 steps each, all with P3 companions)**
- BLUE — 100 `#afe3ff` / 300 `#55beff` / 500 `#0084f8` / 700 `#0052ef`
- GREEN — 100 `#96ff6f` / 300 `#45ff00` / 500 `#00fe00` / 700 `#19d600` (CRT neon)
- MAGENTA — 100 `#fcb9ff` / 300 `#fa84ff` / 500 `#ff23fc` / 700 `#f500ff`
- YELLOW — 100 `#fcffd6` / 300 `#ffff9f` / 500 `#fdfe00` / 700 `#fff500`

**State**
- `--color-fg-error` light `#d00`, dark `#f22`. No dedicated success/warning/info — green/yellow/blue accent ramps reused.

**Shadow (cool-blue tint, not black)**
- umbra `#14171f0d` (5%) / penumbra `#14171f14` (8%) / ambient `#14171f30` (19%)

**Editorial spot blocks (inline-hardcoded on tiles, not in token system)**
- `#FEFAE1` cream/butter block bg
- `#E7FEF5` mint block bg
- `#132823` deep forest tile (dark mode)
- `#2C201B` espresso tile (dark mode)
- `#D8931B` mustard accent
- `#955712` burnt orange shadow
- `#13C184` emerald CTA accent
- `#0D794C` deep emerald hover

**Legacy palette (still shipped in parallel)**
- `--red: #ef4434` / `--blue: #3274ff` / `--green: #3ab564` / `--yellow: #965908` / `--orange: #ba5f1e` / `--purple: #8f57ef` (each with `*--dark` variants).

**Theme handling**
- Attribute-driven via `<html data-theme="light|dark" data-rebrand="true">` paired with CSS `color-scheme: light|dark`. No `prefers-color-scheme` media query — JS-controlled and persisted. `.dark:` Tailwind variant generated for per-component overrides.

### 2b. Typography

**Font families**
- `--font-sans: "waldenburgNormal"` (self-hosted woff2, weights 400 / 400-italic / 600). Custom neo-grotesk (Helvetica/Akzidenz family). Adobe-arial fallback uses `ascent-override:90.4%; descent-override:23.1%; size-adjust:106.08%` to prevent CLS.
- `--font-mono: "ibmPlexMono"` (weights 400 / 400-italic / 700 / 700-italic). Used not just for code but for ALL eyebrows, badges, captions, metadata.

**Hero headline**
- `text-page-heading-xl` — 50px mobile → 60px @48rem → 72px @64rem (also seen scaling 60 → 72 → 96 → 112px on `/`)
- Weight **400** (not bold — confidence through size)
- line-height 1.05
- letter-spacing -0.04em
- text-box: trim-both cap alphabetic
- `lg:max-w-[12ch]` cap forces 3-line break "Structure / powers / intelligence"

**Page heading scale**
- lg: 50→60px, lh 1.05, -0.04em
- md: 42→48px, lh 1.08, -0.035em
- sm: 38px, lh 1.1, -0.03em

**Section / component heading**
- `text-component-heading-lg`: 30px / lh 1.1 / -0.02em / weight 400
- md: 24px / lh 1.1 / -0.01em
- sm: 20px / lh 1.1 / -0.01em

**Token header scale (`--header1..6`)**
- h1 59px lh 64/59; h2 49px lh 52/49; h3 39px lh 44/39; h4 31px lh 36/31; h5 25px lh 28/25; h6 20px lh 24/20
- Default token weight 700 but page CSS overrides to 400 — *system permits bold, brand picks regular*.

**Body scale**
- xs 13px / lh 1.3
- sm 15px / lh 1.5
- md 18px / lh 1.5 / weight 400
- lg 24px / lh 1.24 / weight **425** (custom)
- xl 24→28→32px / lh 1.13–1.24 / weight 425
- All -0.01em

**Eyebrow / micro label**
- font-mono, UPPERCASE, letter-spacing **0** (no fake tracking)
- 13px (standard) or 10px (pill chip)
- text-box: trim-both cap alphabetic
- weight 400, lh 1.3

**Caption / detail**
- font-mono, sentence case, 13px or 12px, lh 1.5, weight 400

**Code**
- IBM Plex Mono, 15/13/12px, lh 1.5, weight 400

**Button label**
- Inherits body sans (Waldenburg) at weight 400-500, NOT uppercase
- Small chip variant: IBM Plex Mono uppercase 10px
- Pill height (data-size=md) ~35px

**Weight palette (whole site)**
- 400 dominant (366 declarations); custom **425** for large body; 500 for medium UI; 600 for Waldenburg Fett; 700/800 only in token presets

**Line-height palette**
- 1.5 (body/code, 158 uses); 1.3 (UI/eyebrow, 102); 1.1 (headings, 74); display 1.05–1.24

**Letter-spacing**
- Negative tracking scales with size: -0.04em hero → -0.03em → -0.02em → -0.01em → 0 (body/mono)

**Distinctive signatures**
1. Waldenburg neo-grotesk + IBM Plex Mono — only two families
2. Headlines stay weight 400 (never bold)
3. Mono everywhere as UI face, not just code
4. Custom 425 weight for lead body
5. `text-box: trim-both cap alphabetic` on most text classes
6. Ratio line-heights `calc(64/59)` etc.
7. No italics, no serif pairing

### 2c. Spacing & grid

**Foundation**
- Custom Tailwind v4: utility number maps to PX value, not 4px steps. `py-96` = 6rem = 96px. `gap-24` = 24px.
- Core ladder: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128

**Section vertical padding**
- Marketing: `py-96 md:py-128` (96px → 128px) — the default hero/section rhythm
- Compact bands: `py-24` (nav, banners)
- Inner sub-blocks: `py-48`, `pt-64`
- CSS var `--section-padding-y: 4.5rem` → 5rem → 8rem at breakpoints

**Container max-widths**
- Outer shell cap: `max-w-[1920px]` (navbar)
- Readable content cap: `--max-content-width: 1248px` (via `container-x` utility)
- Prose: `max-w-[50ch] / [40ch] / [16ch]`
- Sidebars: `max-w-[360px] / [300px]`

**Horizontal gutter**
- `--margin-x: max(1.5rem, (100vw - 1920px) / 2)` — 24px minimum, auto-centers past 1920px
- Inner row padding: `px-12` (most common), `px-24` (section inner), `px-32` (mega-menu)

**Grid**
- 12-column with `--column-width` math; default `--gutter: 24px` (also 4px and 0px variants)
- Custom utilities `w-cols-1..10` and `col-span-N`
- Most-used: `grid-cols-2` (15x), `grid-cols-12` (3x master), responsive `min-[700px]:grid-cols-2 min-[1200px]:grid-cols-3`

**Gap scale**
- `gap-8` (44x) and `gap-4` (37x) for text rows
- `gap-x-24` (16x) matches gutter
- `gap-y-32 / 48 / 96 / 128` for block / hero stacks

**Card padding ladder**
- p-12 (chips / menu items, 48 uses)
- p-16 (image overlays, e.g. `border bg-bg-dim p-16`)
- p-24 (feature cards, default)
- Radii: `rounded-[5px]` chips, `rounded-[6px]` rows, `rounded-[11px]` cards, `rounded-full` buttons

**Button heights (data-size scale)**
- sm: min-h ~25px, padding 2px/8px
- md: min-h ~35px, padding 4px/12px (default nav/CTA)
- lg: min-h ~45px, padding 8px/32px
- Hero override: `!h-[100px] md:!h-[140px] !p-24 !text-[38px] lg:!text-[60px]`
- Nav row: `h-[67px]`
- All pills `rounded-full`, font-mono, 13px, uppercase

---

## 3. Page chrome

### 3a. Top navigation

**Shell**
- `<header>` sticky `top-0 z-200 h-[67px]`, full-width with `max-w-[1920px]` inner cap, `bg-bg-base` (NOT transparent over hero — solid for legibility), `px-margin-x`, `duration-200 ease-in-out`, `data-scrolled="false"` attribute toggled by JS for state-driven look (shadow/border on scroll)
- 67px tall

**Logo**
- Wordmark-only inline SVG (`viewBox 0 0 280 102`), rendered `h-[31px]`, `text-fg-base` (inherits theme), `transition-colors`
- Wrapped in `<a href="/" aria-label="Home">`

**Primary links (left cluster)**
- `<ul>` with `ml-12 flex gap-x-16`
- Order: **Products** (mega-menu) / **Solutions** (mega-menu) / **Resources** (mega-menu) / **Docs** / **Enterprise** / **Pricing**
- All use Button primitive `data-mode="ghost" data-size="md"`

**Mega-menu pattern**
- Native `<dialog popover>` anchored via CSS `anchor-name`/`anchor()`
- Full-bleed: `fixed top-[anchor(...)_bottom] left-0 w-screen`
- Panel: `border-t-16 border-t-transparent border-b border-b-border-faint bg-bg-base px-32 pt-12 pb-24 transition-opacity`
- Inner wrapper centered, capped `md:max-w-cols-10`
- Each panel: TWO label-style section headings (`text-label-sm text-fg-faint p-12`) + link lists (`text-component-heading-md group-hover:underline`) + a promo card on the right with image + headline + CTA

**Mega-menu contents (summary)**
- **Products**: Content operations (Studio, Content Agent, App SDK, Media Library, Content Releases, Agent API) + Content backend (Content Lake, Sanity Context, MCP Server, Compute, Live CDN) + promo "Start building for free"
- **Solutions**: By Industry (E-commerce, Media, SaaS) + By Team (Developers, Editors, Product Owners, Business Leaders) + promo "Tecovas customer story"
- **Resources**: Build and Share (101, Learn, Pioneers, Frameworks, Templates, Tools, Schemas, Community) + Insight (Blog, Events, Customer Stories, Guides) + promo "Swag store"

**Right CTAs (`Navbar-module__rightMenu`, `flex gap-x-8`)**
- **Log in** — ghost — `/entry?ref=navbar`
- **Contact Sales** — outline — hidden `max-sm:!hidden`
- **Get started** — brand (orange filled) — `/get-started?ref=navbar`

**Mobile**
- Hamburger button right of Get started (`aria-label="Open menu"`, Sanity iconophor menu icon)
- Opens fullscreen `<dialog id="mobile-menu">` (`top-0 left-0 z-50 h-full w-full bg-bg-base`)
- Mobile header inside: 67px with logo + Close menu button
- `animate-dialog` keyframes

**Skip link / a11y**
- First focusable: `Skip to content` → `#main`, positioned off-screen `fixed top-0 left-full m-12`, snaps in via `focus-within:left-0`
- `<nav aria-label="Main navigation">`
- Mobile dialog `aria-modal="true"`

**Notable negatives**
- No search icon, no notification dots, no version flags, no `New`/`Beta` badges

### 3b. Footer (PRIORITY — clone target)

**Shell**
- `<footer>` forced `data-theme="dark"` regardless of page theme (dark twice — outer + inner)
- `bg-bg-base` = near-black `#0b0b0b` (warm off-charcoal, not pure black)
- Padding: `px-margin-x py-24` (outer); internal stack adds much more
- No gradient, no illustration, no background pattern — pure flat dark canvas, all interest from typography + scale

**3-block vertical structure** (the defining move)
- Outer: `flex flex-col gap-y-48`
- BLOCK 1 (top): CTAs left + 4-column nav right
- BLOCK 2 (middle): GIANT centered wordmark, alone on its row
- BLOCK 3 (bottom): socials left + meta right

---

**BLOCK 1 — Top row**

Top wrapper: `flex flex-col justify-between gap-y-48 xl:flex-row` (stacks until xl)

**Left rail — Two display-size CTAs (32px treated as mini-headlines)**

1. **Discord CTA**
   - Text: "Join our community on Discord →"
   - `text-body-lg !text-[32px] !leading-[1.2] !text-balance`
   - `mb-8` to next item
   - Arrow icon `h-[30px] w-[30px] -left-[6px]` (optical baseline align)
   - Hover: underline reveals
   - Target: `https://snty.link/community` (`target="_blank"`)

2. **Newsletter CTA** (NOT a form — a button + sentence)
   - Text: "Subscribe to our newsletter"
   - "Subscribe" is a large primary pill `data-size="lg" data-mode="primary"` inline within the 32px sentence
   - Routes to `/newsletter` page (no inline email input anywhere)
   - `aria-label="Subscribe to our newsletter"`

Responsive choreography: column → row → column (`md:mr-16 md:flex-row md:justify-between xl:flex-col xl:justify-start`)

**Right side — 4-column link nav**

- Grid: `grid grid-cols-2 gap-24 md:grid-cols-4`
- Column header: `mb-24 text-label-sm text-fg-faint` (tiny faint caps-feel)
- Link list: `space-y-12`
- Link style: `text-detail-md text-fg-base hover:underline` (off-white, underline on hover only — no color change)

**Column 1 — "Products" (15 links)**
Sanity Studio, Media Library, Sanity Context, Canvas, Content Agent, MCP Server, Content Releases, Insights, App SDK, Content Lake, Live CDN, Compute, Agent Actions, AI Assist, Use cases

**Column 2 — "Resources" (20 links — fattest)**
Docs, Sanity 101, Sanity Learn, Tools and plugins, Pioneers, Frameworks, Templates, Schemas and snippets, Guides, Headless CMS explained, Resource library, Explainers, Enterprise CMS guides, Headless CMS Guides, Enhancing your CMS with AI, Agent context guides, Compare Sanity, Glossary, Pricing, For agents (links to `/llms.txt`)

**Column 3 — "Company" (9 links)**
Contact, Blog, Shop, Events, Careers, Changelog, Customer Stories, Agency Partners, Technology Partners

**Column 4 — "Trust and compliance" (8 items — NOT "Legal")**
Privacy policy, Terms of service, Accessibility statement, Transparency statement (PDF), Security and compliance, Responsible disclosure, Open Source Pledge, Cookie preferences (this last one is a `<button>`, opens cookie modal)

---

**BLOCK 2 — GIANT "sanity" wordmark (THE signature move)**

- Centered SVG of wordmark (all lowercase) + a geometric mark on its LEFT
- viewBox `0 0 338 82`
- Scales fluidly: `h-[36px] md:h-64 lg:h-[82px]` (36px → 64px → 82px)
- `fill="white"` — solid white, no glow, no gradient, no animation
- Container: `flex place-content-center place-items-center`
- Padding: `py-48 md:py-96 lg:pb-[256px]` — on desktop, 96px above + **256px** below
- That massive 256px breathing room is the entire emotional move

---

**BLOCK 3 — Meta row**

Wrapper: `flex flex-col items-center gap-y-24 lg:flex-row lg:justify-between`

**Left group — "Keep in touch" socials**
- Mini-heading "Keep in touch" same `text-label-sm text-fg-faint` style
- Horizontal `<ul>` with `gap-16`, `max-md:justify-between`
- 7 icons (monochrome fill, `h-icon-md w-icon-md` ~24px, `text-fg-dim hover:text-fg-base`):
  1. GitHub (`github.com/sanity-io`)
  2. YouTube (`@sanity_io`)
  3. LinkedIn (`company/sanity-io`)
  4. Bluesky (`sanity.io`)
  5. X (`x.com/sanity_io`)
  6. RSS (`/feed/rss`)
  7. Discord (`/community/join`)
- Notable: Bluesky + X both included; NO Instagram, Facebook, TikTok, Slack

**Right group — copyright + locale clock + status pill + theme toggle (one wrapped line)**

- **Copyright**: `© SANITY ` (uppercase, no year, no "Inc.", no "all rights reserved")
- **Locale clock** — TWO LINES, gap-y-8:
  - `OSL, NOR (CET)`
  - `SFO, USA (PST)`
  - Container: `flex gap-x-48 text-fg-dim max-md:justify-between md:w-fit md:items-end` (baseline-aligns locale bottom with © line)
- **System status pill** — muted button linking to `sanity-status.com`, has a dot icon (currentColor, hydrated to green/yellow/red), default text "Loading system status..." replaced by JS, uses `_button data-size="md" data-mode="muted" !pr-16`
- **Theme switcher** — 3-way radio segmented control labeled "Change Site Theme" (visually-hidden legend), icon-only options Light (sun) / System (desktop) / Dark (moon), `<input type="radio" name="theme-switch">` with custom-styled labels, `data-size="md"`

---

**Manifesto line?** None. No "made with…", no tagline, no manifesto. The emotional message is carried 100% by the giant wordmark + locale-clock pair.

**Negatives (the absences that define it)**
- No email input field anywhere (newsletter routes to a page)
- No illustration, background pattern, photo, or marquee
- No "made in X with ❤" tagline
- No version/build stamp
- No language or region selector
- No "Back to top" button
- No sitemap link
- No certification badges (live behind `/security`)

**Five distinctive moves ranked for cloning**
1. GIANT centered wordmark with 96–256px breathing room
2. Locale clock pair (OSL/SFO with timezones) instead of corporate copyright
3. Display-size 32px CTAs treated as mini-headlines, not buried buttons
4. Reframing "Legal" as "Trust and compliance"
5. Live system-status pill with dot indicator

---

## 4. Hero pattern

**Section wrapper**
- `<section class="flex min-h-[calc(100dvh-var(--announcement-banner-height))] flex-col bg-black" data-theme="dark" data-transparent-nav="true">`
- Forced dark, solid `#0b0b0b` floor, fills viewport minus announcement bar
- `data-transparent-nav="true"` tells sticky nav to render transparent over hero
- Inner: `grid-new-vars relative isolate flex grow flex-col justify-center px-margin-x pt-96 pb-48`

**Background — looping WebM video on dark canvas**
- Absolutely positioned wrapper: `pointer-events-none absolute! inset-0 -z-10 size-full opacity-40`
- Video at **40% opacity** over `#0b0b0b` produces the "living dark"
- `<video autoPlay loop muted playsInline preload="auto" class="absolute inset-0 size-full object-cover">`
- 6 art-directed breakpoints, all WebM (VP9) from `cdn.sanity.io/files/3do82whm/next/`:
  - ≥2000px: `4c1ac609e9dba5829e5e20d5ce3bd38e8be4a0cf.webm`
  - ≥1600px: `689882a77274d5fb202f11df342c89b38e7a3527.webm`
  - ≥1200px: `9d1c5db057fa5ef347417b72f17b57fba892b9b3.webm`
  - ≥800px: `93b774bc512e56dd785670f3ae94bb796ad40eb8.webm`
  - ≥600px: `6d4885da7c8e953dc59f0422323ab15ad1c9f32c.webm`
  - ≥400px (mobile portrait 9x16, fallback): `81e32a01ca2f3d3c49b0d2294420c084ab418eb8.webm`
- Asset filename from Content-Disposition: `Sanity_AIBrandFilm_20s_v11_HERO_9x16_400w.webm` (20-second AI Brand Film)
- Sizes: 4.4 MB (mobile) → 27.6 MB (desktop)

**Poster / LCP**
- `<link rel="preload" as="image" fetchPriority="high">` to:
  - `https://cdn.sanity.io/images/3do82whm/next/5306c1d623c7fa616697ddfa0644c8bfb3efed3d-1920x1080.jpg?w=1920&q=75&fit=clip&auto=format`
- 1920×1080 JPG, rendered as sibling `<img>` until video paints (no `<video poster>` used)
- Inline base64 JPEG blur as `background-image` for LQIP

**Headline**
- Single H1, text: "Structure powers intelligence"
- Classes: `w-fit text-page-heading-xl text-[60px] leading-none text-balance text-fg-base min-[400px]:text-[72px] md:text-[96px] lg:max-w-[12ch] lg:text-[112px]`
- Sizes: 60 → 72 → 96 → 112px
- LEFT-aligned (not centered)
- `lg:max-w-[12ch]` cap produces 3-line "Structure / powers / intelligence" break
- line-height 1, weight inherited 400, color `text-fg-base` (white in dark theme)

**Subhead**
- Text: "The back-end built for AI content operations. Power web, mobile, and agentic applications at scale."
- Classes: `w-fit max-w-[40ch] pt-64 text-body-xl max-md:text-[20px] text-fg-base lg:pr-24`
- Sits 64px below H1, capped at 40 characters wide
- Bumped to 20px on mobile

**CTA cluster (3 buttons, flex row → column on mobile)**
- 48px below subhead
- **Start building** — `data-mode="brand"` (orange filled) → `/get-started`
- **Watch demo** — `data-mode="primary"` (white filled) → `/demo-request-homepage`
- **`npm create sanity@latest`** — `data-mode="outline"` (transparent + copy icon), font-mono, hidden on mobile, button (not anchor) — click-to-copy
- All ~55px min-height, large-size buttons
- Hover on first two darkens border + bg to black

**Trust strip directly under hero (still in fold)**
- 72px tall horizontal infinite marquee bar in brand orange `#ff560a`
- `data-theme="light"`
- Logos render BLACK (filter `brightness-0`) on orange — visually arresting handoff
- `data-marqy data-direction="left" data-pause-on-hover`
- Leading label "Trusted by leaders and innovators" baked into the loop
- Logos in order: loveholiday, Mejuri, Redis, Replit, Arc'teryx, Brex, Figma, Just Eat Takeaway.com, Shopify, Tecovas, Unity, Linear, Skims, Spotify, Anthropic, MoMA, Complex, Lady Gaga, Nordstrom, Rona, Hunter Douglas, Baggu

**Announcement bar (above nav)**
- Inverse colors (white on black), single anchor to Replit Buildathon
- Height = `--announcement-banner-height` CSS var (hero subtracts it to stay one viewport)
- Text: "Build with Sanity MCP in Replit. Prizes up for grabs! Submit by June 14 →"

**Hero stack from top**
1. Announcement bar (~36px)
2. Transparent sticky nav (67px)
3. Hero (100dvh − announcement)
4. Orange marquee (72px)

**Micro-interactions in hero**
- Video is the only motion — dimmed loop, no parallax/canvas/gradient shift
- Sticky nav has `duration-200 ease-in-out` keyed off `data-scrolled` (fades transparent → bg-base on scroll out)
- Orange logo marquee auto-scrolls left, pause-on-hover
- npm CTA: click-to-copy (button not anchor)
- `text-balance` on H1 nudges line breaks (static)
- NO typing effect, NO split-text reveal, NO scroll-jacking

---

## 5. Module / component patterns

**Feature card (use-case grid)**
- Icon/illustration top-left, eyebrow/category label, headline, paragraph, 3-5 bullet checklist, "Learn more →" link
- bg ~`#F5F5F5` warm neutral; radius 12-16px; left accent stripe 4-6px in brand color; shadow `0 2px 8px rgba(0,0,0,.06)`; 2-col grid desktop, 24px gap; card ~320-400px wide

**Customer testimonial card**
- Pull-quote (sometimes italic), attribution (name · title · company), companion metric (big number + label)
- Sometimes avatar or company mark
- Light/cream bg; 1px solid `#E0E0E0` border; 4px left accent in brand color; padding 24-32px; metric figure 32-48px / weight 700; rotates accent colors across grid

**Standalone quote callout**
- Decorative oversized quote glyph, large body, attribution, optional logo
- Quote text 18-24px / weight 500-600; left border accent ~6px; padding 32-48px; max-width ~700px; minimal/no shadow

**Stat / metric row**
- Horizontal strip of 4-6 numeric callouts
- Number 32-48px / weight 700; label 16-20px muted gray; transparent bg; no border (or hairline divider); 16-24px column gaps; equal-width columns
- Examples on home: "0 custom APIs", "300% faster release cycles", "90% updates owned by content team", "5x faster dev velocity", "144x faster product launches", "10k products updated in 30s"

**Code block widget**
- Language/command label, monospaced syntax-highlighted body, copy-to-clipboard button top-right
- bg `#1a1a1a → #2d2d2d`; 1px solid `#3a3a3a`; radius 8px; padding 16-20px; mono ~13-14px; max-width ~600px
- Lines fade in on scroll (`animation-timeline: scroll(nearest)`)

**Integration / logo tile**
- Square-ish tile, centered logo/icon, label, optional chevron-on-hover
- 120-160px tile; 1-2px hairline border; radius 8-12px; 4-6 col grid, 16-24px gaps

**CTA banner**
- Full-width: headline, subhead, primary solid + secondary outline button
- 60-80px vertical padding; button radius 8px; max-w inner ~800px; centered

**Resource / blog card**
- Optional thumbnail, category badge pill, headline, excerpt, date, "Read more"
- Radius 6-8px; shadow `0 1px 4px rgba(0,0,0,.05)`; padding 20-24px; 3-col desktop

**Feature bullet list**
- Small colored bullet/check, label, optional secondary description
- Bullet 6-8px in brand/accent; text 14-16px / weight 400; 12-16px row spacing

**Badge / pill label**
- Solid fill, no border, sometimes leading icon
- Radius 20-24px; padding 6-12px horizontal; text 12-14px / weight 500-600

**Trust-bar logo strip**
- Horizontal row of customer wordmarks in muted monochrome
- Single-color, equal vertical baseline, generous gaps, no background container

**Tabbed Content Agent showcase (home)**
- 3 tabs (Marketing Bot / Learn Sanity / Pricing Bot)
- Each tab: chat window mockup with input + 3 uppercase starter-question chips
- Tab switch swaps persona, "Learn More" CTA → `/context`

**Faceted filter row (customers, blog)**
- Horizontal pill buttons, active state via filled pill
- Categories: All / Product / Community / Engineering / Guides / Company / Content strategy / Digital strategy (blog); All Applications / All Integrations / All Industries (customers)

**4-tab "out of the box" feature matrix (Studio)**
- Tab labels: Authoring & Editing / Schema & Customization / Collaboration & Publishing / AI & Agentic Workflows
- Each tab swaps grid below with icon-led feature cards + arrow links to docs

**Pricing tier card row**
- 3 side-by-side cards: Free / Growth (`We recommend` badge) / Enterprise
- Bulleted include list with check icons
- Enterprise has TWO CTAs (Contact sales + Request a demo →)

**Pricing add-on card**
- Short description + price line + "Add to project" CTA button

**Long comparison table**
- Category headers (Users, Project Usage, Studio, Content Lake, Compute & AI, Media, DX, Delivery, Security, Support, Billing)
- 3 plan columns
- Inline pay-as-you-go price callouts in cells ("$1 per 250k", "$0.05 per AI credit")
- Sticky column headers on scroll
- Responsive collapse to plan-by-plan stacks on mobile

**FAQ accordion**
- ~30 question rows, vertical accordion, chevron/plus icon
- Answers contain deep links to docs/support
- Radix-style height animation via `--radix-accordion-content-height` CSS var

**Customer story card grid (customers)**
- Brand hero image, overlaid customer logo, result-led headline ("PUMA moves fast and gets global teams in sync", etc.)
- Hover lift/shadow with image zoom
- 4-5 per row responsive
- Load-more pagination

**Behind the Experience video carousel**
- 3 featured Mux-hosted video tiles with play overlays, dark cinematic styling

**G2 badge grid**
- 3x2 grid of G2 Spring 2025 badges (Momentum Leader, etc.)
- "All G2 reviews" CTA

**Framework quickstart card (docs)**
- 4-up grid (Next.js / Astro / Nuxt / React Router) with framework logo
- Color-coded by framework

**Install pathway sub-cards (final CTA home)**
- 3 cards: CLI Install, MCP Server, Agent toolkit
- Terminal/monospace accent on each

---

## 6. Motion language

**Stack — zero JS animation libraries**
- NO Framer Motion / GSAP / Lenis / Lottie
- All CSS + Tailwind v4 + tiny `marqy` primitive
- Scroll motion uses native CSS Scroll-Driven Animations (`animation-timeline: view()` and `scroll()`)
- `(scripting:none)` and `(prefers-reduced-motion)` fallbacks disable transforms

**Easing & duration tokens**
- House curves: `cubic-bezier(.4,0,.2,1)` (Material standard, dominant), `cubic-bezier(0,0,.2,1)` (decelerate), `cubic-bezier(.4,0,.6,1)`
- Durations cluster at 150 / 200 / 300 / 500 / 1000ms — no bouncy springs
- `ease-linear` for parallax + marquee
- `ease-in-out` for nav

**Nav**
- Sticky `top-0` with `duration-200 ease-in-out` bg swap
- `data-scrolled` attribute drives shadow/contrast change
- Logo: `transition-colors`

**Buttons (primary)**
- Color/background SWAP only — no scale, no translate, no shine
- Hover inverts bg vs fg: `bg-bg-inverse-base ↔ bg-bg-base`
- Hero CTA exception: oversized `h-[140px] text-[60px]` with `overflow-hidden` stages a hover image fade (`group/button + opacity-0 → opacity-100`)

**Links**
- Pure underline reveal: `text-underline-offset:.1em; text-decoration-thickness:.08em` on hover
- Accent variant swaps to blue pill (`bg-blue-700/color-white`) instead of underline

**Nav dropdowns**
- CSS anchor-positioned (`top-[anchor(--anchor bottom)]`) popovers
- `transition-opacity ease-out`
- State via `data-state="closed|open"`
- Items: `group-hover:underline` heading + `opacity-50 → 100` sub label
- Tiny brand-dot indicator: `size-[5px] transition-colors group-hover/sub:bg-brand`

**Parallax (use-case cards / hero tiles)**
- Inline style `--parallax:0px; transition:opacity 600ms linear`
- Img: `translate-y-(--parallax) scale-125 transition-transform ease-linear`
- JS updates `--parallax` on scroll; `scale-125` hides edges
- Linear timing for framerate smoothness

**Scroll reveals — native, no IntersectionObserver**
- `data-motion-entry`, `data-panel`, `data-trigger-card`, `data-customer-testimonial`, etc.
- `@keyframes animate-entry { 0%{opacity:0} to{opacity:1} }`
- `animation-timeline: view(0); animation-range: var(--animate-entry-range, entry 20vh entry 50vh)`
- `@media (scripting:none)` fallback → `opacity:1!important`

**SVG flow-line draw-on**
- Diagrams use `data-flow-line`, `data-mobile-flow-line`, `data-tablet-flow-line`
- Animate `stroke-dasharray + stroke-dashoffset + stroke-opacity` via scroll timeline
- Fallback resets to `dasharray:none / dashoffset:0 / opacity:1`

**Marquee (`data-marqy`) — custom, not a library**
- Two keyframes `marqyL` (translate -100%) and `marqyR` (+100%)
- `animation-timing-function: linear; animation-iteration-count: infinite; will-change: transform`
- `data-direction="left|right"`, `data-pause-on-hover` toggles `animation-play-state: paused`
- Reduced-motion swaps to `overflow-x: scroll`

**Vertical marquee**
- 60s linear infinite loop, Y `0 → -50%` (content duplicated)

**Loading states**
- Image LQIP skeleton: 1.5s ease-out infinite alternate between gray-100 and a dimmer gray (light: `#c7d0db`, dark: `#2f3a4b`)
- `data-is-loaded="true"` triggers `.1s ease-out` opacity fade
- Spinners only in glossary tooltip / install widget: `@keyframes spin (rotate 360deg, 1s linear infinite)`

**Status indicator**
- Blinking "recording" dot: 1.6s infinite, asymmetric — opacity `1 → 0 at 60%` keyframe (heartbeat feel)
- `animate-pulse-subtle`: 2.5s ease-in-out, opacity `1 → .8`

**Copy-confirm micro-interaction**
- `InstallSanity` widget: scale `0 → 1.2 → 1` over 50%/55% peak and 90%-100% settle
- The ONLY overshoot/playful moment on the page

**Card hover sub-tells**
- `transition-colors duration-500` (slow, editorial) for bg swaps
- Inner nodes: `size-[5px]` / `size-[9px]` dots → `bg-brand` on `group/node group-hover`
- NO scale, NO lift — strictly chromatic

**Cursors**
- No custom cursor, no magnetic hover, no follow effects
- Standard CSS only: `cursor-pointer`, `cursor-grab`, `cursor-default`, `cursor-text`

**Tooltips / popovers**
- Radix-style slide-up 1rem + fade in via translate-in keyframes
- `data-state` (closed/open) + `transition-behavior: allow-discrete` to animate display/overlay

**Form inputs**
- `transition-[outline-color] duration-300` and `transition-[border-color] duration-300`
- Subtle, designer-y not glow-y
- `focus-within:bg-bg-dim focus-within:outline-border-base`

**Typography reveal (code blocks)**
- Lines fade in opacity 0 → 1 via `@keyframes reveal` driven by `animation-timeline: scroll(nearest)`
- Code "types in" as you scroll past

**Hero CTA image swap**
- Stacked absolute images; top opacity 0 → 1 on `group-hover`
- Delayed companion: `[transition:opacity_500ms_500ms]` — 500ms duration + 500ms delay

**Overall vibe — RESTRAINED, editorial, designer-y**
- Every interaction chromatic (color/opacity) + occasional translateY 1rem entry
- No bounce, no spring overshoot (except one copy-confirm)
- No skew, no scale-on-hover, no parallax-with-rotation, no cursor effects
- Long 500ms / 1000ms color transitions = calm magazine-like cadence
- Respects `motion-reduce` and `scripting:none`
- "Wow" moments: (1) SVG flow-lines drawing on scroll, (2) duplicated marquee strips, (3) layered parallax tiles, (4) syntax code line-by-line reveal

---

## 7. Asset acquisition

**Sanity's hero video — URL found**
- Largest source: `https://cdn.sanity.io/files/3do82whm/next/4c1ac609e9dba5829e5e20d5ce3bd38e8be4a0cf.webm`
- 6 responsive variants (400w → 2000w+), all WebM/VP9
- Filename via Content-Disposition: `Sanity_AIBrandFilm_20s_v11_HERO_9x16_400w.webm` — Sanity's 20-second AI Brand Film
- Sizes: 4.4 MB (mobile 400w) → 27.6 MB (desktop 2000w+)
- Poster: `https://cdn.sanity.io/images/3do82whm/next/5306c1d623c7fa616697ddfa0644c8bfb3efed3d-1920x1080.jpg?w=1920&q=75&fit=clip&auto=format` (1920×1080)
- Served from cdn.sanity.io, HTTP/2, accept-ranges, cache-control public max-age=31536000, vary: Origin (CORS open)

**Honest licensing note**
- CAN you hotlink? Technically yes — public CDN, open CORS, 1-year cache.
- SHOULD you? **No, three reasons:**
  1. **Legal/brand** — file is literally "Sanity_AIBrandFilm" — Sanity's branded marketing asset. Reusing it on dvddev.com is copyright infringement + brand impersonation; their legal team could send takedowns to Vercel and your registrar.
  2. **Fragile** — URL has a content hash (`v11`). When Sanity ships v12, the URL likely 404s and your hero blanks. You can't control timing.
  3. **Performance/ethics** — even if it stayed up, you'd pull 27 MB from Sanity's CDN, costing them bandwidth for traffic that gives them nothing.

**Recommended path** — source an abstract/glitch/particle clip from free commercial sources. Target: 1080p or 1440p (not 4K), 10-20s seamless loop, dark palette so cream text reads, encode WebM (VP9, ~2-4 Mbps) + MP4 (H.264) via ffmpeg, add a poster JPG.

**Alt stock search queries**

1. **Pexels** — `abstract glitch background loop` — filter Videos > Landscape > 4K. Free commercial, no attribution.
2. **Pexels** — `particle field dark background` — slow-drifting particles, won't fight typography. Filter Landscape.
3. **Pixabay** — `fluid simulation abstract loop 4k` — ferrofluid / oil-on-water / inky fluid sims. Pixabay Content License = free commercial, no attribution.
4. **Coverr** — `abstract` (https://coverr.co/s/abstract) — curated specifically for hero backgrounds, short loops, dark palettes, web-ready compression. CC0-ish.
5. **Mixkit** — `abstract animation background` — Backgrounds category with audio-reactive/generative-art loops. Mixkit License = free commercial including monetized, no attribution.
6. **Mazwai** — `experimental abstract motion` — curated artistic/experimental cinematography (film grain, analog noise, scan lines). Most clips are CC-BY (attribution required) — check per clip.
7. **Pexels** — `plasma waves generative` — iridescent/plasma slice, oil-on-water shimmer loops.
8. **Coverr** — `noise grain texture loop` — analog scan-line / VHS noise; works as overlay too.

**Logo assets** — not extracted in this pass. Sanity's wordmark SVG is inlined in their Next.js bundle. Same brand-asset caveat applies double — do NOT clone Sanity's wordmark; use David's own DVD mark.

---

## 8. Decision matrix

| Element | CLONE (copy structure + style ~1:1) | ADAPT (copy structure, recolor to saturn-gold/cream + DVD logo) | SKIP (keep dvddev's current take) |
|---|---|---|---|
| **Hero background** | Lift Sanity's exact dimmed-WebM-on-dark pattern (opacity 40%, six art-directed sources, JPG LQIP, fetchPriority high) using one of the licensed Pexels/Coverr abstract loops. | Same dimmed-WebM pattern but swap to a cosmic Saturn nebula loop, replace `bg-black` with deep saturn-shadow `#0F0A1A`, dim to 35% so cream type reads. | Keep current DVD logo + Saturn video; don't import Sanity's video chrome. |
| **Hero copy structure** | "Structure powers intelligence" 3-word cadence + 40ch subhead + 3 CTAs (brand fill / outline / mono copy-snippet). Match exactly. | Rewrite headline as 3-word cadence in David's voice (e.g. "Code shapes orbit." / "Pixels meet physics."), keep 40ch subhead + 3-CTA structure (primary / secondary / `npm install dvd` copy-snippet). | Keep current "Front-end Developer" copy with David's existing tone. |
| **Navigation** | 67px sticky nav, wordmark left, ghost link cluster center (Products/Solutions/Resources/Docs/Enterprise/Pricing), 3 right CTAs (ghost / outline / brand-fill), native `<dialog popover>` mega-menus, hamburger after primary CTA on mobile. | Same 67px sticky + 3-CTA pattern but links become David's sections (Work / Studio / Writing / Contact), saturn-gold for the one filled brand CTA, plain absolute panel on hover instead of native dialog popover. | Keep simple HUD navigation that dvddev currently uses. |
| **Footer** | Clone entire structure: dark forced theme, 3-block stack (32px display CTAs + 4-column nav → GIANT centered wordmark with 256px breathing → socials + locale clock + status pill + theme toggle). | Same 3-block stack but `bg-bg-base` becomes deep saturn-shadow, GIANT centered DVD wordmark in cream with subtle saturn-gold glow at 82-120px tall, locale clock swapped to David's cities (e.g. `SAO, BRA (BRT)`), 2-3 columns instead of 4, "Available for work" status pill with green dot. | Keep current minimal footer. |
| **Color palette** | Adopt Sanity's whole rebrand: orange `#ff560a` brand, warm near-black `#0b0b0b`, 7-step gray ramp, semantic role tokens, P3 wide-gamut declarations. | Keep saturn-gold `#D4A24C` + cream `#F5EAD0` as the signature accent, layer Sanity's token architecture (bg-base/bg-dim/fg-base/fg-faint/border-faint/border-dim) on top, use warm near-black `#0b0b0b` as ink. Adopt P3 declarations for the saturn-gold. | Keep saturn-gold/cream exactly as-is, no token refactor. |
| **Typography** | Self-host Waldenburg + IBM Plex Mono, headlines stay weight 400 with `lg:max-w-[12ch]` cap, mono for all eyebrows/badges/captions, custom 425 weight for lead body. | Keep Space Grotesk + JetBrains Mono BUT enforce Sanity's contract: headlines always weight 400 not bold, mono for all eyebrows/captions, `text-balance` + `max-w-[12ch]` hero cap, negative tracking scales with size (-0.04em → 0). | Keep Space Grotesk + JetBrains Mono with current weight usage. |
| **Customer/proof section** | Clone metrics-plus-quote mosaic verbatim with rotating accent colors and named-attribution cards. | Rework as "Studio cases" — David's project outcomes as the metric tiles ("4 hrs saved per release", "30% faster build"), client quotes attributed to brief role/company, saturn-gold accent stripe on left edge. | Skip — no project social proof on portfolio. |
| **Pricing section** | Clone 3-tier card row (Free / Recommended / Enterprise) with `We recommend` badge + long comparison table + FAQ accordion. | Adapt to freelance tiers: Hourly / Project / Retainer (badge on middle "Recommended for product teams"), short 4-row comparison (response time / hours / deliverables / revisions), no FAQ. | Skip — no pricing on a portfolio. |
| **Mobile behavior** | Clone exactly: hamburger after brand CTA, fullscreen `<dialog>` with 67px inner header, `animate-dialog` keyframe, all mega-menu content collapses into stacked drawer. | Same hamburger-after-brand-CTA + fullscreen drawer, but Radix/Headless instead of native dialog popover, stacked 2-column nav becomes 1-column list. | Keep current mobile behavior. |
| **Motion language** | Clone the restraint contract: zero JS animation libs, native `animation-timeline: view()` reveals, two cubic-beziers, 200/500/1000ms ladder, color-only hovers, no scale/skew, parallax via `--parallax` CSS var. | Keep current Framer Motion but enforce the restraint contract: limit hovers to color/opacity swaps, ban scale/skew except on project-card `scale(1.02)`, adopt the 1.6s asymmetric blink (60% keyframe) for the "available" dot. | Keep current motion language. |

---

## 9. Open questions

1. **Footer manifesto?** Sanity's footer carries ZERO manifesto line and lets the giant wordmark + locale clock do all the emotional work. Do you want a "made in São Paulo" / portfolio tagline in huge type, or commit to Sanity's silence?
2. **Locale clock — single or dual?** Sanity shows OSL + SFO because they're a global team. Do you show just `SAO, BRA (BRT)`, or pair it with a "second city" (where clients live, where you've worked from) to imply range?
3. **"Available for work" status pill — yes or no?** It's a small but powerful signal of liveness. If yes: green dot with text, or also link to a `/status` page?
4. **Three-CTA hero or two?** Sanity's `npm create sanity@latest` copy-snippet CTA is brilliant because it's a developer trust signal. What's David's equivalent? `git clone dvddev`? `npx hire-david`? Is there ANY install/copy snippet that makes sense, or skip the third CTA entirely?
5. **Pricing/services tier section at all?** Portfolios usually skip this, but Sanity's 3-tier card with the `We recommend` badge would adapt cleanly to Hourly/Project/Retainer. Does David want explicit tiers visible or stay project-by-project quote-only?
6. **Mega-menu or flat nav?** With <8 destinations a portfolio doesn't need mega-menus — but Sanity's 3-CTA right cluster + ghost link list still works flat. Confirm: flat HUD, or Studio/Work/Writing dropdowns?
7. **Footer "Trust and compliance" framing?** Sanity reframes Legal as Trust and compliance — softens it for enterprise. Does David want a "Trust" column (privacy / terms / accessibility) at all, or keep portfolio fully informal?
8. **Hero video — cosmic Saturn vs. abstract glitch?** Sanity uses an art-directed brand film. Cosmic Saturn nebula keeps your existing identity. Abstract glitch/particle reads as "developer" not "designer." Pick one direction so the licensing search has a clear target.
9. **Wordmark + mark or wordmark only?** Sanity's footer wordmark has a tiny geometric mark on its LEFT. DVD wordmark could pair with a stylized Saturn glyph on its left at 82px tall. Yes/no?
10. **Theme toggle — keep or kill?** Sanity ships a 3-way Light/System/Dark radio control. Worth implementing on a portfolio, or is dvddev single-theme (cosmic dark) by design?
