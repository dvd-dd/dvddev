# Roadmap

Work planned for the portfolio, roughly in priority order.

## Content

- [ ] **Case study pages**: a `/work/<slug>` page per project with the brief, decisions, stack and results, linked from the project grid.
- [ ] **About section**: add a real portrait and finish the copy.
- [ ] **More client reviews**: add new reviews to the slider as projects finish.

## Features

- [ ] **Light theme**: design a full light variant and add a theme toggle (only the starfield reacts to light mode today).
- [ ] **Language in the URL**: `/en` and `/pt` routes with `hreflang`, and `<html lang>` that follows the selected language (currently fixed to `en`).

## Quality

- [ ] **Tests**: Playwright smoke tests for the home page, both languages and the four demo routes.
- [ ] **CI**: GitHub Actions running lint, build and tests on every push.
- [ ] **Performance**: Lighthouse budget for mobile, lighter hero and review videos on slow connections.
- [ ] **Cleanup**: remove leftovers from the old Saturn theme (unused color tokens, constants and textures).
