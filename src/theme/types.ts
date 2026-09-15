import type { Hex } from "../color.ts";

export type FontStyle = "italic" | "bold" | "underline" | "strikethrough";

export interface TokenColor {
  scope: string[];
  settings: {
    foreground?: Hex;
    fontStyle?: FontStyle;
  };
}

export interface SemanticTokenStyle {
  foreground?: Hex;
  italic?: boolean;
  bold?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
}

export type WorkbenchColors = Record<string, Hex>;

export type SemanticTokenColors = Record<string, Hex | SemanticTokenStyle>;

export interface ColorTheme {
  $schema: "vscode://schemas/color-theme";
  name: string;
  type: "dark" | "light";
  semanticHighlighting: boolean;
  colors: WorkbenchColors;
  tokenColors: TokenColor[];
  semanticTokenColors: SemanticTokenColors;
}
