import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

const external = ["culori"];

export default [
  // Main build
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.cjs",
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
      {
        file: "dist/index.esm.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    external,
    plugins: [resolve(), commonjs(), json(), typescript()],
  },
  // Core build
  {
    input: "src/core.ts",
    output: [
      {
        file: "dist/core.cjs",
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
      {
        file: "dist/core.esm.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    external,
    plugins: [resolve(), commonjs(), json(), typescript()],
  },
  // Hex build
  {
    input: "src/hex.ts",
    output: [
      {
        file: "dist/hex.cjs",
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
      {
        file: "dist/hex.esm.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    external,
    plugins: [resolve(), commonjs(), json(), typescript()],
  },
  // OKLCH build
  {
    input: "src/oklch.ts",
    output: [
      {
        file: "dist/oklch.cjs",
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
      {
        file: "dist/oklch.esm.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    external,
    plugins: [resolve(), commonjs(), json(), typescript()],
  },
  // Type definitions
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.d.ts",
      format: "esm",
    },
    plugins: [dts()],
  },
];
