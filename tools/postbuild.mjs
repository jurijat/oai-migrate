import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import yaml from 'js-yaml';

const OUT = 'out';
const REDIRECTS = 'data/redirects.yaml';
const URLS = '.cache/urls.json';

function stub(target) {
  const escaped = target.replace(/"/g, '&quot;');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Redirecting</title>
<link rel="canonical" href="${escaped}">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=${escaped}">
</head>
<body><p>This page has moved to <a href="${escaped}">${escaped}</a>.</p></body>
</html>
`;
}

function absolute(to) {
  return /^https?:\/\//.test(to) ? to : `https://www.openapis.org${to}`;
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const rules = yaml.load(await readFile(REDIRECTS, 'utf8')) ?? [];
  const exact = rules.filter((rule) => !rule.from.endsWith('*'));
  const prefixes = rules.filter((rule) => rule.from.endsWith('*'));

  for (const rule of exact) {
    const dir = join(OUT, rule.from.replace(/^\//, ''));
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, 'index.html'), stub(absolute(rule.to)));
  }

  const lines = rules.map((rule) => `${rule.from}  ${absolute(rule.to)}  301`);
  await writeFile(join(OUT, '_redirects'), `${lines.join('\n')}\n`);
  console.log(`redirect stubs: ${exact.length}, _redirects rules: ${rules.length}`);

  const urls = JSON.parse(await readFile(URLS, 'utf8'));
  const missing = [];
  for (const { url } of urls) {
    const path = new URL(url).pathname.replace(/^\/+|\/+$/g, '');
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
