/* Semantic token colours, applied over the TextMate rules once a language server has
   analysed the file. Token types are listed at
   https://code.visualstudio.com/api/language-extensions/semantic-highlight-guide */

import { syntax } from "../roles.ts";
import type { SemanticTokenColors } from "./types.ts";

export const semantic: SemanticTokenColors = {
  namespace: syntax.type,
  class: syntax.type,
  "class.declaration": { foreground: syntax.type, bold: true },
  enum: syntax.type,
  interface: syntax.type,
  "interface.declaration": { foreground: syntax.type, bold: true },
  struct: syntax.type,
  type: syntax.type,
  typeParameter: { foreground: syntax.type, italic: true },
  function: syntax.function,
  method: syntax.function,
  "function.defaultLibrary": { foreground: syntax.function, italic: true },
  parameter: { foreground: syntax.parameter, italic: true },
  property: syntax.property,
  variable: syntax.variable,
  "variable.defaultLibrary": { foreground: syntax.variable, italic: true },
  enumMember: { foreground: syntax.constant, bold: true },
  keyword: syntax.keyword,
  operator: syntax.operator,
  string: syntax.string,
  number: syntax.number,
  regexp: syntax.regexp,
  decorator: { foreground: syntax.decorator, italic: true },
  macro: syntax.decorator,
  comment: { foreground: syntax.comment, italic: true },
  "*.deprecated": { strikethrough: true },
};
