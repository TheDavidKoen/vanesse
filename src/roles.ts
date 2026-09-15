/* Maps raw colours to meaning. The theme emitters read these roles and nothing else, so
   recolouring a concept everywhere it appears is a one-line change here. */

import { mix, withAlpha } from "./color.ts";
import { palette as p } from "./palette.ts";

export const surface = {
  bezel: p.bezel,
  shade: p.shade,
  editor: p.ground,
  widget: p.raise,
  border: p.ridge,
  lineHighlight: withAlpha(p.moonSilver, 0.04),
  selection: withAlpha(p.bladeBlue, 0.25),
  inactiveSelection: withAlpha(p.bladeBlue, 0.14),
  wordHighlight: withAlpha(p.moonSilver, 0.08),
  wordHighlightStrong: withAlpha(p.twilightViolet, 0.16),
  findMatch: withAlpha(p.coinYellow, 0.25),
  findMatchOther: withAlpha(p.coinYellow, 0.12),
  shadow: withAlpha(p.bezel, 0.6),
} as const;

export const text = {
  primary: p.moonSilver,
  secondary: p.ashSilver,
  muted: p.duskGrey,
  faint: p.shadowGrey,
  onAccent: p.bezel,
} as const;

export const accent = {
  primary: p.leafGold,
  hover: p.coinYellow,
  focus: p.bladeBlue,
  cursor: p.coinYellow,
  badge: p.neonMagenta,
  progress: p.neonMagenta,
  link: p.bladeBlue,
  linkActive: p.ghostCyan,
} as const;

export const syntax = {
  variable: p.moonSilver,
  comment: p.duskGrey,
  operator: p.ashSilver,
  keyword: p.leafGold,
  tag: p.leafGold,
  heading: p.leafGold,
  function: p.bladeBlue,
  link: p.bladeBlue,
  type: p.elvenTeal,
  string: p.mossGreen,
  parameter: p.twilightViolet,
  attribute: p.twilightViolet,
  property: p.mistBlue,
  regexp: p.emberAmber,
  decorator: p.emberAmber,
  number: p.neonMagenta,
  constant: p.neonMagenta,
  escape: p.coinYellow,
  invalid: p.ghostRed,
} as const;

export const signal = {
  error: p.ghostRed,
  warning: p.ghostOrange,
  info: p.ghostCyan,
  hint: p.ghostPink,
  added: p.mossGreen,
  modified: p.ghostOrange,
  deleted: p.ghostRed,
  conflict: p.neonMagenta,
  ignored: p.shadowGrey,
} as const;

export const brackets = {
  first: p.leafGold,
  second: p.twilightViolet,
  third: p.ghostCyan,
} as const;

export const ansi = {
  black: p.ridge,
  red: p.ghostRed,
  green: p.mossGreen,
  yellow: p.leafGold,
  blue: p.bladeBlue,
  magenta: p.neonMagenta,
  cyan: p.ghostCyan,
  white: p.moonSilver,
  brightBlack: p.duskGrey,
  brightRed: mix(p.ghostRed, p.white, 0.35),
  brightGreen: mix(p.mossGreen, p.white, 0.35),
  brightYellow: p.coinYellow,
  brightBlue: mix(p.bladeBlue, p.white, 0.35),
  brightMagenta: mix(p.neonMagenta, p.white, 0.35),
  brightCyan: mix(p.ghostCyan, p.white, 0.35),
  brightWhite: mix(p.moonSilver, p.white, 0.35),
} as const;