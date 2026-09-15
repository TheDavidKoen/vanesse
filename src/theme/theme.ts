/* Assembles the complete Vanessë colour theme from its three emitters. scripts/build.ts
   writes this object to the JSON file VS Code loads. */

import { semantic } from "./semantic.ts";
import { tokens } from "./tokens.ts";
import type { ColorTheme } from "./types.ts";
import { workbench } from "./workbench.ts";

export const theme: ColorTheme = {
  $schema: "vscode://schemas/color-theme",
  name: "Vanessë",
  type: "dark",
  semanticHighlighting: true,
  colors: workbench,
  tokenColors: tokens,
  semanticTokenColors: semantic,
};