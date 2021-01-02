type colorComponent = 'r' | 'g' | 'b';

type Color = Record<colorComponent, number>;

export function convertHexToRgb(hex: string): Color {
  const match = hex.replace(/#/, '').match(/.{1,2}/g);
  if (!match) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(match[0], 16),
    g: parseInt(match[1], 16),
    b: parseInt(match[2], 16),
  };
}

function componentToHex(c: number) {
  var hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}

export function convertRgbToHex(color: Color): string {
  return `#${componentToHex(color.r)}${componentToHex(color.g)}${componentToHex(
    color.b
  )}`;
}

export function findColorBetween(
  hex1: string,
  hex2: string,
  percentage: number
): string {
  const left = convertHexToRgb(hex1);
  const right = convertHexToRgb(hex2);
  const newColor: Record<colorComponent, number> = { r: 0, g: 0, b: 0 };
  const components: colorComponent[] = ['r', 'g', 'b'];
  for (let i = 0; i < components.length; i++) {
    const c = components[i];
    newColor[c] = Math.round(
      left[c] + ((right[c] - left[c]) * percentage) / 100
    );
  }
  return convertRgbToHex(newColor);
}
