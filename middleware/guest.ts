export default defineNuxtRouteMiddleware(async () => {
  const { $trpc } = useNuxtApp();

  const isAuthenticated = await $trpc.profile.check.query();
  if (isAuthenticated) {
    return navigateTo({ name: 'index' });
  }
});
