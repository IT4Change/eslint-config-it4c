import { ESLint } from 'eslint'
// eslint-disable-next-line import-x/no-deprecated -- no stable alternative for flat config
import { builtinRules } from 'eslint/use-at-your-own-risk'

import config, { css, vue2, vue3, jest, vitest, graphql, react } from '#src/index'

import type { Linter } from 'eslint'

// Combine default config with all optional modules
const allConfigs: Linter.Config[] = [
  ...config,
  ...css,
  ...vue2,
  ...vue3,
  ...jest,
  ...vitest,
  ...graphql,
  ...react,
]

// One representative path per module so no rule stays invisible for lack of a matching
// file type. Order matters: it breaks ties when picking the base severity below.
const probes = [
  { label: 'js', path: 'probe.js' },
  { label: 'ts', path: 'probe.ts' },
  { label: 'vue', path: 'probe.vue' },
  { label: 'spec.ts', path: 'probe.spec.ts' },
  { label: 'json', path: 'probe.json' },
  { label: 'yml', path: 'probe.yml' },
  { label: 'css', path: 'probe.css' },
  { label: 'graphql', path: 'probe.graphql' },
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
  if (!plugins) continue

  for (const [prefix, plugin] of Object.entries(plugins)) {
    if (!plugin.rules) continue
    for (const name of Object.keys(plugin.rules)) {
      availableRules.add(`${prefix}/${name}`)
    }
  }
}

// Resolve the effective config per probe. Reimplementing the flat-config cascade by hand
// is not possible from the raw entries: a rule's value depends on which globs match the
// file, so neither the first nor the last occurrence is generally the winning one. ESLint
// does the merging itself here.
const eslint = new ESLint({
  overrideConfigFile: true,
  overrideConfig: allConfigs as ESLint.Options['overrideConfig'],
})

// Keyed as a Map rather than the plain RulesRecord so rule names stay safe lookup keys
const resolved = new Map<string, Map<string, Linter.RuleEntry>>()
for (const { label, path } of probes) {
  const cfg = (await eslint.calculateConfigForFile(path)) as { rules?: Linter.RulesRecord }
  resolved.set(label, new Map(Object.entries(cfg.rules ?? {})))
}

const severityNames = new Map<number, string>([
  [0, 'off'],
  [1, 'warn'],
  [2, 'error'],
])

const normalizeSeverity = (value: Linter.RuleSeverity): string | number =>
  typeof value === 'number' ? (severityNames.get(value) ?? value) : value

// Effective setting of a rule for one probe, or undefined when the rule is not registered
// there (its plugin is not part of that file type's config at all).
const settingFor = (
  label: string,
  name: string,
): { severity: string | number; options?: unknown[] } | undefined => {
  const value = resolved.get(label)?.get(name)
  if (value === undefined) return undefined
  if (Array.isArray(value)) {
    const [severity, ...options] = value
    return {
      severity: normalizeSeverity(severity),
      ...(options.length > 0 ? { options } : {}),
    }
  }
  return { severity: normalizeSeverity(value) }
}

const isEnabled = (severity: string | number): boolean => severity !== 'off' && severity !== 0

// Build result
const result = new Map<string, RuleEntry>()
for (const name of [...availableRules].sort((a, b) => a.localeCompare(b))) {
  // Probes where the rule is not registered say nothing about it and are left out, so a
  // TypeScript-only rule is not diluted to `off` by the JSON and YAML probes.
  const settings = probes
    .map(({ label }) => ({ label, setting: settingFor(label, name) }))
    .filter(
      (
        probe,
      ): probe is { label: string; setting: { severity: string | number; options?: unknown[] } } =>
        Boolean(probe.setting),
    )

  if (settings.length === 0) {
    result.set(name, { enabled: false, severity: 'off' })
    continue
  }

  // Group probes by identical setting; the largest group is the base, the rest deviate.
  // Ties fall to the group whose first probe comes earliest, keeping output stable.
  const groups = new Map<
    string,
    { labels: string[]; severity: string | number; options?: unknown[] }
  >()
  for (const { label, setting } of settings) {
    const key = JSON.stringify([setting.severity, setting.options ?? null])
    const group = groups.get(key)
    if (group) {
      group.labels.push(label)
    } else {
      groups.set(key, {
        labels: [label],
        severity: setting.severity,
        ...(setting.options ? { options: setting.options } : {}),
      })
    }
  }

  const [base, ...deviations] = [...groups.values()].sort(
    (a, b) => b.labels.length - a.labels.length,
  )

  const entry: RuleEntry = {
    enabled: settings.some(({ setting }) => isEnabled(setting.severity)),
    severity: base.severity,
  }
  if (base.options) {
    entry.options = base.options
  }
  // Only annotate the scope when the base does not hold for every probe
  if (base.labels.length !== probes.length) {
    entry.files = base.labels
  }
  if (deviations.length > 0) {
    entry.exceptions = deviations.map((group) => ({
      files: group.labels,
      severity: group.severity,
      ...(group.options ? { options: group.options } : {}),
    }))
  }

  result.set(name, entry)
}

// eslint-disable-next-line no-console
console.log(JSON.stringify(Object.fromEntries(result), null, 2))
