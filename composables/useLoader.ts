import type { ActiveLoader, Props, Slots } from 'vue-loading-overlay';
import { useLoading } from 'vue-loading-overlay';

export function useLoader() {
  const loader = useLoading({
    color: '#b12222',
  });

  return loader;
}
