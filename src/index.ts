import eslint from "@eslint/js";
import pluginComments from "@eslint-community/eslint-plugin-eslint-comments";
import graphqlPlugin, {
  configs as graphqlConfigs,
} from "@graphql-eslint/eslint-plugin";
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from "@vue/eslint-config-typescript";
import pluginImportX from "eslint-plugin-import-x";
import pluginJest from "eslint-plugin-jest";
import pluginJsonc from "eslint-plugin-jsonc";
import pluginNoCatchAll from "eslint-plugin-no-catch-all";
import pluginPrettier from "eslint-plugin-prettier/recommended";
import pluginSecurity from "eslint-plugin-security";
import pluginVue from "eslint-plugin-vue";
import pluginYml from "eslint-plugin-yml";
import neostandard from "neostandard";

import type { Linter } from "eslint";

const { plugins: _, ...importXTypescript } =
  // eslint-disable-next-line import-x/no-named-as-default-member
  pluginImportX.flatConfigs.typescript;

const config: Linter.Config[] = defineConfigWithVueTs(
  { ignores: ["dist/"] },
  eslint.configs.recommended,
  pluginVue.configs["flat/recommended"],
  vueTsConfigs.strict,
  ...(pluginJsonc.configs["flat/recommended-with-jsonc"] as Linter.Config[]),
  // eslint-disable-next-line import-x/no-named-as-default-member
  ...(pluginYml.configs["flat/recommended"] as Linter.Config[]),
  {
    plugins: { "@eslint-community/eslint-comments": pluginComments },
    // eslint-disable-next-line import-x/no-named-as-default-member
    rules: (pluginComments.configs.recommended as { rules: Linter.RulesRecord })
      .rules,
  },
  // eslint-disable-next-line import-x/no-named-as-default-member
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
  {
    rules: {
      // eslint-comments
      "@eslint-community/eslint-comments/disable-enable-pair": [
        "error",
        { allowWholeFile: true },
      ],
      "@eslint-community/eslint-comments/no-restricted-disable": "error",

      // general
      "no-console": "error",
      "no-void": ["error", { allowAsStatement: true }],

      // import-x
      "import-x/export": "error",
      "import-x/no-empty-named-blocks": "error",
      "import-x/no-extraneous-dependencies": "error",
      "import-x/no-mutable-exports": "error",
      "import-x/no-unused-modules": "error",
      "import-x/no-named-as-default": "error",
      "import-x/no-named-as-default-member": "error",
      "import-x/no-amd": "error",
      "import-x/no-commonjs": "error",
      "import-x/no-import-module-exports": "error",
      "import-x/no-nodejs-modules": "off",
      "import-x/unambiguous": "off",
      "import-x/default": "error",
      "import-x/named": "off",
      "import-x/namespace": "error",
      "import-x/no-absolute-path": "error",
      "import-x/no-cycle": "error",
      "import-x/no-dynamic-require": "error",
      "import-x/no-internal-modules": "off",
      "import-x/no-relative-packages": "error",
      "import-x/no-relative-parent-imports": ["error", { ignore: ["@/*"] }],
      "import-x/no-self-import": "error",
      "import-x/no-unresolved": "error",
      "import-x/no-useless-path-segments": "error",
      "import-x/no-webpack-loader-syntax": "error",
      "import-x/consistent-type-specifier-style": "error",
      "import-x/exports-last": "off",
      "import-x/extensions": "error",
      "import-x/first": "error",
      "import-x/group-exports": "off",
      "import-x/newline-after-import": "error",
      "import-x/no-anonymous-default-export": "off",
      "import-x/no-default-export": "off",
      "import-x/no-duplicates": "error",
      "import-x/no-named-default": "error",
      "import-x/no-namespace": "error",
      "import-x/no-unassigned-import": "error",
      "import-x/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          "newlines-between": "always",
          pathGroups: [
            {
              pattern: "@?*/**",
              group: "external",
              position: "after",
            },
            {
              pattern: "@/**",
              group: "external",
              position: "after",
            },
          ],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          distinctGroup: true,
        },
      ],
      "import-x/no-deprecated": "error",
      "import-x/prefer-default-export": "off",

      // n
      "n/exports-style": "error",
      "n/file-extension-in-import": ["error", "never"],
      "n/global-require": "error",
      "n/no-callback-literal": "error",
      "n/no-extraneous-import": "off",
      "n/no-hide-core-modules": "error",
      "n/no-missing-import": "off",
      "n/no-mixed-requires": "error",
      "n/no-new-require": "error",
      "n/no-path-concat": "error",
      "n/no-process-env": "error",
      "n/no-restricted-import": "error",
      "n/no-restricted-require": "error",
      "n/no-sync": "error",
      "n/no-unpublished-import": "error",
      "n/no-unpublished-require": "error",
      "n/prefer-global/buffer": "error",
      "n/prefer-global/console": "error",
      "n/prefer-global/process": "error",
      "n/prefer-global/text-decoder": "error",
      "n/prefer-global/text-encoder": "error",
      "n/prefer-global/url": "error",
      "n/prefer-global/url-search-params": "error",
      "n/prefer-node-protocol": "error",
      "n/prefer-promises/dns": "error",
      "n/prefer-promises/fs": "error",
      "n/shebang": "error",

      // promise
      "promise/always-return": "error",
      "promise/avoid-new": "error",
      "promise/catch-or-return": "error",
      "promise/no-callback-in-promise": "warn",
      "promise/no-nesting": "warn",
      "promise/no-new-statics": "error",
      "promise/no-promise-in-callback": "warn",
      "promise/no-return-in-finally": "warn",
      "promise/no-return-wrap": "error",
      "promise/param-names": "error",
      "promise/valid-params": "warn",
      "promise/no-multiple-resolved": "error",
      "promise/no-native": "off",
      "promise/prefer-await-to-callbacks": "error",
      "promise/prefer-catch": "error",
      "promise/spec-only": "error",

      // typescript-eslint
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-floating-promises": [
        "error",
        { ignoreVoid: true },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  {
    files: ["**/*.graphql"],
    rules: {
      "@graphql-eslint/description-style": ["error", { style: "inline" }],
    },
  },
  {
    files: ["**/*.test.ts", "**/*.test.js", "**/*.spec.ts", "**/*.spec.js"],
    rules: {
      "jest/prefer-to-have-length": "error",
      "jest/unbound-method": "error",
    },
  },
) as Linter.Config[];

export default config;
