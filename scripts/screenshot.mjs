// Usage: node scripts/screenshot.mjs [url] [width] [outDir]
// Saves a full-page screenshot plus one per <section>/<footer>.
import { mkdir } from "node:fs/promises";
import { chromium } from "@playwright/test";

const [url = "http://localhost:3000", width = "1440", outDir = "screenshots"] = process.argv.slice(2);
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: +width, height: 900 } });
await page.goto(url, { waitUntil: "load", timeout: 120000 });
await page.evaluate(() => document.fonts.ready);
// Trigger lazy-loaded images, then wait until they have all finished loading
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 600) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 50));
  }
  window.scrollTo(0, 0);
  await Promise.all([...document.images].map((img) => (img.complete ? null : new Promise((r) => (img.onload = img.onerror = r)))));
});

// Pin the fixed header to the page top so it doesn't overlay other sections
await page.addStyleTag({ content: "header{position:absolute!important}" });
await page.screenshot({ path: `${outDir}/${width}-00-full.png`, fullPage: true });
const sections = await page.locator("main > section, main > footer, body > footer").all();
for (const [i, s] of sections.entries()) {
  await s.screenshot({ path: `${outDir}/${width}-${String(i + 1).padStart(2, "0")}.png` });
}
const height = await page.evaluate(() => document.documentElement.scrollHeight);
console.log(`width ${width}: page height ${height}px, ${sections.length} sections`);
await browser.close();
