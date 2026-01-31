/* eslint-disable no-console, import-x/no-relative-parent-imports */
import { builtinRules } from "eslint/use-at-your-own-risk";

import config from "../src/index";

import type { Linter } from "eslint";

interface RuleEntry {
  enabled: boolean;
  severity: string | number;
  options?: unknown[];
}

// Collect all available rules from built-in and plugins
const availableRules = new Set<string>();

for (const [name] of builtinRules) {
  availableRules.add(name);
}

for (const entry of config) {
  if (entry.plugins) {
    for (const [prefix, plugin] of Object.entries(entry.plugins)) {
      if (plugin?.rules) {
        for (const name of Object.keys(plugin.rules)) {
          availableRules.add(`${prefix}/${name}`);
        }
      }
    }
  }
}

// Collect all configured rules from config entries
const configuredRules = new Map<string, Linter.RuleEntry>();
for (const entry of config) {
  if (entry.rules) {
    for (const [name, value] of Object.entries(entry.rules)) {
      if (value !== undefined) {
        configuredRules.set(name, value);
      }
    }
  }
}

// Build result
const result = new Map<string, RuleEntry>();
for (const name of [...availableRules].sort((a, b) => a.localeCompare(b))) {
  const setting = configuredRules.get(name);
  const severity = Array.isArray(setting) ? setting[0] : setting;

  const enabled =
    severity !== undefined && severity !== "off" && severity !== 0;

  result.set(name, {
    enabled,
    severity: severity ?? "off",
    ...(Array.isArray(setting) && setting.length > 1
      ? { options: setting.slice(1) }
      : {}),
  });
}

console.log(JSON.stringify(Object.fromEntries(result), null, 2));
