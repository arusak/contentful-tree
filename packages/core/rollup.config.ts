import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import typescript from '@rollup/plugin-typescript'
import * as dotenv from 'dotenv'

dotenv.config({
  path: '../../.env',
})

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm',
    name: 'contentful-web-core',
    sourcemap: true,
    preserveModules: true,
    preserveModulesRoot: 'src',
  },
  external: ['react', 'contentful'],
  plugins: [
    resolve(),
    typescript({
      tsconfig: './tsconfig.json',
    }),
    replace({
      preventAssignment: true,
      values: {
        'process.env.CONTENTFUL_SPACE_ID': JSON.stringify(process.env.CONTENTFUL_SPACE_ID),
        'process.env.CONTENTFUL_ACCESS_TOKEN': JSON.stringify(process.env.CONTENTFUL_ACCESS_TOKEN),
        'process.env.CONTENTFUL_ENVIRONMENT': JSON.stringify(process.env.CONTENTFUL_ENVIRONMENT || 'master'),
      },
    }),
  ],
}
