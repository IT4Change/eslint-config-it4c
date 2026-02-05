import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const modulesDir = resolve(__dirname, 'src/modules')
// eslint-disable-next-line n/no-sync
const moduleEntries = readdirSync(modulesDir)
  .filter((f) => f.endsWith('.ts'))
  .reduce<Record<string, string>>((acc, f) => {
    const name = f.replace('.ts', '')
    acc[`modules/${name}`] = resolve(modulesDir, f)
    return acc
  }, {})

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        prettier: resolve(__dirname, 'src/prettier.ts'),
        ...moduleEntries,
      },
      formats: ['es'],
      fileName: (_, entryName) => `${entryName}.js`,
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
})
