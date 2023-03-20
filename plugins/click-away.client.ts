import ClickAway from 'vue3-click-away';

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(ClickAway);
});
