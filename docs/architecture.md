# Architecture

Vanessë is a build pipeline that ends in one JSON file. Nothing in this repository runs
inside VS Code.

## The pipeline

```text
src/palette.ts                 raw colours
      │
src/roles.ts                   meaning: surface, text, accent, syntax, signal, brackets, ansi
      │
      ├── src/theme/workbench.ts   interface colours
      ├── src/theme/tokens.ts      TextMate scope rules
      └── src/theme/semantic.ts    semantic token colours
      │
src/theme/theme.ts             one ColorTheme object
      │
scripts/build.ts               themes/vanesse-color-theme.json
      │
package.json                   contributes.themes, read by VS Code
```

It is the MVC split applied to data. The palette and roles are the model. The three
emitters are views, each rendering the same model into one of VS Code's formats. The build
script is the only code with side effects.

## Import rules

| File | May import |
|---|---|
| `palette.ts` | Nothing |
| `color.ts` | Nothing |
| `roles.ts` | `palette.ts`, `color.ts` |
| `theme/*.ts` | `roles.ts`, `color.ts`, each other |
| `scripts/*.ts` | `src/` |

Nothing in `src/` imports from `scripts/`. The emitter rules are asserted in
`src/theme/theme.test.ts`.

## How VS Code applies the three formats

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

## Changing a colour

| To | Edit |
|---|---|
| Adjust a shade everywhere it is used | `palette.ts` |
| Give a concept a different colour | `roles.ts` |
| Colour a new interface element | `workbench.ts`, using an existing role |
| Colour a new grammar scope | `tokens.ts` |

Run `pnpm test` after any of them. The contrast floor in
[ADR 0003](adr/0003-colour-system.md) is measured against the roles, so a shade that fails
it fails the build.
