# Tailwind Color Mapper

> OKLCH-first Tailwind color mapping utilities with comprehensive format support

[![npm version](https://badge.fury.io/js/tailwind-color-mapper.svg)](https://badge.fury.io/js/tailwind-color-mapper)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive TypeScript library for managing Tailwind CSS colors with OKLCH support. Get consistent, validated color palettes with seamless format conversion.

## 📊 Data Structure

The package includes comprehensive color data with 7 different formats for each of the 242 color entries:

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
  },
  "blue": {
    "blue-500": {
      "hex": "#3b82f6",
      "rgb": "rgb(59, 130, 246)",
      "hsl": "hsl(217, 91%, 60%)",
      "oklch": "oklch(0.623 0.214 259.815)",
      "rawRgb": [59, 130, 246],
      "rawHsl": [217, 91, 60],
      "rawOklch": [0.623, 0.214, 259.815]
    }
  }
}
```

## 🚀 Quick Start

### Installation

```bash
npm install tailwind-color-mapper
```

### Basic Usage

```typescript
import {
  getColor,
  getColorShades,
  generateCSSVariables,
} from "tailwind-color-mapper";

// Get a specific color
const red500 = getColor("red", 500, "hex"); // "#fb2c36"
const blue500 = getColor("blue", 500, "oklch"); // "oklch(0.623 0.214 259.815)"

// Get all shades for a color
const redShades = getColorShades("red", "hex");
// { "red-50": "#fef2f2", "red-100": "#ffe2e2", ... }

// Generate CSS variables
const cssVars = generateCSSVariables("blue", "primary");
// { "--primary-50-hex": "#eff6ff", "--primary-100-hex": "#dbeafe", ... }
```

## 📦 Package Structure

### Core Functions

- **`getColor(colorName, colorCode, format)`** - Get specific color values
- **`getColorShades(colorName, format)`** - Get all shades for a color
- **`getAllColors(format)`** - Get all colors in a format
- **`generateCSSVariables(colorName, prefix)`** - Generate CSS custom properties
- **`generateTailwindConfig()`** - Generate Tailwind config object
- **`findColorByHex(hexValue)`** - Search colors by hex value

### Tree-Shakable Imports

```typescript
// Import only what you need
import { getColor } from "tailwind-color-mapper/core";
import { getColor } from "tailwind-color-mapper/hex";
import { getColor } from "tailwind-color-mapper/oklch";
```

## 🎨 Supported Formats

- **`hex`** - `"#fb2c36"`
- **`rgb`** - `"rgb(251, 44, 54)"`
- **`hsl`** - `"hsl(357, 96%, 58%)"`
- **`oklch`** - `"oklch(0.637 0.237 25.331)"`
- **`rawrgb`** - `[251, 44, 54]`
- **`rawhsl`** - `[357, 96, 58]`
- **`rawoklch`** - `[0.637, 0.237, 25.331]`
- **`all`** - Complete color data object

## 🌈 Supported Colors

All 22 standard Tailwind colors with 11 shades each (50-950):

- **Warm:** red, orange, amber, yellow, lime
- **Cool:** green, emerald, teal, cyan, sky, blue, indigo
- **Purple:** violet, purple, fuchsia, pink, rose
- **Neutral:** slate, gray, zinc, neutral, stone

## 💡 Use Cases

### Design System Integration

```typescript
import { generateCSSVariables, getColor } from "tailwind-color-mapper";

// Generate CSS variables for your design system
const primaryColors = generateCSSVariables("blue", "primary");
const secondaryColors = generateCSSVariables("purple", "secondary");

// Apply to document root
const root = document.documentElement;
Object.entries(primaryColors).forEach(([key, value]) => {
  root.style.setProperty(key, value);
});
```

### Color Picker Integration

```typescript
import { getColor, findColorByHex } from "tailwind-color-mapper";

// Get color by name and shade
const selectedColor = getColor("red", 500, "oklch");

// Find closest Tailwind color to a hex value
const closestMatch = findColorByHex("#ff6b6b");
```

### Tailwind Config Generation

```typescript
import { generateTailwindConfig } from "tailwind-color-mapper";

