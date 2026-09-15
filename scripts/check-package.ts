/* Fails when the VSIX would contain anything outside ALLOWED_FILES, so source,
   tooling or a stray secret can never be published. Run through pnpm so vsce is on the PATH. */

import { execSync } from "node:child_process";
import { glyphs } from "../src/icons/glyphs.ts";

const ALLOWED_FILES = [
  "CHANGELOG.md",
  "LICENSE",
  "README.md",
  "package.json",
  "themes/vanesse-color-theme.json",
  "themes/vanesse-icon-theme.json",
  "images/icon.png",
  ...Object.keys(glyphs).map((name) => `themes/icons/${name}.svg`),
];

const packaged = execSync("vsce ls --no-dependencies", { encoding: "utf8" })
  .split(/\r?\n/)
  .map((line) => line.trim().replaceAll("\\", "/"))
  .filter(Boolean);

const unexpected = packaged.filter((file) => !ALLOWED_FILES.includes(file));
const missing = ALLOWED_FILES.filter((file) => !packaged.includes(file));

if (unexpected.length > 0 || missing.length > 0) {
  console.error("The package does not match the allowlist.");
  if (unexpected.length > 0) console.error(`Unexpected: ${unexpected.join(", ")}`);
  if (missing.length > 0) console.error(`Missing: ${missing.join(", ")}`);
  process.exitCode = 1;
} else {
  console.log(`Package contains exactly the ${ALLOWED_FILES.length} allowed files.`);
}
