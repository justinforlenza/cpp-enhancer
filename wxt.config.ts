import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
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
