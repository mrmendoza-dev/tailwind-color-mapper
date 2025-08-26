# Tailwind Color Mapper

A comprehensive TypeScript toolset for managing Tailwind CSS colors with OKLCH support.

## Files Overview

### 🎨 `tailwind-mapper-generator.ts`

**Main generator script** - Starting point for creating a new `tailwindMapper.json` from scratch.

- Interactive CLI for entering OKLCH values
- Converts OKLCH to RGB, HSL, and HEX
- Saves progress after each color entry
- Handles all 22 Tailwind colors with 11 shades each
- Full TypeScript support with type safety

**Usage:**

```bash
npx tsx tailwind-mapper-generator.ts
```

### 🔧 `tailwind-mapper-functions.ts`

**User-facing utility functions** - The main API for working with your color data.

**Key Functions:**

- `getColor(colorName, colorCode, format)` - Get specific color values
- `getColorShades(colorName, format)` - Get all shades for a color
- `getAllColors(format)` - Get all colors in a format
- `generateCSSVariables(colorName)` - Generate CSS custom properties
- `generateTailwindConfig()` - Generate Tailwind config object
- `findColorByHex(hexValue)` - Search colors by hex value

**Enhanced Features:**

- **TypeScript support** with full type safety
- **Flexible colorCode input** - accepts both strings (`"red-500"`) and numbers (`500`)
- **Comprehensive validation** - validates colors, shades, and formats
- **Exported constants** - `VALID_COLORS`, `VALID_SHADES`, `VALID_FORMATS`

**Usage:**

```typescript
import {
  getColor,
  getColorShades,
  VALID_COLORS,
} from "./tailwind-mapper-functions";

// Get a specific color (string format)
const red500 = getColor("red", "red-500", "hex"); // "#fb2c36"

// Get a specific color (number format)
const red500Num = getColor("red", 500, "hex"); // "#fb2c36"

// Get all red shades
const redShades = getColorShades("red", "oklch");

// Generate CSS variables
const cssVars = generateCSSVariables("red", "red");

// Access validation constants
console.log(VALID_COLORS); // ["red", "orange", "amber", ...]
```

### 🔍 `tailwind-mapper-validation.ts`

**Validation and maintenance tools** - For checking and fixing color data integrity.

**Key Functions:**

- `validateMapper()` - Comprehensive validation of color data
- `fixMapperIssues(dryRun)` - Fix common validation issues
- `regenerateAllColors()` - Regenerate RGB/HSL/HEX from OKLCH values

**Usage:**

```bash
# Validate the color data
npx tsx -e "import('./tailwind-mapper-validation.ts').then(m => m.validateMapper())"

# Fix issues (dry run)
npx tsx -e "import('./tailwind-mapper-validation.ts').then(m => m.fixMapperIssues(true))"

# Regenerate all colors from OKLCH
npx tsx tailwind-mapper-validation.ts
```

## Workflow

1. **Start fresh:** Run `tailwind-mapper-generator.ts` to create your color data
2. **Use colors:** Import functions from `tailwind-mapper-functions.ts` in your projects
3. **Maintain data:** Use `tailwind-mapper-validation.ts` to check and fix issues

## TypeScript Support

All files are written in TypeScript with comprehensive type definitions:

```typescript
// Available types
type TailwindColor = "red" | "orange" | "amber" | ...;
type TailwindShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
type ColorFormat = "hex" | "rgb" | "hsl" | "oklch" | "rawrgb" | ...;
type ColorCode = string | number;

// Example usage with full type safety
const color: string = getColor("red", 500, "hex");
const shades: Record<string, ColorData> = getColorShades("blue", "all");
```

## Color Data Structure

Each color entry contains:

```typescript
interface ColorData {
  hex: string;
  rgb: string;
  hsl: string;
  oklch: string;
  rawRgb: [number, number, number];
  rawHsl: [number, number, number];
  rawOklch: [number, number, number];
}
```

## Validation

The library includes comprehensive validation:

- **Valid Colors:** All 22 standard Tailwind colors
- **Valid Shades:** 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
- **Valid Formats:** hex, rgb, hsl, oklch, rawrgb, rawhsl, rawoklch, all
- **Flexible Input:** Accepts both `"red-500"` and `500` as color codes

## Notes

- **OKLCH is the source of truth** - All other formats are generated from OKLCH values
- **Gamut limitations** - Some OKLCH colors may not convert perfectly to RGB/HEX due to color space differences
- **Modern browsers** - Use OKLCH directly in CSS for the most accurate colors
- **TypeScript first** - Built with TypeScript for better developer experience and type safety
