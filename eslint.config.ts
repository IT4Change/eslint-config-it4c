import config from "./dist/index.js";

import type { Linter } from "eslint";

export default [
  ...config,
  { ignores: ["rules.json"] },
  {
    files: ["scripts/**/*.ts"],
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: [
            "scripts/generate-rules-md.ts",
            "scripts/inspect-rules.ts",
          ],
        },
      },
    },
  },
] satisfies Linter.Config[];
