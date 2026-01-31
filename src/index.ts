import type { Linter } from 'eslint';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import pluginJsonc from 'eslint-plugin-jsonc';
import prettier from 'eslint-config-prettier';

const config: Linter.Config[] = [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  ...pluginJsonc.configs['flat/recommended-with-jsonc'] as Linter.Config[],
  {
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  prettier,
] as Linter.Config[];

export default config;
