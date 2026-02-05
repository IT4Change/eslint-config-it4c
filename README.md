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
| `jest` | Jest testing rules |
| `graphql` | GraphQL schema and operations linting |
| `react` | React support (placeholder) |

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
