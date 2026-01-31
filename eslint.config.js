/* eslint-disable n/file-extension-in-import */
import config from "./dist/index.js";

export default [
  ...config,
  { ignores: ["rules.json"] },
  {
    files: ["scripts/**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.eslint.json",
      },
    },
  },
];
