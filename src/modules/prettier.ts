import pluginPrettier from 'eslint-plugin-prettier/recommended'

import type { Linter } from 'eslint'

import { defaultFiles as files } from '../files'

const config: Linter.Config[] = [{ ...pluginPrettier, files }]

export default config
