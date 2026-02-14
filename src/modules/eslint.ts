import eslintJs from '@eslint/js'

import type { Linter } from 'eslint'

import { defaultFiles as files } from '../files'

const config: Linter.Config[] = [
  { ...eslintJs.configs.recommended, files },
  {
    files,
    rules: {
      'no-console': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-void': ['error', { allowAsStatement: true }],
    },
  },
]

export default config
