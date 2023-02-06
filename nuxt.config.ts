// https://nuxt.com/docs/api/configuration/nuxt-config
import unocssConfig from './unocss.config';

const nuxtConfig = defineNuxtConfig({
  modules: ['@formkit/nuxt', '@unocss/nuxt', '@pinia/nuxt'],
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: process.env.NUXT_API_SECRET,
    // Keys within public are also exposed client-side
    public: {
      apiBase: process.env.BASE_URL,
    },
  },
  css: ['~/assets/scss/main.scss'],
});

export default { ...nuxtConfig, unocss: { ...unocssConfig } };
