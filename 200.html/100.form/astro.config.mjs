// @ts-check
import { defineConfig } from 'astro/config'
import node from '@astrojs/node'
import tailwind from '@astrojs/tailwind'
import yaml from '@rollup/plugin-yaml'

import icon from 'astro-icon'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [tailwind(), icon()],
  vite: {
    plugins: [yaml()],
  },
})
