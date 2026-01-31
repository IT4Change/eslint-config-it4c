/* eslint-disable n/file-extension-in-import */
import config from "./dist/index.js";

export default [
  ...config,
  { ignores: ["rules.json"] },
  // n/no-sync crashes without type information (parserOptions.project)
  { files: ["scripts/**"], rules: { "n/no-sync": "off" } },
];
