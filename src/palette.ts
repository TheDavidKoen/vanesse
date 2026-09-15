/* Every raw colour in the theme, named for what it evokes. No other file writes a hex
   value, and the theme emitters never import this file directly. */

export const palette = {
  bezel: "#07090F",
  shade: "#0B0F1A",
  ground: "#0E1322",
  raise: "#161D33",
  ridge: "#232C47",

  moonSilver: "#D7DDEA",
  ashSilver: "#A0AAC0",
  duskGrey: "#8490AB",
  shadowGrey: "#5D6883",

  leafGold: "#E9C46A",
  emberAmber: "#F2A25C",
  bladeBlue: "#7CC2FF",
  elvenTeal: "#6ED8CC",
  mossGreen: "#B6DA8A",
  twilightViolet: "#B8A6F8",
  mistBlue: "#A9C1E8",

  coinYellow: "#FFE14D",
  neonMagenta: "#F585D6",
  ghostRed: "#FF5F6D",
  ghostOrange: "#FFB454",
  ghostCyan: "#5EE6EB",
  ghostPink: "#FFB8DE",

  white: "#FFFFFF",
} as const;