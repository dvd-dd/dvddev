import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const TERMS = [
  { key: 'ocean', label: 'oceano', query: 'ocean underwater' },
  { key: 'racing', label: 'corrida autodromo', query: 'race car track' },
  { key: 'skate', label: 'skate close-up', query: 'skateboard trick' },
  { key: 'rocket', label: 'foguete', query: 'rocket launch' },
  { key: 'astronaut', label: 'astronauta', query: 'astronaut space' },
  { key: 'chongqing', label: 'chongqing drone', query: 'chongqing china' },
  { key: 'matrix', label: 'matrix code', query: 'matrix code rain green' },
  { key: 'bigbang', label: 'big bang', query: 'big bang explosion universe' },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function extractVideoFilesId(url) {
  const m = url.match(/\/video-files\/(\d+)/);
  return m ? m[1] : url;
}

function rankUrl(url) {
  if (/_3840_/.test(url)) return 0;
  if (/_2560_/.test(url)) return 1;
  if (/_1920_/.test(url)) return 2;
  if (/_1280_/.test(url)) return 3;
  if (/_960_/.test(url)) return 4;
  if (/_640_/.test(url)) return 5;
  return 6;
}

const results = {};
const errors = {};

const browser = await chromium.launch({
  headless: true,
  args: [
    '--disable-blink-features=AutomationControlled',
    '--disable-features=IsolateOrigins,site-per-process',
  ],
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  userAgent:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  locale: 'en-US',
  timezoneId: 'America/Sao_Paulo',
  extraHTTPHeaders: {
    'Accept-Language': 'en-US,en;q=0.9,pt-BR;q=0.8',
  },
});
// hide webdriver flag
await context.addInitScript(() => {
  Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
});
let currentSet = new Set();
function attachListener(p) {
  p.on('request', (req) => {
    const url = req.url();
    if (/\.(mp4|webm)(\?|$)/i.test(url) && url.includes('videos.pexels.com')) {
      currentSet.add(url);
    }
  });
}

for (const term of TERMS) {
  currentSet = new Set();
  const page = await context.newPage();
  attachListener(page);
  try {
    const url = `https://www.pexels.com/search/videos/${encodeURIComponent(term.query)}/`;
    // pause between terms (avoid rate limit / CF)
    await sleep(2500);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await sleep(3000);

    // wait through Cloudflare "Just a moment..." challenge if present
    let cleared = false;
    for (let attempt = 0; attempt < 20; attempt++) {
      const t = await page.title().catch(() => '');
      if (!/just a moment/i.test(t)) { cleared = true; break; }
      await sleep(2500);
    }
    if (!cleared) {
      // try a reload
      try {
        await page.reload({ waitUntil: 'domcontentloaded', timeout: 30000 });
        await sleep(4000);
        for (let attempt = 0; attempt < 15; attempt++) {
          const t = await page.title().catch(() => '');
          if (!/just a moment/i.test(t)) break;
          await sleep(2500);
        }
      } catch {}
    }
    // wait for the cards to appear
    try {
      await page.waitForSelector('a[href*="/video/"]', { timeout: 15000 });
    } catch {}

    for (let i = 0; i < 4; i++) {
      await page.evaluate(() => window.scrollBy(0, 900));
      await sleep(1500);
    }

    // scroll back to top to hover cards in viewport
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(1000);

    try {
      const cards = await page.$$('a[href*="/video/"]');
      const limit = Math.min(15, cards.length);
      for (let i = 0; i < limit; i++) {
        try {
          await cards[i].scrollIntoViewIfNeeded({ timeout: 2000 });
          await cards[i].dispatchEvent('mouseover');
          await cards[i].dispatchEvent('mouseenter');
          try { await cards[i].hover({ timeout: 1500, force: true }); } catch {}
          await sleep(800);
        } catch {}
      }
    } catch {}
    await sleep(2500);

    // diagnostics: how many cards found?
    const cardCount = await page.$$eval('a[href*="/video/"]', (els) => els.length).catch(() => -1);
    const title = await page.title().catch(() => '?');
    console.log(`  [${term.key}] cards=${cardCount} captured=${currentSet.size} title="${title}"`);

    const urls = Array.from(currentSet);
    // dedupe by /video-files/<id>
    const byId = new Map();
    for (const u of urls) {
      const id = extractVideoFilesId(u);
      const existing = byId.get(id);
      if (!existing || rankUrl(u) < rankUrl(existing)) {
        byId.set(id, u);
      }
    }
    const unique = Array.from(byId.values()).sort((a, b) => rankUrl(a) - rankUrl(b));
    const picked = unique.slice(0, 6);
    results[term.key] = picked;
    console.log(`${term.key}: ${picked.length} urls`);
  } catch (e) {
    errors[term.key] = String(e && e.message ? e.message : e);
    results[term.key] = results[term.key] || [];
    console.log(`${term.key}: ERROR ${errors[term.key]}`);
  }
  try { await page.close(); } catch {}
}

await fs.writeFile(
  '/tmp/dvddev-reel/search-results.json',
  JSON.stringify({ results, errors }, null, 2),
);

await browser.close();
