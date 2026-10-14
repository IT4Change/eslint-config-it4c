import vueI18nPlugin from '@intlify/eslint-plugin-vue-i18n'
import { configs as jsoncConfigs } from 'eslint-plugin-jsonc'

import { defaultFiles } from '#src/files'

import type { Linter } from 'eslint'

// The locale files, by the convention of Nuxt i18n and vue-i18n projects: one JSON file per
// language in a `locales/` directory. A project keeping them elsewhere sets
// `settings['vue-i18n'].localeDir` and scopes its own override to those files.
const localeFiles = ['**/locales/*.json']

// Integrity of the translation keys, not of the messages' wording: that the code asks only for
// keys the locales define, that every locale defines the same keys, and that no key outlives its
// last use. Message syntax and raw text are left out — they depend on the i18n library and on how
// far a project is with extracting its texts.
const config: Linter.Config[] = [
  {
    plugins: {
      '@intlify/vue-i18n': vueI18nPlugin as unknown as Record<string, unknown>,
    },
    settings: {
      // Relative to the directory ESLint runs in.
      'vue-i18n': { localeDir: './locales/*.json' },
    },
  },
  {
    files: defaultFiles,
    rules: {
      // A key built at runtime cannot be checked; no-unused-keys' `ignores` names such families.
      '@intlify/vue-i18n/no-missing-keys': 'error',
    },
  },
  // The JSON parser, so the module works without the `json` module as well.
  ...jsoncConfigs['flat/base'].map((entry) => ({ ...entry, files: localeFiles })),
  {
    files: localeFiles,
    rules: {
      '@intlify/vue-i18n/no-missing-keys-in-other-locales': 'error',
      '@intlify/vue-i18n/no-duplicate-keys-in-locale': 'error',
      // Keys only built at runtime (`${prefix}.${suffix}`) look unused; a project lists those
      // families in the rule's `ignores`.
      '@intlify/vue-i18n/no-unused-keys': [
        'error',
        { extensions: ['.js', '.mjs', '.cjs', '.ts', '.mts', '.cts', '.jsx', '.tsx', '.vue'] },
      ],
      // One order for every locale, so a key sits on the same line in each and a diff between
      // two of them shows only what differs. `--fix` sorts.
      'jsonc/sort-keys': [
        'error',
        { pathPattern: '.*', order: { type: 'asc', caseSensitive: false, natural: false } },
      ],
      // Typography in translations: French puts a no-break space before `:`, `?` and `!`.
      'no-irregular-whitespace': 'off',
    },
  },
]

export default config
