import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const OUT = 'out';
const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/+$/, '');

const ROOT_REF = /(?:src|href)="(\/(?!\/)[^"]*)"/g;

async function walk(dir) {
  const out = [];
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, item.name);
    if (item.isDirectory()) out.push(...(await walk(full)));
    else if (item.name.endsWith('.html')) out.push(full);
  }
  return out;
}

async function main() {
  if (!BASE_PATH) {
    console.log('no NEXT_PUBLIC_BASE_PATH set; skipping');
    return;
  }

  const files = await walk(OUT);
  const offenders = new Map();
  const duplicated = new Map();
  const doubled = `${BASE_PATH}${BASE_PATH}/`;

  for (const file of files) {
    const html = await readFile(file, 'utf8');

    for (const [, ref] of html.matchAll(ROOT_REF)) {
      if (ref.startsWith(`${BASE_PATH}/`) || ref === BASE_PATH) continue;
      const seen = offenders.get(ref) ?? { files: new Set() };
      seen.files.add(file);
      offenders.set(ref, seen);
    }

    for (const [, ref] of html.matchAll(/(?:src|href|content)="([^"]*)"/g)) {
      if (!ref.includes(doubled)) continue;
      const seen = duplicated.get(ref) ?? { files: new Set() };
      seen.files.add(file);
      duplicated.set(ref, seen);
    }
  }

  if (duplicated.size) {
    console.error(`${duplicated.size} reference(s) repeat the base path ${BASE_PATH}:`);
    for (const [ref, seen] of [...duplicated].slice(0, 15)) {
      console.error(`  ${ref}   (e.g. ${[...seen.files][0]})`);
    }
    process.exit(1);
  }

  if (offenders.size) {
    console.error(`${offenders.size} root-absolute references would 404 under ${BASE_PATH}:`);
    for (const [ref, seen] of [...offenders].slice(0, 25)) {
      console.error(`  ${ref}   (${seen.files.size} file(s), e.g. ${[...seen.files][0]})`);
    }
    process.exit(1);
  }

  console.log(`all references under ${BASE_PATH} across ${files.length} html files`);
}

await main();
