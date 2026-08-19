import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

import { scopeVueTsConfigs, vueAndTsFiles } from '#src/vue-scope'

import type { Linter } from 'eslint'

const config: Linter.Config[] = [
  ...scopeVueTsConfigs(
    defineConfigWithVueTs(
      pluginVue.configs['flat/recommended'],
      vueTsConfigs.strict,
    ) as Linter.Config[],
  ),
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
