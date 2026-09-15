# 0006. Release by tag, through an approved environment and OIDC

**Status:** Accepted · 2026-09-15

## Context

Publishing by hand from a working copy kept tokens out of CI, but a release depended on one
machine, one person remembering every step, and a long-lived Marketplace token existing
somewhere. Both registries now accept short-lived credentials minted from GitHub's OIDC
token, which removes the reason for publishing by hand.

## Decision

Pushing a `vX.Y.Z` tag runs `.github/workflows/release.yml`:

| Job | Does |
|---|---|
| Verify | Reruns `ci.yml` against the tagged commit and builds the VSIX |
| Check release | Fails unless the tag matches `package.json` and `CHANGELOG.md` has an entry for it |
| Publish | Waits for approval on the `release` environment, then publishes the VSIX from Verify |
| GitHub release | Attaches the same VSIX, with the changelog entry as notes |

The Marketplace is reached through Microsoft Entra ID workload identity federation, scoped
to the `release` environment. Open VSX uses trusted publishing. The environment only
accepts `v*` tags, and a ruleset stops release tags being moved or deleted.

## Rationale

The VSIX is built once and the identical file goes to every destination, so the Marketplace,
Open VSX and GitHub can never ship different bytes. The approval gate keeps a human decision
in the loop without a human doing the mechanical steps. With no stored token, there is
nothing to leak, rotate or expire.

## Consequences

- Supersedes the working-copy publishing described in ADR 0004 and the README.
- First-time setup needs an Entra app with a federated credential, and an Open VSX namespace
  with trusted publishing configured.
- Both publish steps skip versions that already exist, so a failed run is re-run, not repaired.
