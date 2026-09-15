import { readFile } from 'node:fs/promises';
import Ajv2020 from 'ajv/dist/2020.js';
import yaml from 'js-yaml';

const PAIRS = [
  ['data/authors.yaml', 'schemas/authors.schema.json'],
  ['data/redirects.yaml', 'schemas/redirects.schema.json'],
  ['data/nav.yaml', 'schemas/nav.schema.json'],
  ['data/people.yaml', 'schemas/people.schema.json'],
  ['data/testimonials.yaml', 'schemas/testimonials.schema.json'],
];

async function main() {
  const Ajv = Ajv2020.default ?? Ajv2020;
  const ajv = new Ajv({ allErrors: true, strict: false });
  let failed = 0;

  for (const [dataFile, schemaFile] of PAIRS) {
    const schema = JSON.parse(await readFile(schemaFile, 'utf8'));
    const data = yaml.load(await readFile(dataFile, 'utf8'));
    const validate = ajv.compile(schema);

    if (validate(data)) {
      console.log(`  ok    ${dataFile}`);
      continue;
    }

    failed += 1;
    console.error(`  FAIL  ${dataFile}`);
    for (const error of validate.errors ?? []) {
      console.error(`          ${error.instancePath || '/'} ${error.message}`);
    }
  }

  if (failed) process.exitCode = 1;
}

await main();
