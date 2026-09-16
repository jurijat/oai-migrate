import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import * as cheerio from 'cheerio';
import { HTML_DIR, MANIFEST_FILE } from './migrate/config.mjs';
import { readJson } from './migrate/lib.mjs';

const OUT = 'out';
const THRESHOLD = Number(process.env.PARITY_THRESHOLD ?? 0.9);
const MIN_WORDS = 12;

const EXPECTED_GAPS = {
  '': 'the hardcoded DeveloperWeek 2026 listing was replaced by a link to events.openapis.org',
};

const STRIP = [
  'script',
  'style',
  'noscript',
  '.comments-section',
  '.comment-wrap',
  '#single-meta',
  '.meta-comment-count',
];

const PAIRED_SHORTCODE = /\[([a-z][a-z0-9_]*)(?:\s[^\]\n]*)?\][\s\S]*?\[\/\1\]/g;
const SHORTCODE = /\[\/?[a-z][a-z0-9_]*(?=[\s\]])[^\]\n]*\]/g;

function textOf(node) {
  const spaced = (node.html() ?? '').replace(/<[^>]+>/g, ' ');
  return cheerio
    .load(`<body>${spaced}</body>`)('body')
    .text()
    .replace(PAIRED_SHORTCODE, ' ')
    .replace(SHORTCODE, ' ');
}

function words(text) {
  return text
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[^a-z0-9'"]+/g, ' ')
    .trim()
    .split(' ')
    .filter((word) => word.length > 2);
}

function sourceText(html, kind) {
  const $ = cheerio.load(html);
  for (const selector of STRIP) $(selector).remove();
  const root = kind === 'post' ? $('.content-inner').first() : $('.container.main-content').first();
  return words(textOf(root));
}

function outputText(html) {
  const $ = cheerio.load(html);
  $('script,style,noscript,nav,header,footer').remove();
  const article = $('article').first();
  return words(textOf(article.length ? article : $('main')));
}

async function main() {
  const { entries } = await readJson(MANIFEST_FILE);
  const converted = entries.filter((e) => e.status === 'converted' || e.status === 'hand-authored');

  const results = [];
  let checked = 0;

  for (const entry of converted) {
    const key = entry.slug === '' ? '__home' : entry.slug.replace(/\//g, '__');
    let source;
    let output;
    try {
      source = await readFile(join(HTML_DIR, `${key}.html`), 'utf8');
      const raw = entry.permalink.replace(/^\/+|\/+$/g, '');
      let path = raw;
      try {
        path = decodeURIComponent(raw);
      } catch {
        path = raw;
      }
      output = await readFile(join(OUT, path, 'index.html'), 'utf8');
    } catch {
      results.push({ slug: entry.slug, ratio: 0, missing: ['page not built'] });
      continue;
    }

    const src = sourceText(source, entry.kind === 'post' ? 'post' : 'page');
    if (src.length < MIN_WORDS) continue;

    const have = new Set(outputText(output));
    const absent = src.filter((word) => !have.has(word));
    const ratio = 1 - absent.length / src.length;
    checked += 1;

    results.push({
      slug: entry.slug,
      kind: entry.kind,
      words: src.length,
      ratio,
      missing: [...new Set(absent)].slice(0, 12),
    });
  }

  results.sort((a, b) => a.ratio - b.ratio);
  const below = results.filter((r) => r.ratio < THRESHOLD);
  const failing = below.filter((r) => !(r.slug in EXPECTED_GAPS));
  const expected = below.filter((r) => r.slug in EXPECTED_GAPS);

  console.log(`checked ${checked} pages against the cached WordPress source`);
  console.log(`threshold ${(THRESHOLD * 100).toFixed(0)}% of source words present in output\n`);

  for (const result of failing) {
    console.log(
      `  ${(result.ratio * 100).toFixed(1).padStart(5)}%  ${result.slug} (${result.words} words)`,
    );
    if (result.missing.length) console.log(`          missing: ${result.missing.join(', ')}`);
  }

  if (expected.length) {
    console.log('\nDeclared gaps (not failures):');
    for (const result of expected) {
      console.log(
        `  ${(result.ratio * 100).toFixed(1)}%  /${result.slug} — ${EXPECTED_GAPS[result.slug]}`,
      );
    }
  }

  const mean = results.reduce((sum, r) => sum + r.ratio, 0) / (results.length || 1);
  console.log(`\nmean coverage ${(mean * 100).toFixed(2)}%`);
  console.log(
    failing.length ? `${failing.length} page(s) below threshold` : 'all pages above threshold',
  );
  if (failing.length) process.exitCode = 1;
}

await main();
