/* Renders an icon as a cloud badge: a soft cloud behind, one small puff, and the glyph layers on
   top with a sticker outline. VS Code draws file icons at 16px, so the glyph fills most of the
   square and the cloud bleeds to the edges. renderBadge splits two-tone layers along the diagonal
   with clip paths, so a single logo path can carry two colours. */

import type { Hex } from "../color.ts";
import { badge } from "../roles.ts";

export interface Layer {
  d: string;
  fill: Hex;
  split?: Hex;
  evenOdd?: boolean;
  noOutline?: boolean;
}

const CLOUD =
  "M9 26.5c-4.2 0-7-2.8-7-6.4 0-3.1 2.2-5.7 5.3-6.3C8.1 9 11.8 5.5 16.2 5.5c3.9 0 7.2 2.6 8.3 6.2 3.2.5 5.5 3.2 5.5 6.5 0 4.7-3.4 8.3-8.1 8.3H9z";
const CLOUD_PLACEMENT = "translate(-1.7 -2.8) scale(1.107 1.238)";
const PUFF = "M2.4 10.2h6a1.5 1.5 0 0 0 .1-3 2.3 2.3 0 0 0-4.3-.7 1.9 1.9 0 0 0-1.8 3.7z";
const PUFF_PLACEMENT = "translate(-1.6 -6)";
const GLYPH_PLACEMENT = "translate(3 3.5) scale(1.083)";
const SPLIT_CLIPS =
  '<defs><clipPath id="upper"><path d="M-2-2H26L-2 26z"/></clipPath><clipPath id="lower"><path d="M26-2V26H-2z"/></clipPath></defs>';

function renderLayer({ d, fill, split, evenOdd, noOutline }: Layer): string {
  const rule = `${evenOdd ? ' fill-rule="evenodd"' : ""}${noOutline ? ' stroke="none"' : ""}`;
  if (split === undefined) return `<path d="${d}" fill="${fill}"${rule}/>`;
  return (
    `<path d="${d}" fill="${fill}"${rule} clip-path="url(#upper)"/>` +
    `<path d="${d}" fill="${split}"${rule} clip-path="url(#lower)"/>`
  );
}

export function renderBadge(layers: readonly Layer[]): string {
  const defs = layers.some((layer) => layer.split !== undefined) ? SPLIT_CLIPS : "";
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">${defs}` +
    `<path d="${CLOUD}" transform="${CLOUD_PLACEMENT}" fill="${badge.cloud}"/>` +
    `<path d="${PUFF}" transform="${PUFF_PLACEMENT}" fill="${badge.puff}" stroke="${badge.puffOutline}" stroke-width="0.6"/>` +
    `<g transform="${GLYPH_PLACEMENT}" stroke="${badge.outline}" stroke-width="1" stroke-linejoin="round" paint-order="stroke">` +
    `${layers.map(renderLayer).join("")}</g></svg>\n`
  );
}
