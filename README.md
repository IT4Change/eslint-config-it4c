# eslint-config-it4c

Shared ESLint flat config for IT4Change projects. Provides a modular, comprehensive set of rules for TypeScript, Vue, GraphQL, JSON, YAML, and more.

## Installation

```bash
npm install --save-dev eslint eslint-config-it4c
```

## Usage

### Default Config

The default config includes all base modules (ESLint, TypeScript, Import, Node, Promise, Security, Comments, JSON, YAML, Prettier).

```ts
// eslint.config.ts
import config from 'eslint-config-it4c'

export default [...config]
```

### Default + Optional Modules

Add framework-specific modules as needed:

```ts
// eslint.config.ts
import config, { vue3, jest } from 'eslint-config-it4c'

export default [...config, ...vue3, ...jest]
```

### Custom Configuration (Manual)

Build your own config by selecting only the modules you need:

```ts
// eslint.config.ts
import { eslint, typescript, importX, vue3, prettier } from 'eslint-config-it4c'

export default [...eslint, ...typescript, ...importX, ...vue3, ...prettier]
```

## Modules

### Base Modules (included in default)

| Module | Description |
| --- | --- |
| `eslint` | ESLint recommended rules + `no-console`, `no-void` |
| `typescript` | TypeScript strict type-checked rules |
| `importX` | Import/export rules, sorting, cycle detection |
| `node` | Node.js specific rules (n plugin) |
| `promise` | Promise handling rules |
| `security` | Security-focused rules |
| `comments` | ESLint directive comments rules |
| `json` | JSON/JSONC linting |
| `yaml` | YAML linting |
| `prettier` | Prettier integration |

### Optional Modules

| Module | Description |
| --- | --- |
| `vue3` | Vue 3 + TypeScript support |
| `vue2` | Vue 2 + TypeScript support |
| `vueI18n` | Translation keys (vue-i18n): missing, unused, out of sync between locales, sorted |
| `jest` | Jest testing rules |
| `vitest` | Vitest testing rules |
| `graphql` | GraphQL schema and operations linting |
| `react` | React support (placeholder) |

### `vueI18n`

Checks the translation keys of a vue-i18n project (Nuxt i18n, vue-i18n, or anything calling
`$t('…')` / `t('…')`) against its locale files:

- `no-missing-keys`: the code asks only for keys the locales define,
- `no-missing-keys-in-other-locales`: every locale defines the same keys,
- `no-unused-keys`: no key outlives its last use,
- `jsonc/sort-keys`: the keys are sorted (case-insensitively), `--fix` sorts them.

The locale files are expected as `locales/*.json`, relative to the directory ESLint runs in.
Keys that are only built at runtime (`` t(`category.${slug}`) ``) cannot be seen by the linter;
name those families in `no-unused-keys`' `ignores`:

```ts
// eslint.config.ts
import config, { vueI18n } from 'eslint-config-it4c'

export default [
  ...config,
  ...vueI18n,
  {
    files: ['**/locales/*.json'],
    rules: {
      '@intlify/vue-i18n/no-unused-keys': [
        'error',
        { extensions: ['.js', '.ts', '.vue'], ignores: ['/^category\\./'] },
      ],
    },
  },
]
```

Keeping the locales elsewhere: set `settings['vue-i18n'].localeDir` (a glob) and scope the
override to those files.

## Prettier Config

The package also exports a shared Prettier configuration:

```ts
// prettier.config.ts
import { prettierConfig } from 'eslint-config-it4c'

export default prettierConfig
```

Or via subpath import:

```ts
// prettier.config.ts
import prettierConfig from 'eslint-config-it4c/prettier'

export default prettierConfig
```

### Prettier Settings

| Option | Value |
| --- | --- |
| `semi` | `false` |
| `printWidth` | `100` |
| `singleQuote` | `true` |
| `trailingComma` | `all` |
| `tabWidth` | `2` |
| `bracketSpacing` | `true` |

## Included Plugins

- `@eslint/js` (recommended)
- `@typescript-eslint` (strict)
- `eslint-plugin-vue` (recommended)
- `eslint-plugin-import-x` (TypeScript)
- `eslint-plugin-n`
- `eslint-plugin-promise`
- `eslint-plugin-jest`
- `eslint-plugin-jsonc`
- `eslint-plugin-yml`
- `eslint-plugin-security`
- `eslint-plugin-prettier`
- `@eslint-community/eslint-plugin-eslint-comments`
- `@graphql-eslint/eslint-plugin`
- `@intlify/eslint-plugin-vue-i18n`
- `eslint-plugin-no-catch-all`
- `neostandard`

## Rules

A complete list of all configured rules is available in [RULES.md](RULES.md).

## Scripts

| Script | Description |
| --- | --- |
| `npm run inspect-rules` | Print all rules with their current configuration |
| `npm run inspect-rules:check` | Verify that `rules.json` matches the current config |
| `npm run update-rules` | Regenerate `rules.json` and `RULES.md` |
| `npm run generate-rules-md` | Regenerate `RULES.md` from `rules.json` |

## License

[Apache License 2.0](LICENSE)
