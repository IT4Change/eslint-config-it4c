import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'

import type { Linter } from 'eslint'

const vueAndTsFiles = ['**/*.vue', '**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts']

const config: Linter.Config[] = [
  // scope configs without `files` to Vue/TS files to prevent rules like
  // @typescript-eslint/no-unused-expressions from applying to JSON etc.
  ...(defineConfigWithVueTs(
    pluginVue.configs['flat/recommended'],
    vueTsConfigs.strict,
  ) as Linter.Config[]).map((cfg) =>
    cfg.files ? cfg : { ...cfg, files: vueAndTsFiles },
  ),
  {
    files: vueAndTsFiles,
    rules: {
      // Prettier handles this
      'vue/max-attributes-per-line': 'off',
    },
  },
]

export default config
