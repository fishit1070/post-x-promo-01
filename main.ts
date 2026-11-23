// Entry point for the post-x-promo-01 submission.
//
// The grader launches this file with two environment variables that
// tell us where to look and where to deliver:
//   MAKEFUN_BOT_DIR    - folder that holds the source POST.json
//   MAKEFUN_OUTPUT_DIR - folder that should receive the copy
//
// Our job is deliberately tiny: carry POST.json across, byte for byte,
// so the URL of the promotional post reaches the grader untouched.
// Nothing is parsed, reformatted, or logged along the way.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

// Fall back to the conventional container locations when the
// environment does not override them.
const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Both the input and the output share the same file name.
const fileName = "POST.json";

async function deliverPost(): Promise<void> {
  const sourcePath = join(botDir, fileName);
  const targetPath = join(outputDir, fileName);

  // Read the raw bytes instead of parsing JSON, so nothing about
  // the payload (spacing, ordering, encoding) can change in transit.
  const payload = await readFile(sourcePath);

  // The output folder may not exist yet on a fresh run.
  await mkdir(outputDir, { recursive: true });

  await writeFile(targetPath, payload);
}

await deliverPost();
