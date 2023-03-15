export default defineNuxtRouteMiddleware(async (to) => {
  const { $trpc } = useNuxtApp();
  if (!to.path.includes('/auth/login') && process.server) {
    try {
      await $trpc.profile.me.query();
    } catch (error) {
      return navigateTo('/auth/login');
    }
  }
});
