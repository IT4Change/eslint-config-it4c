import { defaultFiles as files } from '#src/files'

import type { Linter } from 'eslint'

const config: Linter.Config[] = [
  {
    files,
    rules: {
      'promise/always-return': 'error',
      'promise/avoid-new': 'error',
      'promise/catch-or-return': 'error',
      'promise/no-callback-in-promise': 'warn',
      'promise/no-nesting': 'warn',
      'promise/no-new-statics': 'error',
      'promise/no-promise-in-callback': 'warn',
      'promise/no-return-in-finally': 'warn',
      'promise/no-return-wrap': 'error',
      'promise/param-names': 'error',
      'promise/valid-params': 'warn',
      'promise/no-multiple-resolved': 'error',
      'promise/no-native': 'off',
      'promise/prefer-await-to-callbacks': 'error',
      'promise/prefer-catch': 'error',
      'promise/spec-only': 'error',
    },
  },
]

export default config
