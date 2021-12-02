module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    project: "tsconfig.json",
    sourceType: "module",
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "jest",
  ],
  rules: {
    "prettier/prettier": [
      "warn",
      {
        endOfLine: "auto",
      }
    ],
    "arrow-body-style": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".ts", ".jsx", ".tsx",] }],
    "react/state-in-constructor": "off",
  },
  settings:{
    "import/ignore": ["node_modules"]
  }
};
