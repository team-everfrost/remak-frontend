import * as Sentry from '@sentry/vue';
import { jwtDecode } from 'jwt-decode';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const accessToken = ref('');
    const isSignedIn = computed(() => {
      try {
        const token = accessToken.value;
        const exp = jwtDecode<{ exp: number }>(token).exp;
        const isValid = exp > Date.now() / 1000;
        if (!isValid) throw new Error('Token expired');
        return isValid;
      } catch (e) {
        navigateTo('/login');
        return false;
      }
    });
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBaseUrl;

    function $reset() {
      accessToken.value = '';
    }

    const signIn = async (email: string, password: string) => {
      if (!email || !password) return false;

      const { data, error }: any = await useFetch('/auth/local/login', {
        baseURL: apiBaseUrl,
        method: 'POST',
        body: { email, password },
      });

      if (data.value && !error.value) {
        accessToken.value = data.value.data.accessToken;
        const {
          public: { sentry },
        }: any = useRuntimeConfig();

        if (!sentry.dsn || process.env.NODE_ENV === 'development') return true;
        const decoded = jwtDecode(accessToken.value);
        Sentry.setUser({ uid: decoded.aud as string });
        return true;
      }
      return false;
    };

    const signOut = () => {
      useFetch('/auth/local/logout', {
        baseURL: apiBaseUrl,
        method: 'POST',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${accessToken.value}`,
        },
      });

      accessToken.value = '';
    };

    const setAccessToken = (token: string) => {
      accessToken.value = token;
    };

    return {
      $reset,
      accessToken,
      isSignedIn,
      signIn,
      signOut,
      setAccessToken,
    };
  },
  {
    persist: {
      storage: persistedState.cookiesWithOptions({
        maxAge: 60 * 60 * 24 * 30, // 30 days
      }),
    },
  },
);
