/**
 * Drill into the specific Pexels video page (id 27980029) and find
 * every download URL the page exposes. The previous network sniff
 * surfaced one low-res preview; the page itself should advertise
 * 720p / 1080p / 4K variants under that same video id.
 */
import { chromium } from "playwright";

const VIDEO_PAGE = "https://www.pexels.com/video/27980029/";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
});
const page = await ctx.newPage();

const hits = new Set();
page.on("request", (req) => {
  const u = req.url();
  if (/\.(mp4|webm|mov)(\?|$)/i.test(u)) hits.add(u);
});

await page.goto(VIDEO_PAGE, { waitUntil: "domcontentloaded", timeout: 30000 });
await page.waitForTimeout(4500);

// Try clicking "Free Download" to reveal the resolution menu.
try {
  await page
    .getByRole("button", { name: /free download/i })
    .click({ timeout: 5000 });
  await page.waitForTimeout(2500);
} catch {
  console.log("(no free-download button found)");
}

// Now scrape DOM for any video / link to mp4.
const fromDom = await page.evaluate(() => {
  const found = new Set();
  document.querySelectorAll("video").forEach((v) => {
    if (v.src) found.add(v.src);
    if (v.currentSrc) found.add(v.currentSrc);
  });
  document.querySelectorAll("source").forEach((s) => {
    if (s.src) found.add(s.src);
  });
  document.querySelectorAll("a[href]").forEach((a) => {
    const href = a.getAttribute("href") || "";
    if (/\.mp4|\.webm|\.mov/i.test(href)) found.add(href);
  });
  document.querySelectorAll("[data-video-url]").forEach((el) => {
    const v = el.getAttribute("data-video-url");
    if (v) found.add(v);
  });
  // Inline JSON sometimes carries the URLs.
  const html = document.documentElement.outerHTML;
  const m = html.match(/https:\/\/[^"\s]+\.(?:mp4|webm)/g) || [];
  m.forEach((u) => found.add(u));
  return [...found];
});

fromDom.forEach((u) => hits.add(u));

console.log(`\n=== ${hits.size} candidate URLs ===`);
[...hits].forEach((u) => console.log(" •", u));

await browser.close();
