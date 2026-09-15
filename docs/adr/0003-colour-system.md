# 0003. Colour system with a measured contrast floor

**Status:** Accepted · 2026-09-15

## Context

A dark theme needs saturated colour so it does not feel flat, but saturated colour on a dark
ground fails easily. Bright hues vibrate against each other, muted ones sink into the
background, and dark themes commonly drop comments to around 3:1 so they recede.

## Decision

Four layers, each with one job:

- **Surfaces** are five steps of violet-tinted night, darkest at the frame (title, activity
  and tab bars) and lightest for floating widgets, plus a plum banner for the status bar.
- **Warm and cool accents carry the code.** Gold, sky, teal, lime, violet, mist and amber
  cover every syntax role.
- **Vivid accents carry state.** Lemon marks where you are, magenta marks active edges,
  counts and progress, and cyan marks focus. Red, orange, cyan and pink mark diagnostics.
- **Weight carries structure.** Control flow, class names, constants and tags are bold.
  Storage words, parameters, attributes, decorators and comments are italic.

Every pairing below uses WCAG 2.2 relative luminance, and `src/roles.test.ts` asserts the
floor for each.

## Syntax, measured

The current line composites to `#191935` and a selection to `#403868`.

| Roles | Hex | Editor `#0D1026` | Current line | Selection |
|---|---|---|---|---|
| escape | `#FFE93D` | 15.17 | 13.78 | 8.56 |
| variable | `#DCE3F2` | 14.58 | 13.24 | 8.22 |
| string | `#A5E86B` | 12.83 | 11.65 | 7.24 |
| keyword, tag, heading | `#FFCB5C` | 12.46 | 11.32 | 7.03 |
| type | `#3FE6C4` | 11.91 | 10.82 | 6.72 |
| property | `#9FC2FF` | 10.40 | 9.45 | 5.87 |
| function, link | `#5CC8FF` | 9.97 | 9.06 | 5.63 |
| regexp, decorator | `#FF9E57` | 9.19 | 8.35 | 5.18 |
| operator | `#A3ACC7` | 8.29 | 7.54 | 4.68 |
| parameter, attribute | `#B794FF` | 7.77 | 7.06 | 4.38 |
| number, constant | `#FF5CCB` | 6.83 | 6.21 | 3.85 |
| comment | `#8A93BF` | 6.26 | 5.69 | 3.53 |
| invalid | `#FF4F64` | 5.86 | 5.32 | 3.30 |

Floors: 4.5:1 on the editor and current line, 3:1 inside a selection. A selection is
transient, and primary text still reads at 8.22:1 inside one.

## Interface, measured

| Role | Frame `#06050F` | Shade `#0A0B1C` | Editor `#0D1026` | Widget `#171A38` | Banner `#1C1045` | Floor |
|---|---|---|---|---|---|---|
| primary `#DCE3F2` | 15.74 | 15.14 | 14.58 | 13.14 | 13.49 | 4.5 |
| secondary `#A3ACC7` | 8.96 | 8.61 | 8.29 | 7.48 | 7.68 | 4.5 |
| muted `#8A93BF` | 6.76 | 6.50 | 6.26 | 5.64 | 5.79 | 4.5 |
| gold `#FFCB5C` | 13.46 | 12.95 | 12.46 | 11.24 | 11.53 | 4.5 |
| highlight `#FFE93D` | 16.38 | 15.75 | 15.17 | 13.68 | 14.04 | 4.5 |
| faint `#5F6690` | 3.66 | 3.52 | 3.39 | 3.05 | 3.13 | 3 |
| focus ring `#2EF0F0` | 14.32 | 13.77 | 13.26 | 11.95 | 12.27 | 3 |
| vivid edge `#FF5CCB` | 7.38 | 7.10 | 6.83 | 6.16 | 6.32 | 3 |

Highlight text on a selected explorer item reads at 9.08:1, and primary text on a find match
at 6.77:1.

| Filled accent | Text `#06050F` on it |
|---|---|
| Button, gold `#FFCB5C` | 13.46 |
| Button hover, lemon `#FFE93D` | 16.38 |
| Badge, magenta `#FF5CCB` | 7.38 |
| Debugging status bar, red `#FF4F64` | 6.32 |

Diagnostics and git decorations are measured on the side bar `#0A0B1C`, where they appear
as text: error 6.08, warning 10.56, info 13.77, hint 11.03, added 13.32, conflict 7.10.
Terminal text is mint at 15.83:1 on `#06050F`, and the lowest ANSI colour is red at 6.32.

## Consequences

- Comments are brighter than many dark themes make them. That is the price of AA, and italic
  does the work of making them recede.
- `faint` is the only text below 4.5:1. It is reserved for line numbers, ignored files and
  input borders, never content. On widgets it sits at 3.05:1, just above its floor, so it
  must not darken.
- `ansi.black` is `#2A2F5C`, 1.60:1 on the terminal. Terminal programs use it as a
  background, so it is excluded from the text floor deliberately.
- `ridge` borders are 1.48:1 and purely decorative. Any boundary a user must see to operate
  a control uses `faint`, the focus ring or the vivid edge.
- A new surface means a new column here, and a new assertion, before any text is put on it.
