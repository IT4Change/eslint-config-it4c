import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

import {
  extraVueRules,
  prettierDisabledVueRules,
  scopeVueTsConfigs,
  vueAndTsFiles,
} from '#src/vue-scope'

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
      ...extraVueRules,
      // A `defineModel` default only applies in the child, so a parent that passes no
      // value ends up with child and parent state out of sync
      'vue/no-define-model-default': 'error',
      // Covers `vue/max-attributes-per-line` and the ten other formatting rules Vue's
      // recommended set enables, all of which Prettier owns
      ...prettierDisabledVueRules,
    },
  },
]

export default config
