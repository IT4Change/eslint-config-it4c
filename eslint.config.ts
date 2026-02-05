// eslint-disable-next-line n/file-extension-in-import
import config from './dist/index.js'

import type { Linter } from 'eslint'

export default [
  ...config,
  { ignores: ['rules.json'] },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: [
            'scripts/generate-rules-md.ts',
            'scripts/inspect-rules.ts',
            'eslint.config.ts',
            'prettier.config.ts',
          ],
        },
      },
    },
  },
] satisfies Linter.Config[]
