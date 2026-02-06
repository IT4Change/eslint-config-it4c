import { configs as ymlConfigs } from 'eslint-plugin-yml'

import type { Linter } from 'eslint'

const config: Linter.Config[] = ymlConfigs['flat/recommended']

export default config
