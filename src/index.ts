import type { Linter } from 'eslint';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import pluginJsonc from 'eslint-plugin-jsonc';
import pluginYml from 'eslint-plugin-yml';
import pluginN from 'eslint-plugin-n';
import pluginImportX from 'eslint-plugin-import-x';
import pluginPromise from 'eslint-plugin-promise';
import pluginComments from '@eslint-community/eslint-plugin-eslint-comments';
import pluginSecurity from 'eslint-plugin-security';
import pluginNoCatchAll from 'eslint-plugin-no-catch-all';
import neostandard from 'neostandard';
import pluginPrettier from 'eslint-plugin-prettier/recommended';

const config: Linter.Config[] = [
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...pluginVue.configs['flat/recommended'],
  ...pluginJsonc.configs['flat/recommended-with-jsonc'] as Linter.Config[],
  ...pluginYml.configs['flat/recommended'] as Linter.Config[],
  pluginN.configs['flat/recommended'] as Linter.Config,
  pluginImportX.flatConfigs.recommended as Linter.Config,
  pluginImportX.flatConfigs.typescript as Linter.Config,
  pluginPromise.configs['flat/recommended'] as Linter.Config,
  pluginComments.configs.recommended as Linter.Config,
  pluginSecurity.configs.recommended as Linter.Config,
  {
    plugins: { 'no-catch-all': pluginNoCatchAll },
    rules: { 'no-catch-all/no-catch-all': 'error' },
  },
  ...neostandard() as Linter.Config[],
  {
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  pluginPrettier as Linter.Config,
] as Linter.Config[];

export default config;
