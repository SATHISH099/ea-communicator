import { defineStore } from 'pinia';

type Type = 'success' | 'error';
interface Toaster {
  message: string;
  type: Type;
}

export const useToasterStore = defineStore({
  id: 'toaster',
  state: (): Toaster => {
    return {
      message: '',
      type: 'success',
    };
  },
  actions: {
    async setMessage(message: string, type: Type = 'success') {
      this.type = type;
      this.message = message;
      await delay(4000);
      this.message = '';
    },
  },
  getters: {
    getType: (state) => state.type,
    getMessage: (state) => state.message,
  },
});
