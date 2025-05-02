// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    AUTH0_CLIENT_ID: '',
    AUTH0_CLIENT_SECRET: '',
    AUTH0_BASE_URL: 'http://localhost:3000',
    AUTH0_ISSUER_BASE_URL: 'https://unlocking-doors.us.auth0.com',
    AUTH0_PUB_KEY_PATH: './cert-dev.pem',
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

  compatibilityDate: '2025-04-14',
});