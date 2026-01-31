import type { Linter } from 'eslint';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import pluginJsonc from 'eslint-plugin-jsonc';
import pluginYml from 'eslint-plugin-yml';
import pluginN from 'eslint-plugin-n';
import pluginImportX from 'eslint-plugin-import-x';
import pluginPromise from 'eslint-plugin-promise';
import neostandard from 'neostandard';
import pluginPrettier from 'eslint-plugin-prettier/recommended';

const config: Linter.Config[] = [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  ...pluginJsonc.configs['flat/recommended-with-jsonc'] as Linter.Config[],
  ...pluginYml.configs['flat/recommended'] as Linter.Config[],
  pluginN.configs['flat/recommended'] as Linter.Config,
  pluginImportX.flatConfigs.recommended as Linter.Config,
  pluginImportX.flatConfigs.typescript as Linter.Config,
  pluginPromise.configs['flat/recommended'] as Linter.Config,
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
