// commitlint.config.ts
import type { UserConfig } from "@commitlint/types";

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  // You can customize rules here if needed
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "docs", "style", "refactor", "revert", "perf", "test", "build", "ci", "chore", "wip"],
    ],
    // "scope-empty": [2, "never"], // require a scope
    "subject-case": [0], // allow any casing
  },
};

export default Configuration;
