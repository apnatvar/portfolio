import AxeBuilder from "@axe-core/playwright";
import { expect, test as baseTest, type Page } from "@playwright/test";

const test = baseTest;
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://127.0.0.1:${process.env.PLAYWRIGHT_PORT ?? "3000"}`;
const pageErrors = new WeakMap<Page, string[]>();

const routes = [
  "/",
  "/front-end",
  "/seo",
  "/about-ap",
  "/hire-ap",
  "/services",
  "/services/technical-seo",
  "/services/programmatic-seo",
  "/services/seo-automation",
  "/services/core-web-vitals",
  "/services/nextjs-developer",
  "/services/web-automation-consultant",
  "/services/full-stack-developer-for-startups",
  "/ideals",
  "/links",
  "/tools",
  "/tools/metadata-checker",
  "/tools/developer-focus-planner",
  "/tools/decision-confidence-calculator",
  "/work",
  "/writing",
  "/writing/nextjs-technical-seo-checklist",
  "/writing/programmatic-seo-quality-gates",
  "/writing/nextjs-performance-workflow",
  "/portable-context",
  "/test",
];

const viewportWidths = [320, 375, 390, 768, 1440];
const noindexRoutes = new Set(["/test"]);

test("public routes do not report console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  for (const path of routes) {
    await page.goto(path);
    if (path !== "/test") await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test("machine-readable routes remain available and exclude the test page from the sitemap", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  expect(xml).toContain("https://apnatva.dev/tools");
  expect(xml).not.toContain("https://apnatva.dev/test");
  for (const path of ["/robots.txt", "/llms.txt", "/llms-full.txt"]) {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain("apnatva.dev");
  }
});

test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  pageErrors.set(page, errors);
  page.on("pageerror", (error) => errors.push(error.message));
});

test.afterEach(async ({ page }) => {
  expect(pageErrors.get(page) ?? [], "The browser page should not raise uncaught JavaScript errors").toEqual([]);
});

async function expectNoHorizontalOverflow(page: Page, width: number) {
  await page.setViewportSize({ width, height: 900 });
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
}

test.describe("public routes", () => {
  for (const path of routes) {
    test(`${path} renders with valid metadata, links, responsive width, and axe`, async ({ page, request }) => {
      test.setTimeout(90_000);
      const response = await page.goto(path);
      expect(response?.status(), `${path} should return a successful HTML response`).toBeLessThan(400);
      await expect(page.locator("html")).toHaveAttribute("lang", "en");
      expect((await page.title()).trim()).not.toBe("");

      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      expect(canonical, `${path} should declare a canonical URL`).toBeTruthy();
      expect(new URL(canonical!, page.url()).pathname).toBe(path);

      const robots = (await page.locator('meta[name="robots"]').getAttribute("content")) ?? "";
      if (noindexRoutes.has(path)) {
        expect(robots).toContain("noindex");
      } else {
        expect(robots).not.toContain("noindex");
        expect(await page.locator('meta[name="description"]').getAttribute("content")).toBeTruthy();
        expect(await page.locator('meta[property="og:title"]').getAttribute("content")).toBeTruthy();
        expect(await page.locator('meta[property="og:image"]').getAttribute("content")).toBeTruthy();
      }

      if (path !== "/test") await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
      if (!noindexRoutes.has(path)) await expect(page.getByPlaceholder("send me a message")).toBeVisible();

      const internalTargets = await page.locator("main a[href]").evaluateAll((anchors) => {
        const currentOrigin = window.location.origin;
        return [...new Set(anchors
          .map((anchor) => (anchor as HTMLAnchorElement).href)
          .filter((href) => href.startsWith(currentOrigin))
          .map((href) => {
            const url = new URL(href);
            return url.hash ? null : `${url.pathname}${url.search}`;
          })
          .filter((href): href is string => href !== null))];
      });
      for (const target of internalTargets) {
        const targetResponse = await request.get(target);
        expect(targetResponse.status(), `Internal link from ${path} to ${target}`).toBeLessThan(400);
      }

      for (const width of viewportWidths) await expectNoHorizontalOverflow(page, width);

      if (!noindexRoutes.has(path)) {
        const accessibility = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
          .analyze();
        expect(accessibility.violations, `${path} has axe accessibility violations`).toEqual([]);
      }
    });
  }
});

