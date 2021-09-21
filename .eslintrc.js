module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    // ecmaFeatures: {
    //   jsx: true, // Allows for the parsing of JSX
    // },
  },
  // settings: {
  //   react: {
  //     version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
  //   },
  // },
  ignorePatterns: ["node_modules/", "dist/"],
  extends: [
    // "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    // "plugin:react-hooks/recommended", // Uses the recommended rules from eslint-plugin-react-hooks
    // "plugin:jsx-a11y/recommended", // Uses the recommended rules from eslint-plugin-jsx-a11y
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
  },
  plugins: [
    // "testing-library", // find common mistakes while testing with testing library
    // "jest", // find commmon mistakes while testing with jest
    // "jest-dom", // find common mistakes while testing with jest dom
  ],
  overrides: [
    // {
    //   // limit eslint plugin testing library to test files
    //   // files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
    //   extends: [
    //     // "plugin:testing-library/react",
    //     // "plugin:jest/recommended",
    //     // "plugin:jest-dom/recommended",
    //   ],
    // },
  ],
};
