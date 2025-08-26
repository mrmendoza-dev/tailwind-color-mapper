#!/usr/bin/env node

import { converter, parse } from "culori";
import fs from "fs";
import path from "path";
import process from "process";
import readline from "readline";

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

// Constants
const TAILWIND_COLORS: readonly TailwindColor[] = [
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

const TAILWIND_SHADES: readonly TailwindShade[] = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
] as const;

// File path for the JSON
const MAPPER_FILE = path.join(process.cwd(), "tailwindMapper.json");

// Color conversion functions using culori
function oklchToRgb(oklchString: string): [number, number, number] {
  // Use culori's parse function to handle OKLCH strings directly
  const color = parse(oklchString);
  if (!color) {
    throw new Error(`Failed to parse OKLCH: ${oklchString}`);
  }

  // Convert to RGB
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

// Load existing mapper or create new one
function loadMapper(): TailwindMapper {
  try {
    if (fs.existsSync(MAPPER_FILE)) {
      const data = fs.readFileSync(MAPPER_FILE, "utf8");
      return JSON.parse(data) as TailwindMapper;
    }
  } catch (error) {
    console.warn(
      "Could not load existing mapper, starting fresh:",
      (error as Error).message
    );
  }
  return {};
}

// Save the mapper to file
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

// Process a single color entry
function processColor(
  colorName: TailwindColor,
  shade: TailwindShade,
  mapper: TailwindMapper
): void {
  const shadeCode = `${colorName}-${shade}`;
  const existing = mapper[colorName]?.[shadeCode];

  console.log(`\n🎨 ${colorName.toUpperCase()} ${shade}`);
  if (existing) {
    console.log(`📝 already exists`);
    console.log(`Current: ${existing.oklch}`);
  } else {
    console.log(`🆕 new entry`);
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    `Enter OKLCH for ${shadeCode} (or press Enter to skip): `,
    (input) => {
      rl.close();

      if (!input.trim()) {
        console.log(`⏭️  Skipped ${shadeCode}`);
        return;
      }

      try {
        // Convert OKLCH to other formats
        const rgb = oklchToRgb(input.trim());
        const hex = rgbToHex(rgb);
        const hsl = rgbToHsl(rgb);
        const oklch = parseOklch(input.trim());

        const colorData: ColorData = {
          hex: hex,
          rgb: `rgb(${rgb.join(", ")})`,
          hsl: `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`,
          oklch: input.trim(),
          rawRgb: rgb,
          rawHsl: hsl,
          rawOklch: [oklch.l, oklch.c, oklch.h],
        };

        // Initialize color if it doesn't exist
        if (!mapper[colorName]) {
          mapper[colorName] = {};
        }

        // Store the color data
        mapper[colorName][shadeCode] = colorData;

        // Display the results
        console.log(`\n✅ ${shadeCode} converted:`);
        console.log(`HEX: ${colorData.hex}`);
        console.log(`RGB: ${colorData.rgb}`);
        console.log(`HSL: ${colorData.hsl}`);
        console.log(`OKLCH: ${colorData.oklch}`);

        // Save to file after each entry
        saveMapper(mapper);
      } catch (error) {
        console.error(
          `❌ Error processing ${shadeCode}:`,
          (error as Error).message
        );
        console.log(`Please try again with a valid OKLCH value.`);
      }
    }
  );
}

// Main function
async function main(): Promise<void> {
  console.log("🎨 Tailwind Color Mapper Generator");
  console.log("==================================");
  console.log("This script will help you create a comprehensive color mapping");
  console.log("for all Tailwind CSS colors using OKLCH values.");
  console.log("\n📋 Colors to process:");
  console.log(TAILWIND_COLORS.join(", "));
  console.log("\n📋 Shades for each color:");
  console.log(TAILWIND_SHADES.join(", "));

  const mapper = loadMapper();

  console.log(`\n📁 Loading existing data from: ${MAPPER_FILE}`);
  if (Object.keys(mapper).length > 0) {
    console.log(`Found existing data for: ${Object.keys(mapper).join(", ")}`);
  } else {
    console.log("No existing data found, starting fresh.");
  }

  console.log("\n🚀 Starting color processing...");
  console.log(
    "Press Enter to skip any color, or provide OKLCH values like: oklch(0.637 0.237 25.331)"
  );

  // Process each color and shade
  for (const colorName of TAILWIND_COLORS) {
    console.log(`\n${"=".repeat(50)}`);
    console.log(`🎨 Processing ${colorName.toUpperCase()}`);
    console.log(`${"=".repeat(50)}`);

    for (const shade of TAILWIND_SHADES) {
      await new Promise<void>((resolve) => {
        processColor(colorName, shade, mapper);
        // Add a small delay to ensure proper async handling
        setTimeout(resolve, 100);
      });
    }
  }

  console.log("\n🎉 All colors processed!");
  console.log(`📁 Final data saved to: ${MAPPER_FILE}`);
  console.log("\n📊 Summary:");
  console.log(`Total colors: ${Object.keys(mapper).length}`);
  console.log(
    `Total shades: ${Object.values(mapper).reduce(
      (sum, shades) => sum + Object.keys(shades).length,
      0
    )}`
  );
}

// Run the main function
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error("❌ Fatal error:", (error as Error).message);
    process.exit(1);
  });
}

export { TAILWIND_COLORS, TAILWIND_SHADES };
export default main;
