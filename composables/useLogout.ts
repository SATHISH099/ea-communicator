export function useLogout() {
  const loading = ref(false);
  const { API_SMARTSUITE_BASEURL } = useRuntimeConfig().public;
  const { $trpc } = useNuxtApp();

  const logout = async () => {
    const token = localStorage.getItem('token');
    loading.value = true;
    await $trpc.auth.logout.mutate();
    localStorage.removeItem('token');
    loading.value = false;

    await navigateTo(
      `${API_SMARTSUITE_BASEURL}auth/sso/logout?token=${token}`,
      {
        external: true,
      },
    );
  };

  return { loading, logout };
}
