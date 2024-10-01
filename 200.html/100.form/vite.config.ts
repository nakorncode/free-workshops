import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import devServer from '@hono/vite-dev-server'

export default defineConfig({
  plugins: [
    UnoCSS(),
    devServer({
      entry: 'src/index.tsx',
    }),
  ],
})
