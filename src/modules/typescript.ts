import pluginNoCatchAll from 'eslint-plugin-no-catch-all'
import tseslint from 'typescript-eslint'

import type { Linter } from 'eslint'

const config: Linter.Config[] = [
  {
    plugins: { 'no-catch-all': pluginNoCatchAll },
    rules: { 'no-catch-all/no-catch-all': 'error' },
  },
  // eslint-disable-next-line import-x/no-named-as-default-member
  ...(tseslint.configs.strictTypeChecked as Linter.Config[]).map((cfg) => ({
    ...cfg,
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
  })),
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
    rules: {
      '@typescript-eslint/no-deprecated': 'off', // duplicate of import-x/no-deprecated
      '@typescript-eslint/consistent-type-definitions': 'error',
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/method-signature-style': 'error',
      '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }],
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-loop-func': 'error',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-unnecessary-qualifier': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-use-before-define': 'error',
      '@typescript-eslint/no-useless-empty-export': 'error',
      '@typescript-eslint/prefer-find': 'error',
      '@typescript-eslint/prefer-for-of': 'error',
      '@typescript-eslint/prefer-includes': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/prefer-regexp-exec': 'error',
      '@typescript-eslint/prefer-string-starts-ends-with': 'error',
      '@typescript-eslint/promise-function-async': 'error',
      '@typescript-eslint/require-array-sort-compare': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      'no-loop-func': 'off',
      'no-shadow': 'off',
      'no-use-before-define': 'off',
    },
  },
]

export default config
