import pluginVitest from 'eslint-plugin-vitest'

import type { Linter } from 'eslint'

const config: Linter.Config[] = [
  {
    files: ['**/*.test.ts', '**/*.test.js', '**/*.spec.ts', '**/*.spec.js'],
    plugins: {
      vitest: pluginVitest,
    },
    rules: {
      ...(pluginVitest.configs.recommended.rules as Linter.RulesRecord),
      ...(pluginVitest.configs.all.rules as Linter.RulesRecord),
      // allow beforeEach, afterEach, etc. in tests
      'vitest/no-hooks': 'off',
    },
  },
]

export default config
