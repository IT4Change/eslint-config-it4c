import type { Linter } from "eslint";
import eslint from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from "@vue/eslint-config-typescript";
import pluginJsonc from "eslint-plugin-jsonc";
import pluginYml from "eslint-plugin-yml";
import pluginImportX from "eslint-plugin-import-x";
import pluginComments from "@eslint-community/eslint-plugin-eslint-comments";
import pluginSecurity from "eslint-plugin-security";
import pluginNoCatchAll from "eslint-plugin-no-catch-all";
import pluginJest from "eslint-plugin-jest";
import graphqlPlugin, {
  configs as graphqlConfigs,
} from "@graphql-eslint/eslint-plugin";
import neostandard from "neostandard";
import pluginPrettier from "eslint-plugin-prettier/recommended";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { plugins: _, ...importXTypescript } =
  pluginImportX.flatConfigs.typescript;

const config: Linter.Config[] = defineConfigWithVueTs(
  { ignores: ["dist/"] },
  eslint.configs.recommended,
  pluginVue.configs["flat/recommended"],
  vueTsConfigs.strict,
  ...(pluginJsonc.configs["flat/recommended-with-jsonc"] as Linter.Config[]),
  ...(pluginYml.configs["flat/recommended"] as Linter.Config[]),
  {
    plugins: { "@eslint-community/eslint-comments": pluginComments },
    rules: (pluginComments.configs.recommended as { rules: Linter.RulesRecord })
      .rules,
  },
  pluginSecurity.configs.recommended as Linter.Config,
  {
    plugins: { "no-catch-all": pluginNoCatchAll },
    rules: { "no-catch-all/no-catch-all": "error" },
  },
  {
    ...pluginJest.configs["flat/recommended"],
    files: ["**/*.test.ts", "**/*.test.js", "**/*.spec.ts", "**/*.spec.js"],
  } as Linter.Config,
  {
    files: ["**/*.graphql"],
    plugins: {
      "@graphql-eslint": graphqlPlugin as unknown as Record<string, unknown>,
    },
    ...graphqlConfigs["flat/schema-recommended"],
  } as Linter.Config,
  {
    files: ["**/*.graphql"],
    ...graphqlConfigs["flat/operations-recommended"],
  } as Linter.Config,
  ...(neostandard({ noStyle: true }) as Linter.Config[]),
  importXTypescript as Linter.Config,
  pluginPrettier as Linter.Config,
) as Linter.Config[];

export default config;
