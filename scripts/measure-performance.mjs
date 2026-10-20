import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { chromium } from "@playwright/test";

const baseUrl = (process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3000").replace(/\/$/, "");
const runId = new Date().toISOString().replace(/[:.]/g, "-");
const outputDir = join(process.cwd(), ".qa-results", "lighthouse", runId);
const pages = [
  { name: "home", path: "/" },
  { name: "tools", path: "/tools" },
  { name: "focus-planner", path: "/tools/developer-focus-planner" },
].filter((page) => !process.env.LIGHTHOUSE_PAGES || process.env.LIGHTHOUSE_PAGES.split(",").includes(page.name));
if (!pages.length) throw new Error("LIGHTHOUSE_PAGES must include home, tools, or focus-planner.");
const formFactors = ["mobile", "desktop"];
const categories = ["performance", "accessibility", "best-practices", "seo"];

await mkdir(outputDir, { recursive: true });
console.log(`Saving reports to ${outputDir}`);
const chrome = await launch({
  chromePath: process.env.CHROME_PATH ?? chromium.executablePath(),
  chromeFlags: ["--headless=new", "--no-sandbox"],
});

try {
  for (const page of pages) {
    for (const formFactor of formFactors) {
      const { lhr, report } = await lighthouse(`${baseUrl}${page.path}`, {
        port: chrome.port,
        output: ["json", "html"],
        onlyCategories: categories,
        formFactor,
        screenEmulation: formFactor === "desktop"
          ? { mobile: false, width: 1440, height: 900, deviceScaleFactor: 1 }
          : undefined,
      });

      const stem = `${page.name}-${formFactor}`;
      await writeFile(join(outputDir, `${stem}.report.json`), report[0]);
      await writeFile(join(outputDir, `${stem}.report.html`), report[1]);
      const scores = Object.fromEntries(categories.map((category) => [
        category,
        Math.round((lhr.categories[category]?.score ?? 0) * 100),
      ]));
      const metrics = Object.fromEntries(["first-contentful-paint", "largest-contentful-paint", "total-blocking-time", "cumulative-layout-shift"].map((id) => [
        id,
        lhr.audits[id]?.displayValue ?? "unavailable",
      ]));
      console.log(`${stem}: ${JSON.stringify({ scores, metrics })}`);
    }
  }
} finally {
  await chrome.kill();
}
