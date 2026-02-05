import pluginJsonc from "eslint-plugin-jsonc";

import type { Linter } from "eslint";

const config: Linter.Config[] =
  pluginJsonc.configs["flat/recommended-with-jsonc"] as Linter.Config[];

export default config;
