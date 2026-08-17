import config from './src/index'

import type { Linter } from 'eslint'

// annotated rather than `satisfies`: the inferred type references a type that
// cannot be named portably, which breaks declaration emit (TS2883)
const eslintConfig: Linter.Config[] = [...config, { ignores: ['rules.json'] }]

export default eslintConfig
