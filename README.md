# vanesse

**Vanessë** is a dark colour theme for Visual Studio Code where elven craft meets the
arcade. Moonlit silver, leaf gold and twilight violet carry the code. The cabinet supplies
the rest: a coin-yellow cursor, neon badges, and the four ghost colours for errors,
warnings, information and hints.

## Install

Search for **Vanessë** in the Extensions view, or from a terminal:

```sh
code --install-extension thedavidkoen.vanesse
```

Then run **Preferences: Color Theme** from the Command Palette and choose **Vanessë**. The
same package is published to [Open VSX](https://open-vsx.org/) for VSCodium and other
compatible editors.

## The palette

| Source | Name | Hex | Carries |
|---|---|---|---|
| Elven | Moon silver | `#D7DDEA` | Variables, primary text |
| Elven | Dusk grey | `#8490AB` | Comments, in italic |
| Elven | Leaf gold | `#E9C46A` | Keywords, tags, headings, active borders |
| Elven | Blade blue | `#7CC2FF` | Functions, links, focus rings, selection |
| Elven | Elven teal | `#6ED8CC` | Types, classes, components |
| Elven | Moss green | `#B6DA8A` | Strings, additions |
| Elven | Twilight violet | `#B8A6F8` | Parameters, attributes |
| Elven | Mist blue | `#A9C1E8` | Properties, object keys |
| Elven | Ember amber | `#F2A25C` | Regular expressions, decorators |
| Arcade | Coin yellow | `#FFE14D` | Cursor, find matches, escape sequences |
| Arcade | Neon magenta | `#F585D6` | Numbers, constants, badges, progress |
| Arcade | Ghost red | `#FF5F6D` | Errors, deletions |
| Arcade | Ghost orange | `#FFB454` | Warnings, modifications |
| Arcade | Ghost cyan | `#5EE6EB` | Information |
| Arcade | Ghost pink | `#FFB8DE` | Hints |

All of it sits on a CRT-black night sky, from `#07090F` at the bezel to `#0E1322` behind
the code.

## Recommended settings

A colour theme can only set colours. These optional settings finish the cabinet:

```jsonc
{
  "editor.cursorStyle": "block",
  "editor.cursorBlinking": "phase",
  "terminal.integrated.cursorStyle": "block",
  "editor.fontFamily": "'Departure Mono', Consolas, monospace"
}
```

[Departure Mono](https://departuremono.com/) is a free pixel-style monospaced typeface
under the SIL Open Font License. Install it on your system first. VS Code does not
download fonts.

## Accessibility

Every syntax colour clears WCAG AA, 4.5:1, against the editor background and the
current-line highlight, and at least 3:1 inside a selection. Interface text, focus rings,
diagnostics and terminal colours are held to the same floors on every surface they sit on.

These are not guidelines. `pnpm test` measures them and CI fails if a change breaks one.
The numbers are in [ADR 0003](docs/adr/0003-colour-system.md).

Line numbers and ignored files are the deliberate exception, held to 3:1 so the gutter
stays quiet.

## Privacy and security

Vanessë is colour data and nothing else. It declares no entry point, so VS Code never runs
code from it. It requests no permissions, makes no network requests and collects no
telemetry. The published package is limited to five files, and CI fails if anything else
would ship. See [SECURITY.md](SECURITY.md).

## Stack

| Layer | Choice |
|---|---|
| Output | VS Code colour theme JSON, generated at build time |
| Source | TypeScript, `strict`, run directly by Node's type stripping |
| Runtime | Node 24, pinned in `.node-version` |
| Tests | `node:test`, including WCAG contrast assertions |
| Lint + format | Biome |
| Packaging | `@vscode/vsce` for the Marketplace, `ovsx` for Open VSX |
| Package manager | pnpm |

There are no runtime dependencies, and nothing in `devDependencies` ships. See
[`docs/adr/`](docs/adr) for why each was chosen.

## Getting started

```sh
pnpm install
pnpm build
```

Open the folder in VS Code and press **F5**. An Extension Development Host opens with the
theme loaded. Pick it with **Preferences: Color Theme**.

Run `pnpm run build:watch` alongside it to regenerate the theme on every save, then run
**Developer: Reload Window** in the host to see the change.

## Scripts

| Command | Does |
|---|---|
| `pnpm build` | Generate `themes/vanesse-color-theme.json` |
| `pnpm run build:watch` | Regenerate on every save under `src/` or `scripts/` |
| `pnpm run typecheck` | `tsc`, no emit |
| `pnpm lint` | Biome lint and format check |
| `pnpm run lint:fix` | Apply Biome's safe fixes |
| `pnpm test` | Unit tests and the contrast floor |
| `pnpm run check:package` | Fail if the VSIX would contain anything outside the allowlist |
| `pnpm run package` | Build `vanesse-<version>.vsix` |
| `pnpm verify` | Types, lint, tests, build and the package check. Run before opening a PR |

## Project structure

```text
src/
├── palette.ts          Raw colours. The only hex values in the repo
├── roles.ts            What each colour means: surface, text, accent, syntax, signal
├── color.ts            WCAG contrast, alpha and mixing
└── theme/
    ├── workbench.ts    Interface colours
    ├── tokens.ts       TextMate scope rules
    ├── semantic.ts     Semantic token colours
    ├── theme.ts        Assembles the three into one theme
    └── types.ts        The VS Code theme format
scripts/
├── build.ts            Writes the theme JSON
└── check-package.ts    Package allowlist guard
themes/                 Generated, gitignored
docs/
├── adr/                Architecture decision records
└── architecture.md     How the pieces fit
```

Tests sit beside the file they test, as `<name>.test.ts`.

**Hex values live in `src/palette.ts` and nowhere else.** The emitters in `src/theme/` read
roles, never the palette. Both rules are enforced by tests.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for branch naming, commit format and the pre-PR
checklist.

## Continuous integration

Every pull request into `main` runs [`.github/workflows/ci.yml`](.github/workflows/ci.yml):

| Step | Does |
|---|---|
| Types | `tsc` against the strict, erasable-only config |
| Lint and format | Biome |
| Tests | Colour maths, theme validity and the contrast floor |
| Package allowlist | Fails if the VSIX would carry anything but the theme and its docs |
| Package | Builds the VSIX and attaches it to the run, so a PR can be installed and tried |

## Publishing

Releases are cut by tag and published by
[`.github/workflows/release.yml`](.github/workflows/release.yml). Bump `version` in
`package.json` and add a matching `CHANGELOG.md` entry in a pull request. Once it is merged:

```sh
git checkout main
git pull
git tag v0.2.0
git push origin v0.2.0
```

| Job | Does |
|---|---|
| Verify | Reruns CI against the tagged commit and builds the VSIX |
| Check release | Fails unless the tag matches `package.json` and `CHANGELOG.md` has an entry for it |
| Publish | Waits for approval on the `release` environment, then publishes to the Marketplace and Open VSX |
| GitHub release | Attaches the same VSIX, with the changelog entry as notes |

Open VSX uses trusted publishing, minted from GitHub's OIDC token, so no Open VSX token
exists. The Marketplace uses a `VSCE_PAT` secret that only the approval-gated `release`
environment can read. See [ADR 0006](docs/adr/0006-release-by-tag-with-oidc.md). Both
publish steps skip versions that already exist, so a failed release is re-run from the
Actions tab.

## Not affiliated

Vanessë is an unofficial fan work, inspired by the elves of Peter Jackson's film
adaptations of J.R.R. Tolkien's novels and by classic arcade cabinets. It is not affiliated
with or endorsed by the Tolkien Estate, Middle-earth Enterprises, Warner Bros., New Line
Cinema or any arcade manufacturer, and it uses none of their names, marks or artwork in the
theme or its published metadata. See [ADR 0005](docs/adr/0005-neutral-published-names.md).

## Known issues

**pnpm 11 refuses to run until build scripts are decided.** `pnpm-workspace.yaml` allows
`@vscode/vsce-sign`, which fetches its signing binary, and declines `keytar`, a native
keychain module only `vsce login` needs. This project does not use `vsce login`.

**vsce is held on 3.x.** 4.0.0 was published on 2026-09-14 and falls inside pnpm's minimum
release age, which exists to keep freshly published, possibly compromised versions out.
Move to 4.x once it has aged, rather than adding an exclusion.

**vsce runs with `--no-dependencies`.** The theme has no runtime dependencies, so dependency
detection, which shells out to npm, is switched off.

**The identifier is `vanesse`.** npm names, GitHub repositories and Marketplace IDs reject
the diaeresis, so only the display name carries it.

**A theme cannot draw scanlines, glow or pixel fonts.** Extensions that inject custom CSS
patch VS Code's own files, which triggers its corrupt-installation warning and breaks on
every update. Vanessë stays within the colour theme API.