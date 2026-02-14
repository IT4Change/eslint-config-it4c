import pluginJsonc from 'eslint-plugin-jsonc'

import type { Linter } from 'eslint'

const jsonFiles = ['**/*.json', '**/*.json5', '**/*.jsonc']

const config: Linter.Config[] = (
  pluginJsonc.configs['flat/recommended-with-jsonc'] as Linter.Config[]
).map((entry) => (entry.files ? entry : { ...entry, files: jsonFiles }))

export default config
