import graphqlPlugin, { configs as graphqlConfigs } from '@graphql-eslint/eslint-plugin'

import type { Linter } from 'eslint'

const config: Linter.Config[] = [
  {
    files: ['**/*.graphql'],
    plugins: {
      '@graphql-eslint': graphqlPlugin as unknown as Record<string, unknown>,
    },
    ...graphqlConfigs['flat/schema-recommended'],
  } as Linter.Config,
  {
    files: ['**/*.graphql'],
    ...graphqlConfigs['flat/operations-recommended'],
  } as Linter.Config,
  {
    files: ['**/*.graphql'],
    rules: {
      '@graphql-eslint/description-style': ['error', { style: 'inline' }],
    },
  },
]

export default config
