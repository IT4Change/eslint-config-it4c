import pluginComments, {
  configs as commentsConfigs,
} from '@eslint-community/eslint-plugin-eslint-comments'

import { defaultFiles as files } from '#src/files'

import type { Linter } from 'eslint'

const config: Linter.Config[] = [
  {
    files,
    plugins: { '@eslint-community/eslint-comments': pluginComments },
    rules: (commentsConfigs.recommended as { rules: Linter.RulesRecord }).rules,
  },
  {
    files,
    rules: {
      '@eslint-community/eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
      '@eslint-community/eslint-comments/no-restricted-disable': 'error',
    },
  },
]

export default config
