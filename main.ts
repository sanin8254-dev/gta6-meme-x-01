// gta6-meme-x-01 entry program (Node 22, standard library only).
//
// The entry itself is a post on X: a GTA 6 meme whose picture carries
// make.fun's ghost and whose text carries the bounty link, the @makefunai
// tag and a play code. This program has the small formal job: take the
// repository's POST.json, which names that post, and deliver it unchanged
// to the output directory, where the house gate picks it up and reads the
// post from X itself.
//
// Before copying, the file is given a light sanity check: it must parse
// as JSON, hold a string "url", and that url must look like an X post
// address (x.com or twitter.com, /<handle>/status/<digits>). A malformed
// POST.json fails loudly here instead of silently at the gate.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const POST_URL_SHAPE =
  /^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/[^/]+\/status\/\d+\/?$/;

function fail(message: string): never {
  console.error(`main.ts: ${message}`);
  process.exit(1);
}

function sourceDir(): string {
  // In the grader the repository is mounted at MAKEFUN_BOT_DIR; anywhere
  // else the repository is simply the folder this file lives in.
  return process.env.MAKEFUN_BOT_DIR ?? dirname(fileURLToPath(import.meta.url));
}

function outputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
}

function readPostFile(dir: string): Buffer {
  const path = join(dir, 'POST.json');
  let raw: Buffer;
  try {
    raw = readFileSync(path);
  } catch {
    fail(`cannot read ${path}`);
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw.toString('utf8'));
  } catch {
    fail('POST.json is not valid JSON');
  }
  const url = (parsed as { url?: unknown } | null)?.url;
  if (typeof url !== 'string' || !POST_URL_SHAPE.test(url)) {
    fail('POST.json must hold a "url" shaped like https://x.com/<handle>/status/<id>');
  }
  return raw;
}

const raw = readPostFile(sourceDir());
const outDir = outputDir();
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'POST.json'), raw);
