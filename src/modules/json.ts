import { configs } from 'eslint-plugin-jsonc'

import type { Linter } from 'eslint'

const jsonFiles = ['**/*.json', '**/*.json5', '**/*.jsonc']

const config: Linter.Config[] = configs['flat/recommended-with-jsonc'].map((entry) =>
  entry.files ? entry : { ...entry, files: jsonFiles },
)

export default config
