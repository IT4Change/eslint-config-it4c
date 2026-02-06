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
  files?: string[]
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

  let severity: string | number
  let options: unknown[] | undefined
  let exceptions: RuleException[] | undefined

  if (globalSetting !== undefined) {
    // Has global rule - use it as base, file-specific as exceptions
    severity = getSeverity(globalSetting)
    options = getOptions(globalSetting)

    if (fileSpecific) {
      const excs: RuleException[] = []
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
          excs.push(exception)
        }
      }
      if (excs.length > 0) {
        exceptions = excs
      }
    }
  } else if (fileSpecific && fileSpecific.length > 0) {
    // No global rule, only file-specific - treat file-specific as enabled with files restriction
    // Use the first file-specific rule as the primary definition
    const primary = fileSpecific[0]
    severity = getSeverity(primary.setting)
    options = getOptions(primary.setting)

    // The files restriction is part of the main entry, not an exception
    const entry: RuleEntry = {
      enabled: severity !== 'off' && severity !== 0,
      severity,
      files: primary.files,
    }
    if (options) {
      entry.options = options
    }

    // Additional file-specific rules with different config become exceptions
    if (fileSpecific.length > 1) {
      const excs: RuleException[] = []
      for (let i = 1; i < fileSpecific.length; i++) {
        // eslint-disable-next-line security/detect-object-injection -- index is controlled by loop
        const { files, setting } = fileSpecific[i]
        const fileSeverity = getSeverity(setting)
        const exception: RuleException = {
          files,
          severity: fileSeverity,
        }
        const fileOptions = getOptions(setting)
        if (fileOptions) {
          exception.options = fileOptions
        }
        excs.push(exception)
      }
      if (excs.length > 0) {
        entry.exceptions = excs
      }
    }

    result.set(name, entry)
    continue
  } else {
    severity = 'off'
  }

  const enabled = severity !== 'off' && severity !== 0

  const entry: RuleEntry = {
    enabled,
    severity,
  }

  if (options) {
    entry.options = options
  }
  if (exceptions) {
    entry.exceptions = exceptions
  }

  result.set(name, entry)
}

// eslint-disable-next-line no-console
console.log(JSON.stringify(Object.fromEntries(result), null, 2))
