import { flatConfigs as importXFlatConfigs } from 'eslint-plugin-import-x'

import { defaultFiles as files } from '#src/files'

import type { Linter } from 'eslint'

const config: Linter.Config[] = [
  // registers the `import-x` plugin itself, keeping this module self-contained
  { ...importXFlatConfigs.typescript, files },
  {
    files,
    rules: {
      'import-x/export': 'error',
      'import-x/no-empty-named-blocks': 'error',
      'import-x/no-extraneous-dependencies': 'error',
      'import-x/no-mutable-exports': 'error',
      // Off for two reasons: the rule is a no-op under ESLint 10 (FileEnumerator API
      // removed) and prints a notice on every run, and it never did anything here
      // anyway — it needs `unusedExports` or `missingExports` to check something.
      // Enabling it meaningfully is a separate decision, not a side effect of an upgrade.
      'import-x/no-unused-modules': 'off',
      'import-x/no-named-as-default': 'error',
      'import-x/no-named-as-default-member': 'error',
      'import-x/no-amd': 'error',
      'import-x/no-commonjs': 'error',
      'import-x/no-import-module-exports': 'error',
      'import-x/no-nodejs-modules': 'off',
      'import-x/unambiguous': 'off',
      'import-x/default': 'error',
      'import-x/named': 'off',
      'import-x/namespace': 'error',
      'import-x/no-absolute-path': 'error',
      'import-x/no-cycle': 'error',
      'import-x/no-dynamic-require': 'error',
      'import-x/no-internal-modules': 'off',
      'import-x/no-relative-packages': 'error',
      'import-x/no-relative-parent-imports': ['error', { ignore: ['^#'] }],
      'import-x/no-self-import': 'error',
      'import-x/no-unresolved': 'error',
      'import-x/no-useless-path-segments': 'error',
      'import-x/no-webpack-loader-syntax': 'error',
      'import-x/consistent-type-specifier-style': 'error',
      'import-x/exports-last': 'off',
      'import-x/extensions': ['error', 'never', { json: 'always' }],
      'import-x/first': 'error',
      'import-x/group-exports': 'off',
      'import-x/newline-after-import': 'error',
      'import-x/no-anonymous-default-export': 'off',
      'import-x/no-default-export': 'off',
      'import-x/no-duplicates': 'error',
      'import-x/no-named-default': 'error',
      'import-x/no-namespace': 'error',
      'import-x/no-unassigned-import': [
        'error',
        {
          allow: ['**/*.css', '**/*.scss'],
        },
      ],
      'import-x/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          pathGroups: [
            {
              pattern: '#**',
              group: 'external',
              position: 'after',
            },
          ],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          distinctGroup: true,
        },
      ],
      'import-x/no-deprecated': 'error',
      'import-x/prefer-default-export': 'off',
    },
  },
]

export default config
