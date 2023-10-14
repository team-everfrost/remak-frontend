import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();

  const onlyLogout = to.matched.some((record) => record.meta.onlyLogout);

  if (!onlyLogout && !authStore.isSignedIn) {
    return navigateTo('/login');
  }

  if (onlyLogout && authStore.isSignedIn) {
    return navigateTo('/main');
  }
});
