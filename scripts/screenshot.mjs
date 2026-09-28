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
