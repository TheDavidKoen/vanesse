# 0003. Colour system with a measured contrast floor

**Status:** Accepted · 2026-09-15

## Context

The theme blends two looks that pull in opposite directions. The elven half wants soft,
low-saturation silver and gold on deep blue-black. The arcade half wants saturated neon.
Both fail easily on a dark ground: soft colours sink into it, and dark themes commonly drop
comments to around 3:1 so they recede.

## Decision

Three layers, each with one job:

- **Surfaces** are five steps of blue-black, darkest at the bezel (title, activity and
  status bars) and lightest for floating widgets.
- **Elven colours carry the code.** Silver, gold, blade blue, teal, moss, violet, mist and
  ember cover every syntax role.
- **Arcade colours carry state.** Coin yellow marks where you are, neon magenta marks counts
  and progress, and the four ghost colours mark diagnostics.

Every pairing below uses WCAG 2.2 relative luminance, and `src/roles.test.ts` asserts the
floor for each.

## Syntax, measured

The current line composites to `#161B2A` and a selection to `#2A3F59`.

| Roles | Hex | Editor `#0E1322` | Current line | Selection |
|---|---|---|---|---|
| escape | `#FFE14D` | 14.21 | 13.17 | 8.26 |
| variable | `#D7DDEA` | 13.59 | 12.59 | 7.89 |
| string | `#B6DA8A` | 11.79 | 10.93 | 6.85 |
| keyword, tag, heading | `#E9C46A` | 11.07 | 10.27 | 6.43 |
| type | `#6ED8CC` | 10.89 | 10.09 | 6.33 |
| property | `#A9C1E8` | 10.12 | 9.38 | 5.88 |
| function, link | `#7CC2FF` | 9.71 | 9.00 | 5.64 |
| regexp, decorator | `#F2A25C` | 8.90 | 8.25 | 5.17 |
| parameter, attribute | `#B8A6F8` | 8.68 | 8.04 | 5.04 |
| number, constant | `#F585D6` | 8.11 | 7.52 | 4.71 |
| operator | `#A0AAC0` | 7.94 | 7.36 | 4.61 |
| invalid | `#FF5F6D` | 6.26 | 5.81 | 3.64 |
| comment | `#8490AB` | 5.78 | 5.36 | 3.36 |

Floors: 4.5:1 on the editor and current line, 3:1 inside a selection. A selection is
transient, and primary text still reads at 7.89:1 inside one.

## Interface, measured

| Role | Bezel `#07090F` | Shade `#0B0F1A` | Editor `#0E1322` | Widget `#161D33` | Floor |
|---|---|---|---|---|---|
| primary `#D7DDEA` | 14.62 | 14.05 | 13.59 | 12.26 | 4.5 |
| secondary `#A0AAC0` | 8.54 | 8.21 | 7.94 | 7.16 | 4.5 |
| muted `#8490AB` | 6.22 | 5.98 | 5.78 | 5.21 | 4.5 |
| faint `#5D6883` | 3.58 | 3.44 | 3.32 | 3.00 | 3 |
| focus ring `#7CC2FF` | 10.44 | 10.04 | 9.71 | 8.76 | 3 |

| Filled accent | Text `#07090F` on it |
|---|---|
| Button, leaf gold `#E9C46A` | 11.91 |
| Button hover, coin yellow `#FFE14D` | 15.29 |
| Badge, neon magenta `#F585D6` | 8.73 |
| Debugging status bar, ghost red `#FF5F6D` | 6.74 |

Diagnostics and git decorations are measured on the side bar `#0B0F1A`, where they appear
as text: error 6.48, warning 10.85, info 12.75, hint 11.99, added 12.20, conflict 8.39.
Terminal colours are measured on the same ground, and the lowest is `brightBlack` at 5.98.

## Consequences

- Comments are brighter than many dark themes make them. That is the price of AA, and italic
  does the work of making them recede.
- `faint` is the only text below 4.5:1. It is reserved for line numbers, ignored files and
  input borders, never content. On widgets it sits on its 3:1 floor, so it must not darken.
- `ansi.black` is `#232C47`, 1.39:1 on the terminal. Terminal programs use it as a
  background, so it is excluded from the text floor deliberately.
- `ridge` borders are 1.34:1 and purely decorative. Any boundary a user must see to operate
  a control uses `faint` or the focus ring.
- A new surface means a new column here, and a new assertion, before any text is put on it.
