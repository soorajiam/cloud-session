// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
    buildAssetsDir: '/_nuxt/',
    cdnURL: process.env.NUXT_APP_CDN_URL || ''
  },

  modules: [
    '@primevue/nuxt-module'
  ],

  primevue: {
    usePrimeVue: true,
    components: {
      include: ['Button', 'InputText', 'Dialog', 'Dropdown']
    },
    options: {
      ripple: true,
      autoImport: true,
      inputVariant: 'filled',
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',
          darkModeSelector: 'system',
          cssLayer: false
        }
      }
    },
    cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities'
  },

  css: [
    '~/assets/css/main.css',
    'primeicons/primeicons.css'
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  nitro: {
    externals: {
      inline: ['readable-stream']
    }
  },

  // nitro: {
  //   preset: 'cloudflare-pages',
  //   output: {
  //     dir: '.output',
  //     publicDir: '.output/public'
  //   },
  //   replace: {
  //     'process.env.NODE_DEBUG': 'false',
  //     'process.platform': '"browser"'
  //   }
  // },

  // experimental: {
  //   payloadExtraction: false
  // },

  runtimeConfig: {
    openaiApiKey: process.env.OPENAI_API_KEY
  },

  compatibilityDate: '2024-11-01'
})
