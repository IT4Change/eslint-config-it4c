import { build } from 'esbuild'
import { readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const srcDir = join(__dirname, '..', 'src')
const modulesDir = join(srcDir, 'modules')

// Collect all entry points
const entryPoints = [
  join(srcDir, 'index.ts'),
  join(srcDir, 'prettier.ts'),
  ...readdirSync(modulesDir)
    .filter((f) => f.endsWith('.ts'))
    .map((f) => join(modulesDir, f)),
]

await build({
  entryPoints,
  outdir: 'dist',
  format: 'esm',
  platform: 'node',
  target: 'es2022',
  packages: 'external',
  outExtension: { '.js': '.js' },
})

// eslint-disable-next-line no-console
console.log('Build complete')
