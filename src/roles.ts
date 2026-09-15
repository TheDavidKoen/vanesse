/* Maps raw colours to meaning. The theme and icon emitters read these roles and nothing else,
   so recolouring a concept everywhere it appears is a one-line change here. */

import { mix, withAlpha } from "./color.ts";
import { palette as p } from "./palette.ts";

export const surface = {
  frame: p.void,
  shade: p.shade,
  editor: p.ground,
  widget: p.raise,
  border: p.ridge,
  banner: p.plum,
  terminal: p.void,
  lineHighlight: withAlpha(p.violet, 0.07),
  lineHighlightBorder: withAlpha(p.violet, 0.16),
  selection: withAlpha(p.violet, 0.3),
  inactiveSelection: withAlpha(p.violet, 0.16),
  wordHighlight: withAlpha(p.silver, 0.1),
  wordHighlightStrong: withAlpha(p.magenta, 0.16),
  findMatch: withAlpha(p.lemon, 0.28),
  findMatchOther: withAlpha(p.lemon, 0.14),
  hover: withAlpha(p.magenta, 0.14),
  vividEdge: withAlpha(p.magenta, 0.45),
  activeGuide: withAlpha(p.violet, 0.6),
  shadow: withAlpha(p.void, 0.7),
} as const;

export const text = {
  primary: p.silver,
  secondary: p.ash,
  muted: p.slate,
  faint: p.smoke,
  onAccent: p.void,
  terminal: p.mint,
} as const;

export const accent = {
  primary: p.gold,
  highlight: p.lemon,
  hover: p.lemon,
  cursor: p.lemon,
  vivid: p.magenta,
  badge: p.magenta,
  progress: p.magenta,
  focus: p.cyan,
  link: p.sky,
  linkActive: p.cyan,
} as const;

export const syntax = {
  variable: p.silver,
  comment: p.slate,
  operator: p.ash,
  keyword: p.gold,
  tag: p.gold,
  heading: p.gold,
  function: p.sky,
  link: p.sky,
  type: p.teal,
  string: p.lime,
  parameter: p.violet,
  attribute: p.violet,
  property: p.mist,
  regexp: p.amber,
  decorator: p.amber,
  number: p.magenta,
  constant: p.magenta,
  escape: p.lemon,
  invalid: p.red,
} as const;

export const signal = {
  error: p.red,
  warning: p.orange,
  info: p.cyan,
  hint: p.pink,
  added: p.lime,
  modified: p.orange,
  deleted: p.red,
  conflict: p.magenta,
  ignored: p.smoke,
} as const;

export const brackets = {
  first: p.gold,
  second: p.magenta,
  third: p.cyan,
} as const;

export const ansi = {
  black: p.ridge,
  red: p.red,
  green: p.mint,
  yellow: p.gold,
  blue: p.sky,
  magenta: p.magenta,
  cyan: p.cyan,
  white: p.silver,
  brightBlack: p.slate,
  brightRed: mix(p.red, p.white, 0.35),
  brightGreen: mix(p.mint, p.white, 0.35),
  brightYellow: p.lemon,
  brightBlue: mix(p.sky, p.white, 0.35),
  brightMagenta: mix(p.magenta, p.white, 0.35),
  brightCyan: mix(p.cyan, p.white, 0.35),
  brightWhite: mix(p.silver, p.white, 0.35),
} as const;

export const badge = {
  cloud: withAlpha(p.violet, 0.26),
  puff: p.silver,
  puffOutline: p.ridge,
  outline: p.void,
} as const;

export const icon = {
  silver: p.silver,
  slate: p.slate,
  mist: p.mist,
  gold: p.gold,
  amber: p.amber,
  lemon: p.lemon,
  sky: p.sky,
  teal: p.teal,
  lime: p.lime,
  violet: p.violet,
  magenta: p.magenta,
  pink: p.pink,
  red: p.red,
  cyan: p.cyan,
  shadow: p.void,
} as const;
