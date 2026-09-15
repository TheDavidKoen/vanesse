/* TextMate scope rules, used for every language and overridden by semantic tokens where a
   language server provides them. VS Code picks the most specific matching scope, so a narrow rule
   such as keyword.operator wins over keyword regardless of order. */

import type { Hex } from "../color.ts";
import { signal, syntax } from "../roles.ts";
import type { FontStyle, TokenColor } from "./types.ts";

function rule(scope: string[], foreground: Hex, fontStyle?: FontStyle): TokenColor {
  return { scope, settings: fontStyle ? { foreground, fontStyle } : { foreground } };
}

function style(scope: string[], fontStyle: FontStyle): TokenColor {
  return { scope, settings: { fontStyle } };
}

export const tokens: TokenColor[] = [
  rule(["comment", "punctuation.definition.comment"], syntax.comment, "italic"),
  rule(["variable", "meta.definition.variable.name"], syntax.variable),
  rule(["keyword.operator", "punctuation"], syntax.operator),
  rule(["keyword", "keyword.operator.new", "keyword.operator.expression"], syntax.keyword),
  rule(["keyword.control"], syntax.keyword, "bold"),
  rule(["storage.type", "storage.modifier"], syntax.keyword, "italic"),
  rule(["variable.language"], syntax.keyword, "italic"),
  rule(["string", "punctuation.definition.string"], syntax.string),
  rule(["constant.character.escape"], syntax.escape, "bold"),
  rule(["string.regexp"], syntax.regexp),
  rule(["constant.numeric", "keyword.other.unit"], syntax.number),
  rule(["constant.language", "support.constant"], syntax.constant, "bold"),
  rule(["entity.name.function", "support.function", "meta.function-call.generic"], syntax.function),
  rule(
    [
      "entity.name.type",
      "entity.name.namespace",
      "entity.other.inherited-class",
      "support.type",
      "support.class",
    ],
    syntax.type,
  ),
  rule(["entity.name.class"], syntax.type, "bold"),
  rule(["variable.parameter"], syntax.parameter, "italic"),
  rule(
    [
      "variable.other.property",
      "variable.other.object.property",
      "support.variable.property",
      "support.type.property-name",
      "meta.object-literal.key",
    ],
    syntax.property,
  ),
  rule(["entity.name.tag"], syntax.tag, "bold"),
  rule(["support.class.component"], syntax.type, "bold"),
  rule(["entity.other.attribute-name"], syntax.attribute, "italic"),
  rule(
    [
      "punctuation.decorator",
      "entity.name.function.decorator",
      "meta.decorator entity.name.function",
    ],
    syntax.decorator,
    "italic",
  ),
  rule(["markup.heading", "entity.name.section"], syntax.heading, "bold"),
  style(["markup.bold"], "bold"),
  style(["markup.italic"], "italic"),
  style(["markup.strikethrough"], "strikethrough"),
  rule(["markup.inline.raw", "markup.raw"], syntax.string),
  rule(["markup.underline.link", "string.other.link"], syntax.link, "underline"),
  rule(["markup.quote"], syntax.comment, "italic"),
  rule(["markup.inserted"], signal.added),
  rule(["markup.changed"], signal.modified),
  rule(["markup.deleted"], signal.deleted),
  rule(["invalid", "invalid.illegal"], syntax.invalid, "underline"),
  style(["invalid.deprecated"], "strikethrough"),
];
