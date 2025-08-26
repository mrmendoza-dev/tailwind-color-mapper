type ColorFormat = "hex" | "rgb" | "hsl" | "oklch" | "rawrgb" | "raw_rgb" | "rawhsl" | "raw_hsl" | "rawoklch" | "raw_oklch" | "all";
type ColorCode = string | number;
type TailwindColor = "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose" | "slate" | "gray" | "zinc" | "neutral" | "stone";
type TailwindShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
interface ColorData {
    hex: string;
    rgb: string;
    hsl: string;
    oklch: string;
    rawRgb: [number, number, number];
    rawHsl: [number, number, number];
    rawOklch: [number, number, number];
}
interface ColorShades {
    [shadeCode: string]: ColorData;
}
interface TailwindMapper {
    [colorName: string]: ColorShades;
}
interface MapperStats {
    totalColors: number;
    totalShades: number;
    colors: Record<string, number>;
}
interface ColorSearchResult {
    colorName: string;
    shadeCode: string;
    colorData: ColorData;
}
interface CSSVariables {
    [varName: string]: string;
}
interface TailwindConfig {
    [colorName: string]: {
        [shade: string]: string;
    };
}

declare const VALID_COLORS: readonly TailwindColor[];
declare const VALID_SHADES: readonly TailwindShade[];
declare const VALID_FORMATS: readonly ColorFormat[];
declare function getColor(colorName: string, colorCode: ColorCode, format?: ColorFormat): string | [number, number, number] | ColorData;
declare function getColorShades(colorName: string, format?: ColorFormat): Record<string, string | [number, number, number] | ColorData>;
declare function getAllColors(format?: ColorFormat): Record<string, Record<string, string | [number, number, number] | ColorData>>;
declare function getAvailableColors(): string[];
declare function getAvailableShades(colorName: string): string[];
declare function colorExists(colorName: string, colorCode?: ColorCode | null): boolean;
declare function getColorData(colorName: string, colorCode: ColorCode): ColorData;
declare function convertColor(colorName: string, colorCode: ColorCode, fromFormat: ColorFormat, toFormat: ColorFormat): string | [number, number, number] | ColorData;
declare function findColorByHex(hexValue: string, exact?: boolean): ColorSearchResult[];
declare function getColorPalette(colorName: string): Record<string, ColorData>;
declare function generateCSSVariables(colorName: string, prefix?: string): CSSVariables;
declare function generateTailwindConfig(): TailwindConfig;
declare function getMapperStats(): MapperStats;

