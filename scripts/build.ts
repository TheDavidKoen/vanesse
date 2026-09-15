/* Writes the colour theme, the file icon theme and every icon SVG under themes/, the paths
   package.json contributes to VS Code. Runs before every package through vscode:prepublish. */

import { mkdir, rm, writeFile } from "node:fs/promises";
import { renderBadge } from "../src/icons/badge.ts";
import { glyphs } from "../src/icons/glyphs.ts";
import { iconTheme } from "../src/icons/icon-theme.ts";
import { theme } from "../src/theme/theme.ts";

const THEMES_DIRECTORY = new URL("../themes/", import.meta.url);
const ICONS_DIRECTORY = new URL("icons/", THEMES_DIRECTORY);

function toJson(value: unknown): string {
  return `${JSON.stringify(value, null, 2)}\n`;
}

// Removing the icons first stops a deleted glyph leaving a stale SVG in the package.
await rm(ICONS_DIRECTORY, { recursive: true, force: true });
await mkdir(ICONS_DIRECTORY, { recursive: true });

await Promise.all([
  writeFile(new URL("vanesse-color-theme.json", THEMES_DIRECTORY), toJson(theme)),
  writeFile(new URL("vanesse-icon-theme.json", THEMES_DIRECTORY), toJson(iconTheme)),
  ...Object.entries(glyphs).map(([name, layers]) =>
    writeFile(new URL(`${name}.svg`, ICONS_DIRECTORY), renderBadge(layers)),
  ),
]);

console.log(
  `Built ${theme.name}: ${Object.keys(theme.colors).length} workbench colours, ` +
    `${theme.tokenColors.length} token rules, ` +
    `${Object.keys(theme.semanticTokenColors).length} semantic tokens, ` +
    `${Object.keys(glyphs).length} icons.`,
);
