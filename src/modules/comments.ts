import pluginComments, {
  configs as commentsConfigs,
} from '@eslint-community/eslint-plugin-eslint-comments'

import type { Linter } from 'eslint'

const config: Linter.Config[] = [
  {
    plugins: { '@eslint-community/eslint-comments': pluginComments },
    rules: (commentsConfigs.recommended as { rules: Linter.RulesRecord }).rules,
  },
  {
    rules: {
      '@eslint-community/eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
      '@eslint-community/eslint-comments/no-restricted-disable': 'error',
    },
  },
]

export default config
