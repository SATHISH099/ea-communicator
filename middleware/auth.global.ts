export default defineNuxtRouteMiddleware(async (to) => {
  const { $trpc } = useNuxtApp();
  const { APP_URL, APP_AUTH_URL } = useRuntimeConfig().public;

  if (!to.path.includes('/auth/login')) {
    try {
      await $trpc.profile.me.query();
    } catch (error) {
      return navigateTo(`${APP_AUTH_URL}?redirect_url=${APP_URL}/auth/login`, {
        external: true,
      });
    }
  }
});
