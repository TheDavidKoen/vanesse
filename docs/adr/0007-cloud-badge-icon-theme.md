# 0007. A cloud badge file icon theme, generated from the palette

**Status:** Accepted · 2026-09-15

## Context

A colour theme alone leaves the explorer on VS Code's default icons, which ignore the
palette entirely. File icons are a separate contribution: a JSON map from file names,
extensions and folder names to icon definitions, each an SVG or a font glyph, drawn at 16px.

## Decision

Ship **Vanessë Icons** alongside the colour theme, built from the same source:

| Part | Choice |
|---|---|
| Style | A logo on a soft violet cloud with one small puff, under a dark sticker outline |
| Logos | Simple Icons paths, recoloured with the `icon` roles |
| Gaps | Original drawings in `src/icons/generic.ts` |
| Rendering | `renderBadge` writes one SVG per icon at build time |
| Two-tone logos | The same path drawn twice, clipped along the diagonal |
| Scale | The glyph fills about 26 of the badge's 32 units, so it survives 16px |
| Line-drawn logos | Drawn without the outline, which would otherwise swallow their strokes |

## Rationale

SVGs over an icon font: a font needs a codepoint map, gives each definition a single colour,
and cannot carry the cloud behind the glyph. SVGs keep each icon self-contained and let one
renderer apply the badge to every glyph.

Palette colours over brand colours keep the explorer coherent with the editor beside it.
Generating the SVGs keeps the rule that hex values live only in `src/palette.ts`, and makes
every icon testable like any other part of the theme.

A larger glyph over a fuller cloud: at 16px there is no room for both. A logo you can read
matters more than the badge around it, which still shows in full at larger sizes such as the
Marketplace listing.

## Consequences

- The package grows from one JSON file to about 90 files, 86 KB in total.
- At 16px the cloud mostly sits behind the logo, and only the puff and edges show.
- Line-drawn logos (PostgreSQL, MySQL, Laravel, XML, .NET) are the faintest icons.
- Simple Icons is a build-time development dependency. Only the rendered paths ship.
- `icon-theme.test.ts` fails if an icon is defined but mapped to nothing, and
  `scripts/check-package.ts` expects exactly one SVG per defined icon.
