import { useToasterStore } from '~~/store/toaster';

export default defineNuxtRouteMiddleware((to) => {
  if (process.server) {
    return;
  }

  const user = useCurrentUser();
  const { setMessage } = useToasterStore();

  if (
    user.hasRole('team-member') &&
    (to.fullPath.includes('add') ||
      to.fullPath.includes('create') ||
      to.fullPath.includes('edit'))
  ) {
    setMessage("You don't have permission to do this action.", 'error');
    return navigateTo({ name: 'index' });
  }

  if (
    !user.hasRole('admin') &&
    (to.fullPath.includes('groups') || to.fullPath.includes('recipients'))
  ) {
    setMessage("You don't have permission to do this action.", 'error');
    return navigateTo({ name: 'index' });
  }

  return true;
});
