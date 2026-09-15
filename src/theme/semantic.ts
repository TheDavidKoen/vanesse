/* Semantic token colours, applied over the TextMate rules once a language server has
   analysed the file. Token types are listed at
   https://code.visualstudio.com/api/language-extensions/semantic-highlight-guide */

import { syntax } from "../roles.ts";
import type { SemanticTokenColors } from "./types.ts";

export const semantic: SemanticTokenColors = {
  namespace: syntax.type,
  class: syntax.type,
  enum: syntax.type,
  interface: syntax.type,
  struct: syntax.type,
  type: syntax.type,
  typeParameter: { foreground: syntax.type, italic: true },
  function: syntax.function,
  method: syntax.function,
  parameter: syntax.parameter,
  property: syntax.property,
  variable: syntax.variable,
  enumMember: syntax.constant,
  keyword: syntax.keyword,
  operator: syntax.operator,
  string: syntax.string,
  number: syntax.number,
  regexp: syntax.regexp,
  decorator: syntax.decorator,
  macro: syntax.decorator,
  comment: { foreground: syntax.comment, italic: true },
  "*.deprecated": { strikethrough: true },
};
