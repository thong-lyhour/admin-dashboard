import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals", // Core Web Vitals rules for Next.js
    "next",                // General Next.js rules
    "plugin:@typescript-eslint/recommended" // TypeScript rules
  ),
  {
    rules: {
      // Disable unused variable warnings
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",

      // Disable "any" type errors
      "@typescript-eslint/no-explicit-any": "off",

      // Add other custom rules or overrides here
      "react/react-in-jsx-scope": "off", // Not needed in Next.js
    },
  },
];

export default eslintConfig;