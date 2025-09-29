# Tailwind Color Mapper

> OKLCH-first Tailwind color mapping utilities with comprehensive format support

[![npm version](https://badge.fury.io/js/tailwind-color-mapper.svg)](https://badge.fury.io/js/tailwind-color-mapper)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive TypeScript toolset and package for managing Tailwind CSS colors with OKLCH support. Build, validate, and consume consistent Tailwind color palettes with seamless format conversion.

## 📦 Package Overview

### 📊 Data Structure

The package includes comprehensive color data with 7 formats for each of the 242 color entries:

```json
{
  "red": {
    "red-500": {
      "hex": "#fb2c36",
      "rgb": "rgb(251, 44, 54)",
      "hsl": "hsl(357, 96%, 58%)",
      "oklch": "oklch(0.637 0.237 25.331)",
      "rawRgb": [251, 44, 54],
      "rawHsl": [357, 96, 58],
      "rawOklch": [0.637, 0.237, 25.331]
    }
  }
}
```

### 🚀 Quick Start

```bash
npm install tailwind-color-mapper
```

```typescript
import {
  getColor,
  getColorShades,
  generateCSSVariables,
} from "tailwind-color-mapper";

// Get a specific color
const red500 = getColor("red", 500, "hex");
const blue500 = getColor("blue", 500, "oklch");

// Get all shades for a color
const redShades = getColorShades("red", "hex");

// Generate CSS variables
const cssVars = generateCSSVariables("blue", "primary");
```

### Core Functions

- **`getColor(colorName, colorCode, format)`** – Get specific color values
- **`getColorShades(colorName, format)`** – Get all shades for a color
- **`getAllColors(format)`** – Get all colors in a format
- **`generateCSSVariables(colorName, prefix)`** – Generate CSS custom properties
- **`generateTailwindConfig()`** – Generate Tailwind config object
- **`findColorByHex(hexValue)`** – Search colors by hex value

### Tree‑Shakable Imports

```typescript
// Import only what you need
import { getColor } from "tailwind-color-mapper/core";
import { getColor as getHex } from "tailwind-color-mapper/hex";
import { getColor as getOklch } from "tailwind-color-mapper/oklch";
```

### 🎨 Supported Formats

- **`hex`** – `"#fb2c36"`
- **`rgb`** – `"rgb(251, 44, 54)"`
- **`hsl`** – `"hsl(357, 96%, 58%)"`
- **`oklch`** – `"oklch(0.637 0.237 25.331)"`
- **`rawrgb`** – `[251, 44, 54]`
- **`rawhsl`** – `[357, 96, 58]`
- **`rawoklch`** – `[0.637, 0.237, 25.331]`
- **`all`** – Complete color data object

### 🌈 Supported Colors

All 22 standard Tailwind colors with 11 shades each (50‑950): red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, slate, gray, zinc, neutral, stone.

### 💡 Use Cases

```typescript
import {
  generateCSSVariables,
  getColor,
  findColorByHex,
} from "tailwind-color-mapper";

// Design system variables
const primary = generateCSSVariables("blue", "primary");

// Color picker helpers
const selected = getColor("red", 500, "oklch");
const closest = findColorByHex("#ff6b6b");
```

### 🔧 TypeScript Support

```typescript
import type {
  TailwindColor,
  TailwindShade,
  ColorFormat,
  ColorData,
} from "tailwind-color-mapper";

const color: string = getColor("red", 500, "hex");
const shades: Record<string, ColorData> = getColorShades("blue", "all");
```

### 🌐 CDN Usage

```html
<script type="module">
  import { getColor } from "https://esm.sh/tailwind-color-mapper@latest";
  console.log(getColor("red", 500, "hex"));
</script>
```

### 📊 Package Size

- Core: ~20KB
- Hex: ~15KB
- OKLCH: ~20KB
- Full: ~86KB

### 🎯 Key Features

- ✅ OKLCH‑first, modern color space support
- ✅ Type‑safe, full TypeScript
- ✅ Tree‑shakable, import only what you need
- ✅ Validated data (242 entries)
- ✅ Multiple formats: HEX, RGB, HSL, OKLCH
- ✅ CDN ready

## 🧪 Generator & Tools

This repo also includes a generator and maintenance tools for producing and validating `tailwindMapper.json`.

### `generator/tailwind-mapper-generator.ts`

Interactive CLI to create a fresh color dataset from OKLCH values.

- Prompts for all 22 Tailwind colors with 11 shades each
- Converts OKLCH → RGB, HSL, HEX
- Saves progress after each entry
- Fully typed, with validation

Run:

```bash
npx tsx generator/tailwind-mapper-generator.ts
```

### `generator/tailwind-mapper-functions.ts`

User‑facing utilities for consuming the color data in apps and tooling.

- `getColor(colorName, colorCode, format)`
- `getColorShades(colorName, format)`
- `getAllColors(format)`
- `generateCSSVariables(colorName, prefix)`
- `generateTailwindConfig()`
- `findColorByHex(hexValue)`

Supports flexible `colorCode` input (`"red-500"` or `500`) and exports `VALID_COLORS`, `VALID_SHADES`, `VALID_FORMATS`.

### `generator/tailwind-mapper-validation.ts`

Validation and maintenance helpers for the color dataset.

- `validateMapper()` – Validate color data
- `fixMapperIssues(dryRun)` – Fix common issues
- `regenerateAllColors()` – Regenerate from OKLCH

Run:

```bash
# Validate
npx tsx -e "import('./generator/tailwind-mapper-validation.ts').then(m => m.validateMapper())"

# Dry‑run fixes
npx tsx -e "import('./generator/tailwind-mapper-validation.ts').then(m => m.fixMapperIssues(true))"

# Regenerate from OKLCH
npx tsx generator/tailwind-mapper-validation.ts
```

### Type Definitions (Generator)

```typescript
type TailwindColor =
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose"
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone";

type TailwindShade =
  | 50
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | 950;
type ColorFormat =
  | "hex"
  | "rgb"
  | "hsl"
  | "oklch"
  | "rawrgb"
  | "rawhsl"
  | "rawoklch"
  | "all";
type ColorCode = string | number;

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

## 📚 Examples

```tsx
import React from "react";
import { getColor, getColorShades } from "tailwind-color-mapper";

export function ColorSwatch({ colorName }: { colorName: string }) {
  const shades = getColorShades(colorName, "hex");
  return (
    <div className="flex gap-2">
      {Object.entries(shades).map(([shade, hex]) => (
        <div
          key={shade}
          className="w-8 h-8 rounded"
          style={{ backgroundColor: hex }}
        />
      ))}
    </div>
  );
}
```

## 🤝 Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License – see [LICENSE](LICENSE).

## 🔗 Links

- NPM: https://www.npmjs.com/package/tailwind-color-mapper
- Repo: https://github.com/mrmendoza-dev/tailwind-color-mapper
- Docs: https://github.com/mrmendoza-dev/tailwind-color-mapper#readme
- Issues: https://github.com/mrmendoza-dev/tailwind-color-mapper/issues
