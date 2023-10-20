// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: [
    'vue-final-modal/style.css',
    'highlight.js/styles/atom-one-dark-reasonable.css',
  ],
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
    '@formkit/auto-animate/nuxt',
    'nuxt-headlessui',
  ],
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate'],
  },
  app: {
    head: {
      title: 'Remak',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        // { name: 'msapplication-TileColor', content: '#1F8CE6' },
        // { name: 'msapplication-TileImage', content: '/ms-icon-144x144.png' },
        { name: 'theme-color', content: '#1F8CE6' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL ?? 'https://api-dev.remak.io',
    },
  },
});
