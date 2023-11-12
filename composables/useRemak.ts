import { useFetch } from 'nuxt/app';

type useFetchType = typeof useFetch;

export const useRemak: useFetchType = (path, options = {}) => {
  const config = useRuntimeConfig();

  options.baseURL = config.public.apiBaseUrl;

  options.onResponseError = (error) => {
    if (error.response.status === 401) {
      alert('세션이 만료되었습니다. 다시 로그인해주세요.');
      localStorage.clear();
      sessionStorage.clear();
      const authCookie = useCookie('auth');
      authCookie.value = null;
      reloadNuxtApp({ path: '/login' });
    }
  };

  return useFetch(path, options);
};
