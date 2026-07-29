import eslintJs from '@eslint/js'
import pluginNoCatchAll from 'eslint-plugin-no-catch-all'
import globals from 'globals'

import { defaultFiles as files } from '#src/files'

import type { Linter } from 'eslint'

const config: Linter.Config[] = [
  { ...eslintJs.configs.recommended, files },
  {
    files,
    // `no-undef` is active for plain JS, so the environment-neutral globals
    // (console, URL, setTimeout, …) have to be declared. ES builtins are added
    // by ESLint itself via `ecmaVersion`. Node-specific globals live in the
    // `node` module, browser-specific ones in the `vue2`/`vue3` modules.
    languageOptions: { globals: globals['shared-node-browser'] },
    plugins: { 'no-catch-all': pluginNoCatchAll },
    rules: {
      'no-catch-all/no-catch-all': 'error',
      'no-console': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-void': ['error', { allowAsStatement: true }],
      // Correctness rules previously inherited from neostandard via the import-x module
      'accessor-pairs': ['error', { setWithoutGet: true, enforceForClassMembers: true }],
      'array-callback-return': ['error', { allowImplicit: false, checkForEach: false }],
      camelcase: ['error', { allow: ['^UNSAFE_'], properties: 'never', ignoreGlobals: true }],
      curly: ['error', 'multi-line'],
      'default-case-last': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'new-cap': ['error', { newIsCap: true, capIsNew: false, properties: true }],
      'no-caller': 'error',
      'no-eval': 'error',
      'no-extend-native': 'error',
      'no-extra-bind': 'error',
      'no-iterator': 'error',
      'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
      'no-lone-blocks': 'error',
      'no-multi-str': 'error',
      'no-new': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-object-constructor': 'error',
      'no-octal-escape': 'error',
      'no-proto': 'error',
      'no-return-assign': ['error', 'except-parens'],
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-template-curly-in-string': 'error',
      'no-undef-init': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unneeded-ternary': ['error', { defaultAssignment: false }],
      'no-unreachable-loop': 'error',
      'no-useless-call': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-rename': 'error',
      'no-useless-return': 'error',
      'object-shorthand': ['warn', 'properties'],
      'one-var': ['error', { initialized: 'never' }],
      'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
      'symbol-description': 'error',
      'unicode-bom': ['error', 'never'],
      yoda: ['error', 'never'],
      // Rules with @typescript-eslint counterparts: the typescript module turns these
      // core versions off for TS files, so they only take effect on plain JS.
      'no-array-constructor': 'error',
      'no-implied-eval': 'error',
      'no-throw-literal': 'error',
      'no-unused-expressions': [
        'error',
        { allowShortCircuit: true, allowTernary: true, allowTaggedTemplates: true },
      ],
      'no-use-before-define': [
        'error',
        { classes: false, functions: false, variables: false, allowNamedExports: false },
      ],
      'no-useless-constructor': 'error',
      'no-var': 'warn',
      'prefer-const': ['error', { destructuring: 'all', ignoreReadBeforeAssign: false }],
      'prefer-promise-reject-errors': ['error', { allowEmptyReject: false }],
    },
  },
]

export default config
