import type { Linter } from 'eslint'

// React module - requires eslint-plugin-react to be installed
// This is a placeholder that can be extended with React-specific rules
const config: Linter.Config[] = [
  {
    files: ['**/*.jsx', '**/*.tsx'],
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]

export default config
