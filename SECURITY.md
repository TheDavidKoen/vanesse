# Security

## Reporting a vulnerability

Report privately through GitHub: the repository's **Security** tab, then **Report a
vulnerability**. Please do not open a public issue.

Only the latest published version is supported.

## What the extension can do

Nothing beyond colouring the editor. Vanessë:

- declares no `main` or `browser` entry point, so VS Code never executes code from it
- declares no activation events, commands, settings or permissions
- makes no network requests and collects no telemetry
- has no runtime dependencies

The published package contains exactly these files, checked on every pull request by
`scripts/check-package.ts`:

```text
package.json
README.md
CHANGELOG.md
LICENSE
themes/vanesse-color-theme.json
```

The TypeScript source, tests, scripts and every development dependency stay in the
repository and never reach an editor.

## Supply chain

- pnpm's minimum release age keeps versions published within the last day out of the lockfile
- Dependency build scripts run only when allowed by name in `pnpm-workspace.yaml`
- CI installs with `--frozen-lockfile`, runs with a read-only token and does not persist checkout credentials
- Dependabot keeps the GitHub Actions current
- Release tags cannot be moved or deleted, enforced by a repository ruleset

## Publishing credentials

No Marketplace or Open VSX token is stored in this repository, its CI secrets or any
committed file. Releases publish from `.github/workflows/release.yml` with short-lived OIDC
credentials, only from a `v` tag, and only after the maintainer approves the `release`
environment. See [ADR 0006](docs/adr/0006-release-by-tag-with-oidc.md).