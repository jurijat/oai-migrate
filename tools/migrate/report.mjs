import { readFile } from 'node:fs/promises';
import yaml from 'js-yaml';
import { APP_ROUTE_PREFIXES, GENERATED, MANIFEST_FILE, URLS_FILE } from './config.mjs';
import { readJson } from './lib.mjs';

const HTML_ALLOWLIST = new Set(['br']);

function group(entries, key) {
  const out = new Map();
  for (const entry of entries) {
    const k = key(entry);
    out.set(k, (out.get(k) ?? 0) + 1);
  }
  return [...out.entries()].sort((a, b) => b[1] - a[1]);
}

function heading(text) {
  console.log(`\n${text}\n${'-'.repeat(text.length)}`);
}

async function main() {
  const urls = await readJson(URLS_FILE);
  const { entries, assets } = await readJson(MANIFEST_FILE);
  const converted = entries.filter((e) => e.status === 'converted');

  heading('Coverage');
  console.log(`sitemap urls        ${urls.length}`);
  console.log(`manifest entries    ${entries.length}`);
  console.log(`converted           ${converted.length}`);
  console.log(`skipped             ${entries.length - converted.length}`);
  console.log(`assets referenced   ${Object.keys(assets).length}`);
  for (const [kind, count] of group(entries, (e) => e.kind)) {
    console.log(`  ${kind.padEnd(18)}${count}`);
  }

  const missing = urls.filter((u) => !entries.some((e) => e.url === u.url));
  if (missing.length) {
    heading(`Unhandled urls (${missing.length})`);
    for (const m of missing) console.log(`  ${m.url}`);
  }

  const warned = converted.filter((e) => e.warnings.length);
  heading(`Extraction warnings (${warned.length})`);
  for (const e of warned) console.log(`  ${e.slug}: ${e.warnings.join('; ')}`);

  const leftovers = converted.filter(
    (e) => e.leftoverHtml.filter((t) => !HTML_ALLOWLIST.has(t)).length,
  );
  heading(`Files with residual HTML (${leftovers.length})`);
  for (const e of leftovers) {
    const tags = e.leftoverHtml.filter((t) => !HTML_ALLOWLIST.has(t));
    const note = e.kind === 'composed' ? ' (composed draft, rewritten by hand)' : '';
    console.log(`  ${e.file} [${tags.join(', ')}]${note}`);
  }

  const dropped = converted.filter((e) => e.dropped.length);
  heading(`Interactive content removed, needs a component (${dropped.length})`);
  for (const e of dropped) console.log(`  ${e.slug}\n      ${e.dropped.join('\n      ')}`);

  const thin = converted.filter((e) => e.chars < 200);
  heading(`Thin output, under 200 chars (${thin.length})`);
  for (const e of thin) console.log(`  ${e.file} (${e.chars})`);

  let redirects = [];
  try {
    redirects = yaml.load(await readFile('data/redirects.yaml', 'utf8')) ?? [];
  } catch {
    redirects = [];
  }
  const exact = new Set(redirects.filter((r) => !r.from.endsWith('*')).map((r) => r.from));
  const prefixes = redirects.filter((r) => r.from.endsWith('*')).map((r) => r.from.slice(0, -1));

  const known = new Set(converted.map((e) => e.permalink));
  for (const slug of GENERATED) known.add(`/${slug}`);
  for (const from of exact) known.add(from);
  known.add('/');

  const allPrefixes = [...prefixes, ...APP_ROUTE_PREFIXES];
  const covered = (path) => known.has(path) || allPrefixes.some((p) => path.startsWith(p));

  const broken = new Map();
  for (const entry of converted) {
    for (const link of entry.internalLinks) {
      const path = link.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
      if (covered(path)) continue;
      if (path.startsWith('/wp-content') || path.startsWith('/wp-json')) continue;
      if (!broken.has(path)) broken.set(path, new Set());
      broken.get(path).add(entry.slug);
    }
  }
  const sorted = [...broken.entries()].sort((a, b) => b[1].size - a[1].size);
  heading(`Unresolved internal links (${sorted.length})`);
  for (const [path, sources] of sorted.slice(0, 40)) {
    console.log(`  ${path.padEnd(52)} ${sources.size} ref(s)  e.g. ${[...sources][0]}`);
  }
  if (sorted.length > 40) console.log(`  ... and ${sorted.length - 40} more`);

  const blocking = leftovers.filter((e) => e.kind !== 'composed');
  const clean =
    missing.length === 0 && warned.length === 0 && blocking.length === 0 && sorted.length === 0;
  heading(clean ? 'Report clean' : 'Report has findings');
  if (!clean) process.exitCode = 1;
}

await main();
