import { readFile, writeFile } from 'node:fs/promises';
import yaml from 'js-yaml';
import { DROPPED, LEGACY, LEGACY_PREFIXES, MOVED } from './config.mjs';
import { ensureDir } from './lib.mjs';

const FILE = 'data/redirects.yaml';

function mechanical() {
  const rules = [];
  for (const [slug, reason] of Object.entries(DROPPED)) {
    rules.push({ from: `/${slug}`, to: '/', reason });
  }
  for (const [slug, to] of Object.entries(MOVED)) {
    rules.push({ from: `/${slug}`, to, reason: 'moved to events.openapis.org' });
  }
  for (const [from, to] of Object.entries(LEGACY)) {
    rules.push({ from, to, reason: 'legacy url, 404 on WordPress' });
  }
  for (const [prefix, to] of Object.entries(LEGACY_PREFIXES)) {
    rules.push({ from: `${prefix}*`, to, reason: 'legacy event pages' });
  }
  return rules;
}

async function main() {
  let existing = [];
  try {
    existing = yaml.load(await readFile(FILE, 'utf8')) ?? [];
  } catch {
    existing = [];
  }

  const byFrom = new Map();
  for (const rule of mechanical()) byFrom.set(rule.from, rule);
  for (const rule of existing) byFrom.set(rule.from, rule);

  const rules = [...byFrom.values()].sort((a, b) => a.from.localeCompare(b.from));
  await ensureDir(FILE);
  await writeFile(FILE, yaml.dump(rules, { lineWidth: 120, quotingType: '"' }));
  console.log(`redirects: ${rules.length}`);
}

await main();
