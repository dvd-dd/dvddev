# dvddev

Personal portfolio of David Romualdo, a freelance front-end developer who builds landing pages and marketing sites. Live at **[dvddev.com](https://dvddev.com)**.

It's the site prospective clients see when they find me on Upwork or elsewhere: what I build, live demos they can click through, a verified client review, how I work, and direct contact by WhatsApp or email.

## What's in it

- **Single-page home**: hero, a trust marquee (client wordmarks and stack icons), an animated "custom environments" brief generator, project grid, client review slider, process steps, a career timeline styled as a git log, and contact.
- **Four in-house demo sites**: static concept builds (Luxor, Phoenix, PeçaAí, Wood Frame) served from `public/portfolio/` under short URLs (`/luxor`, `/phoenix`, `/pecaai`, `/woodframe`) via rewrites in `next.config.ts`.
- **English and Portuguese**: a language switch backed by `src/lib/translations.ts`.
- **SEO basics**: metadata and Open Graph in `layout.tsx`, plus `sitemap.ts` and `robots.ts`.
- **No backend**: contact goes through `wa.me` and `mailto:` links, so there are no environment variables, no database and no user data stored.

## Built with

- [Next.js 16](https://nextjs.org) (App Router) and React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion for animation, Lenis for smooth scrolling
- lucide-react and react-icons, Geist font
- Playwright for the utility scripts in `scripts/`
- Deployed on Vercel

## Run it locally

Requires Node.js 20.9 or newer and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

Other commands:

```bash
pnpm build      # production build
pnpm start      # serve the production build
pnpm lint       # ESLint
```

### Utility scripts

```bash
pnpm exec playwright install chromium        # once
node scripts/screenshot-portfolio.mjs        # desktop + mobile screenshots of the live demos
node scripts/find-video.mjs                  # collects video URLs from a page's network requests
```

## Project structure

```
src/
  app/          layout, home page, sitemap, robots, 404
  components/
    sections/   one file per home page section
    ui/         shared pieces (nav, buttons, marquee, cards, logo)
  contexts/     language context
  hooks/        translation, smooth scroll, light mode, typewriter
  lib/          site constants, project data, translations, briefs
public/
  portfolio/    the four static demo sites
  screenshots/  project thumbnails
  brand/        client wordmarks and stack icons
reference/      design brief and spec notes for the redesign
scripts/        Playwright utilities
```

## Roadmap

Planned work is listed in [ROADMAP.md](ROADMAP.md).

## License

The source code is released under the [MIT License](LICENSE).

Images, videos, client logos and screenshots of client sites in `public/` are not covered by the MIT License and remain the property of their respective owners. The planet and Milky Way textures are by [Solar System Scope](https://www.solarsystemscope.com/textures/) under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
