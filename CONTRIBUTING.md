# Contributing

## Branching

`main` is always releasable. Work happens on short-lived branches merged via pull request.

`main` is protected. Every change arrives through a pull request, the `Verify` check must
pass on a branch that is up to date with `main`, and review conversations must be resolved.
Pull requests are squash merged, so the pull request title becomes the commit subject and
must follow the commit format below. Force pushes and deletions are blocked.

| Prefix | For |
|---|---|
| `feat/` | New colours, new icons, new file mappings |
| `fix/` | A colour or icon that is wrong, unreadable or missing |
| `chore/` | Tooling, dependencies, config |
| `docs/` | Documentation only |
| `refactor/` | Restructuring without changing the generated themes |

Branches are deleted once merged. See [ADR 0002](docs/adr/0002-github-flow.md). A merged
branch is spent: GitHub will not reopen its pull request for new commits, so further work
starts a fresh branch off `main`.

```sh
git checkout main
git pull
git checkout -b feat/thing
```

## Commits

[Conventional Commits](https://www.conventionalcommits.org/). One short subject in the
imperative, under about 70 characters, naming the kind of change rather than listing every
edit. Authorship is visible on GitHub, so no author or co-author lines.

```
feat: add diff editor colours
docs: update the documentation
```

## Before opening a pull request

```sh
pnpm verify
```

That runs the type check, Biome, the tests, the build and the package allowlist. All must be
clean. CI runs the same steps, so a red check means one of them failed. Reproduce it locally
rather than pushing again to see.

Then check by eye in the Extension Development Host (**F5**), with both **Vanessë** and
**Vanessë Icons** selected:

- A TypeScript, a Markdown and a JSON file
- The find widget, a selection, and a file with a problem squiggle
- The source control view with added, modified and deleted files
- The integrated terminal running something colourful, such as `git log --graph --oneline`
- **Editor: Semantic Highlighting** both on and off
- The explorer in a real project, looking for files that fall back to the plain file icon

## Code conventions

**Hex values go in `src/palette.ts` and nowhere else.** The tests fail on a hex literal in
`roles.ts` or any emitter under `src/theme/` or `src/icons/`.

**Emitters read roles, never the palette.** Theme and icon files import from `roles.ts`, so
recolouring a concept is one edit. Also enforced by test.

**A new role or surface is measured before it ships.** Add the assertion to
`src/roles.test.ts` and the row to [ADR 0003](docs/adr/0003-colour-system.md) in the same
change.

**An icon arrives with its mappings.** Add the glyph to `src/icons/glyphs.ts` and at least
one file, extension or folder name to `src/icons/icon-theme.ts` together.
`icon-theme.test.ts` fails on an icon nothing uses. Icon colours come from the `icon` roles,
never from a brand's own colours.

**TypeScript stays erasable.** Node runs the source directly, so no enums, namespaces or
parameter properties. `erasableSyntaxOnly` makes them a type error.

**Comments mark important files and important lines only.** A file that carries weight opens
with a header naming it and what it does. Beyond that, a comment is only for a line that
would be unsafe to change without it. Rationale belongs in an ADR.

**No emojis or em dashes anywhere in the repository**, including Markdown, commit messages
and pull request bodies.

**Filenames are lowercase kebab-case**, except names a tool requires verbatim: `README.md`,
`CONTRIBUTING.md`, `CHANGELOG.md`, `SECURITY.md`, `LICENSE`.

## Releasing

Versions follow [Semantic Versioning](https://semver.org/). A `fix` is a patch, a `feat` is a
minor version, and anything that removes or renames a theme, or changes an established
colour role, is a major version.

One pull request bumps `version` in `package.json` and adds the `CHANGELOG.md` entry, titled
`chore: release 0.2.0`. After it merges, tag `main`:

```sh
git tag v0.2.0
git push origin v0.2.0
```

Approve the `release` environment when the workflow asks. See
[Publishing](README.md#publishing).

## Recording a decision

Anything a future reader would otherwise reverse by accident gets an ADR in `docs/adr/`,
numbered in sequence and following the existing format. Superseded records stay in place
with their status changed.
