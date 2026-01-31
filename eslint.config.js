/* eslint-disable n/file-extension-in-import */
import config from "./dist/index.js";

export default [
  ...config,
  { ignores: ["rules.json"] },
  {
    files: ["scripts/**"],
    rules: {
      "no-console": "off",
      "n/no-sync": "off",
      "n/no-process-env": "off",
      "import-x/no-extraneous-dependencies": "off",
      "import-x/no-relative-parent-imports": "off",
    },
  },
];
