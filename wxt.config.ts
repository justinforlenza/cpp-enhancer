import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: [
    '@wxt-dev/module-solid',
  ],
  webExt: {
    openDevtools: true,
    startUrls: ['https://careerpathways.nyc/'],
  },
  manifest: {
    name: 'Career Pathways Enhancer',
    author: {
      email: 'justin@forlenza.co',
    },
  },
})
