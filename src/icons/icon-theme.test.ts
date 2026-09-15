import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { glyphs, type IconName } from "./glyphs.ts";
import { iconTheme } from "./icon-theme.ts";

describe("iconTheme", () => {
  it("uses every icon at least once", () => {
    const used = new Set<IconName>([
      iconTheme.file,
      iconTheme.folder,
      iconTheme.folderExpanded,
      ...Object.values(iconTheme.folderNames),
      ...Object.values(iconTheme.fileExtensions),
      ...Object.values(iconTheme.fileNames),
    ]);
    const unused = Object.keys(glyphs).filter((name) => !used.has(name as IconName));
    assert.deepEqual(unused, []);
  });

  it("defines an icon path for every glyph", () => {
    assert.deepEqual(Object.keys(iconTheme.iconDefinitions), Object.keys(glyphs));
  });

  it("keys extensions, file names and folder names in lowercase", () => {
    const keys = [
      ...Object.keys(iconTheme.fileExtensions),
      ...Object.keys(iconTheme.fileNames),
      ...Object.keys(iconTheme.folderNames),
    ];
    assert.deepEqual(
      keys.filter((key) => key !== key.toLowerCase()),
      [],
    );
  });
});
