module.exports = {
  env: {
    es6: true,
    browser: true,
    jest: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "no-use-before-define": ["error", { "variables": false, "functions":false }],
    "quotes": [2, "single", { "avoidEscape": true }],
    "no-var": 0,
    "no-underscore-dangle": ["error", { "allowAfterThis": true }],
    "vars-on-top": "off",
    "react/prop-types":"off",
    "object-curly-newline": ["error", {"ImportDeclaration": "never",}]
  },
};
