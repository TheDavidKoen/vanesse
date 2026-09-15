# 0005. Neutral names in published metadata

**Status:** Accepted · 2026-09-15

## Context

The theme's inspirations are protected franchises and trademarks. The Marketplace and Open
VSX index an extension's name, display name, description and keywords, and rights holders
monitor those listings.

## Decision

- `name`, `displayName`, `description` and `keywords` describe the style in generic words:
  elven, fantasy, arcade, retro, neon, CRT. No franchise, author, studio, character, place
  or game names.
- Palette names are evocative but generic: leaf gold, blade blue, ghost red.
- The README carries one non-affiliation paragraph that names the inspirations only to
  disclaim a connection.

## Rationale

Being searchable by style is enough for discovery, and it avoids a takedown that would
remove the listing and every install's update path. Naming influences once, in a
disclaimer, is the conventional and honest middle ground.

## Consequences

- People searching a franchise name will not find the theme. That is accepted.
- New keywords and palette names are reviewed against this record.
