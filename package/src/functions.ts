import tailwindMapperData from "../tailwindMapper.json";
import {
  CSSVariables,
  ColorCode,
  ColorData,
  ColorFormat,
  ColorSearchResult,
  MapperStats,
  TailwindColor,
  TailwindConfig,
  TailwindMapper,
  TailwindShade,
} from "./types";

const tailwindMapper: TailwindMapper =
  tailwindMapperData as unknown as TailwindMapper;

// Constants
const VALID_COLORS: readonly TailwindColor[] = [
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
] as const;

const VALID_SHADES: readonly TailwindShade[] = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
] as const;

const VALID_FORMATS: readonly ColorFormat[] = [
  "hex",
  "rgb",
  "hsl",
  "oklch",
  "rawrgb",
  "raw_rgb",
  "rawhsl",
  "raw_hsl",
  "rawoklch",
  "raw_oklch",
  "all",
] as const;

// Validation functions
function isValidColor(colorName: string): colorName is TailwindColor {
  return VALID_COLORS.includes(colorName as TailwindColor);
}

function isValidShade(shade: number): shade is TailwindShade {
  return VALID_SHADES.includes(shade as TailwindShade);
}

function isValidFormat(format: string): format is ColorFormat {
  return VALID_FORMATS.includes(format.toLowerCase() as ColorFormat);
}

function normalizeColorCode(colorName: string, colorCode: ColorCode): string {
  if (typeof colorCode === "number") {
    if (!isValidShade(colorCode)) {
      throw new Error(
        `Invalid shade: ${colorCode}. Valid shades are: ${VALID_SHADES.join(
          ", "
        )}`
      );
    }
    return `${colorName}-${colorCode}`;
  }

  // If it's already a string, validate it matches the expected format
  if (colorCode.includes("-")) {
    // It's already in format "red-500"
    return colorCode;
  } else {
    // It's just the number as string "500"
    const shadeNum = parseInt(colorCode, 10);
    if (isNaN(shadeNum) || !isValidShade(shadeNum)) {
      throw new Error(
        `Invalid shade: ${colorCode}. Valid shades are: ${VALID_SHADES.join(
          ", "
        )}`
      );
    }
    return `${colorName}-${shadeNum}`;
  }
}

// Main function to get color value in specified format
export function getColor(
  colorName: string,
  colorCode: ColorCode,
  format: ColorFormat = "hex"
): string | [number, number, number] | ColorData {
  // Validate inputs
  if (!isValidColor(colorName)) {
    throw new Error(
      `Invalid color: "${colorName}". Valid colors are: ${VALID_COLORS.join(
        ", "
      )}`
    );
  }

  if (!isValidFormat(format)) {
    throw new Error(
      `Invalid format: "${format}". Valid formats are: ${VALID_FORMATS.join(
        ", "
      )}`
    );
  }

  const normalizedColorCode = normalizeColorCode(colorName, colorCode);

  if (!tailwindMapper[colorName]) {
    throw new Error(`Color "${colorName}" not found in mapper`);
  }

  if (!tailwindMapper[colorName][normalizedColorCode]) {
    throw new Error(
      `Color code "${normalizedColorCode}" not found for color "${colorName}"`
    );
  }

  const colorData = tailwindMapper[colorName][normalizedColorCode];

  switch (format.toLowerCase()) {
    case "hex":
      return colorData.hex;
    case "rgb":
      return colorData.rgb;
    case "hsl":
      return colorData.hsl;
    case "oklch":
      return colorData.oklch;
    case "rawrgb":
    case "raw_rgb":
      return colorData.rawRgb;
    case "rawhsl":
    case "raw_hsl":
      return colorData.rawHsl;
    case "rawoklch":
    case "raw_oklch":
      return colorData.rawOklch;
    case "all":
      return colorData;
    default:
      throw new Error(
        `Unsupported format: ${format}. Supported formats: ${VALID_FORMATS.join(
          ", "
        )}`
      );
  }
}

