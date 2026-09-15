/* Every raw colour in the theme, named by hue. No other file writes a hex value, and the
   theme emitters never import this file directly. */

export const palette = {
  void: "#06050F",
  shade: "#0A0B1C",
  ground: "#0D1026",
  raise: "#171A38",
  ridge: "#2A2F5C",
  plum: "#1C1045",

  silver: "#DCE3F2",
  ash: "#A3ACC7",
  slate: "#8A93BF",
  smoke: "#5F6690",

  gold: "#FFCB5C",
  amber: "#FF9E57",
  sky: "#5CC8FF",
  teal: "#3FE6C4",
  lime: "#A5E86B",
  violet: "#B794FF",
  mist: "#9FC2FF",

  lemon: "#FFE93D",
  magenta: "#FF5CCB",
  mint: "#6BFF9C",
  red: "#FF4F64",
  orange: "#FFAE3D",
  cyan: "#2EF0F0",
  pink: "#FFA8DC",

  white: "#FFFFFF",
} as const;
