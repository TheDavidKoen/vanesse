# 0004. Ship colour data only, never executable code

**Status:** Accepted, amended by [0006](0006-release-by-tag-with-oidc.md) · 2026-09-15

## Context

A VS Code extension with an entry point runs in the extension host with the same access to
files, network and credentials as the user. Marketplace extensions are an established
supply-chain target, and a theme is exactly the kind of extension people install without
reading.

A theme needs none of that access. VS Code reads its colours from a JSON file named in
`package.json`.

## Decision

- No `main` or `browser` entry, no activation events, no contributed commands or settings.
- No runtime dependencies.
- The package is an allowlist: `.vscodeignore` excludes everything and names the five files
  that ship, and `scripts/check-package.ts` fails CI if `vsce ls` reports anything else.
- No long-lived publishing credential exists anywhere. Releases use short-lived OIDC credentials, see ADR 0006.

## Rationale

The strongest guarantee a theme can give is that there is no code to audit. The allowlist
protects that guarantee against the likeliest accident, a new file quietly swept into the
package, which a blocklist would not catch.

## Consequences

- Features that need code, such as a command that switches variants, are out of scope.
  Variants ship as additional entries in `contributes.themes`.
- Adding a file to the package means editing both `.vscodeignore` and `ALLOWED_FILES`,
  which is intended friction.
- Nothing activates. VS Code loads one JSON file of about 13 KB when the theme is selected.
