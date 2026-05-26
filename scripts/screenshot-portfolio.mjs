/**
 * Screenshot the live portfolio demos for Upwork uploads.
 *
 * Per site, captures three images into upwork-portfolio/<slug>/:
 *   1. <slug>-desktop-hero.png   — 1440×900 viewport, top of page only
 *   2. <slug>-desktop-full.png   — 1440 wide, full-page scroll
 *   3. <slug>-mobile-full.png    — 390×844 viewport (iPhone-class),
 *                                  full-page scroll, mobile UA + touch
 *
 * Pulls from the production URLs so the captures reflect what an
 * Upwork client actually sees. Waits for networkidle + 3s settle
 * before snapping so reveal animations / counters have finished.
 *
 * Usage:
 *   node scripts/screenshot-portfolio.mjs
 */

import { chromium, devices } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const OUT_ROOT = path.join(REPO_ROOT, "upwork-portfolio");

/**
 * The four in-house demos live under /portfolio/<name>-site/ on
 * dvddev.com. Vercel redirects the trailing-slash form to no-slash
 * (308), which then breaks the demos' relative stylesheet href
 * ("styles.css" → /portfolio/styles.css, 404 silent). Hitting
 * /index.html explicitly keeps /portfolio/<name>-site/ as the base
 * URL so relative assets resolve correctly.
 */
const SITES = [
  { slug: "phoenix", url: "https://dvddev.com/portfolio/phoenix-site/index.html" },
  { slug: "pecaai", url: "https://dvddev.com/portfolio/pecaai-site/index.html" },
  { slug: "luxor", url: "https://dvddev.com/portfolio/luxor-site/index.html" },
  { slug: "woodframe", url: "https://dvddev.com/portfolio/woodframe-site/index.html" },
  { slug: "smartfloors", url: "https://smartfloorservices.com" },
];

const SETTLE_MS = 3000;
const NAV_TIMEOUT_MS = 45000;

const DESKTOP_VIEWPORT = { width: 1440, height: 900 };
// iPhone 13 dimensions; deviceScaleFactor 3 → retina-quality output.
const MOBILE_DEVICE = devices["iPhone 13"];

async function settle(page) {
  // networkidle covers "no requests for 500ms"; the extra wait covers
  // CSS animations / IntersectionObserver-triggered reveals / counters
  // that may still be in motion after the network has gone quiet.
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(SETTLE_MS);
}

async function captureSite(browser, { slug, url }) {
  const outDir = path.join(OUT_ROOT, slug);
  await mkdir(outDir, { recursive: true });

  // ── Desktop pass ──────────────────────────────────────────────
  const desktopCtx = await browser.newContext({
    viewport: DESKTOP_VIEWPORT,
    deviceScaleFactor: 2,
  });
  const desktopPage = await desktopCtx.newPage();
  desktopPage.setDefaultNavigationTimeout(NAV_TIMEOUT_MS);
  await desktopPage.goto(url, { waitUntil: "load" });
  await settle(desktopPage);

  const heroPath = path.join(outDir, `${slug}-desktop-hero.png`);
  await desktopPage.screenshot({
    path: heroPath,
    clip: { x: 0, y: 0, ...DESKTOP_VIEWPORT },
  });

  const fullDesktopPath = path.join(outDir, `${slug}-desktop-full.png`);
  await desktopPage.screenshot({
    path: fullDesktopPath,
    fullPage: true,
  });

  await desktopCtx.close();

  // ── Mobile pass ───────────────────────────────────────────────
  const mobileCtx = await browser.newContext({
    ...MOBILE_DEVICE,
    // Override default deviceScaleFactor (3) explicitly so screenshots
    // are crisp on retina viewers without bloating the file 9×.
    deviceScaleFactor: 3,
  });
  const mobilePage = await mobileCtx.newPage();
  mobilePage.setDefaultNavigationTimeout(NAV_TIMEOUT_MS);
  await mobilePage.goto(url, { waitUntil: "load" });
  await settle(mobilePage);

  const fullMobilePath = path.join(outDir, `${slug}-mobile-full.png`);
  await mobilePage.screenshot({
    path: fullMobilePath,
    fullPage: true,
  });

  await mobileCtx.close();

  console.log(`  ✓ ${slug}`);
}

async function main() {
  console.log(`Output dir: ${OUT_ROOT}\n`);

  const browser = await chromium.launch();
  try {
    for (const site of SITES) {
      console.log(`→ ${site.slug}  (${site.url})`);
      try {
        await captureSite(browser, site);
      } catch (err) {
        console.error(`  ✗ ${site.slug} failed:`, err.message);
      }
    }
  } finally {
    await browser.close();
  }

  console.log(`\nDone. Each project has its own folder under upwork-portfolio/.`);
}

await main();
