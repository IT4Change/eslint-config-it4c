// Base modules (included in default config)
import { defaultFiles } from './files'
import comments from './modules/comments'
import css from './modules/css'
import eslint from './modules/eslint'
import graphql from './modules/graphql'
import importX from './modules/import-x'
import jest from './modules/jest'
import json from './modules/json'
import node from './modules/node'
import prettier from './modules/prettier'
import promise from './modules/promise'
import react from './modules/react'
import security from './modules/security'
import typescript from './modules/typescript'
import vitest from './modules/vitest'
import vue2 from './modules/vue2'
import vue3 from './modules/vue3'
import yaml from './modules/yaml'

import type { Linter } from 'eslint'

export { defaultFiles } from './files'

// Export all modules individually
export {
  // Base modules
  comments,
  eslint,
  importX,
  json,
  node,
  prettier,
  promise,
  security,
  typescript,
  yaml,
  // Optional modules
  css,
  graphql,
  jest,
  react,
  vitest,
  vue2,
  vue3,
}

// Default config: Base modules combined
const config: Linter.Config[] = [
  { ignores: ['dist/'] },
  ...eslint,
  ...typescript,
  ...importX,
  ...node,
  ...promise,
  ...security,
  ...comments,
  ...json,
  ...yaml,
  ...prettier,
  // Has to come after the prettier module. eslint-config-prettier disables `curly`
  // defensively because the `multi-line` and `multi-or-nest` options conflict with
  // Prettier's line wrapping — a statement Prettier wraps is one those options then
  // reject. `all` has no such dependency on line length and is the option its README
  // names as safe, so it is re-applied here instead of being silently dropped.
  {
    files: defaultFiles,
    rules: { curly: ['error', 'all'] },
  },
]

export default config
