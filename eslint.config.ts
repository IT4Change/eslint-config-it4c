import config from './src/index'

import type { Linter } from 'eslint'

export default [
  ...config,
  { ignores: ['rules.json'] },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
] satisfies Linter.Config[]
