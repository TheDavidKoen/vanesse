# 0005. Neutral names and brand logos

**Status:** Accepted · 2026-09-15

## Context

The icon theme draws dozens of product logos, and those logos and product names are
trademarks. The Marketplace and Open VSX index an extension's name, display name,
description and keywords, and rights holders monitor those listings.

## Decision

- Logos come from Simple Icons, whose drawings are released under CC0, and are used only to
  identify the file type they belong to. Each is recoloured from the theme palette.
- Where an owner has asked Simple Icons to remove its logo, as with Java, C# and PowerShell,
  the icon is an original, generic drawing rather than a copy of the mark.
- `name`, `displayName`, `description` and `keywords` describe the theme itself and never
  name a brand.
- The README carries one paragraph that credits Simple Icons and disclaims affiliation.

## Rationale

Marking a file type with its own logo is how icon themes are expected to work, and it is the
reason people install one. Respecting withdrawal requests and keeping brand names out of the
listing's searchable metadata keeps the extension clear of takedowns, which would remove the
listing and every install's update path.

## Consequences

- A Simple Icons upgrade that withdraws a logo fails the type check, because each logo is
  imported by name. The icon then moves to `src/icons/generic.ts` as an original drawing.
- People searching for a brand name will not find the theme through its metadata. That is
  accepted.
- New keywords and icons are reviewed against this record.
