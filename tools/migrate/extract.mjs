import * as cheerio from 'cheerio';
import { classifyPage } from './config.mjs';
import { toPath } from './lib.mjs';

const STRIP_SELECTORS = [
  'script',
  'style',
  'noscript',
  '.comments-section',
  '.comment-wrap',
  '.post-tags',
  '.sharing-default-minimal',
  '.nectar-social',
  '#single-meta',
  '.meta-comment-count',
];

const DATE_FROM_URL = /\/(\d{4})\/(\d{2})\/(\d{2})\//;

const MONO = 'span[style*=monospace], span[style*=Courier], tt, kbd';

function repairCode(text) {
  return text
    .replace(/\u2013/g, '-')
    .replace(/\u2014/g, '--')
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/\u00a0/g, ' ');
}

function normalizeCode($, root) {
  if (!root.length) return 0;
  let blocks = 0;

  root.find('p').each((_, el) => {
    const p = $(el);
    if (!p.find(MONO).length || !p.find('br').length) return;
    const mono = p.find(MONO).text().replace(/\s/g, '').length;
    const all = p.text().replace(/\s/g, '').length;
    if (!all || mono / all < 0.8) return;
    p.html((p.html() ?? '').replace(/<br\s*\/?>[\n\r\t ]*/gi, '<br>'));
    p.find('br').replaceWith('\n');
    const code = repairCode(p.text()).replace(/^\n+|\s+$/g, '');
    p.replaceWith($('<pre>').append($('<code>').text(code)));
    blocks += 1;
  });

  root.find(MONO).each((_, el) => {
    const span = $(el);
    span.replaceWith($('<code>').text(repairCode(span.text())));
  });

  return blocks;
}

function clean(value) {
  return value.replace(/\s+/g, ' ').trim();
}

