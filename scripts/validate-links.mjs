import { mkdir, writeFile } from 'node:fs/promises';
const base = (process.env.SEO_BASE_URL ?? 'http://127.0.0.1:3000').replace(/\/$/, '');
const canonical = 'https://apnatva.dev';
const xml = await (await fetch(base + '/sitemap.xml')).text();
const pages = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]).pathname);
const destinations = new Map();
for (const path of pages) {
  const response = await fetch(base + path);
  const html = await response.text();
  for (const match of html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/gi)) {
    const raw = match[1].replaceAll('&amp;', '&');
    let url;
    try { url = new URL(raw, canonical + path); } catch { throw new Error(`Invalid URL ${raw} on ${path}`); }
    if (!destinations.has(url.href)) destinations.set(url.href, { url: url.href, sources: [] });
    destinations.get(url.href).sources.push(path);
  }
}
const results = [];
const queue = [...destinations.values()];
async function worker() {
  while (queue.length) {
    const item = queue.shift();
    const url = new URL(item.url);
    if (!['http:', 'https:'].includes(url.protocol)) { results.push({ ...item, state: 'non-http', scheme: url.protocol }); continue; }
    const internal = url.origin === canonical;
    const target = internal ? base + url.pathname + url.search : item.url;
    try {
      const response = await fetch(target, { redirect: 'follow', signal: AbortSignal.timeout(15000), headers: { 'User-Agent': 'Mozilla/5.0 (compatible; PortfolioLinkAudit/1.0)' } });
      let state = response.ok ? 'ok' : [404, 410].includes(response.status) ? 'broken' : 'manual-review';
      if (internal && url.hash && response.ok) {
        const html = await response.text();
        const id = decodeURIComponent(url.hash.slice(1));
        if (![...html.matchAll(/\bid=["']([^"']+)["']/g)].some(match => match[1] === id)) state = 'missing-fragment';
      } else { await response.body?.cancel(); }
      results.push({ ...item, internal, status: response.status, finalUrl: response.url, state });
    } catch (error) { results.push({ ...item, internal, state: 'manual-review', error: error.message }); }
  }
}
await Promise.all(Array.from({ length: 5 }, worker));
await mkdir('.qa-results', { recursive: true });
await writeFile('.qa-results/link-audit.json', JSON.stringify(results, null, 2));
const summary = { pages: pages.length, destinations: results.length, internal: results.filter(r => r.internal).length, external: results.filter(r => r.internal === false).length, nonHttp: results.filter(r => r.state === 'non-http').length, broken: results.filter(r => ['broken', 'missing-fragment'].includes(r.state)), manualReview: results.filter(r => r.state === 'manual-review') };
console.log(JSON.stringify(summary, null, 2));
if (summary.broken.length) process.exitCode = 1;
