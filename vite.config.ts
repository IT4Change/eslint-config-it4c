import { readdir } from 'node:fs/promises'
import { resolve } from 'node:path'

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths'

import type { UserConfig } from 'vite'

const modulesDir = resolve(__dirname, 'src/modules')

export default defineConfig(async (): Promise<UserConfig> => {
  const files = await readdir(modulesDir)
  const moduleEntries = files
    .filter((f) => f.endsWith('.ts'))
    .reduce<Record<string, string>>((acc, f) => {
      const name = f.replace('.ts', '')
      acc[`modules/${name}`] = resolve(modulesDir, f)
      return acc
    }, {})

  return {
    build: {
      lib: {
        entry: {
          index: resolve(__dirname, 'src/index.ts'),
          prettier: resolve(__dirname, 'src/prettier.ts'),
          ...moduleEntries,
        },
        formats: ['es'],
        fileName: (_: string, entryName: string) => `${entryName}.js`,
      },
      rollupOptions: {
        external: [
          /^@eslint/,
          /^@eslint-community/,
          /^@graphql-eslint/,
          /^@vue/,
          /^@vitest/,
          /^@typescript-eslint/,
          /^eslint/,
          /^globals$/,
          /^typescript-eslint/,
          /^prettier$/,
        ],
      },
      outDir: 'dist',
      emptyOutDir: true,
    },
    plugins: [
      tsconfigPaths(),
      dts({
        include: ['src/**/*.ts'],
        outDirs: 'dist',
        entryRoot: 'src',
        tsconfigPath: './tsconfig.json',
      }),
    ],
  }
})
