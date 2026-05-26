/**
 * Screenshot the live portfolio demos for Upwork uploads.
 *
 * Pipeline per URL, per orientation (desktop 1440×900, mobile 390×844):
 *
 *   1. Navigate, wait for `load` + `networkidle` + a settle delay.
 *   2. WARMUP — scroll from top to bottom one viewport at a time,
 *      pausing ~1s on each stop. This fires every scroll-triggered
 *      animation (IntersectionObserver reveals, parallax, live
 *      counters, marquees, etc.) so they're in their final state by
 *      the time we start snapping. Without this, mid-page sections
 *      came out blank because their entry animations hadn't run.
 *   3. CAPTURE — back to top, then take viewport-sized snapshots at
 *      evenly distributed scroll positions (max 10 per pass). First
 *      shot is named "<slug>-<orientation>-hero.png", the rest
 *      "<slug>-<orientation>-section-NN.png".
 *
 * Run with:  node scripts/screenshot-portfolio.mjs
 */

import { chromium, devices } from "playwright";
import { mkdir, readdir, unlink, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const OUT_ROOT = path.join(REPO_ROOT, "upwork-portfolio");

/**
 * The four in-house demos live under /portfolio/<name>-site/ on
 * dvddev.com. Vercel 308-redirects the trailing-slash form to the
 * no-slash form, which then breaks the demos' relative `styles.css`
 * href. Hitting /index.html explicitly keeps the directory as base.
 *
 * Upward + Smart Hardwood Floors are external production sites.
 */
const SITES = [
  { slug: "phoenix", url: "https://dvddev.com/portfolio/phoenix-site/index.html" },
  { slug: "pecaai", url: "https://dvddev.com/portfolio/pecaai-site/index.html" },
  { slug: "luxor", url: "https://dvddev.com/portfolio/luxor-site/index.html" },
  { slug: "woodframe", url: "https://dvddev.com/portfolio/woodframe-site/index.html" },
  { slug: "smartfloors", url: "https://smartfloorservices.com" },
  { slug: "upward", url: "https://upwardbr.com/" },
];

const DESKTOP_VIEWPORT = { width: 1440, height: 900 };
const MOBILE_DEVICE = devices["iPhone 13"]; // viewport: 390×844, DPR 3

const POST_LOAD_SETTLE_MS = 2000;
const WARMUP_STEP_DELAY_MS = 1000;
const PRE_SHOT_SETTLE_MS = 500;
const MAX_SECTION_SHOTS = 10;

async function getDocHeight(page) {
  return page.evaluate(() =>
    Math.max(
      document.documentElement.scrollHeight,
      document.body ? document.body.scrollHeight : 0
    )
  );
}

/**
 * Scroll from top to bottom one viewport at a time so every
 * scroll-triggered animation gets a chance to fire. Pauses
 * WARMUP_STEP_DELAY_MS on each stop. Document height is re-measured
 * after the warmup because lazy-loaded content (hero videos, deferred
 * images, etc.) often expands the page once on screen.
 */
async function scrollWarmup(page, viewportH) {
  let totalHeight = await getDocHeight(page);
  let y = 0;
  while (y < totalHeight) {
    await page.evaluate((sy) => window.scrollTo(0, sy), y);
    await page.waitForTimeout(WARMUP_STEP_DELAY_MS);
    y += viewportH;
    // Page may have grown — capture the new bottom.
    totalHeight = await getDocHeight(page);
  }
  // Final stop at the actual bottom in case the last step undershot.
  await page.evaluate(() =>
    window.scrollTo(0, document.documentElement.scrollHeight)
  );
  await page.waitForTimeout(WARMUP_STEP_DELAY_MS);
}

/**
 * Snap up to MAX_SECTION_SHOTS viewport-sized images, evenly spaced
 * from top to bottom of the page. Always includes scrollY = 0 (hero)
 * and scrollY = maxScroll (bottom) when there are ≥ 2 shots.
 */
async function captureSections(page, viewport, outDir, slug, label) {
  const totalHeight = await getDocHeight(page);
  const maxScroll = Math.max(0, totalHeight - viewport.height);
  const naturalStops = Math.max(1, Math.ceil(totalHeight / viewport.height));
  const numShots = Math.min(naturalStops, MAX_SECTION_SHOTS);
  const step = numShots <= 1 ? 0 : maxScroll / (numShots - 1);

  // Back to top before snapping so the first shot is the real hero.
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(PRE_SHOT_SETTLE_MS * 2);

  for (let i = 0; i < numShots; i++) {
    const y = Math.round(i * step);
    await page.evaluate((sy) => window.scrollTo(0, sy), y);
    await page.waitForTimeout(PRE_SHOT_SETTLE_MS);
    const suffix =
      i === 0 ? "hero" : `section-${String(i + 1).padStart(2, "0")}`;
    await page.screenshot({
      path: path.join(outDir, `${slug}-${label}-${suffix}.png`),
      clip: { x: 0, y: 0, width: viewport.width, height: viewport.height },
    });
  }
  return numShots;
}

async function captureSite(browser, { slug, url }) {
  const outDir = path.join(OUT_ROOT, slug);
  // Wipe + recreate so re-runs don't accumulate stale files.
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  // ── Desktop pass ────────────────────────────────────────────
  console.log(`  → desktop`);
  const desktopCtx = await browser.newContext({
    viewport: DESKTOP_VIEWPORT,
    deviceScaleFactor: 2,
  });
  const desktopPage = await desktopCtx.newPage();
  desktopPage.setDefaultNavigationTimeout(60_000);
  await desktopPage.goto(url, { waitUntil: "load" });
  await desktopPage.waitForLoadState("networkidle").catch(() => {});
  await desktopPage.waitForTimeout(POST_LOAD_SETTLE_MS);
  await scrollWarmup(desktopPage, DESKTOP_VIEWPORT.height);
  const desktopCount = await captureSections(
    desktopPage,
    DESKTOP_VIEWPORT,
    outDir,
    slug,
    "desktop"
  );
  await desktopCtx.close();

  // ── Mobile pass ─────────────────────────────────────────────
  console.log(`  → mobile`);
  const mobileCtx = await browser.newContext({
    ...MOBILE_DEVICE,
    deviceScaleFactor: 3,
  });
  const mobilePage = await mobileCtx.newPage();
  mobilePage.setDefaultNavigationTimeout(60_000);
  await mobilePage.goto(url, { waitUntil: "load" });
  await mobilePage.waitForLoadState("networkidle").catch(() => {});
  await mobilePage.waitForTimeout(POST_LOAD_SETTLE_MS);
  await scrollWarmup(mobilePage, MOBILE_DEVICE.viewport.height);
  const mobileCount = await captureSections(
    mobilePage,
    MOBILE_DEVICE.viewport,
    outDir,
    slug,
    "mobile"
  );
  await mobileCtx.close();

  console.log(`  ✓ ${slug} — ${desktopCount} desktop · ${mobileCount} mobile`);
}

/**
 * Remove flat duplicate PNGs at the root of upwork-portfolio/. These
 * were leftovers from an earlier single-shot capture pass before the
 * per-project folder structure existed.
 */
async function cleanRootDuplicates() {
  for (const entry of await readdir(OUT_ROOT, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.toLowerCase().endsWith(".png")) {
      await unlink(path.join(OUT_ROOT, entry.name));
      console.log(`  removed root duplicate: ${entry.name}`);
    }
  }
}

async function main() {
  await mkdir(OUT_ROOT, { recursive: true });
  console.log(`Output: ${OUT_ROOT}\n`);
  console.log("Cleaning root duplicates...");
  await cleanRootDuplicates();

  const browser = await chromium.launch();
  try {
    for (const site of SITES) {
      console.log(`\n→ ${site.slug}  (${site.url})`);
      try {
        await captureSite(browser, site);
      } catch (err) {
        console.error(`  ✗ ${site.slug} failed:`, err.message);
      }
    }
  } finally {
    await browser.close();
  }

  console.log("\nDone. Per-project shots in upwork-portfolio/<slug>/.");
}

await main();
