export default defineNuxtRouteMiddleware((to) => {
  if (process.server) {
    return;
  }

  const user = useCurrentUser();

  if (
    user.hasRole('team-member') &&
    (to.fullPath.includes('add') ||
      to.fullPath.includes('create') ||
      to.fullPath.includes('edit'))
  ) {
    return navigateTo({ name: 'index' });
  }

  if (
    !user.hasRole('admin') &&
    (to.fullPath.includes('groups') || to.fullPath.includes('recipients'))
  ) {
    return navigateTo({ name: 'index' });
  }

  return true;
});
