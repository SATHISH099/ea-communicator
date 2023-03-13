export function useLogout() {
  const loading = ref(false);
  const { $trpc } = useNuxtApp();

  const logout = async () => {
    loading.value = true;
    await $trpc.auth.logout.mutate();
    loading.value = false;
    navigateTo({ name: 'login' });
  };

  return { loading, logout };
}
