export function useLogout() {
  const loading = ref(false);
  const { API_SMARTSUITE_BASEURL } = useRuntimeConfig().public;
  const { $trpc } = useNuxtApp();

  const logout = async () => {
    loading.value = true;
    const { token } = await $trpc.auth.logout.mutate();
    localStorage.removeItem('token');
    localStorage.removeItem('ss_token');
    useCurrentUser().logout();
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
