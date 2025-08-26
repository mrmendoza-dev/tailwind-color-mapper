export type ColorFormat = "hex" | "rgb" | "hsl" | "oklch" | "rawrgb" | "raw_rgb" | "rawhsl" | "raw_hsl" | "rawoklch" | "raw_oklch" | "all";
export type ColorCode = string | number;
export type TailwindColor = "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose" | "slate" | "gray" | "zinc" | "neutral" | "stone";
export type TailwindShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
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
export interface MapperStats {
    totalColors: number;
    totalShades: number;
    colors: Record<string, number>;
}
export interface ColorSearchResult {
    colorName: string;
    shadeCode: string;
    colorData: ColorData;
}
export interface CSSVariables {
    [varName: string]: string;
}
export interface TailwindConfig {
    [colorName: string]: {
        [shade: string]: string;
    };
}
//# sourceMappingURL=types.d.ts.map