/**
 * Network-based video scraper. Sites lazy-load <video> sources after
 * scrolling — DOM scraping misses them. Instead, listen to every
 * outbound request and collect any URL whose path looks like a video.
 *
 * V1 of Phase V — searching Pexels for cosmic / space drift footage
 * to replace the abstract glitch loop in the hero. Target vibe: slow
 * drift through stars or nebula, dark palette so the headline reads,
 * 16:9 aspect, seamless loop.
 */
import { chromium } from "playwright";

const PAGES = [
  "https://www.pexels.com/search/videos/space%20drift/",
  "https://www.pexels.com/search/videos/stars%20background/",
  "https://www.pexels.com/search/videos/galaxy%20slow%20motion/",
  "https://www.pexels.com/search/videos/nebula%20loop/",
];

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
});

const hits = new Set();
const page = await ctx.newPage();
page.on("request", (req) => {
  const url = req.url();
  if (/\.(mp4|webm|mov)(\?|$)/i.test(url)) hits.add(url);
});
page.on("response", (res) => {
  const ct = res.headers()["content-type"] || "";
  if (ct.includes("video") || ct.includes("mpegurl")) hits.add(res.url());
});

for (const url of PAGES) {
  console.log(`\n--- ${url} ---`);
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(3000);
    // Scroll a few screens to provoke lazy loading.
    for (let i = 0; i < 4; i++) {
      await page.evaluate(() => window.scrollBy(0, 900));
      await page.waitForTimeout(1500);
    }
    // Hover a video card too (Pexels sometimes only plays on hover).
    await page.evaluate(() => {
      const cards = document.querySelectorAll('a[href*="/video/"]');
      const c = cards[0];
      if (c) c.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
    });
    await page.waitForTimeout(2500);
  } catch (e) {
    console.log(`  failed: ${e.message}`);
  }
}

console.log(`\n\n=== Collected ${hits.size} video URLs ===`);
[...hits].slice(0, 30).forEach((u) => console.log("  •", u));

await browser.close();
