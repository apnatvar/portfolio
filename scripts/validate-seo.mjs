import { readFile } from 'node:fs/promises';
const base = (process.env.SEO_BASE_URL ?? 'http://127.0.0.1:3000').replace(/\/$/, '');
const canonicalOrigin = 'https://apnatva.dev';
const failures = [];
const cache = new Map();
const get = async (path) => {
  if (!cache.has(path)) cache.set(path, fetch(`${base}${path}`, { redirect: 'manual' }).then(async response => ({ status: response.status, html: await response.text() })));
  return cache.get(path);
};
const assert = (condition, message) => { if (!condition) failures.push(message); };
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)].map(m => [m[1].toLowerCase(), m[2].replaceAll('&amp;', '&')]));
const tags = (html, tag) => [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, 'gi'))].map(m => attrs(m[0]));
const sitemap = await get('/sitemap.xml');
assert(sitemap.status === 200, 'Sitemap must return 200');
const urls = [...sitemap.html.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
assert(urls.length > 20, 'Expected populated sitemap with specialist routes');
assert(new Set(urls).size === urls.length, 'Duplicate sitemap URLs');
assert(!urls.some(url => url.endsWith('/test')), 'Test page must stay out of sitemap');
const titles = new Set(), descriptions = new Set();
for (const url of urls) {
  assert(new URL(url).origin === canonicalOrigin, `Wrong sitemap host: ${url}`);
  const path = new URL(url).pathname;
  const {status, html} = await get(path);
  assert(status === 200, `${path}: HTTP ${status}`);
  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1];
  const meta = tags(html, 'meta');
  const description = meta.find(m => m.name === 'description')?.content;
  const canonical = tags(html, 'link').filter(m => m.rel === 'canonical');
  assert(Boolean(title) && !titles.has(title), `${path}: missing/duplicate title`); titles.add(title);
  assert(Boolean(description) && !descriptions.has(description), `${path}: missing/duplicate description`); descriptions.add(description);
  assert(canonical.length === 1 && canonical[0].href.replace(/\/$/, '') === url.replace(/\/$/, ''), `${path}: canonical mismatch`);
  assert(!meta.some(m => /robots/i.test(m.name ?? '') && /noindex/i.test(m.content ?? '')), `${path}: unintended noindex`);
  assert(meta.some(m => m.property === 'og:title' && m.content), `${path}: missing OG title`);
  assert(meta.some(m => m.name === 'twitter:title' && m.content), `${path}: missing Twitter title`);
  assert((html.match(/<h1\b/gi) ?? []).length === 1, `${path}: expected one server-rendered H1`);
  assert((html.match(/<main\b/gi) ?? []).length === 1, `${path}: expected one main landmark`);
  for (const [,json] of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(json); } catch { failures.push(`${path}: invalid JSON-LD`); }
  }
  for (const link of tags(html, 'a')) {
    if (!link.href) continue;
    let target; try { target = new URL(link.href, `${canonicalOrigin}${path}`); } catch { failures.push(`${path}: invalid link`); continue; }
    if (target.origin !== canonicalOrigin) continue;
    const result = await get(target.pathname + target.search);
    assert(result.status >= 200 && result.status < 400, `${path}: broken internal link ${link.href} (${result.status})`);
    if (target.hash && result.status === 200) {
      const fragment = decodeURIComponent(target.hash.slice(1));
      assert(tags(result.html, '[a-z][a-z0-9-]*').some(a => a.id === fragment), `${path}: missing fragment ${link.href}`);
    }
  }
}
const robots = await get('/robots.txt');
assert(robots.status === 200 && robots.html.includes(`${canonicalOrigin}/sitemap.xml`), 'robots sitemap declaration');
for (const path of ['/llms.txt', '/llms-full.txt']) {
  const response = await get(path); assert(response.status === 200 && response.html.includes('Next.js Technical SEO Engineer'), `${path}: identity/availability`);
  for (const match of response.html.matchAll(/https:\/\/apnatva\.dev(\/[^\s)\]]*)?/g)) {
    const response = await get(match[1] || '/'); assert(response.status === 200, `${path}: broken discovery URL ${match[0]}`);
  }
}
assert((await get('/not-a-real-page-seo-qa')).status === 404, 'Unknown route must return 404');
assert((await get('/services/not-a-service')).status === 404, 'Unknown service must return 404');
assert((await get('/writing/not-a-guide')).status === 404, 'Unknown guide must return 404');
assert(tags((await get('/test')).html, 'meta').some(m => m.name === 'robots' && /noindex/.test(m.content)), '/test needs noindex');
// Compare static prerendered pages with the sitemap; metadata/image handlers are not HTML landing pages.
try {
 const manifest = JSON.parse(await readFile('.next/prerender-manifest.json', 'utf8'));
 for (const path of Object.keys(manifest.routes)) {
  if (/\.(?:txt|xml)$|\/opengraph-image|\/icon|^\/_|^\/test$/.test(path)) continue;
  assert(urls.some(url => new URL(url).pathname === path), `Prerendered page missing from sitemap: ${path}`);
 }
} catch (error) { failures.push(`Build manifest unavailable: ${error.message}`); }
if (failures.length) { console.error([...new Set(failures)].join('\n')); process.exitCode = 1; }
else console.log(`SEO checks passed: ${urls.length} canonical pages; metadata, JSON-LD syntax, internal links/fragments, sitemap coverage, robots, discovery files and 404s. No indexing or rich-result eligibility claim.`);
