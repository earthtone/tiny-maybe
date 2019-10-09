import resolve from 'rollup-plugin-node-resolve'

export default {
  input: './main.js',
  plugins: [
    resolve({
      mainFields: ['main', 'module']
    })
  ],
  output: [
    { file: 'dist/index.esm.js', format: 'esm', name: 'tiny-maybe' },
    { file: 'dist/index.umd.js', format: 'umd', name: 'tiny-maybe' },
    { file: 'dist/index.unpkg.js', format: 'iife', name: 'Maybe' }
  ]
}
