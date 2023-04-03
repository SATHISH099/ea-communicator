import { defineStore } from 'pinia';

export const useLoader = defineStore('global-loader', {
  state: () => ({
    enabled: false,
  }),
  actions: {
    setLoader(enabled: boolean) {
      this.enabled = enabled;
    },
  },
});
