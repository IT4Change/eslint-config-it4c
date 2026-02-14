import css from '@eslint/css'

import type { Linter } from 'eslint'

const config: Linter.Config[] = [
  {
    ...css.configs.recommended,
    files: ['**/*.css'],
    plugins: { css: css as unknown as Record<string, unknown> },
    language: 'css/css',
  },
]

export default config
