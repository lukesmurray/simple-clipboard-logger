import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import camelCase from "lodash.camelcase";
import sourceMaps from "rollup-plugin-sourcemaps";
import ts from "rollup-plugin-ts";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require("./package.json");

const libraryName = "simple-clipboard-logger";

export default {
  input: `src/main.ts`,
  output: [
    { file: pkg.main, name: camelCase(libraryName), format: "umd", sourcemap: true },
    { file: pkg.module, format: "es", sourcemap: true },
    {
      file: pkg.browser,
      name: camelCase(libraryName),
      format: "iife",
      sourcemap: true,
    },
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: {
    include: "src/**",
  },
  plugins: [
    // Allow json resolution
    json(),
    // Compile TypeScript files
    ts({
      transpiler: "babel",
    }),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/plugins/tree/master/packages/node-resolve
    nodeResolve({
      browser: true,
    }),

    // because most packages on npm are commonjs we use this plugin so rollup
    // can bundle commonjs modules
    commonjs(),

    // Resolve source maps to the original source
    sourceMaps(),

    // minify the output
    // terser(),

    // replace node_env with stringified value from the current process
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
