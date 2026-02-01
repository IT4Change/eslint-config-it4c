// eslint-disable-next-line n/file-extension-in-import
import config from "./dist/index.js";

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
];
