import { defineStore } from 'pinia';

export const useLayoutStore = defineStore({
  id: 'layouts',
  state: () => ({
    layout: 'default',
  }),
  actions: {
    setLayout(layoutName: string, isAuthenticated: boolean) {
      if (isAuthenticated) {
        this.layout = 'default';
      } else {
        this.layout = layoutName;
      }
    },
  },
});
