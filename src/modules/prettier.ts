import pluginPrettier from 'eslint-plugin-prettier/recommended'

import { defaultFiles as files } from '#src/files'

import type { Linter } from 'eslint'

const config: Linter.Config[] = [{ ...pluginPrettier, files }]

export default config
