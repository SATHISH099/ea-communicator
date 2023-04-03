import { LoadingPlugin } from 'vue-loading-overlay';

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(LoadingPlugin);
});
