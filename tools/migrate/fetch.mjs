import { access, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { CONCURRENCY, DELAY_MS, HTML_DIR, SITEMAPS, URLS_FILE, USER_AGENT } from './config.mjs';
import { cacheKey, ensureDir, pool, sleep, toSlug, writeJson } from './lib.mjs';

const force = process.argv.includes('--force');

const RETRIES = 4;

async function get(url) {
  let lastError;
  for (let attempt = 0; attempt < RETRIES; attempt += 1) {
    try {
      const res = await fetch(url, {
        headers: {
          'user-agent': USER_AGENT,
          accept: 'text/html,application/xhtml+xml,application/xml',
        },
        redirect: 'follow',
        signal: AbortSignal.timeout(30000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (error) {
      lastError = error;
      await sleep(500 * 2 ** attempt);
    }
  }
  throw new Error(`${lastError?.message ?? lastError} for ${url}`);
}

async function readSitemap(url) {
  const xml = await get(url);
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const entries = [];
  for (const [type, sitemap] of Object.entries(SITEMAPS)) {
    const urls = await readSitemap(sitemap);
    console.log(`${type}: ${urls.length} urls`);
    for (const url of urls) {
      entries.push({ url, type, slug: toSlug(url), key: cacheKey(url) });
    }
  }

  await writeJson(URLS_FILE, entries);

  let fetched = 0;
  let cached = 0;
  const failures = [];

  await pool(entries, CONCURRENCY, async (entry) => {
    const file = join(HTML_DIR, `${entry.key}.html`);
    if (!force && (await exists(file))) {
      cached += 1;
      return;
    }
    try {
      const html = await get(entry.url);
      await ensureDir(file);
      await writeFile(file, html);
      fetched += 1;
      await sleep(DELAY_MS);
    } catch (error) {
      failures.push({ url: entry.url, error: String(error.message ?? error) });
    }
  });

  console.log(`fetched ${fetched}, cached ${cached}, failed ${failures.length}`);
  for (const f of failures) console.error(`  ${f.url}: ${f.error}`);
  if (failures.length) process.exitCode = 1;
}

await main();
