import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  // Global ignores
  {
    ignores: [
      "dist/**",
      "build/**",
      "node_modules/**",
      "logs/**",
      "resources/**",
      "public/instructor/**",
      "public/projectFiles/**",
      "public/webGL/**",
      "**/*.loader.js",
      "**/*.data",
      "**/*.data.*",
      "**/*.wasm",
      "**/*.wasm.*",
      "**/*.framework.js",
      "**/*.framework.js.*",
      "*.js",
      "*.cjs"
    ]
  },

  // TypeScript / React configuration
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.node,
        __APP_VERSION__: "readonly",
        __COPYRIGHT_YEAR__: "readonly"
      }
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier
    },
    rules: {
      // Use recommended rules from plugins
      ...js.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      // Disable rules that conflict with Prettier
      ...prettierConfig.rules,

      // Prettier integration
      "prettier/prettier": ["error", { endOfLine: "auto" }],

      // TypeScript-specific rules
      // Custom rules - must come AFTER spreads to override
      // Override typescript-eslint's no-unused-vars to allow underscore-prefixed params
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_"
        }
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      // Comma rules to align with Prettier config (trailingComma: "none")
      "comma-dangle": ["error", "never"],
      // React-specific rules
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "react/prop-types": "off", // Not needed with TypeScript
      "react/display-name": "warn",
      "react-hooks/set-state-in-effect": "off",

      // Turn off base rule in favor of TS-aware version
      "no-unused-vars": "off",

      // General code quality rules
      "no-console": "warn",
      "prefer-const": "error",
      "no-var": "error",

      // Comma rules to align with Prettier config
      "comma-dangle": ["error", "never"]
    }
  }
];
