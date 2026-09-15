import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import * as cheerio from 'cheerio';

const OUT = 'out';
const MIN_CHARS = 40;

const ALLOWED_EMPTY = new Set(['out/404/index.html', 'out/404.html', 'out/_not-found/index.html']);

const EMPTY_SOURCE = new Set([
  'out/uncategorized/2016/03/07/tony-tam-recounts-the-history-of-swagger-and-the-open-api-initiative-developerworks-tv/index.html',
]);

const RAW_MARKDOWN = [
  { name: 'bold', re: /\*\*[^*\n]{2,60}\*\*/ },
  { name: 'heading', re: /^#{1,6}\s+\S/m },
  { name: 'link', re: /\[[^\]\n]{2,60}\]\((?:\/|https?:)[^)\n]{2,120}\)/ },
  { name: 'table-rule', re: /^\|\s*-{3,}\s*\|/m },
  { name: 'list-item', re: /^[-*]\s{3}\S/m },
  { name: 'frontmatter', re: /^---\s*$/m },
  { name: 'wordpress-shortcode', re: /\[\/?[a-z][a-z0-9_]*\s+[a-z_]+=["\u201c\u201d][^\]\n]*\]/ },
];

async function walk(dir) {
  const out = [];
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, item.name);
    if (item.isDirectory()) out.push(...(await walk(full)));
    else if (item.name === 'index.html' || item.name.endsWith('.html')) out.push(full);
  }
  return out;
}

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function resolves(href) {
  const clean = decodeURIComponent(href.split(/[?#]/)[0]).replace(/^\/+|\/+$/g, '');
  if (!clean) return true;
  return (
    (await exists(join(OUT, clean, 'index.html'))) ||
    (await exists(join(OUT, clean))) ||
    (await exists(join(OUT, `${clean}.html`)))
  );
}

async function main() {
  const files = await walk(OUT);
  const empty = [];
  const stubs = [];
  const leaking = [];
  const broken = new Map();
  const seenHref = new Map();

  for (const file of files) {
    const html = await readFile(file, 'utf8');
    const $ = cheerio.load(html);
    const isRedirect = $('meta[http-equiv="refresh"]').length > 0;

    for (const [, href] of html.matchAll(/href="(\/[^"#][^"]*)"/g)) {
      if (href.startsWith('/_next/')) continue;
      if (!seenHref.has(href)) seenHref.set(href, file);
    }

    if (isRedirect) continue;

    $('script,style,noscript,nav,header,footer').remove();
    const article = $('article').first();
    const root = article.length ? article : $('main').first();
    const text = root.text().replace(/\s+/g, ' ').trim();

    if (!root.length || text.length < MIN_CHARS) {
      if (!ALLOWED_EMPTY.has(file) && !EMPTY_SOURCE.has(file)) empty.push(file);
      continue;
    }
    if (/could not be found|404/i.test($('h1').first().text())) stubs.push(file);

    for (const rule of RAW_MARKDOWN) {
      if (rule.re.test(text)) {
        leaking.push(`${file} [${rule.name}]`);
        break;
      }
    }
  }

  for (const [href, source] of seenHref) {
    if (!(await resolves(href))) broken.set(href, source);
  }

  const report = (label, items) => {
    console.log(`\n${label}: ${items.length}`);
    for (const item of items.slice(0, 20)) console.log(`  ${item}`);
    if (items.length > 20) console.log(`  ... and ${items.length - 20} more`);
  };

  console.log(`scanned ${files.length} html files, ${seenHref.size} unique internal links`);
  report('Pages with no rendered content', empty);
  report('Pages that are really the 404', stubs);
  report('Pages leaking raw markdown', leaking);
  report(
    'Broken internal links',
    [...broken].map(([href, source]) => `${href}   (from ${source})`),
  );

  const failures = empty.length + stubs.length + leaking.length + broken.size;
  console.log(failures ? `\n${failures} problem(s)` : '\nall pages render, no broken links');
  if (failures) process.exitCode = 1;
}

await main();
