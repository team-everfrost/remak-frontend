export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref('');
  const isSignedIn = computed(() => !!accessToken.value);

  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBaseUrl;

  const checkEmail = async (email: string) => {
    if (!email) return false;

    const { data }: any = await useFetch('/auth/check-email', {
      baseURL: apiBaseUrl,
      method: 'POST',
      body: { email },
    });

    if (data?.value?.message === 'success') return true;
    return false;
  };

  const signIn = async (email: string, password: string) => {
    if (!email || !password) return;

    const { data, error }: any = await useFetch('/auth/local/login', {
      baseURL: apiBaseUrl,
      method: 'POST',
      body: { email, password },
    });

    if (data.value && !error.value) {
      accessToken.value = data.value.data.accessToken;
      return true;
    }
    return false;
  };

  const signOut = () => {
    useFetch('/auth/local/logout', {
      baseURL: apiBaseUrl,
      method: 'POST',
    });

    accessToken.value = '';
  };

  // TODO: Add signup

  return { accessToken, isSignedIn, checkEmail, signIn, signOut };
});