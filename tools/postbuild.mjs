import { access, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import yaml from 'js-yaml';

const OUT = 'out';
const REDIRECTS = 'data/redirects.yaml';
const URLS = 'data/source-urls.json';
const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/+$/, '');
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.openapis.org').replace(
  /\/+$/,
  '',
);

function escapeHtml(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function stub(target, canonical) {
  const href = escapeHtml(target);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Redirecting</title>
<link rel="canonical" href="${escapeHtml(canonical)}">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=${href}">
</head>
<body><p>This page has moved to <a href="${href}">${href}</a>.</p></body>
</html>
`;
}

function isExternal(to) {
  return /^https?:\/\//.test(to);
}

function deployed(to) {
  return isExternal(to) ? to : `${BASE_PATH}${to}`;
}

function canonical(to) {
  return isExternal(to) ? to : `${SITE_URL}${to}`;
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir) {
  const out = [];
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, item.name);
    if (item.isDirectory()) out.push(...(await walk(full)));
    else if (item.name.endsWith('.html')) out.push(full);
  }
  return out;
}

async function linkedUnder(prefixes) {
  if (!prefixes.length) return new Map();
  const found = new Map();

  for (const file of await walk(OUT)) {
    const html = await readFile(file, 'utf8');
    for (const [, href] of html.matchAll(/href="(\/[^"#?][^"]*)"/g)) {
      const path = href.replace(/\/+$/, '');
      const rule = prefixes.find((r) => path.startsWith(r.from.slice(0, -1)));
      if (rule && !found.has(path)) found.set(path, rule.to);
    }
  }

  return found;
}

async function main() {
  const rules = yaml.load(await readFile(REDIRECTS, 'utf8')) ?? [];
  const exact = rules.filter((rule) => !rule.from.endsWith('*'));
  const prefixes = rules.filter((rule) => rule.from.endsWith('*'));

  for (const rule of exact) {
    const dir = join(OUT, rule.from.replace(/^\//, ''));
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, 'index.html'), stub(deployed(rule.to), canonical(rule.to)));
  }

  const expanded = await linkedUnder(prefixes);
  let expandedCount = 0;
  for (const [path, target] of expanded) {
    const dir = join(OUT, path.replace(/^\//, ''));
    if (await exists(join(dir, 'index.html'))) continue;
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, 'index.html'), stub(deployed(target), canonical(target)));
    expandedCount += 1;
  }
  if (expandedCount) console.log(`prefix-rule stubs: ${expandedCount}`);

  const lines = rules.map((rule) => `${rule.from}  ${deployed(rule.to)}  301`);
  await writeFile(join(OUT, '_redirects'), `${lines.join('\n')}\n`);
  console.log(`redirect stubs: ${exact.length}, _redirects rules: ${rules.length}`);

  const urls = JSON.parse(await readFile(URLS, 'utf8'));
  const missing = [];
  for (const { url } of urls) {
    const raw = new URL(url).pathname.replace(/^\/+|\/+$/g, '');
    let path = raw;
    try {
      path = decodeURIComponent(raw);
    } catch {
      path = raw;
    }
    const covered =
      (await exists(join(OUT, path, 'index.html'))) ||
      prefixes.some((rule) => `/${path}`.startsWith(rule.from.slice(0, -1)));
    if (!covered) missing.push(`/${path}`);
  }

  if (missing.length) {
    console.error(`\nURL parity failed: ${missing.length} sitemap urls do not resolve`);
    for (const path of missing.slice(0, 30)) console.error(`  ${path}`);
    process.exit(1);
  }
  console.log(`url parity: ${urls.length}/${urls.length} sitemap urls resolve`);
}

await main();
