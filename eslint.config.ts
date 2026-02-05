import config from './src/index'

import type { Linter } from 'eslint'

export default [...config, { ignores: ['rules.json'] }] satisfies Linter.Config[]
