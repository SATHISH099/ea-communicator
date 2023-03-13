import { TRPCClientError } from '@trpc/client';

export function useLogin() {
  const { $trpc } = useNuxtApp();

  const data = reactive({
    email: '',
    password: '',
  });
  const errorMessage = ref('');

  async function login() {
    errorMessage.value = '';
    try {
      sessionStorage.setItem('token', 'test');
      navigateTo({ name: 'index' });
    } catch (error) {
      if (error instanceof TRPCClientError) {
        errorMessage.value = error.message;
      }
    }
  }

  return { data, errorMessage, login };
}
