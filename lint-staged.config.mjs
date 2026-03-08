export default {
  "*.{js,jsx,ts,tsx,json,md,mdx}": [
    "biome check --write --no-errors-on-unmatched",
    "biome format --write --no-errors-on-unmatched",
    // () => "pnpm type-check"
  ],
  "*.{ts,tsx}": [
    () => "pnpm type-check",
  ],
  // "*.{json,md,mdx}": ["biome format --write --no-errors-on-unmatched"],
  // Run type-check after linting all files
  // "*.{ts,tsx}": () => "tsc --noEmit",

};
