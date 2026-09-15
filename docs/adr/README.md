# Architecture decision records

One file per decision, numbered in the order taken. Each records the context, what was
decided, and what it costs.

| # | Decision | Status |
|---|---|---|
| [0001](0001-generated-theme-from-typescript.md) | Generate the theme from TypeScript, run by Node directly | Accepted |
| [0002](0002-github-flow.md) | GitHub Flow, branches deleted after merge | Accepted |
| [0003](0003-colour-system.md) | Colour system with a measured contrast floor | Accepted |
| [0004](0004-ship-no-executable-code.md) | Ship theme data only, never executable code | Accepted |
| [0005](0005-neutral-published-names.md) | Neutral names and brand logos | Accepted |
| [0006](0006-release-by-tag-with-oidc.md) | Release by tag, through an approved environment and OIDC | Accepted |
| [0007](0007-cloud-badge-icon-theme.md) | A cloud badge file icon theme, generated from the palette | Accepted |

Superseded records stay in place with their status changed, rather than being deleted.

0001, 0003, 0004 and 0007 are enforced by tests and CI rather than by review.