test("creative home keeps its typography and project links at desktop and mobile widths", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => localStorage.setItem("ap-portfolio-display-mode", "resume"));
  await page.goto("/");

  await expect(page.locator("html")).toHaveAttribute("data-display-mode", "creative");
  await page.evaluate(() => localStorage.setItem("ap-portfolio-display-mode", "swiss"));
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-display-mode", "creative");
  await expect(page.getByRole("heading", { name: "A little particular." })).toBeVisible();
  await expect(page.getByRole("img", { name: "AP sitting beside a wall of design prints" })).toBeVisible();
  await expect(page.getByRole("button", { name: /display mode/i })).toHaveCount(0);
  await expect(page.getByRole("link", { name: /resume mode/i })).toHaveCount(0);
  await expect(page.locator("#work .project-name").first()).toBeVisible();
  const headingFont = await page.locator("#work .project-name").first().evaluate((element) => getComputedStyle(element).fontFamily);
  expect(headingFont).toContain("Italianno");

  for (const width of [390, 1440]) {
    await expectNoHorizontalOverflow(page, width);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: `.qa-results/creative-home-${width}.png` });
    const projectLinks = page.locator("#work .project-links a");
    expect(await projectLinks.count()).toBeGreaterThan(0);
    for (const link of await projectLinks.all()) await expect(link).toBeVisible();
    await projectLinks.first().focus();
    await expect(projectLinks.first()).toBeFocused();
    if (width === 1440) {
      await page.locator("#studio").scrollIntoViewIfNeeded();
      await page.screenshot({ path: ".qa-results/creative-studio-1440.png" });
      await page.locator("#contact").scrollIntoViewIfNeeded();
      await page.screenshot({ path: ".qa-results/creative-contact-1440.png" });
    }
  }
});

test("navigation can be opened with the keyboard", async ({ page }) => {
  await page.goto("/about-ap");
  const workLink = page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Work", exact: true });
  await workLink.focus();
  await expect(workLink).toBeFocused();
  await expect(workLink).toHaveAttribute("href", "/#work");
});

test("creative native navigation opens and closes with the keyboard at normal motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.mouse.wheel(0, 500);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  await page.locator("#studio").scrollIntoViewIfNeeded();
  const openMenu = page.getByRole("button", { name: "Open index menu", exact: true });
  await expect(openMenu).toBeVisible();
  await openMenu.focus();
  await page.keyboard.press("Enter");
  const dialog = page.locator("#creative-navigation");
  await expect.poll(() => dialog.evaluate((element) => (element as HTMLDialogElement).open)).toBe(true);
  await page.keyboard.press("Escape");
  await expect.poll(() => dialog.evaluate((element) => (element as HTMLDialogElement).open)).toBe(false);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: ".qa-results/creative-home-motion.png" });
});

test("creative gallery follows the scroll and keeps focused project links in view", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.locator("#work").scrollIntoViewIfNeeded();
  const lastLink = page.locator("#work .project-links a").last();
  await lastLink.focus();
  await expect(lastLink).toBeFocused();
  await expect.poll(() => lastLink.evaluate(element => {
    const bounds = element.getBoundingClientRect();
    return bounds.left >= 0 && bounds.right <= window.innerWidth;
  })).toBe(true);
  await page.screenshot({ path: ".qa-results/creative-gallery-motion.png" });
});

