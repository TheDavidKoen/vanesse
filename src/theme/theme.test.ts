import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";
import { isHex } from "../color.ts";
import { theme } from "./theme.ts";

const HEX_LITERAL = /#[0-9A-Fa-f]{6}\b/;

describe("theme", () => {
  it("uses valid hex for every workbench colour", () => {
    const invalid = Object.entries(theme.colors).filter(([, color]) => !isHex(color));
    assert.deepEqual(invalid, []);
  });

  it("uses valid hex for every token foreground", () => {
    const invalid = theme.tokenColors.filter(
      ({ settings }) => settings.foreground !== undefined && !isHex(settings.foreground),
    );
    assert.deepEqual(invalid, []);
  });

  it("uses valid hex for every semantic token foreground", () => {
    const invalid = Object.entries(theme.semanticTokenColors).filter(([, value]) => {
      const foreground = typeof value === "string" ? value : value.foreground;
      return foreground !== undefined && !isHex(foreground);
    });
    assert.deepEqual(invalid, []);
  });

  it("never assigns the same scope twice", () => {
    const scopes = theme.tokenColors.flatMap(({ scope }) => scope);
    assert.equal(new Set(scopes).size, scopes.length);
  });

  for (const file of ["workbench.ts", "tokens.ts", "semantic.ts"]) {
    it(`${file} reads roles, never the palette or a hex literal`, async () => {
      const source = await readFile(new URL(file, import.meta.url), "utf8");
      assert.doesNotMatch(source, /palette\.ts/);
      assert.doesNotMatch(source, HEX_LITERAL);
    });
  }

  it("roles.ts takes every hex value from the palette", async () => {
    const source = await readFile(new URL("../roles.ts", import.meta.url), "utf8");
    assert.doesNotMatch(source, HEX_LITERAL);
  });
});