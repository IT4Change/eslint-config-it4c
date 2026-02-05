import eslintJs from '@eslint/js'

import type { Linter } from 'eslint'

const config: Linter.Config[] = [
  eslintJs.configs.recommended,
  {
    rules: {
      'no-console': 'error',
      'no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'no-void': ['error', { allowAsStatement: true }],
    },
  },
]

export default config
