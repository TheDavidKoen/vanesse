import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { contrastRatio, flatten, type Hex } from "./color.ts";
import { accent, ansi, signal, surface, syntax, text } from "./roles.ts";

const AA_TEXT = 4.5;
const AA_NON_TEXT = 3;

function assertContrast(foreground: Hex, background: Hex, minimum: number): void {
  const ratio = contrastRatio(foreground, background);
  assert.ok(ratio >= minimum, `${ratio.toFixed(2)}:1 is below ${minimum}:1`);
}

describe("syntax colours", () => {
  const lineHighlight = flatten(surface.lineHighlight, surface.editor);
  const selection = flatten(surface.selection, surface.editor);

  for (const [role, color] of Object.entries(syntax)) {
    it(`${role} clears AA on the editor`, () => assertContrast(color, surface.editor, AA_TEXT));
    it(`${role} clears AA on the current line`, () =>
      assertContrast(color, lineHighlight, AA_TEXT));
    it(`${role} clears 3:1 inside a selection`, () =>
      assertContrast(color, selection, AA_NON_TEXT));
  }
});

describe("interface text", () => {
  const surfaces = {
    bezel: surface.bezel,
    shade: surface.shade,
    editor: surface.editor,
    widget: surface.widget,
  };

  for (const [name, background] of Object.entries(surfaces)) {
    for (const role of ["primary", "secondary", "muted"] as const) {
      it(`${role} text clears AA on the ${name}`, () =>
        assertContrast(text[role], background, AA_TEXT));
    }
    it(`faint text clears 3:1 on the ${name}`, () =>
      assertContrast(text.faint, background, AA_NON_TEXT));
    it(`the focus ring clears 3:1 on the ${name}`, () =>
      assertContrast(accent.focus, background, AA_NON_TEXT));
  }

  it("primary text clears AA inside a selection", () =>
    assertContrast(text.primary, flatten(surface.selection, surface.editor), AA_TEXT));
  it("primary text clears AA on a find match", () =>
    assertContrast(text.primary, flatten(surface.findMatch, surface.editor), AA_TEXT));
});

describe("filled accents", () => {
  const fills = {
    button: accent.primary,
    buttonHover: accent.hover,
    badge: accent.badge,
    debugging: signal.error,
  };

  for (const [name, fill] of Object.entries(fills)) {
    it(`text on the ${name} fill clears AA`, () => assertContrast(text.onAccent, fill, AA_TEXT));
  }
});

describe("signals", () => {
  for (const [role, color] of Object.entries(signal)) {
    const minimum = role === "ignored" ? AA_NON_TEXT : AA_TEXT;
    it(`${role} clears ${minimum}:1 on the side bar`, () =>
      assertContrast(color, surface.shade, minimum));
  }
});

describe("terminal colours", () => {
  for (const [name, color] of Object.entries(ansi)) {
    if (name === "black") continue;
    it(`${name} clears AA on the terminal`, () => assertContrast(color, surface.shade, AA_TEXT));
  }
});
