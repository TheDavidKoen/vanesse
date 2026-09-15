/* Writes the generated theme to themes/vanesse-color-theme.json, the path that
   package.json contributes to VS Code. Runs before every package through vscode:prepublish. */

import { mkdir, writeFile } from "node:fs/promises";
import { theme } from "../src/theme/theme.ts";

const OUTPUT_DIRECTORY = new URL("../themes/", import.meta.url);
const OUTPUT_FILE = new URL("vanesse-color-theme.json", OUTPUT_DIRECTORY);

await mkdir(OUTPUT_DIRECTORY, { recursive: true });
await writeFile(OUTPUT_FILE, `${JSON.stringify(theme, null, 2)}\n`);

console.log(
  `Built ${theme.name}: ${Object.keys(theme.colors).length} workbench colours, ` +
    `${theme.tokenColors.length} token rules, ` +
    `${Object.keys(theme.semanticTokenColors).length} semantic tokens.`,
);
