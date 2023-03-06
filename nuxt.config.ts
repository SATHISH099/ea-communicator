// https://nuxt.com/docs/api/configuration/nuxt-config
import unocssConfig from './unocss.config';

const nuxtConfig = defineNuxtConfig({
  modules: ['@formkit/nuxt', '@unocss/nuxt', '@pinia/nuxt'],
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: process.env.NUXT_API_SECRET,
    // Keys within public are also exposed client-side
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
      API_SMARTSUITE_BASE_URL: process.env.API_SMARTSUITE_BASE_URL,
    },
    build: {
      transpile: ['@vuepic/vue-datepicker'],
    },
  },
  css: ['~/assets/scss/main.scss', '@vueform/multiselect/themes/default.css'],
});

export default { ...nuxtConfig, unocss: { ...unocssConfig } };
