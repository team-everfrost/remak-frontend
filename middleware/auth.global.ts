import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();

  const onlyLogout = to.matched.some((record) => record.meta.onlyLogout);
  const publicPage = to.matched.some((record) => record.meta.publicPage);

  if (!onlyLogout && !publicPage && !authStore.isSignedIn) {
    return navigateTo('/login');
  }

  if (onlyLogout && authStore.isSignedIn) {
    return navigateTo('/main');
  }
});
