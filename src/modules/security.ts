import pluginSecurity from 'eslint-plugin-security'

import { defaultFiles as files } from '#src/files'

import type { Linter } from 'eslint'

const config: Linter.Config[] = [{ ...pluginSecurity.configs.recommended, files }]

export default config
