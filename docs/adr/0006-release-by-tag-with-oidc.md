# 0006. Release by tag, through an approved environment and OIDC

**Status:** Accepted, amended 2026-09-15

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

## Amendment, 2026-09-15: a Marketplace token

The Entra ID route needs an Azure directory, and the maintainer's Microsoft account has none.
Creating one means an Azure signup for the sake of a single credential, which is out of
proportion for a solo theme.

The Marketplace step now authenticates with a `VSCE_PAT` secret, a Marketplace-scoped Azure
DevOps token stored on the `release` environment. Open VSX is unchanged and still uses
trusted publishing.

| Control | Effect |
|---|---|
| Environment secret | Readable only by jobs that target `release` |
| Tag-only deployment policy | Only a `v*` tag can reach the environment |
| Required reviewer | Every run waits for the maintainer's approval |
| Marketplace (Manage) scope | The token cannot touch anything else in Azure DevOps |

- The token expires, and must be renewed in Azure DevOps and in the environment secret before it does.
- A leaked token could publish to the `davidkoen` publisher until revoked. Revoke it in Azure DevOps first, then replace the secret.

## Second amendment, 2026-09-15: manual Marketplace upload

The token route failed too. A Marketplace token is created inside an Azure DevOps
organisation, and Azure DevOps now refuses to create an organisation unless it is linked to
an Azure subscription, the same signup the first amendment set out to avoid.

The release workflow no longer publishes to the Marketplace. It publishes to Open VSX through
trusted publishing and attaches the VSIX to the GitHub release, and the maintainer uploads
that same file on the Marketplace publisher's Manage page.

- No publishing token or secret exists anywhere, for either registry.
- The Marketplace still receives exactly the file CI built and Open VSX published.
- Each release has one manual step. If Microsoft restores token creation without a
  subscription, the first amendment's `VSCE_PAT` step can return in a single change.

## Third amendment, 2026-09-15: an Open VSX token

Open VSX does not support trusted publishing yet. The live registry runs version 1.1.2, which
has no trusted publisher settings and no token exchange, although the `ovsx` client already
supports both.

The Open VSX step now authenticates with an `OVSX_PAT` secret on the `release` environment.
The environment's required reviewer and tag-only policy still apply, so only an approved `v`
tag release can read it.

- Open VSX tokens have no expiry and no scopes, so a leaked token could publish to any
  namespace the account belongs to until it is deleted on open-vsx.org.
- Once open-vsx.org supports trusted publishing, register `release.yml` as a trusted
  publisher, delete the secret and the token, restore `id-token: write` on the publish job,
  and remove its `env` block.
- The Marketplace is unchanged: the same VSIX, uploaded by hand.