import { access, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { CONCURRENCY, MANIFEST_FILE, USER_AGENT } from './config.mjs';
import { ensureDir, pool, readJson, sleep } from './lib.mjs';

const SOURCE_DIR = 'assets/uploads';
const UPLOADS = /\/wp-content\/uploads\/sites\/31\/(.+)$/;
const RETRIES = 3;

const force = process.argv.includes('--force');

export function sourcePathFor(remote) {
  const match = UPLOADS.exec(remote.split('?')[0]);
  return match ? join(SOURCE_DIR, match[1]) : null;
}

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function download(url) {
  let lastError;
  for (let attempt = 0; attempt < RETRIES; attempt += 1) {
    try {
      const res = await fetch(url, {
        headers: { 'user-agent': USER_AGENT },
        redirect: 'follow',
        signal: AbortSignal.timeout(30000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return Buffer.from(await res.arrayBuffer());
    } catch (error) {
      lastError = error;
      await sleep(400 * 2 ** attempt);
    }
  }
  throw new Error(`${lastError?.message ?? lastError}`);
}

async function main() {
  const { assets } = await readJson(MANIFEST_FILE);
  const remotes = Object.keys(assets);

  let saved = 0;
  let cached = 0;
  const failures = [];

  await pool(remotes, CONCURRENCY, async (remote) => {
    const file = sourcePathFor(remote);
    if (!file) {
      failures.push({ remote, error: 'not an uploads url' });
      return;
    }
    if (!force && (await exists(file))) {
      cached += 1;
      return;
    }
    try {
      const bytes = await download(remote);
      await ensureDir(file);
      await writeFile(file, bytes);
      saved += 1;
    } catch (error) {
      failures.push({ remote, error: String(error.message ?? error) });
    }
  });

  console.log(`downloaded ${saved}, cached ${cached}, failed ${failures.length}`);
  for (const f of failures) console.error(`  ${f.remote}: ${f.error}`);
  if (failures.length) process.exitCode = 1;
}

await main();
