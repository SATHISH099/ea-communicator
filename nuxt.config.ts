// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: process.env.NUXT_API_SECRET,
    // Keys within public are also exposed client-side
    public: {
      apiBase: process.env.BASE_URL
    },
    buildModules: [
      '@nuxtjs/google-fonts'
    ],
    googlefonts: {
      families: {
        Ubuntu: [400, 500, 600],
      }
    },
    unocss: {
      uno: true,
      icons: true,
      attributify: true,
    },
  },
  unocss: {
    shortcuts: {
      'bg-primary': 'bg-[#B42424]',
      'bg-white-smoke': 'bg-[#F5F5F5]',
      'text-primary': 'text-[#B42424]',
      'text-silver-chalice': 'text-[#A3A3A3]'

    }
  },
  modules: [
    '@formkit/nuxt',
    '@unocss/nuxt'
  ],
  css: [
    '~/assets/scss/main.scss'
  ],
});
