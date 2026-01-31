# eslint-config-it4c

Shared ESLint flat config for IT4Change projects. Provides a comprehensive set of rules for TypeScript, Vue, GraphQL, JSON, YAML, and more.

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

## Installation

```bash
npm install --save-dev eslint eslint-config-it4c
```

## Usage

Create an `eslint.config.js` in your project root:

```js
import config from "eslint-config-it4c";

export default [...config];
```

## Rules

A complete list of all configured rules is available in [RULES.md](RULES.md).

## Scripts

| Script | Description |
| --- | --- |
| `npm run inspect-rules` | Print all rules with their current configuration |
| `npm run inspect-rules:check` | Verify that `rules.json` matches the current config |
| `npm run update-rules` | Regenerate `rules.json` and `RULES.md` |
| `npm run generate-rules-md` | Regenerate `RULES.md` from `rules.json` |
