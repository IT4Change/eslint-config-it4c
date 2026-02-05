import pluginYml from 'eslint-plugin-yml'

import type { Linter } from 'eslint'

// eslint-disable-next-line import-x/no-named-as-default-member
const config: Linter.Config[] = pluginYml.configs['flat/recommended']

export default config
