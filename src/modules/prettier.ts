import pluginPrettier from "eslint-plugin-prettier/recommended";

import type { Linter } from "eslint";

const config: Linter.Config[] = [pluginPrettier];

export default config;
