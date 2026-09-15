# 0002. GitHub Flow, branches deleted after merge

**Status:** Accepted · 2026-09-15

## Context

Solo project with no release trains. Releases are published by hand from `main` whenever a
change is worth shipping.

## Decision

GitHub Flow: `main` always releasable, short-lived `feat/`, `fix/`, `chore/`, `docs/` and
`refactor/` branches merged via pull request. Branches are deleted once merged.

## Rationale

The `develop` and `release` layers of heavier models exist to coordinate versioned releases
across teams. Adopting them for one maintainer would be ceremony without a purpose.

Merged branches are deleted because a branch is a workspace, not storage. The commits stay
reachable from `main`, and GitHub keeps merged pull requests and their diffs. Stale branches
invite work from an outdated base.

## Consequences

- Every change is reviewable as a self-contained diff, with the CI-built VSIX attached for trying it.
- The pull request trail is the durable record, not the branch list.
- A merged branch is spent. Further work starts a new one.
