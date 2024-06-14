import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    rules: {
      "no-unused-vars": "off",
      "no-undef": "error",
      "prefer-const": "error",
      "no-console": "warn",
      "@typescript-eslint/no-explicit-any": ["off"],
      "@typescript-eslint/no-unused-vars": ["off"],
      "@typescript-eslint/no-namespace": "off",
    },
  },
  {
    ignores: ["**/node_modules/", "**/dist/"],
  }
);
