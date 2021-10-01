import { DEFAULT_EXTENSIONS } from "@babel/core";
import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import camelCase from "lodash.camelcase";
import sourceMaps from "rollup-plugin-sourcemaps";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require("./package.json");

const libraryName = "simple-clipboard-logger";

// settings common to umd and esm/cjs builds
const commonSettings = {
  input: `src/index.ts`,
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: {
    include: "src/**",
  },
};

// umd - we need to minify and transpile for browser support
const umdBuild = {
  ...commonSettings,
  output: [{ file: pkg.browser, name: camelCase(libraryName), format: "umd", sourcemap: true }],
  plugins: [
    // resolve json files
    json(),
    // resolve node_modules but the browser version since this is a umd build
    nodeResolve({ browser: true }),
    // resolve commonjs files in node_modules, rollup does not understand these
    // out of the box
    commonjs(),
    // transpile typescript files (but keeps extensions)
    typescript({
      useTsconfigDeclarationDir: true,
    }),
    // transpile all files with babel
    babel({
      // include helpers
      babelHelpers: "bundled",
      // don't transpile polyfill packages, can lead to circular dependencies
      exclude: [/\/core-js\//, /\/regenerator-runtime\//],
      // tranpsile all default files and ts/tsx files from typescript
      extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"],
    }),
    // include source maps
    sourceMaps(),
    // replace NODE_ENV where applicable
    replace({
      values: {
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      },
      preventAssignment: true,
    }),
    // minify
    terser(),
  ],
};

// esm - we just compile the code no minifying or transpiling
// cjs - we just compile the code no minifying or transpiling
const esmAndCJSBuild = {
  ...commonSettings,
  preserveModules: true,
  output: [
    { dir: "dist/esm", format: "es", sourcemap: true },
    { dir: "dist/cjs", format: "cjs", sourcemap: true },
  ],
  external: ["nanoid"],
  plugins: [
    json(),
    nodeResolve(),
    commonjs(),
    typescript({
      useTsconfigDeclarationDir: true,
    }),
    sourceMaps(),
    replace({
      values: {
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      },
      preventAssignment: true,
    }),
  ],
};

export default [umdBuild, esmAndCJSBuild];