function cleanTitle($) {
  return $('title')
    .text()
    .replace(/\s*[–-]\s*OpenAPI Initiative\s*$/, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function prepare(html) {
  const $ = cheerio.load(html);
  for (const selector of STRIP_SELECTORS) $(selector).remove();
  return $;
}

const KEEP_ATTRS = new Set(['href', 'src', 'alt', 'title', 'colspan', 'rowspan', 'datetime']);

function stripPresentation($, root) {
  if (!root.length) return;
  root.find('*').each((_, el) => {
    const attribs = el.attribs ?? {};
    for (const name of Object.keys(attribs)) {
      if (!KEEP_ATTRS.has(name.toLowerCase())) $(el).removeAttr(name);
    }
  });
}

const INLINE_FORMAT = 'strong, b, em, i';
const BLOCK_INSIDE =
  'p, div, ul, ol, li, table, h1, h2, h3, h4, h5, h6, blockquote, pre, figure, br, img';

function normalizeEmphasis($, root) {
  if (!root.length) return;

  root.find(INLINE_FORMAT).each((_, el) => {
    const node = $(el);
    if (node.find(BLOCK_INSIDE).length) {
      node.replaceWith(node.contents());
      return;
    }
    if (!clean(node.text())) node.replaceWith(node.contents());
  });
}

function normalizeTables($, root) {
  if (!root.length) return;

  root.find('table').each((_, el) => {
    const table = $(el);

    table.find('td, th').each((_i, cell) => {
      const node = $(cell);
      node.find('ul, ol').each((_j, list) => {
        const items = $(list)
          .find('li')
          .map((_k, li) => clean($(li).html() ?? ''))
          .get()
          .filter(Boolean);
        $(list).replaceWith(items.join('<br>'));
      });
    });

    if (table.find('thead').length) return;
    const first = table.find('tr').first();
    if (!first.length) return;

    const cells = first.find('td').toArray();
    const allBold =
      cells.length > 0 &&
      cells.every((cell) => {
        const node = $(cell);
        return clean(node.text()) === clean(node.find('strong, b').text());
      });

    if (allBold) {
      for (const cell of cells) {
        const node = $(cell);
        node.replaceWith($('<th>').html((node.html() ?? '').replace(/<\/?strong>/g, '')));
      }
      $('<thead>').append(first).prependTo(table);
      return;
    }

    const blank = $('<tr>');
    for (let i = 0; i < cells.length; i += 1) blank.append($('<th>'));
    $('<thead>').append(blank).prependTo(table);
  });
}

function interactive($, root) {
  if (!root.length) return [];
  const found = [];
  root.find('form[action]').each((_, el) => found.push(`form -> ${$(el).attr('action')}`));
  root.find('iframe[src]').each((_, el) => found.push(`iframe -> ${$(el).attr('src')}`));
  return found;
}

function taxonomy($) {
  const classes = ($('article[id^=post-]').attr('class') ?? '').split(/\s+/);
  const categories = classes.filter((c) => c.startsWith('category-')).map((c) => c.slice(9));
  const tags = classes.filter((c) => c.startsWith('tag-')).map((c) => c.slice(4));
  return { categories, tags };
}

export function extractPost(html, entry) {
  const $ = prepare(html);
  const warnings = [];

  const title = $('h1.entry-title').first().text().replace(/\s+/g, ' ').trim() || cleanTitle($);

  const authorLink = $('.meta-author .fn a[rel=author]').first();
  const authorHref = authorLink.attr('href') ?? '';
  const authorSlug = authorHref.split('/').filter(Boolean).pop() ?? '';
  const authorName = authorLink.text().replace(/\s+/g, ' ').trim();
  if (!authorSlug) warnings.push('missing author');
  if (authorSlug && !authorName) warnings.push(`author ${authorSlug} has no display name`);

  const urlDate = DATE_FROM_URL.exec(entry.url);
  if (!urlDate) warnings.push('no date in url');
  const date = urlDate ? `${urlDate[1]}-${urlDate[2]}-${urlDate[3]}` : '';

  const shown = $('.meta-date').first().text().trim();
  if (shown && date) {
    const parsed = new Date(`${shown} UTC`);
    if (!Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) !== date) {
      warnings.push(`date mismatch: url ${date}, page "${shown}"`);
    }
  }

  const { categories, tags } = taxonomy($);
  const category = categories[0] ?? entry.slug.split('/')[0];

  const body = $('.content-inner').first();
  if (!body.length) warnings.push('no .content-inner');
  const codeBlocks = normalizeCode($, body);
  normalizeTables($, body);
  normalizeEmphasis($, body);
  const dropped = interactive($, body);
  stripPresentation($, body);

  return {
    kind: 'post',
    url: entry.url,
    slug: entry.slug,
    permalink: toPath(entry.url),
    title,
    date,
    author: authorSlug,
    authorName,
    category,
    categories,
    tags,
    bodyHtml: body.html() ?? '',
    codeBlocks,
    dropped,
    warnings,
  };
}

export function extractPage(html, entry) {
  const $ = prepare(html);
  const warnings = [];
  const title = cleanTitle($);

  const body = $('.container.main-content').first();
  if (!body.length) warnings.push('no .container.main-content');

  const heading = body.find('h1').first();
  if (heading.length && heading.text().replace(/\s+/g, ' ').trim() === title) heading.remove();

  const codeBlocks = normalizeCode($, body);
  normalizeTables($, body);
  normalizeEmphasis($, body);
  const dropped = interactive($, body);
  stripPresentation($, body);

  return {
    kind: 'page',
    url: entry.url,
    slug: entry.slug,
    permalink: toPath(entry.url) || '/',
    title,
    pageKind: classifyPage(entry.slug),
    bodyHtml: body.html() ?? '',
    codeBlocks,
    dropped,
    warnings,
  };
}

export function extract(html, entry) {
  return entry.type === 'post' ? extractPost(html, entry) : extractPage(html, entry);
}
