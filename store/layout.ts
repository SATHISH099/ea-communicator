import { defineStore } from 'pinia';

export const useLayoutStore = defineStore({
  id: 'layouts',
  state: () => ({
    layout: 'default',
    loading: false,
  }),
  actions: {
    setLayout(isAuthenticated: boolean) {
      if (isAuthenticated) {
        this.layout = 'default';
      } else {
        this.layout = 'auth';
      }
    },
    setLoading(isLoading: boolean) {
      this.loading = isLoading;
    },
  },
});
