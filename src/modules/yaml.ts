import { configs as ymlConfigs } from 'eslint-plugin-yml'

import type { Linter } from 'eslint'

const ymlFiles = ['**/*.yaml', '**/*.yml']

const config: Linter.Config[] = ymlConfigs['flat/recommended'].map((entry: Linter.Config) =>
  entry.files ? entry : { ...entry, files: ymlFiles },
)

export default config
