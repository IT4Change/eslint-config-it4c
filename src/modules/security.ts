import pluginSecurity from 'eslint-plugin-security'

import type { Linter } from 'eslint'

import { defaultFiles as files } from '../files'

// eslint-disable-next-line import-x/no-named-as-default-member -- no named export available
const config: Linter.Config[] = [{ ...pluginSecurity.configs.recommended, files }]

export default config
