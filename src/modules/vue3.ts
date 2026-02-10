import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'

import type { Linter } from 'eslint'

const config: Linter.Config[] = [
  ...(defineConfigWithVueTs(
    pluginVue.configs['flat/recommended'],
    vueTsConfigs.strict,
  ) as Linter.Config[]),
  {
    rules: {
      // Prettier handles this
      'vue/max-attributes-per-line': 'off',
    },
  },
]

export default config
