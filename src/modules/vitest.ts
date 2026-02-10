import pluginVitest from '@vitest/eslint-plugin'

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
      // requiring expect.assertions() or expect.hasAssertions() in every test is too strict
      'vitest/prefer-expect-assertions': 'off',
      // enforce *.spec.ts/js naming convention
      'vitest/consistent-test-filename': ['error', { pattern: '.*\\.spec\\.[tj]sx?$' }],
    },
  },
]

export default config
