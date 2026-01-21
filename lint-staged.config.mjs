export default {
  "*.{js,jsx,ts,tsx}": [
    "biome check --write --no-errors-on-unmatched",
    "biome format --write --no-errors-on-unmatched",
  ],
  "*.{json,md,mdx}": ["biome format --write --no-errors-on-unmatched"],
  // Run type-check after linting all files
  "*.{ts,tsx}": () => "tsc --noEmit",
};
