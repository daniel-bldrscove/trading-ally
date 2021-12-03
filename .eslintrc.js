module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "airbnb-typescript",
    "airbnb/hooks",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
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
  // temporary workaround to remove typescript no-unused-vars eslint error
  "overrides": [
    {
       files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
          ecmaVersion: 12,
          sourceType: 'module',
          ecmaFeatures: {
              jsx: true,
          },

          // typescript-eslint specific options
          warnOnUnsupportedTypeScriptVersion: true,
      },
      plugins: ['@typescript-eslint'],

      rules: {
          "@typescript-eslint/no-unused-vars": "off",
      }
    }
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
    "react/jsx-uses-vars": 2,
  },
  settings:{
    "import/ignore": ["node_modules"],
    "react": {
      "createClass": "createReactClass", // Regex for Component Factory to use,
                                         // default to "createReactClass"
      "pragma": "React",  // Pragma to use, default to "React"
      "fragment": "Fragment",  // Fragment to use (may be a property of <pragma>), default to "Fragment"
      "version": "detect", // React version. "detect" automatically picks the version you have installed.
                           // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
                           // default to latest and warns if missing
                           // It will default to "detect" in the future
    },
  }
};
