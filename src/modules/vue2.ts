import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'

import type { Linter } from 'eslint'

const config: Linter.Config[] = defineConfigWithVueTs(
  pluginVue.configs['flat/vue2-recommended'],
  vueTsConfigs.strict,
) as Linter.Config[]

export default config
