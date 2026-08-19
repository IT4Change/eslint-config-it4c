import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

import { prettierDisabledVueRules, scopeVueTsConfigs, vueAndTsFiles } from '#src/vue-scope'

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
    // Covers `vue/max-attributes-per-line` and the ten other formatting rules Vue's
    // recommended set enables, all of which Prettier owns
    rules: prettierDisabledVueRules,
  },
]

export default config
