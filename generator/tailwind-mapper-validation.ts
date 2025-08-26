#!/usr/bin/env node

import { converter, parse } from "culori";
import fs from "fs";
import path from "path";
import process from "process";

// Type definitions
export type TailwindColor =
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

export type TailwindShade =
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

export interface ColorData {
  hex: string;
  rgb: string;
  hsl: string;
  oklch: string;
  rawRgb: [number, number, number];
  rawHsl: [number, number, number];
  rawOklch: [number, number, number];
}

export interface ColorShades {
  [shadeCode: string]: ColorData;
}

export interface TailwindMapper {
  [colorName: string]: ColorShades;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  duplicateCount: number;
  totalColors: number;
  totalShades: number;
}

export interface FixResult {
  fixed: number;
  skipped: number;
}

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

// File path for the JSON
const MAPPER_FILE = path.join(process.cwd(), "tailwindMapper.json");

// Fixed color conversion functions (same as in tailwind-mapper-generator.ts)
function oklchToRgb(oklchString: string): [number, number, number] {
  const color = parse(oklchString);
  if (!color) {
    throw new Error(`Failed to parse OKLCH: ${oklchString}`);
  }

  const rgbConverter = converter("rgb");
  const rgb = rgbConverter(color);

  if (
    !rgb ||
    rgb.r === undefined ||
    rgb.g === undefined ||
    rgb.b === undefined
  ) {
    throw new Error(`Failed to convert OKLCH to RGB: ${oklchString}`);
  }

  // Clamp RGB values to valid 0-255 range
  return [
    Math.max(0, Math.min(255, Math.round(rgb.r * 255))),
    Math.max(0, Math.min(255, Math.round(rgb.g * 255))),
    Math.max(0, Math.min(255, Math.round(rgb.b * 255))),
  ];
}

function parseOklch(oklchString: string): { l: number; c: number; h: number } {
  const color = parse(oklchString);
  if (!color || color.mode !== "oklch") {
    throw new Error(`Failed to parse OKLCH: ${oklchString}`);
  }

  return { l: color.l, c: color.c, h: color.h };
}

