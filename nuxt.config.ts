// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    
  },

  css: [
    '~/main.css',
    '@vuepic/vue-datepicker/dist/main.css',
    'vue-multiselect/dist/vue-multiselect.css',
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  components: [
    { path: '~/components', pathPrefix: false },
  ],

  vite: {
    resolve: {
      dedupe: ['vue'],
    },
  },
  // Added to fix an issue where you would get an error when rendering page after logging in
  build: {
    transpile: ['vue-multiselect'],
  },

  compatibilityDate: '2025-04-14',
});