import type { Config } from 'prettier'

export const prettierConfig: Config = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  // trailingComma: "all",
  // bracketSpacing: true,
  // bracketSameLine: false,
  // arrowParens: "always",
  endOfLine: 'auto',
  // quoteProps: "as-needed",
  vueIndentScriptAndStyle: true,
}

export default prettierConfig
