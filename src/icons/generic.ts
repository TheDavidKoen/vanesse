/* Original drawings, in the Simple Icons 24 unit square, for icons with no logo: folders, plain
   files, images, lockfiles, tests, config, the licence, and the brands whose logos were
   withdrawn from Simple Icons at their owners' request. */

import { icon } from "../roles.ts";
import type { Layer } from "./badge.ts";

export const generic = {
  folder: [
    {
      d: "M2 6.5A2.5 2.5 0 0 1 4.5 4h5l2.5 2.5h7.5A2.5 2.5 0 0 1 22 9v8.5a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 17.5z",
      fill: icon.gold,
    },
  ],
  "folder-open": [
    { d: "M2 6.5A2.5 2.5 0 0 1 4.5 4h5l2.5 2.5h7.5A2.5 2.5 0 0 1 22 9v9.5H2z", fill: icon.amber },
    {
      d: "M4.9 11.2A2 2 0 0 1 6.8 10h15.7a1 1 0 0 1 .95 1.3l-2.4 7.4A2 2 0 0 1 19.2 20H2.5a1 1 0 0 1-.95-1.3z",
      fill: icon.gold,
    },
  ],
  file: [
    { d: "M6 2h8l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z", fill: icon.silver },
    { d: "M14 2l5 5h-5z", fill: icon.slate },
  ],
  image: [
    { d: "M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", fill: icon.mist },
    { d: "M5.5 18.5l4-5.5 3 3.8 2-2.4 4 4.1z", fill: icon.lime },
    { d: "M17 8.5a1.9 1.9 0 1 1-3.8 0 1.9 1.9 0 0 1 3.8 0z", fill: icon.lemon },
  ],
  lock: [
    { d: "M7.5 10.5V7.5a4.5 4.5 0 0 1 9 0v3h-2.2v-3a2.3 2.3 0 0 0-4.6 0v3z", fill: icon.silver },
    {
      d: "M4.5 12A1.5 1.5 0 0 1 6 10.5h12a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 18 21.5H6A1.5 1.5 0 0 1 4.5 20z",
      fill: icon.gold,
    },
    { d: "M12 13.5a1.6 1.6 0 0 1 .8 3v2.3h-1.6v-2.3a1.6 1.6 0 0 1 .8-3z", fill: icon.shadow },
  ],
  test: [
    {
      d: "M8.5 2.5h7v2.2h-1.2v4.6l5.4 9.1A2.4 2.4 0 0 1 17.6 22H6.4a2.4 2.4 0 0 1-2.1-3.6l5.4-9.1V4.7H8.5z",
      fill: icon.silver,
    },
    { d: "M7 15h10l1.8 3.1a1.2 1.2 0 0 1-1 1.8H6.2a1.2 1.2 0 0 1-1-1.8z", fill: icon.lime },
  ],
  config: [
    { d: "M3 5.5h18v2H3zM3 11h18v2H3zM3 16.5h18v2H3z", fill: icon.slate },
    { d: "M7 3.8h3v5.4H7zM14 9.3h3v5.4h-3zM5.5 14.8h3v5.4h-3z", fill: icon.cyan },
  ],
  license: [
    { d: "M5 3a1 1 0 0 1 1-1h9l4 4v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z", fill: icon.silver },
    { d: "M13 18.5l-1.2 4.5 2.7-1.3 2.7 1.3-1.2-4.5z", fill: icon.magenta },
    { d: "M18 14.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z", fill: icon.gold },
  ],
  java: [
    { d: "M9.2 2.2c1.8 1.4-.8 2.8.5 4.6l-1.2.6C6.9 5.6 9.6 4.2 8 3z", fill: icon.silver },
    { d: "M13.2 2.2c1.8 1.4-.8 2.8.5 4.6l-1.2.6c-1.6-1.8 1.1-3.2-.5-4.4z", fill: icon.silver },
    { d: "M16 11h1.6a3 3 0 0 1 0 6H16v-1.8h1.6a1.2 1.2 0 0 0 0-2.4H16z", fill: icon.amber },
    { d: "M4.5 9h12v6a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5z", fill: icon.amber },
    { d: "M3 20.5h16V22H3z", fill: icon.silver },
  ],
  csharp: [
    { d: "M12 1.5l9.1 5.25v10.5L12 22.5l-9.1-5.25V6.75z", fill: icon.violet },
    { d: "M14.6 9A4 4 0 1 0 14.6 15l-1.2-1.1A2.4 2.4 0 1 1 13.4 10.1z", fill: icon.silver },
    {
      d: "M16.2 9.6h1v1.1h1V9.6h1v1.1h.8v1h-.8v.8h.8v1h-.8v1.1h-1v-1.1h-1v1.1h-1v-1.1h-.7v-1h.7v-.8h-.7v-1h.7zm1 2.1v.8h1v-.8z",
      fill: icon.silver,
      evenOdd: true,
    },
  ],
  powershell: [
    {
      d: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
      fill: icon.sky,
    },
    { d: "M5.8 8.3l1.3-1.3 5 5-5 5-1.3-1.3L9.5 12z", fill: icon.silver },
    { d: "M12.5 15.4H18V17h-5.5z", fill: icon.silver },
  ],
} as const satisfies Record<string, readonly Layer[]>;
