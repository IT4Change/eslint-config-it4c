import { readdir } from 'node:fs/promises'
import { resolve } from 'node:path'

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const modulesDir = resolve(__dirname, 'src/modules')

export default defineConfig(async () => {
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
          /^@typescript-eslint/,
          /^eslint/,
          /^neostandard/,
          /^typescript-eslint/,
          /^prettier$/,
        ],
      },
      outDir: 'dist',
      emptyOutDir: true,
    },
    plugins: [
      dts({
        include: ['src/**/*.ts'],
        outDir: 'dist',
        entryRoot: 'src',
        tsconfigPath: './tsconfig.json',
      }),
    ],
  }
})
