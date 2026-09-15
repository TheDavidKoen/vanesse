# Security

## Reporting a vulnerability

Report privately through GitHub: the repository's **Security** tab, then **Report a
vulnerability**. Please do not open a public issue.

Only the latest published version is supported.

## What the extension can do

Nothing beyond colouring the editor and drawing file icons. Vanessë:

- declares no `main` or `browser` entry point, so VS Code never executes code from it
- declares no activation events, commands, settings or permissions
- makes no network requests and collects no telemetry
- has no runtime dependencies

The published package contains exactly these files, checked on every pull request by
`scripts/check-package.ts`, which takes the list of icon files from `src/icons/glyphs.ts`:

```text
package.json
README.md
CHANGELOG.md
LICENSE
images/icon.png
themes/vanesse-color-theme.json
themes/vanesse-icon-theme.json
themes/icons/<icon>.svg, one per icon
```

The icon SVGs are plain paths and fills. They contain no scripts, links or external
references. The TypeScript source, tests, scripts and every development dependency stay in
the repository and never reach an editor.

## Supply chain

- pnpm's minimum release age keeps versions published within the last day out of the lockfile
- Dependency build scripts run only when allowed by name in `pnpm-workspace.yaml`
- Simple Icons is read at build time for logo paths only, and nothing from the package ships
- CI installs with `--frozen-lockfile`, runs with a read-only token and does not persist checkout credentials
- Dependabot keeps the GitHub Actions current
- Release tags cannot be moved or deleted, enforced by a repository ruleset

## Publishing credentials

No publishing credential is stored in this repository or any committed file. The only one
that exists is an Open VSX token, kept as the `OVSX_PAT` secret on the `release` environment
and readable only by a `v` tag release after the maintainer approves it. If it ever leaks, it
is deleted on open-vsx.org and replaced. The VS Code Marketplace receives the same VSIX from
the GitHub release by manual upload, signed in to the publisher account. See
[ADR 0006](docs/adr/0006-release-by-tag-with-oidc.md).
