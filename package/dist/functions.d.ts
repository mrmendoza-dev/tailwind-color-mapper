import { ColorData, ColorFormat, ColorCode, TailwindColor, TailwindShade, MapperStats, ColorSearchResult, CSSVariables, TailwindConfig } from "./types";
declare const VALID_COLORS: readonly TailwindColor[];
declare const VALID_SHADES: readonly TailwindShade[];
declare const VALID_FORMATS: readonly ColorFormat[];
export declare function getColor(colorName: string, colorCode: ColorCode, format?: ColorFormat): string | [number, number, number] | ColorData;
export declare function getColorShades(colorName: string, format?: ColorFormat): Record<string, string | [number, number, number] | ColorData>;
export declare function getAllColors(format?: ColorFormat): Record<string, Record<string, string | [number, number, number] | ColorData>>;
export declare function getAvailableColors(): string[];
export declare function getAvailableShades(colorName: string): string[];
export declare function colorExists(colorName: string, colorCode?: ColorCode | null): boolean;
export declare function getColorData(colorName: string, colorCode: ColorCode): ColorData;
export declare function convertColor(colorName: string, colorCode: ColorCode, fromFormat: ColorFormat, toFormat: ColorFormat): string | [number, number, number] | ColorData;
export declare function findColorByHex(hexValue: string, exact?: boolean): ColorSearchResult[];
export declare function getColorPalette(colorName: string): Record<string, ColorData>;
export declare function generateCSSVariables(colorName: string, prefix?: string): CSSVariables;
export declare function generateTailwindConfig(): TailwindConfig;
export declare function getMapperStats(): MapperStats;
export { VALID_COLORS, VALID_FORMATS, VALID_SHADES };
//# sourceMappingURL=functions.d.ts.map