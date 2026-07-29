import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

import type { Linter } from 'eslint'

const vueAndTsFiles = ['**/*.vue', '**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts']

// `vueTsConfigs.strict` is passed only for its parser wiring (`@vue/typescript/setup`),
// which teaches vue-eslint-parser to handle `<script lang="ts">`. Its rule sets are
// dropped: the `typescript` module owns @typescript-eslint rules and configures them
// more strictly (strictTypeChecked, plus argsIgnorePattern on no-unused-vars).
const isTypescriptEslintConfig = (name: string | undefined): boolean =>
  name?.startsWith('typescript-eslint/') ?? false

const config: Linter.Config[] = [
  // scope configs without `files` to Vue/TS files to prevent rules like
  // @typescript-eslint/no-unused-expressions from applying to JSON etc.
  ...(
    defineConfigWithVueTs(
      pluginVue.configs['flat/recommended'],
      vueTsConfigs.strict,
    ) as Linter.Config[]
  )
    .filter((cfg) => !isTypescriptEslintConfig(cfg.name))
    .map((cfg) => (cfg.files ? cfg : { ...cfg, files: vueAndTsFiles })),
  {
    files: vueAndTsFiles,
    languageOptions: { globals: globals.browser },
    rules: {
      // Prettier handles this
      'vue/max-attributes-per-line': 'off',
    },
  },
]

export default config
