import { defineStore } from 'pinia';


export const useLayoutStore = defineStore('layouts', () => {
    const layout = ref('default');
    const get = () => {
        try {
            return { layout: layout.value };
        } catch (error) {
            throw error;
        }
    };
    const set = (newLayout: string) => {
        layout.value = newLayout;
    };
    return { layout, get, set };
});