// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@primevue/nuxt-module'
  ],
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  primevue: {
    options: {
      theme: {
        preset: Aura
      }
    }
  },
  nitro: {
    preset: 'node',
    output: {
      dir: 'dist',
      serverDir: 'dist/server',
      publicDir: 'dist/public'
    }
  },
  experimental: {
    payloadExtraction: false
  },
  app: {
    buildAssetsDir: '/_nuxt/'
  },
  runtimeConfig: {
    openaiApiKey: process.env.OPENAI_API_KEY
  }
})
