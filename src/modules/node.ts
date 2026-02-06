import type { Linter } from 'eslint'

const config: Linter.Config[] = [
  {
    rules: {
      'n/exports-style': 'error',
      'n/file-extension-in-import': ['error', 'never'],
      'n/global-require': 'error',
      'n/no-callback-literal': 'error',
      'n/no-extraneous-import': 'off',
      'n/no-hide-core-modules': 'error',
      'n/no-missing-import': 'off',
      'n/no-mixed-requires': 'error',
      'n/no-new-require': 'error',
      'n/no-path-concat': 'error',
      'n/no-process-env': 'error',
      'n/no-restricted-import': 'error',
      'n/no-restricted-require': 'error',
      'n/no-sync': 'error',
      'n/no-unpublished-import': 'error',
      'n/no-unpublished-require': 'error',
      'n/prefer-global/buffer': 'error',
      'n/prefer-global/console': 'error',
      'n/prefer-global/process': 'error',
      'n/prefer-global/text-decoder': 'error',
      'n/prefer-global/text-encoder': 'error',
      'n/prefer-global/url': 'error',
      'n/prefer-global/url-search-params': 'error',
      'n/prefer-node-protocol': 'error',
      'n/prefer-promises/dns': 'error',
      'n/prefer-promises/fs': 'error',
      'n/shebang': 'error',
    },
  },
  {
    files: ['*.config.{js,mjs,cjs,ts,mts,cts}'],
    rules: {
      'n/no-unpublished-import': 'off',
    },
  },
]

export default config
