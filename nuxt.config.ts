import { sentryVitePlugin } from '@sentry/vite-plugin';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: [
    'highlight.js/styles/atom-one-dark-reasonable.css',
    'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css',
  ],
  devtools: { enabled: true },
  modules: [
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
        { name: 'theme-color', content: '#1F8CE6' },
        { key: 'og:type', property: 'og:type', content: 'website' },
        { key: 'og:site_name', property: 'og:site_name', content: 'Remak' },
        { key: 'og:title', property: 'og:title', content: 'Remak' },
        {
          key: 'og:description',
          property: 'og:description',
          content: 'Your Personal AI Knowledge Base.',
        },
        {
          key: 'og:image',
          property: 'og:image',
          content: 'https://remak.io/og-image.png',
        },
        {
          key: 'og:image:secure_url',
          property: 'og:image:secure_url',
          content: 'https://remak.io/og-image.png',
        },
        {
          key: 'og:image:type',
          property: 'og:image:type',
          content: 'image/png',
        },
        { key: 'og:image:width', property: 'og:image:width', content: '1800' },
        {
          key: 'og:image:height',
          property: 'og:image:height',
          content: '1800',
        },
        {
          key: 'twitter:description',
          property: 'twitter:description',
          content: 'Your Personal AI Knowledge Base.',
        },
        {
          key: 'twitter:image',
          property: 'twitter:image',
          content: 'https://remak.io/og-image.png',
        },
        {
          key: 'twitter:image:alt',
          property: 'twitter:image:alt',
          content: 'Remak',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL ?? 'https://api-dev.remak.io',
      sentry: {
        dsn:
          process.env.SENTRY_DSN ??
          'https://6965b98ed0100d9bffba73f8673a9532@o1302152.ingest.sentry.io/4506146594619392',
      },
    },
  },
  vite: {
    build: {
      sourcemap: true, // Source map generation must be turned on
    },
    plugins: [
      // Put the Sentry vite plugin after all other plugins
      sentryVitePlugin({
        org: 'rootabyss',
        project: 'remak',
        authToken: process.env.SENTRY_AUTH_TOKEN,
      }),
    ],
  },
});
