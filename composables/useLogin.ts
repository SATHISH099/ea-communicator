import { TRPCClientError } from '@trpc/client';
import { useLayoutStore } from '~~/store/layout';

export function useLogin() {
  const { $trpc } = useNuxtApp();

  const data = reactive({
    token: '',
  });
  const errorMessage = ref('');

  async function login() {
    errorMessage.value = '';
    try {
      const { token, user } = await $trpc.auth.login.mutate(data.token);

      if (token) {
        localStorage.setItem('token', token);
      }

      if (user) {
        useLayoutStore().setLayout(true);
        navigateTo({ name: 'index' });
      } else {
        errorMessage.value = 'Something went wrong';
      }
    } catch (error) {
      if (error instanceof TRPCClientError) {
        errorMessage.value = error.message;
      }
    }
  }

  return { data, errorMessage, login };
}
