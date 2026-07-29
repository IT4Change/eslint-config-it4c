import pluginJest from 'eslint-plugin-jest'

import type { Linter } from 'eslint'

const config: Linter.Config[] = [
  {
    ...pluginJest.configs['flat/recommended'],
    files: ['**/*.test.ts', '**/*.test.js', '**/*.spec.ts', '**/*.spec.js'],
  },
  {
    files: ['**/*.test.ts', '**/*.test.js', '**/*.spec.ts', '**/*.spec.js'],
    rules: {
      'jest/prefer-to-have-length': 'error',
      'jest/unbound-method': 'error',
    },
  },
]

export default config
