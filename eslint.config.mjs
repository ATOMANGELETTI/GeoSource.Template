import nextConfig from "eslint-config-next";

const tsPlugin = nextConfig.find((c) => c.plugins && c.plugins["@typescript-eslint"])?.plugins[
  "@typescript-eslint"
];

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      ".agents/**",
      "dist/**",
      "out/**",
      "other/**",
      "node_modules/**",
      "next-env.d.ts",
      "src-tauri/**",
      "tests/artifacts/coverage/**",
      "eslint.config.mjs",
      "postcss.config.mjs",
    ],
  },
  ...nextConfig,
  {
    files: ["**/*.ts", "**/*.tsx"],
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
      "react/self-closing-comp": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
];

export default eslintConfig;
