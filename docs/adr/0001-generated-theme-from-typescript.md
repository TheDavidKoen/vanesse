# 0001. Generate the theme from TypeScript, run by Node directly

**Status:** Accepted · 2026-09-15

## Context

A VS Code colour theme is one JSON file. Hand-written, it is a flat map of a few hundred
keys where the same gold is typed into twenty places, nothing checks that a value is valid,
and nothing measures whether text can be read.

## Decision

Author the theme in TypeScript and generate the JSON at build time, in four layers:

| Layer | File | Holds |
|---|---|---|
| Palette | `src/palette.ts` | Raw colours. The only hex values in the repo |
| Roles | `src/roles.ts` | What each colour means |
| Emitters | `src/theme/` | Workbench colours, TextMate rules, semantic tokens |
| Build | `scripts/build.ts` | Writes `themes/vanesse-color-theme.json` |

Node 24 runs the TypeScript itself through type stripping. There is no compile step, no
`tsx` and no bundler. `tsc` only type-checks.

## Rationale

This is the layering MVC gives a web app, applied to data. Recolouring a concept is a
one-line change in `roles.ts`, and swapping a shade is a one-line change in `palette.ts`.
Types catch a misspelt role at compile time, and tests import the same roles the theme is
built from, which is what makes ADR 0003 enforceable.

Type stripping keeps the toolchain to what Node already provides. The cost is that the
source must be erasable: no enums, namespaces or parameter properties.
`erasableSyntaxOnly` makes that a type error rather than a runtime surprise.

## Consequences

- `themes/` is generated and gitignored. F5 builds it first through `.vscode/tasks.json`.
- `vscode:prepublish` rebuilds before every package, so a stale theme cannot be published.
- Emitters must never import the palette or contain a hex value. `theme.test.ts` fails if they do.
