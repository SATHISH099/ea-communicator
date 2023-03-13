import { defineStore } from 'pinia';

export const useLayoutStore = defineStore('layouts', () => {
  const layout = ref('default');
  const get = () => {
    return { layout: layout.value };
  };
  const set = (newLayout: string) => {
    layout.value = newLayout;
  };
  return { layout, get, set };
});
