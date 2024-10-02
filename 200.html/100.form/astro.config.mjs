// @ts-check
import { defineConfig } from 'astro/config'
import node from '@astrojs/node'
import tailwind from '@astrojs/tailwind'
import yaml from '@rollup/plugin-yaml'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [tailwind()],
  vite: {
    plugins: [yaml()],
  },
})
