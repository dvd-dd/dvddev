import { chromium } from "playwright";

const SEARCHES = [
  "https://www.pexels.com/search/videos/abstract%20glitch/",
  "https://www.pexels.com/search/videos/abstract%20motion%20dark/",
  "https://coverr.co/s/abstract",
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

for (const url of SEARCHES) {
  console.log(`\n--- ${url} ---`);
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(3000);
    const sources = await page.evaluate(() => {
      const vids = [...document.querySelectorAll("video")];
      return vids.map(v => v.src || v.currentSrc).filter(Boolean).slice(0, 10);
    });
    console.log(`  found ${sources.length} video srcs`);
    sources.forEach(s => console.log("  •", s));
  } catch (e) {
    console.log(`  failed: ${e.message}`);
  }
}

await browser.close();
