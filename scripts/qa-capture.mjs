// QA: full-page screenshots at 1440/402 + console errors + horizontal-overflow check.
// Needs Chrome installed and `npm i -D puppeteer-core` (dev-only, not a runtime dependency).
// Usage: node scripts/qa-capture.mjs http://localhost:3000 [name=/route ...]   → .qa-shots/
// Real-viewport QA capture: full-page screenshots at 1440 and 402, plus console errors and horizontal overflow.
// Usage: node capture.cjs [baseUrl] [name=path ...]
import puppeteer from "puppeteer-core";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import path from "node:path";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BASE = process.argv[2] || "http://localhost:3000";
const OUT = path.join(__dirname, "..", ".qa-shots");
const DEFAULT = [
  "home=/", "about=/about", "sample-lists=/sample-lists", "sample-detail=/sample-lists/example",
  "login=/account/login", "register=/account/register", "hub=/hub", "hub-empty=/hub?state=empty",
  "hub-modal-list=/hub?new=list", "hub-modal-date=/hub?new=date", "hub-modal-note=/hub?new=note", "hub-modal-registry=/hub?new=registry",
  "lists=/lists", "lists-empty=/lists?state=empty", "list-detail=/lists/list-1", "list-empty=/lists/list-1?state=empty",
  "journey-empty=/lists/list-2?state=empty", "registries=/registries", "registry-owner=/registries/registry-1",
  "registry-shared=/registries/registry-1?view=shared", "registry-share-modal=/registries/registry-1?share=1",
  "styleguide=/styleguide", "search=/search?q=pram", "not-found=/definitely-missing",
];
const pages = (process.argv.slice(3).length ? process.argv.slice(3) : DEFAULT).map((s) => { const i = s.indexOf("="); return [s.slice(0, i), s.slice(i + 1)]; });
const WIDTHS = [1440, 402];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true,
    args: ["--no-first-run", "--disable-gpu"],
  });
  const summary = [];
  for (const [name, route] of pages) {
    for (const width of WIDTHS) {
      const page = await browser.newPage();
      const errors = [];
      page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errors.push(`${m.type()}: ${m.text().split("\n")[0].slice(0, 160)}`); });
      page.on("pageerror", (e) => errors.push(`pageerror: ${String(e.message).split("\n")[0].slice(0, 160)}`));
      await page.setViewport({ width, height: 900, deviceScaleFactor: 1, isMobile: width < 768, hasTouch: width < 768 });
      let status = 0;
      try {
        const res = await page.goto(BASE + route, { waitUntil: "networkidle0", timeout: 120000 });
        status = res ? res.status() : 0;
        await new Promise((r) => setTimeout(r, 400));
        const m = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, h: document.documentElement.scrollHeight, title: document.title }));
        await page.screenshot({ path: path.join(OUT, `${name}-${width}.png`), fullPage: true });
        const overflow = m.sw > m.cw ? `OVERFLOW ${m.sw}>${m.cw}` : "ok";
        const uniq = [...new Set(errors.filter((e) => !/HMR|Fast Refresh|Download the React DevTools/.test(e)))];
        summary.push({ name, width, status, h: m.h, overflow, errors: uniq });
        console.log(`${name.padEnd(22)} ${String(width).padEnd(5)} HTTP ${status}  h=${String(m.h).padStart(5)}  ${overflow.padEnd(18)} ${uniq.length ? uniq.length + " console issue(s)" : ""}`);
        for (const e of uniq.slice(0, 4)) console.log(`      - ${e}`);
      } catch (e) {
        console.log(`${name.padEnd(22)} ${String(width).padEnd(5)} FAILED ${String(e.message).split("\n")[0]}`);
      }
      await page.close();
    }
  }
  await browser.close();
  fs.writeFileSync(path.join(OUT, "summary.json"), JSON.stringify(summary, null, 1));
})();