declare let red: {
    "red-50": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "red-100": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "red-200": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "red-300": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "red-400": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "red-500": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "red-600": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "red-700": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "red-800": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "red-900": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "red-950": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
};
declare let orange: {
    "orange-50": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "orange-100": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "orange-200": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "orange-300": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "orange-400": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "orange-500": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "orange-600": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "orange-700": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "orange-800": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "orange-900": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "orange-950": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
};
declare let amber: {
    "amber-50": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "amber-100": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "amber-200": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "amber-300": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "amber-400": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "amber-500": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "amber-600": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "amber-700": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "amber-800": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "amber-900": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "amber-950": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
};
declare let yellow: {
    "yellow-50": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "yellow-100": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "yellow-200": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "yellow-300": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "yellow-400": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "yellow-500": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "yellow-600": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "yellow-700": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "yellow-800": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "yellow-900": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "yellow-950": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
};
declare let lime: {
    "lime-50": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "lime-100": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "lime-200": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "lime-300": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "lime-400": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "lime-500": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "lime-600": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "lime-700": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "lime-800": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "lime-900": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "lime-950": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
};
declare let green: {
    "green-50": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "green-100": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "green-200": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "green-300": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "green-400": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "green-500": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "green-600": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "green-700": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "green-800": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "green-900": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "green-950": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
};
declare let emerald: {
    "emerald-50": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "emerald-100": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "emerald-200": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "emerald-300": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "emerald-400": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "emerald-500": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "emerald-600": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "emerald-700": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "emerald-800": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "emerald-900": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "emerald-950": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
};
declare let teal: {
    "teal-50": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "teal-100": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "teal-200": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "teal-300": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "teal-400": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "teal-500": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "teal-600": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "teal-700": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "teal-800": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "teal-900": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "teal-950": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
};
declare let cyan: {
    "cyan-50": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "cyan-100": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "cyan-200": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "cyan-300": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "cyan-400": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "cyan-500": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "cyan-600": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "cyan-700": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "cyan-800": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "cyan-900": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "cyan-950": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
};
declare let sky: {
    "sky-50": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "sky-100": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "sky-200": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "sky-300": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "sky-400": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "sky-500": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "sky-600": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "sky-700": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "sky-800": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "sky-900": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "sky-950": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
};
declare let blue: {
    "blue-50": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "blue-100": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "blue-200": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "blue-300": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "blue-400": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "blue-500": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "blue-600": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "blue-700": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "blue-800": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "blue-900": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "blue-950": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
};
declare let indigo: {
    "indigo-50": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "indigo-100": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "indigo-200": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "indigo-300": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "indigo-400": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "indigo-500": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "indigo-600": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "indigo-700": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "indigo-800": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "indigo-900": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "indigo-950": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
};
declare let violet: {
    "violet-50": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "violet-100": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "violet-200": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "violet-300": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "violet-400": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "violet-500": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "violet-600": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "violet-700": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "violet-800": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "violet-900": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "violet-950": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
};
declare let purple: {
    "purple-50": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "purple-100": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "purple-200": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "purple-300": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "purple-400": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "purple-500": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "purple-600": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "purple-700": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "purple-800": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "purple-900": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "purple-950": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
};
declare let fuchsia: {
    "fuchsia-50": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "fuchsia-100": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "fuchsia-200": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "fuchsia-300": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "fuchsia-400": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "fuchsia-500": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "fuchsia-600": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "fuchsia-700": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "fuchsia-800": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "fuchsia-900": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "fuchsia-950": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
};
declare let pink: {
    "pink-50": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "pink-100": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "pink-200": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "pink-300": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "pink-400": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "pink-500": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "pink-600": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "pink-700": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "pink-800": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "pink-900": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "pink-950": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
};
declare let rose: {
    "rose-50": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "rose-100": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "rose-200": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "rose-300": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "rose-400": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "rose-500": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "rose-600": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "rose-700": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "rose-800": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "rose-900": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "rose-950": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
};
declare let slate: {
    "slate-50": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "slate-100": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "slate-200": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "slate-300": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "slate-400": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "slate-500": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "slate-600": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "slate-700": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "slate-800": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "slate-900": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "slate-950": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
};
declare let gray: {
    "gray-50": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "gray-100": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "gray-200": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "gray-300": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "gray-400": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "gray-500": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "gray-600": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "gray-700": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "gray-800": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "gray-900": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "gray-950": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
};
declare let zinc: {
    "zinc-50": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "zinc-100": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "zinc-200": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "zinc-300": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "zinc-400": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "zinc-500": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "zinc-600": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "zinc-700": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "zinc-800": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "zinc-900": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "zinc-950": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
};
declare let neutral: {
    "neutral-50": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "neutral-100": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "neutral-200": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "neutral-300": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "neutral-400": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "neutral-500": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "neutral-600": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "neutral-700": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "neutral-800": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "neutral-900": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "neutral-950": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
};
declare let stone: {
    "stone-50": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "stone-100": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "stone-200": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "stone-300": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "stone-400": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "stone-500": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "stone-600": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "stone-700": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "stone-800": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "stone-900": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
    "stone-950": {
        hex: string;
        rgb: string;
        hsl: string;
        oklch: string;
        rawRgb: number[];
        rawHsl: number[];
        rawOklch: number[];
    };
};


declare const export_default: {
  red: typeof red;
  orange: typeof orange;
  amber: typeof amber;
  yellow: typeof yellow;
  lime: typeof lime;
  green: typeof green;
  emerald: typeof emerald;
  teal: typeof teal;
  cyan: typeof cyan;
  sky: typeof sky;
  blue: typeof blue;
  indigo: typeof indigo;
  violet: typeof violet;
  purple: typeof purple;
  fuchsia: typeof fuchsia;
  pink: typeof pink;
  rose: typeof rose;
  slate: typeof slate;
  gray: typeof gray;
  zinc: typeof zinc;
  neutral: typeof neutral;
  stone: typeof stone;
};

export { VALID_COLORS, VALID_FORMATS, VALID_SHADES, colorExists, convertColor, findColorByHex, generateCSSVariables, generateTailwindConfig, getAllColors, getAvailableColors, getAvailableShades, getColor, getColorData, getColorPalette, getColorShades, getMapperStats, export_default as tailwindMapperData };
export type { CSSVariables, ColorCode, ColorData, ColorFormat, ColorSearchResult, ColorShades, MapperStats, TailwindColor, TailwindConfig, TailwindMapper, TailwindShade };
