import type { Linter } from 'eslint'

export const vueFiles = ['**/*.vue']
export const vueAndTsFiles = ['**/*.vue', '**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts']

const isTypescriptEslintConfig = (name: string | undefined): boolean =>
  name?.startsWith('typescript-eslint/') ?? false

// Scopes the config chain returned by `defineConfigWithVueTs`, which is largely unscoped.
// Two different scopes have to come out of it:
//
// - The `typescript-eslint/*` entries carry the @typescript-eslint plugin registration,
//   the core-rule off-switches (`no-unused-vars`, `no-undef`, …) and the TS rule set.
//   They are narrowed to `.vue`, because the `typescript` module owns the TS extensions
//   and configures them more strictly there (strictTypeChecked plus overrides).
//   Narrowing rather than dropping is essential: dropping them left `.vue` with the
//   *core* `no-unused-vars` from `defaultFiles` but without its @typescript-eslint
//   counterpart, which false-positives on type-only parameters, and without the plugin,
//   which turns every `eslint-disable` for a `@typescript-eslint/…` rule into an error.
// - Everything else — vue plugin rules and parser wiring — is scoped to Vue *and* TS
//   files, so rules like @typescript-eslint/no-unused-expressions don't reach JSON etc.
//
// Order within the chain is preserved, so `@vue/typescript/setup` still runs after
// `typescript-eslint/base` and restores `vue-eslint-parser` for `.vue`.
export const scopeVueTsConfigs = (configs: Linter.Config[]): Linter.Config[] =>
  configs.map((cfg) => {
    if (isTypescriptEslintConfig(cfg.name)) return { ...cfg, files: vueFiles }
    return cfg.files ? cfg : { ...cfg, files: vueAndTsFiles }
  })
