module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    jasmine: true,
    "jest/globals": true,
    "cypress/globals": true,
  },
  extends: [
    "eslint:recommended",
    "standard",
    "plugin:chai-friendly/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  plugins: ["jasmine", "jest", "cypress"],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    $: "readonly",
    _: "readonly",
    angular: "readonly",
    toastr: "readonly",
    Rx: "readonly",
    pendo: "readonly",
  },
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "single", { avoidEscape: true, allowTemplateLiterals: true }],
    yoda: ["error", "never", { exceptRange: true }],
    "comma-dangle": ["error", "always-multiline"],
    "jsx-quotes": ["error", "prefer-single"],
    "react/jsx-no-bind": ["error"],
    "react-hooks/rules-of-hooks": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
