import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";
import { isHex } from "../color.ts";
import { glyphs } from "./glyphs.ts";

const HEX_LITERAL = /#[0-9A-Fa-f]{6}\b/;

describe("glyphs", () => {
  for (const [name, layers] of Object.entries(glyphs)) {
    it(`${name} has at least one drawable layer`, () => {
      assert.ok(layers.length > 0);
      for (const layer of layers) assert.ok(layer.d.length > 0);
    });

    it(`${name} uses valid hex for every fill`, () => {
      const colors = layers.flatMap((layer) =>
        "split" in layer ? [layer.fill, layer.split] : [layer.fill],
      );
      assert.deepEqual(
        colors.filter((color) => !isHex(color)),
        [],
      );
    });
  }

  it("names every icon in lowercase kebab-case, since each becomes a filename", () => {
    const invalid = Object.keys(glyphs).filter((name) => !/^[a-z]+(-[a-z]+)*$/.test(name));
    assert.deepEqual(invalid, []);
  });

  for (const file of ["badge.ts", "generic.ts", "glyphs.ts", "icon-theme.ts"]) {
    it(`${file} reads roles, never the palette or a hex literal`, async () => {
      const source = await readFile(new URL(file, import.meta.url), "utf8");
      assert.doesNotMatch(source, /palette\.ts/);
      assert.doesNotMatch(source, HEX_LITERAL);
    });
  }
});
