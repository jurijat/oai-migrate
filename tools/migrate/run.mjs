import { spawn } from 'node:child_process';

const STEPS = [
  ['fetch', 'tools/migrate/fetch.mjs'],
  ['convert', 'tools/migrate/convert.mjs'],
  ['redirects', 'tools/migrate/redirects.mjs'],
  ['assets', 'tools/migrate/assets.mjs'],
  ['publish', 'tools/publish-assets.mjs'],
  ['report', 'tools/migrate/report.mjs'],
];

function run(script, args) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [script, ...args], { stdio: 'inherit' });
    child.on('exit', (code) => resolve(code ?? 1));
  });
}

const args = process.argv.slice(2);

for (const [name, script] of STEPS) {
  console.log(`\n=== ${name} ===`);
  const code = await run(
    script,
    args.filter((a) => a === '--force'),
  );
  if (code !== 0 && name !== 'report') {
    console.error(`step ${name} failed with code ${code}`);
    process.exit(code);
  }
  if (code !== 0) process.exitCode = code;
}
