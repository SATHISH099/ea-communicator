// https://nuxt.com/docs/api/configuration/nuxt-config
import type { ModuleOptions } from 'nuxt/schema';
import unocssConfig from './unocss.config';

const nuxtConfig = defineNuxtConfig({
  modules: [
    '@formkit/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@sidebase/nuxt-session',
  ],
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: process.env.NUXT_API_SECRET,
    sessionExpirySeconds: process.env.SESSION_EXPIRY_SECONDS,
    // Keys within public are also exposed client-side
    public: {
      APP_URL: process.env.APP_URL,
      API_BASEURL: process.env.API_BASEURL,
      API_SMARTSUITE_BASEURL: process.env.API_SMARTSUITE_BASEURL,
      APP_AUTH_URL: process.env.APP_AUTH_URL,
    },
    build: {
      transpile: ['@vuepic/vue-datepicker'],
    },
  },
  css: ['~/assets/scss/main.scss', '@vueform/multiselect/themes/default.css'],
  build: { transpile: ['trpc-nuxt'] },
});

const session: ModuleOptions = {
  isEnabled: true,
  session: {
    // Sessions expire after 3600 seconds = 60 minutes
    expiryInSeconds: parseInt(process.env.SESSION_EXPIRY_SECONDS || '3600'),
  },
  api: { isEnabled: false },
};

export default { ...nuxtConfig, unocss: { ...unocssConfig }, session };
