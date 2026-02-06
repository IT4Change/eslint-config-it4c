import { configs as securityConfigs } from 'eslint-plugin-security'

import type { Linter } from 'eslint'

const config: Linter.Config[] = [securityConfigs.recommended]

export default config
