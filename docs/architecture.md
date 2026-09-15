# Architecture

Vanessë is a build pipeline that ends in two JSON files and a folder of SVGs. Nothing in this
repository runs inside VS Code.

## The pipeline

```text
src/palette.ts                 raw colours
      │
src/roles.ts                   meaning: surface, text, accent, syntax, signal, icon, badge
      │
      ├── src/theme/workbench.ts   interface colours
      ├── src/theme/tokens.ts      TextMate scope rules
      ├── src/theme/semantic.ts    semantic token colours
      │         │
      │   src/theme/theme.ts       one ColorTheme object
      │
      ├── src/icons/generic.ts     original drawings
      ├── src/icons/glyphs.ts      Simple Icons logos plus the drawings, with colours
      ├── src/icons/badge.ts       glyph layers to a cloud badge SVG
      └── src/icons/icon-theme.ts  file, extension and folder mappings
      │
scripts/build.ts               themes/vanesse-color-theme.json
                               themes/vanesse-icon-theme.json
                               themes/icons/<icon>.svg
      │
package.json                   contributes.themes and contributes.iconThemes
```

It is the MVC split applied to data. The palette and roles are the model. The theme and icon
emitters are views, each rendering the same model into a format VS Code reads. The build
script is the only code with side effects.

## Import rules

| File | May import |
|---|---|
| `palette.ts` | Nothing |
| `color.ts` | Nothing |
| `roles.ts` | `palette.ts`, `color.ts` |
| `theme/*.ts` | `roles.ts`, `color.ts`, each other |
| `icons/*.ts` | `roles.ts`, `color.ts`, `simple-icons`, each other |
| `scripts/*.ts` | `src/` |

Nothing in `src/` imports from `scripts/`. The emitter rules are asserted in
`src/theme/theme.test.ts` and `src/icons/glyphs.test.ts`.

## How VS Code applies the three colour formats

| Format | Key | Colours | Precedence |
|---|---|---|---|
| Workbench | `colors` | Every part of the interface, by key | Only source |
| TextMate | `tokenColors` | Code, by grammar scope | Base layer for every language |
| Semantic | `semanticTokenColors` | Code, by what a language server knows | Wins over TextMate where the server provides a token |

The theme sets `semanticHighlighting: true`, so languages with semantic support use
`semantic.ts` for identifiers and fall back to `tokens.ts` for everything else.

TextMate rules resolve by specificity, not order: `keyword.operator` beats `keyword`
wherever both match. `theme.test.ts` fails if a scope is assigned twice, the one ambiguity
specificity cannot resolve.

## How VS Code picks an icon

For each file, VS Code tries a file name match first, then the longest extension match, so
`vite.config.ts` finds the Vite icon before `.ts` finds TypeScript, and `palette.test.ts`
finds the test icon through `test.ts`. Folders match by name, then fall back to the plain
folder icons. Anything unmatched gets the plain file icon.

Each icon is one SVG in a 32 unit square: the cloud, a small puff, and the glyph scaled from
the Simple Icons 24 unit square to fill most of the badge. Two-tone logos are drawn twice and
clipped along the diagonal.

## Changing a colour or an icon

| To | Edit |
|---|---|
| Adjust a shade everywhere it is used | `palette.ts` |
| Give a concept a different colour | `roles.ts` |
| Colour a new interface element | `workbench.ts`, using an existing role |
| Colour a new grammar scope | `tokens.ts` |
| Add an icon | `glyphs.ts`, plus its mappings in `icon-theme.ts` |
| Map another file to an existing icon | `icon-theme.ts` |
| Change the badge itself | `badge.ts` |

Run `pnpm test` after any of them. The contrast floor in
[ADR 0003](adr/0003-colour-system.md) is measured against the roles, so a shade that fails
it fails the build.