test("GSAP smooth scrolling preserves fixed navigation, form focus, and route cleanup", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  for (const path of ["/about-ap", "/hire-ap"]) {
    await page.goto(path);
    await expect.poll(() => page.locator("[data-smooth-content]").evaluate(element => getComputedStyle(element).transform)).not.toBe("none");
    await page.mouse.wheel(0, 500);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(100);
    const navigation = page.getByRole("navigation", { name: "Primary navigation" });
    await expect.poll(() => navigation.evaluate(element => {
      const bounds = element.getBoundingClientRect();
      return bounds.top >= 0 && bounds.bottom <= window.innerHeight;
    })).toBe(true);
    await expect(page.locator("[data-smooth-content] .folio-nav")).toHaveCount(0);
    await page.getByLabel("Your message", { exact: true }).fill("A local focus check.");
    await page.getByRole("button", { name: "Send message", exact: true }).click();
    await expect(page.getByLabel("Your email address", { exact: true })).toBeFocused();
  }
  await page.getByRole("button", { name: "Open index menu", exact: true }).click();
  await page.getByRole("link", { name: "Technical SEO", exact: false }).click();
  await expect(page).toHaveURL(/\/seo$/);
  await expect(page.locator("[data-smooth-wrapper]")).toHaveCount(0);
  await expect.poll(() => page.evaluate(() => getComputedStyle(document.body).position)).not.toBe("fixed");
});

test("metadata checker reports valid and invalid markup without a network request", async ({ page }) => {
  let requests = 0;
  page.on("request", request => { if (["fetch", "xhr"].includes(request.resourceType()) && !new URL(request.url()).searchParams.has("_rsc")) requests++; });
  await page.goto("/tools/metadata-checker");
  const textarea = page.getByLabel("HTML source");
  await textarea.fill('<!doctype html><html><head><title>Example</title><meta name="description" content="Useful description"><link rel="canonical" href="https://example.com/page"><script type="application/ld+json">{"@type":"Thing"}</script></head><body><h1>Example</h1></body></html>');
  const beforeCheck = requests;
  await page.getByRole("button", { name: "Check HTML" }).click();
  await expect(page.getByText("https://example.com/page", { exact: true })).toBeVisible();
  await expect(page.getByText("1 of 1 script parse as JSON")).toBeVisible();
  await expect(page.locator("li").filter({ hasText: "Canonical URL" })).toHaveClass(/border-emerald-500/);
  expect(requests).toBe(beforeCheck);

  await textarea.fill('<html><head><link rel="canonical" href="/relative"><script type="application/ld+json">{broken}</script></head><body></body></html>');
  await page.getByRole("button", { name: "Check HTML" }).click();
  await expect(page.getByText("/relative", { exact: true })).toBeVisible();
  await expect(page.getByText("0 of 1 script parse as JSON")).toBeVisible();
  await expect(page.locator("li").filter({ hasText: "Canonical URL" })).toHaveClass(/border-red-500/);
});

test("metadata checker reports invalid canonical and JSON-LD separately", async ({ page }) => {
  await page.goto("/tools/metadata-checker");
  await page.getByLabel("HTML source").fill('<link rel="canonical" href="javascript:alert(1)"><script type="application/ld+json">{invalid}</script>');
  await page.getByRole("button", { name: "Check HTML" }).click();
  await expect(page.getByText("javascript:alert(1)", { exact: true })).toBeVisible();
  await expect(page.getByText("0 of 1 script parse as JSON")).toBeVisible();
  await expect(page.locator("li").filter({ hasText: "Canonical URL" })).toHaveClass(/border-red-500/);
});

test("200% text resizing remains usable on key routes", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const path of ["/", "/hire-ap", "/tools"]) {
    await page.goto(path);
    await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
    await expect(page.getByRole("button", { name: /display mode/i })).toHaveCount(0);
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(1441);
  }
});

test("homepage content and metadata are present in server HTML without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const response = await page.goto("/");
  expect(response?.status()).toBeLessThan(400);

  const html = await response!.text();
  expect(html).toContain("<h1");
  expect(html).toContain("Apnatva Singh Rawat");
  expect(html).toContain('rel="canonical"');
  expect(html).toContain('name="description"');
  await expect(page.getByRole("heading", { name: "A little particular.", level: 1 })).toBeVisible();
  expect(errors).toEqual([]);
  await context.close();
});