// Get all shades for a specific color
export function getColorShades(
  colorName: string,
  format: ColorFormat = "hex"
): Record<string, string | [number, number, number] | ColorData> {
  if (!isValidColor(colorName)) {
    throw new Error(
      `Invalid color: "${colorName}". Valid colors are: ${VALID_COLORS.join(
        ", "
      )}`
    );
  }

  if (!isValidFormat(format)) {
    throw new Error(
      `Invalid format: "${format}". Valid formats are: ${VALID_FORMATS.join(
        ", "
      )}`
    );
  }

  if (!tailwindMapper[colorName]) {
    throw new Error(`Color "${colorName}" not found in mapper`);
  }

  const shades: Record<string, string | [number, number, number] | ColorData> =
    {};

  for (const [shadeCode, colorData] of Object.entries(
    tailwindMapper[colorName]
  )) {
    switch (format.toLowerCase()) {
      case "hex":
        shades[shadeCode] = colorData.hex;
        break;
      case "rgb":
        shades[shadeCode] = colorData.rgb;
        break;
      case "hsl":
        shades[shadeCode] = colorData.hsl;
        break;
      case "oklch":
        shades[shadeCode] = colorData.oklch;
        break;
      case "rawrgb":
      case "raw_rgb":
        shades[shadeCode] = colorData.rawRgb;
        break;
      case "rawhsl":
      case "raw_hsl":
        shades[shadeCode] = colorData.rawHsl;
        break;
      case "rawoklch":
      case "raw_oklch":
        shades[shadeCode] = colorData.rawOklch;
        break;
      case "all":
        shades[shadeCode] = colorData;
        break;
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
  }

  return shades;
}

// Get all colors in a specific format
export function getAllColors(
  format: ColorFormat = "hex"
): Record<
  string,
  Record<string, string | [number, number, number] | ColorData>
> {
  if (!isValidFormat(format)) {
    throw new Error(
      `Invalid format: "${format}". Valid formats are: ${VALID_FORMATS.join(
        ", "
      )}`
    );
  }

  const allColors: Record<
    string,
    Record<string, string | [number, number, number] | ColorData>
  > = {};

  for (const [colorName, colorShades] of Object.entries(tailwindMapper)) {
    allColors[colorName] = getColorShades(colorName, format);
  }

  return allColors;
}

// Get available color names
export function getAvailableColors(): string[] {
  return Object.keys(tailwindMapper);
}

// Get available shades for a specific color
export function getAvailableShades(colorName: string): string[] {
  if (!isValidColor(colorName)) {
    throw new Error(
      `Invalid color: "${colorName}". Valid colors are: ${VALID_COLORS.join(
        ", "
      )}`
    );
  }

  if (!tailwindMapper[colorName]) {
    throw new Error(`Color "${colorName}" not found in mapper`);
  }

  return Object.keys(tailwindMapper[colorName]);
}

// Check if a color exists
export function colorExists(
  colorName: string,
  colorCode: ColorCode | null = null
): boolean {
  if (!isValidColor(colorName)) {
    return false;
  }

  if (!tailwindMapper[colorName]) {
    return false;
  }

  if (colorCode === null) {
    return true;
  }

  const normalizedColorCode = normalizeColorCode(colorName, colorCode);
  return tailwindMapper[colorName][normalizedColorCode] !== undefined;
}

// Get color data in all formats
export function getColorData(
  colorName: string,
  colorCode: ColorCode
): ColorData {
  if (!isValidColor(colorName)) {
    throw new Error(
      `Invalid color: "${colorName}". Valid colors are: ${VALID_COLORS.join(
        ", "
      )}`
    );
  }

  const normalizedColorCode = normalizeColorCode(colorName, colorCode);

  if (!tailwindMapper[colorName]) {
    throw new Error(`Color "${colorName}" not found in mapper`);
  }

  if (!tailwindMapper[colorName][normalizedColorCode]) {
    throw new Error(
      `Color code "${normalizedColorCode}" not found for color "${colorName}"`
    );
  }

  return tailwindMapper[colorName][normalizedColorCode];
}

// Convert between formats (using the raw values)
export function convertColor(
  colorName: string,
  colorCode: ColorCode,
  fromFormat: ColorFormat,
  toFormat: ColorFormat
): string | [number, number, number] | ColorData {
  if (!isValidFormat(fromFormat) || !isValidFormat(toFormat)) {
    throw new Error(
      `Invalid format. Valid formats are: ${VALID_FORMATS.join(", ")}`
    );
  }

  const colorData = getColorData(colorName, colorCode);

  const formatMap: Record<
    string,
    string | [number, number, number] | ColorData
  > = {
    hex: colorData.hex,
    rgb: colorData.rgb,
    hsl: colorData.hsl,
    oklch: colorData.oklch,
    rawrgb: colorData.rawRgb,
    rawhsl: colorData.rawHsl,
    rawoklch: colorData.rawOklch,
  };

  if (!formatMap[toFormat.toLowerCase()]) {
    throw new Error(`Unsupported target format: ${toFormat}`);
  }

  return formatMap[toFormat.toLowerCase()];
}

// Search for colors by hex value (fuzzy search)
export function findColorByHex(
  hexValue: string,
  exact: boolean = false
): ColorSearchResult[] {
  const results: ColorSearchResult[] = [];

  for (const [colorName, colorShades] of Object.entries(tailwindMapper)) {
    for (const [shadeCode, colorData] of Object.entries(colorShades)) {
      if (exact) {
        if (colorData.hex.toLowerCase() === hexValue.toLowerCase()) {
          results.push({
            colorName,
            shadeCode,
            colorData,
          });
        }
      } else {
        if (colorData.hex.toLowerCase().includes(hexValue.toLowerCase())) {
          results.push({
            colorName,
            shadeCode,
            colorData,
          });
        }
      }
    }
  }

  return results;
}

// Get color palette for a specific color (all shades)
export function getColorPalette(colorName: string): Record<string, ColorData> {
  return getColorShades(colorName, "all") as Record<string, ColorData>;
}

// Generate CSS custom properties for a color
export function generateCSSVariables(
  colorName: string,
  prefix: string = ""
): CSSVariables {
  if (!isValidColor(colorName)) {
    throw new Error(
      `Invalid color: "${colorName}". Valid colors are: ${VALID_COLORS.join(
        ", "
      )}`
    );
  }

  const shades = getColorShades(colorName, "all") as Record<string, ColorData>;
  const cssVars: CSSVariables = {};

  for (const [shadeCode, colorData] of Object.entries(shades)) {
    const varName = prefix ? `${prefix}-${shadeCode}` : shadeCode;
    cssVars[`--${varName}-hex`] = colorData.hex;
    cssVars[`--${varName}-rgb`] = colorData.rgb;
    cssVars[`--${varName}-hsl`] = colorData.hsl;
    cssVars[`--${varName}-oklch`] = colorData.oklch;
  }

  return cssVars;
}

// Generate Tailwind CSS config object
export function generateTailwindConfig(): TailwindConfig {
  const config: TailwindConfig = {};

  for (const [colorName, colorShades] of Object.entries(tailwindMapper)) {
    config[colorName] = {};
    for (const [shadeCode, colorData] of Object.entries(colorShades)) {
      const shade = shadeCode.split("-")[1]; // Extract just the number
      config[colorName][shade] = colorData.hex;
    }
  }

  return config;
}

// Get statistics about the mapper
export function getMapperStats(): MapperStats {
  const stats: MapperStats = {
    totalColors: 0,
    totalShades: 0,
    colors: {},
  };

  for (const [colorName, colorShades] of Object.entries(tailwindMapper)) {
    stats.totalColors++;
    const shadeCount = Object.keys(colorShades).length;
    stats.totalShades += shadeCount;
    stats.colors[colorName] = shadeCount;
  }

  return stats;
}

// Export constants for external use
export { VALID_COLORS, VALID_FORMATS, VALID_SHADES };