function rgbToHex(rgb: [number, number, number]): string {
  return (
    "#" +
    rgb
      .map((x) => {
        // Ensure x is within valid range and is an integer
        const clamped = Math.max(0, Math.min(255, Math.round(x)));
        const hex = clamped.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

function rgbToHsl(rgb: [number, number, number]): [number, number, number] {
  // Clamp RGB values to valid range first
  const [r, g, b] = rgb.map((x) => Math.max(0, Math.min(255, x)) / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h: number;
  let s: number;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        h = 0;
    }
    h /= 6;
  }

  // Clamp HSL values to valid ranges
  return [
    Math.max(0, Math.min(360, Math.round(h * 360))),
    Math.max(0, Math.min(100, Math.round(s * 100))),
    Math.max(0, Math.min(100, Math.round(l * 100))),
  ];
}

// Load the existing mapper
function loadMapper(): TailwindMapper {
  try {
    const data = fs.readFileSync(MAPPER_FILE, "utf8");
    return JSON.parse(data) as TailwindMapper;
  } catch (error) {
    console.error(
      "Failed to load tailwindMapper.json:",
      (error as Error).message
    );
    process.exit(1);
  }
}

// Save the updated mapper
function saveMapper(mapper: TailwindMapper): void {
  try {
    fs.writeFileSync(MAPPER_FILE, JSON.stringify(mapper, null, 2));
    console.log(`✅ Updated ${MAPPER_FILE}`);
  } catch (error) {
    console.error(
      "Failed to save tailwindMapper.json:",
      (error as Error).message
    );
    process.exit(1);
  }
}

// Check if a color entry has issues
function hasIssues(colorData: ColorData): boolean {
  // Check for invalid hex format
  if (colorData.hex && !/^#[0-9A-Fa-f]{6}$/.test(colorData.hex)) {
    return true;
  }

  // Check for RGB values outside 0-255 range
  if (
    colorData.rawRgb &&
    colorData.rawRgb.some((val) => val < 0 || val > 255)
  ) {
    return true;
  }

  // Check for HSL saturation over 100%
  if (colorData.rawHsl && colorData.rawHsl[1] > 100) {
    return true;
  }

  return false;
}

// Regenerate a single color entry
function regenerateColor(colorData: ColorData): ColorData {
  if (!colorData.oklch) {
    console.warn("No OKLCH value found, skipping");
    return colorData;
  }

  try {
    // Convert OKLCH to RGB
    const rgb = oklchToRgb(colorData.oklch);

    // Convert RGB to HEX
    const hex = rgbToHex(rgb);

    // Convert RGB to HSL
    const hsl = rgbToHsl(rgb);

    // Parse OKLCH values
    const oklch = parseOklch(colorData.oklch);

    // Return updated color data
    return {
      hex: hex,
      rgb: `rgb(${rgb.join(", ")})`,
      hsl: `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`,
      oklch: colorData.oklch, // Keep original OKLCH string
      rawRgb: rgb,
      rawHsl: hsl,
      rawOklch: [oklch.l, oklch.c, oklch.h],
    };
  } catch (error) {
    console.error(`Failed to regenerate color: ${(error as Error).message}`);
    return colorData; // Return original if regeneration fails
  }
}

// Main regeneration function
export function regenerateAllColors(): void {
  console.log("🔄 Starting color regeneration...");
  console.log("=".repeat(50));

  const mapper = loadMapper();
  let totalProcessed = 0;
  let totalFixed = 0;

  for (const [colorName, colorShades] of Object.entries(mapper)) {
    console.log(`\n🎨 Processing ${colorName}...`);

    for (const [shadeCode, colorData] of Object.entries(colorShades)) {
      totalProcessed++;

      if (hasIssues(colorData)) {
        console.log(`  🔧 Fixing ${shadeCode}...`);
        const fixedColor = regenerateColor(colorData);
        colorShades[shadeCode] = fixedColor;
        totalFixed++;
      } else {
        console.log(`  ✅ ${shadeCode} is already correct`);
      }
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log(`📊 Regeneration Complete:`);
  console.log(`Total colors processed: ${totalProcessed}`);
  console.log(`Total colors fixed: ${totalFixed}`);
  console.log(`Total colors unchanged: ${totalProcessed - totalFixed}`);

  if (totalFixed > 0) {
    saveMapper(mapper);
    console.log("\n✅ All fixes have been applied!");
  } else {
    console.log("\n✅ No fixes were needed - all colors are already correct!");
  }
}

// Validation function to check for duplicates and validate color objects
export function validateMapper(): ValidationResult {
  const mapper = loadMapper();
  const errors: string[] = [];
  const warnings: string[] = [];
  const duplicates = new Map<string, string>(); // Track hex values and their locations

  console.log("🔍 Starting validation of tailwindMapper.json...");
  console.log("=".repeat(50));

  // Check for duplicates and validate each color object
  for (const [colorName, colorShades] of Object.entries(mapper)) {
    if (!colorShades || typeof colorShades !== "object") {
      errors.push(`Invalid color structure for "${colorName}"`);
      continue;
    }

    for (const [shadeCode, colorData] of Object.entries(colorShades)) {
      const location = `${colorName}.${shadeCode}`;

      // Check if colorData is valid
      if (!colorData || typeof colorData !== "object") {
        errors.push(`Invalid color data structure at ${location}`);
        continue;
      }

      // Check for required fields
      const requiredFields: (keyof ColorData)[] = [
        "hex",
        "rgb",
        "hsl",
        "oklch",
        "rawRgb",
        "rawHsl",
        "rawOklch",
      ];
      for (const field of requiredFields) {
        if (!(field in colorData)) {
          errors.push(`Missing required field "${field}" at ${location}`);
        }
      }

      // Validate hex format
      if (colorData.hex && !/^#[0-9A-Fa-f]{6}$/.test(colorData.hex)) {
        errors.push(`Invalid hex format "${colorData.hex}" at ${location}`);
      }

      // Check for duplicate hex values
      if (colorData.hex) {
        if (duplicates.has(colorData.hex)) {
          warnings.push(
            `Duplicate hex value "${
              colorData.hex
            }" found at ${location} and ${duplicates.get(colorData.hex)}`
          );
        } else {
          duplicates.set(colorData.hex, location);
        }
      }

      // Validate RGB format
      if (colorData.rgb && !/^rgb\(\d+,\s*\d+,\s*\d+\)$/.test(colorData.rgb)) {
        errors.push(`Invalid RGB format "${colorData.rgb}" at ${location}`);
      }

      // Validate HSL format
      if (
        colorData.hsl &&
        !/^hsl\(\d+,\s*\d+%,\s*\d+%\)$/.test(colorData.hsl)
      ) {
        errors.push(`Invalid HSL format "${colorData.hsl}" at ${location}`);
      }

      // Validate OKLCH format
      if (
        colorData.oklch &&
        !/^oklch\([0-9.]+ [0-9.]+ [0-9.]+\)$/.test(colorData.oklch)
      ) {
        errors.push(`Invalid OKLCH format "${colorData.oklch}" at ${location}`);
      }

      // Validate raw arrays
      if (
        colorData.rawRgb &&
        (!Array.isArray(colorData.rawRgb) || colorData.rawRgb.length !== 3)
      ) {
        errors.push(`Invalid rawRgb array at ${location}`);
      }

      if (
        colorData.rawHsl &&
        (!Array.isArray(colorData.rawHsl) || colorData.rawHsl.length !== 3)
      ) {
        errors.push(`Invalid rawHsl array at ${location}`);
      }

      if (
        colorData.rawOklch &&
        (!Array.isArray(colorData.rawOklch) || colorData.rawOklch.length !== 3)
      ) {
        errors.push(`Invalid rawOklch array at ${location}`);
      }

      // Validate raw RGB values (0-255)
      if (colorData.rawRgb && Array.isArray(colorData.rawRgb)) {
        for (let i = 0; i < colorData.rawRgb.length; i++) {
          const value = colorData.rawRgb[i];
          if (
            typeof value !== "number" ||
            value < 0 ||
            value > 255 ||
            !Number.isInteger(value)
          ) {
            errors.push(
              `Invalid rawRgb value "${value}" at ${location} (must be integer 0-255)`
            );
          }
        }
      }

      // Validate raw HSL values
      if (colorData.rawHsl && Array.isArray(colorData.rawHsl)) {
        const [h, s, l] = colorData.rawHsl;
        if (typeof h !== "number" || h < 0 || h > 360) {
          errors.push(
            `Invalid rawHsl hue "${h}" at ${location} (must be 0-360)`
          );
        }
        if (typeof s !== "number" || s < 0 || s > 100) {
          errors.push(
            `Invalid rawHsl saturation "${s}" at ${location} (must be 0-100)`
          );
        }
        if (typeof l !== "number" || l < 0 || l > 100) {
          errors.push(
            `Invalid rawHsl lightness "${l}" at ${location} (must be 0-100)`
          );
        }
      }

      // Validate raw OKLCH values
      if (colorData.rawOklch && Array.isArray(colorData.rawOklch)) {
        const [l, c, h] = colorData.rawOklch;
        if (typeof l !== "number" || l < 0 || l > 1) {
          errors.push(
            `Invalid rawOklch lightness "${l}" at ${location} (must be 0-1)`
          );
        }
        if (typeof c !== "number" || c < 0) {
          errors.push(
            `Invalid rawOklch chroma "${c}" at ${location} (must be >= 0)`
          );
        }
        if (typeof h !== "number" || h < 0 || h > 360) {
          errors.push(
            `Invalid rawOklch hue "${h}" at ${location} (must be 0-360)`
          );
        }
      }

      // Cross-validate formats using culori
      try {
        if (colorData.hex && colorData.rawRgb) {
          const parsedHex = parse(colorData.hex);
          const parsedRgb = parse(`rgb(${colorData.rawRgb.join(", ")})`);

          if (parsedHex && parsedRgb) {
            const hexRgb = converter("rgb")(parsedHex);
            const tolerance = 2; // Allow small differences due to rounding

            if (
              Math.abs(hexRgb.r * 255 - colorData.rawRgb[0]) > tolerance ||
              Math.abs(hexRgb.g * 255 - colorData.rawRgb[1]) > tolerance ||
              Math.abs(hexRgb.b * 255 - colorData.rawRgb[2]) > tolerance
            ) {
              warnings.push(`Hex and rawRgb values don't match at ${location}`);
            }
          }
        }
      } catch (error) {
        warnings.push(
          `Cross-validation failed for ${location}: ${(error as Error).message}`
        );
      }
    }
  }

  // Check for missing standard Tailwind colors
  for (const expectedColor of VALID_COLORS) {
    if (!mapper[expectedColor]) {
      warnings.push(`Missing expected color: ${expectedColor}`);
    }
  }

  // Check for missing standard shades
  for (const [colorName, colorShades] of Object.entries(mapper)) {
    for (const shade of VALID_SHADES) {
      const shadeCode = `${colorName}-${shade}`;
      if (!colorShades[shadeCode]) {
        warnings.push(`Missing expected shade: ${shadeCode}`);
      }
    }
  }

  // Display results
  console.log(`\n📊 Validation Results:`);
  console.log(`Total colors checked: ${Object.keys(mapper).length}`);
  console.log(
    `Total shades checked: ${Object.values(mapper).reduce(
      (sum, shades) => sum + Object.keys(shades).length,
      0
    )}`
  );
  console.log(
    `Duplicate hex values found: ${
      warnings.filter((w) => w.includes("Duplicate")).length
    }`
  );

  if (errors.length > 0) {
    console.log(`\n❌ ERRORS FOUND (${errors.length}):`);
    errors.forEach((error) => console.log(`  • ${error}`));
  }

  if (warnings.length > 0) {
    console.log(`\n⚠️  WARNINGS (${warnings.length}):`);
    warnings.forEach((warning) => console.log(`  • ${warning}`));
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.log(`\n✅ Validation passed! No errors or warnings found.`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    duplicateCount: warnings.filter((w) => w.includes("Duplicate")).length,
    totalColors: Object.keys(mapper).length,
    totalShades: Object.values(mapper).reduce(
      (sum, shades) => sum + Object.keys(shades).length,
      0
    ),
  };
}

// Function to fix common validation issues (dry run by default)
export function fixMapperIssues(dryRun: boolean = true): FixResult {
  const validation = validateMapper();

  if (validation.isValid) {
    console.log("✅ No issues found to fix!");
    return { fixed: 0, skipped: 0 };
  }

  console.log(`\n🔧 ${dryRun ? "DRY RUN" : "FIXING"} issues...`);

  const mapper = loadMapper();
  let fixed = 0;
  let skipped = 0;

  // Fix invalid hex values (if they're close to valid)
  for (const [colorName, colorShades] of Object.entries(mapper)) {
    for (const [shadeCode, colorData] of Object.entries(colorShades)) {
      if (colorData.hex && !/^#[0-9A-Fa-f]{6}$/.test(colorData.hex)) {
        console.log(
          `  ${dryRun ? "Would fix" : "Fixing"} invalid hex "${
            colorData.hex
          }" at ${colorName}.${shadeCode}`
        );
        if (!dryRun) {
          // Try to fix common hex issues
          let fixedHex = colorData.hex;
          if (fixedHex.startsWith("#")) {
            fixedHex = fixedHex.substring(1);
          }
          if (fixedHex.length === 3) {
            // Convert 3-digit hex to 6-digit
            fixedHex = fixedHex
              .split("")
              .map((c) => c + c)
              .join("");
          }
          if (/^[0-9A-Fa-f]{6}$/.test(fixedHex)) {
            colorData.hex = `#${fixedHex}`;
            fixed++;
          } else {
            skipped++;
          }
        } else {
          fixed++;
        }
      }
    }
  }

  if (!dryRun && fixed > 0) {
    console.log(`\n💾 Saving fixed mapper...`);
    saveMapper(mapper);
  }

  return { fixed, skipped };
}

// Run the regeneration if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  regenerateAllColors();
}

export { VALID_COLORS, VALID_SHADES };
export default { validateMapper, fixMapperIssues, regenerateAllColors };
