import { chromium } from "playwright";
import { writeFile } from "node:fs/promises";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
});
const page = await ctx.newPage();

const images = new Map();
page.on("response", async (res) => {
  const url = res.url();
  const ct = res.headers()["content-type"] || "";
  if (
    !(ct.startsWith("image/") || /\.(jpe?g|webp|png)(\?|$)/i.test(url))
  )
    return;
  if (!url.includes("cdn.sanity.io") && !url.includes("sanity.io"))
    return;
  try {
    const len = Number(res.headers()["content-length"] || 0);
    if (len < 30_000) return; // skip thumbs / icons
    images.set(url, { len, ct });
  } catch {}
});

console.log("Navigating sanity.io …");
await page
  .goto("https://www.sanity.io/", {
    waitUntil: "domcontentloaded",
    timeout: 60_000,
  })
  .catch((e) => console.log("nav warn:", e.message));
await page.waitForTimeout(3000);

// Scroll all the way to trigger lazy-loaded sections.
for (let i = 0; i < 12; i++) {
  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.9));
  await page.waitForTimeout(700);
}

// Find the editorial-environments section by heading and re-trigger
// any near-viewport lazy images there.
try {
  await page.evaluate(() => {
    const headings = [...document.querySelectorAll("h1, h2, h3")];
    const target = headings.find((h) =>
      /editorial environments|content operations team|mirror how/i.test(
        h.textContent || "",
      ),
    );
    if (target) target.scrollIntoView({ behavior: "instant", block: "center" });
  });
} catch {}
await page.waitForTimeout(3000);

const out = [...images.entries()]
  .map(([url, meta]) => ({ url, ...meta }))
  .sort((a, b) => b.len - a.len);

await writeFile(
  "/tmp/sanity-bg-candidates.json",
  JSON.stringify(out, null, 2),
);
console.log(`\nCaptured ${out.length} images`);
out.slice(0, 12).forEach((c, i) =>
  console.log(`  ${String(i).padStart(2)}: ${(c.len / 1024).toFixed(0)}KB  ${c.url.slice(0, 110)}`),
);
await browser.close();
