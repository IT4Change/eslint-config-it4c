// eslint-disable-next-line import-x/no-deprecated -- no stable alternative for flat config
import { builtinRules } from 'eslint/use-at-your-own-risk'

import config, { vue2, vue3, jest, vitest, graphql, react } from '#src/index'

import type { Linter } from 'eslint'

// Combine default config with all optional modules
const allConfigs: Linter.Config[] = [
  ...config,
  ...vue2,
  ...vue3,
  ...jest,
  ...vitest,
  ...graphql,
  ...react,
]

interface RuleException {
  files: string[]
  severity: string | number
  options?: unknown[]
}

interface RuleEntry {
  enabled: boolean
  severity: string | number
  options?: unknown[]
  exceptions?: RuleException[]
}

// Collect all available rules from built-in and plugins
const availableRules = new Set<string>()

// eslint-disable-next-line import-x/no-deprecated -- no stable alternative for flat config
for (const [name] of builtinRules) {
  availableRules.add(name)
}

for (const entry of allConfigs) {
  const plugins = entry.plugins as Record<string, { rules?: Record<string, unknown> }> | undefined
  if (plugins) {
    for (const [prefix, plugin] of Object.entries(plugins)) {
      if (plugin.rules) {
        for (const name of Object.keys(plugin.rules)) {
          availableRules.add(`${prefix}/${name}`)
        }
      }
    }
  }
}

// Collect all configured rules from config entries
// Separate global rules (no files) from file-specific exceptions
const globalRules = new Map<string, Linter.RuleEntry>()
const fileSpecificRules = new Map<string, Array<{ files: string[]; setting: Linter.RuleEntry }>>()

for (const entry of allConfigs) {
  const rules = entry.rules as Record<string, Linter.RuleEntry> | undefined
  if (!rules) continue

  const files = entry.files as string[] | undefined

  for (const [name, value] of Object.entries(rules)) {
    if (!files) {
      // Global rule (no files restriction)
      globalRules.set(name, value)
    } else {
      // File-specific rule
      const existing = fileSpecificRules.get(name) ?? []
      existing.push({ files, setting: value })
      fileSpecificRules.set(name, existing)
    }
  }
}

// Helper to extract severity from rule setting
const getSeverity = (setting: Linter.RuleEntry | undefined): string | number =>
  setting === undefined ? 'off' : Array.isArray(setting) ? setting[0] : setting

// Helper to extract options from rule setting
const getOptions = (setting: Linter.RuleEntry): unknown[] | undefined =>
  Array.isArray(setting) && setting.length > 1 ? setting.slice(1) : undefined

// Build result
const result = new Map<string, RuleEntry>()
for (const name of [...availableRules].sort((a, b) => a.localeCompare(b))) {
  const globalSetting = globalRules.get(name)
  const fileSpecific = fileSpecificRules.get(name)

  const severity = getSeverity(globalSetting)
  const enabled = severity !== 'off' && severity !== 0

  const entry: RuleEntry = {
    enabled,
    severity,
  }

  const options = globalSetting ? getOptions(globalSetting) : undefined
  if (options) {
    entry.options = options
  }

  // Add exceptions where file-specific severity differs from global
  if (fileSpecific) {
    const exceptions: RuleException[] = []
    for (const { files, setting } of fileSpecific) {
      const fileSeverity = getSeverity(setting)
      if (fileSeverity !== severity) {
        const exception: RuleException = {
          files,
          severity: fileSeverity,
        }
        const fileOptions = getOptions(setting)
        if (fileOptions) {
          exception.options = fileOptions
        }
        exceptions.push(exception)
      }
    }
    if (exceptions.length > 0) {
      entry.exceptions = exceptions
    }
  }

  result.set(name, entry)
}

// eslint-disable-next-line no-console
console.log(JSON.stringify(Object.fromEntries(result), null, 2))