// Generate complete Tailwind config
const config = generateTailwindConfig();
// { red: { 50: "#fef2f2", 100: "#ffe2e2", ... }, ... }
```

## 🔧 TypeScript Support

Full type safety with comprehensive type definitions:

```typescript
import type {
  TailwindColor,
  TailwindShade,
  ColorFormat,
  ColorData,
} from "tailwind-color-mapper";

// Type-safe color access
const color: string = getColor("red", 500, "hex");
const shades: Record<string, ColorData> = getColorShades("blue", "all");

// Validation constants
import {
  VALID_COLORS,
  VALID_SHADES,
  VALID_FORMATS,
} from "tailwind-color-mapper";
```

## 🌐 CDN Usage

### ES Modules (Recommended)

```html
<script type="module">
  import { getColor } from "https://esm.sh/tailwind-color-mapper@latest";

  const red500 = getColor("red", 500, "hex");
  console.log(red500); // "#fb2c36"
</script>
```

## 📊 Package Size

- **Core:** ~20KB (essential functions only)
- **Hex:** ~15KB (hex format only)
- **OKLCH:** ~20KB (OKLCH format only)
- **Full:** ~86KB (complete package with all formats)

## 🎯 Key Features

- ✅ **OKLCH-first** - Modern color space support
- ✅ **Type-safe** - Full TypeScript support
- ✅ **Tree-shakable** - Import only what you need
- ✅ **Validated data** - 242 color entries with quality assurance
- ✅ **Multiple formats** - HEX, RGB, HSL, OKLCH support
- ✅ **No dependencies** - Self-contained (except `culori`)
- ✅ **CDN ready** - Works with modern CDNs

## 🔍 Color Data Structure

Each color entry contains comprehensive format support:

```typescript
interface ColorData {
  hex: string; // "#fb2c36"
  rgb: string; // "rgb(251, 44, 54)"
  hsl: string; // "hsl(357, 96%, 58%)"
  oklch: string; // "oklch(0.637 0.237 25.331)"
  rawRgb: [number, number, number]; // [251, 44, 54]
  rawHsl: [number, number, number]; // [357, 96, 58]
  rawOklch: [number, number, number]; // [0.637, 0.237, 25.331]
}
```

## 🚀 Advanced Usage

### Custom Color Validation

```typescript
import {
  VALID_COLORS,
  VALID_SHADES,
  VALID_FORMATS,
} from "tailwind-color-mapper";

function isValidTailwindColor(color: string): boolean {
  return VALID_COLORS.includes(color as any);
}

function isValidShade(shade: number): boolean {
  return VALID_SHADES.includes(shade as any);
}
```

### Color Palette Generation

```typescript
import { getColorShades, getAllColors } from "tailwind-color-mapper";

// Get all colors in OKLCH format
const allColorsOKLCH = getAllColors("oklch");

// Get specific color palette
const bluePalette = getColorShades("blue", "all");
```

## 📚 Examples

### React Component

```tsx
import React from "react";
import { getColor, getColorShades } from "tailwind-color-mapper";

function ColorSwatch({ colorName }: { colorName: string }) {
  const shades = getColorShades(colorName, "hex");

  return (
    <div className="flex gap-2">
      {Object.entries(shades).map(([shade, hex]) => (
        <div
          key={shade}
          className="w-8 h-8 rounded"
          style={{ backgroundColor: hex }}
          title={`${shade}: ${hex}`}
        />
      ))}
    </div>
  );
}
```

### CSS-in-JS Integration

```typescript
import { getColor } from "tailwind-color-mapper";

const theme = {
  colors: {
    primary: getColor("blue", 500, "hex"),
    secondary: getColor("purple", 500, "hex"),
    success: getColor("green", 500, "hex"),
    warning: getColor("yellow", 500, "hex"),
    error: getColor("red", 500, "hex"),
  },
};
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🔗 Links

- [NPM Package](https://www.npmjs.com/package/tailwind-color-mapper)
- [GitHub Repository](https://github.com/mrmendoza-dev/tailwind-color-mapper)
- [Documentation](https://github.com/mrmendoza-dev/tailwind-color-mapper#readme)
- [Issues](https://github.com/mrmendoza-dev/tailwind-color-mapper/issues)
