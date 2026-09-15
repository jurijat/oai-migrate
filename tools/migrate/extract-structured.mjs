import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import * as cheerio from 'cheerio';
import yaml from 'js-yaml';
import { HTML_DIR } from './config.mjs';
import { ensureDir, localAssetPath, stripSizeSuffix } from './lib.mjs';

function load(key) {
  return readFile(join(HTML_DIR, `${key}.html`), 'utf8').then((html) => {
    const $ = cheerio.load(html);
    $('script,style,noscript').remove();
    return $;
  });
}

function clean(text) {
  return text.replace(/\s+/g, ' ').trim();
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function testimonials() {
  const $ = await load('testimonials');
  const rows = $('.container.main-content .wpb_row').filter(
    (_, el) => $(el).find('img').length > 0,
  );

  const out = [];
  const assets = new Map();

  rows.each((_, el) => {
    const row = $(el);
    const img = row.find('img').first();
    const src = stripSizeSuffix((img.attr('src') ?? '').split('?')[0]);
    const quote = clean(row.text());
    if (!src || !quote) return;

    const logo = localAssetPath(src);
    if (logo) assets.set(src, logo);

    const file = src.split('/').pop() ?? '';
    out.push({
      slug: slugify(file.replace(/\.[a-z0-9]+$/i, '')),
      logo: logo ?? src,
      logoAlt: clean(img.attr('alt') ?? '') || undefined,
      quote,
    });
  });

  return { entries: out, assets };
}

async function people() {
  const $ = await load('about__technical-developer-community');
  const root = $('.container.main-content');

  const current = [];
  const assets = new Map();
  const seen = new Set();

  root.find('.people.vc_col-sm-4, .people[class*="vc_col"]').each((_, el) => {
    const card = $(el);
    const name = clean(card.find('h3, h4').first().text());
    if (!name || seen.has(name)) return;

    const src = stripSizeSuffix((card.find('img').first().attr('src') ?? '').split('?')[0]);
    if (!src) return;
    seen.add(name);

    const headings = card
      .find('h3, h4, p')
      .map((_i, node) => clean($(node).text()))
      .get();
    const term = headings.find((text) => /\d{4}\s*[-\u2013\u2014]\s*(current|\d{4})/i.test(text));

    const photo = localAssetPath(src);
    if (photo) assets.set(src, photo);

    current.push({
      slug: slugify(name),
      name,
      term: term ? term.replace(/\s*[-\u2013\u2014]\s*/, '\u2013') : undefined,
      photo: photo ?? src,
    });
  });

  const former = [];
  root.find('h3, h4, li, p').each((_, el) => {
    const match = /^(.+?)\s*\((\d{4})\s*-\s*(\d{4})\)$/.exec(clean($(el).text()));
    if (!match) return;
    const name = match[1];
    if (former.some((entry) => entry.name === name)) return;
    former.push({ slug: slugify(name), name, term: `${match[2]}–${match[3]}` });
  });

  return { current, former, assets };
}

async function main() {
  const t = await testimonials();
  const p = await people();

  await ensureDir('data/testimonials.yaml');
  await writeFile(
    'data/testimonials.yaml',
    yaml.dump(t.entries, { lineWidth: 120, quotingType: '"' }),
  );
  await writeFile(
    'data/people.yaml',
    yaml.dump({ current: p.current, former: p.former }, { lineWidth: 120, quotingType: '"' }),
  );

  const extra = Object.fromEntries([...t.assets, ...p.assets]);
  await writeFile('data/structured-assets.json', `${JSON.stringify(extra, null, 2)}\n`);

  console.log(`testimonials: ${t.entries.length}`);
  console.log(`tsc current: ${p.current.length}, former: ${p.former.length}`);
  console.log(`extra assets: ${Object.keys(extra).length}`);
}

await main();
