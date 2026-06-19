import { fixupConfigArray } from "@eslint/compat";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  ...fixupConfigArray([
    "eslint-config-next/core-web-vitals",
  ]),
]);

export default eslintConfig;
