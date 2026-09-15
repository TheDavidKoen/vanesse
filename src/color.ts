/* Pure colour maths on uppercase hex strings. contrastRatio implements WCAG 2.2 relative
   luminance, flatten composites a translucent colour onto its background so it can be measured,
   and withAlpha and mix derive every colour that is not in the palette. */

export type Hex = `#${string}`;

type Rgb = [red: number, green: number, blue: number];

const HEX_PATTERN = /^#[0-9A-F]{6}([0-9A-F]{2})?$/;

export function isHex(value: string): value is Hex {
  return HEX_PATTERN.test(value);
}

function toChannels(hex: Hex): Rgb {
  return [
    Number.parseInt(hex.slice(1, 3), 16),
    Number.parseInt(hex.slice(3, 5), 16),
    Number.parseInt(hex.slice(5, 7), 16),
  ];
}

function toByte(value: number): string {
  return Math.round(value).toString(16).padStart(2, "0").toUpperCase();
}

function toHex([red, green, blue]: Rgb): Hex {
  return `#${toByte(red)}${toByte(green)}${toByte(blue)}`;
}

function linearise(channel: number): number {
  const srgb = channel / 255;
  return srgb <= 0.04045 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
}

export function withAlpha(hex: Hex, opacity: number): Hex {
  return `#${hex.slice(1, 7)}${toByte(opacity * 255)}`;
}

export function mix(from: Hex, to: Hex, weight: number): Hex {
  const [r1, g1, b1] = toChannels(from);
  const [r2, g2, b2] = toChannels(to);
  return toHex([r1 + (r2 - r1) * weight, g1 + (g2 - g1) * weight, b1 + (b2 - b1) * weight]);
}

export function flatten(translucent: Hex, background: Hex): Hex {
  const opacity = translucent.length === 9 ? Number.parseInt(translucent.slice(7, 9), 16) / 255 : 1;
  return mix(background, translucent, opacity);
}

export function relativeLuminance(hex: Hex): number {
  const [red, green, blue] = toChannels(hex);
  return 0.2126 * linearise(red) + 0.7152 * linearise(green) + 0.0722 * linearise(blue);
}

export function contrastRatio(first: Hex, second: Hex): number {
  const a = relativeLuminance(first);
  const b = relativeLuminance(second);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}