test("message composer validates in two steps and handles mocked success and failure", async ({ page }) => {
  let requestCount = 0;
  let submittedPayload: Record<string, unknown> | undefined;
  await page.route("**/api/hire-ap", async (route) => {
    requestCount++;
    submittedPayload = route.request().postDataJSON() as Record<string, unknown>;
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true, message: "Message sent. Thanks for the note." }),
    });
  });
  await page.goto("/hire-ap");
  const message = page.getByLabel("Your message");
  const email = page.getByLabel("Your email address");
  const sendButton = page.getByRole("button", { name: "Send message" });
  await expect(email).toBeHidden();
  await sendButton.click();
  await expect(email).toBeHidden();
  expect(requestCount).toBe(0);

  await message.fill("Automated browser QA message.");
  await sendButton.click();
  await expect(email).toBeVisible();
  await expect(email).toHaveAttribute("placeholder", "your@email.com");
  await email.fill("qa@example.com");
  await sendButton.click();
  await expect(page.getByRole("region", { name: "Send AP a message" }).getByRole("status")).toContainText("Message sent. Thanks for the note.");
  expect(submittedPayload).toMatchObject({
    email: "qa@example.com",
    message: "Automated browser QA message.",
    website: "",
  });
  expect(requestCount).toBe(1);

  await page.unrouteAll();
  await page.route("**/api/hire-ap", async (route) => {
    requestCount++;
    await route.fulfill({
      status: 502,
      contentType: "application/json",
      body: JSON.stringify({ success: false, message: "QA mock rejection." }),
    });
  });
  await page.goto("/hire-ap");
  await page.getByLabel("Your message").fill("Automated browser QA retry.");
  await page.getByRole("button", { name: "Send message" }).click();
  await page.getByLabel("Your email address").fill("qa@example.com");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("region", { name: "Send AP a message" }).getByRole("alert")).toContainText("Your message couldn’t be sent.");
  await expect(page.getByLabel("Your email address")).toHaveValue("qa@example.com");
  await expect(page.getByLabel("Your message")).toHaveValue("Automated browser QA retry.");
  expect(requestCount).toBe(2);
});

test("hire API rejects malformed requests before any external submission", async ({ request }) => {
  for (const data of ["{", "null", "[]"]) {
    const response = await request.post("/api/hire-ap", { data, headers: { "Content-Type": "application/json" } });
    expect(response.status()).toBe(400);
  }
  const invalidRequests = [
    { data: {}, message: "Invalid email address." },
    { data: { email: "not-an-email", message: "Message body" }, message: "Invalid email address." },
    { data: { email: "qa@example.com", message: "   " }, message: "Message is required." },
    { data: { email: `${"a".repeat(243)}@example.com`, message: "Message body" }, message: undefined },
    { data: { email: "qa@example.com", message: "x".repeat(1201) }, message: "Message is too long." },
  ];
  for (const { data, message } of invalidRequests) {
    const response = await request.post("/api/hire-ap", { data });
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.success).toBe(false);
    if (message) expect(body.message).toBe(message);
  }
});

test("hire API rejects honeypot, cross-origin, and oversized requests before submission", async ({ request }) => {
  const basePayload = { email: "qa@example.com", message: "Automated validation request." };
  const honeypot = await request.post("/api/hire-ap", { data: { ...basePayload, website: "https://spam.example" } });
  expect(honeypot.status()).toBe(400);

  const crossOrigin = await request.post("/api/hire-ap", {
    data: basePayload,
    headers: { Origin: "https://untrusted.example" },
  });
  expect(crossOrigin.status()).toBe(403);

  const oversized = await request.post("/api/hire-ap", {
    data: { email: "qa@example.com", message: "x".repeat(17_000) },
  });
  expect(oversized.status()).toBe(413);
});

test("browser tools calculate results and report unavailable clipboard access", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: async () => { throw new Error("Clipboard denied by QA"); } },
    });
  });
  await page.goto("/tools/developer-focus-planner");
  await page.getByRole("button", { name: "Build my schedule" }).click();
  await expect(page.getByText(/Generated .*Balanced/)).toBeVisible();

  await page.goto("/tools/decision-confidence-calculator");
  await page.getByLabel("Decision title").fill("QA framework migration");
  await page.getByRole("button", { name: "Calculate readiness" }).click();
  await expect(page.getByText("Recommendation", { exact: true })).toBeVisible();
  await expect(page.getByText("For: QA framework migration")).toBeVisible();
  await page.getByRole("button", { name: "Copy text" }).click();
  await expect(page.locator('main p[role="status"]')).toContainText("Clipboard access is unavailable");
});
