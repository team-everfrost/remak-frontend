export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref('');
  const isSignedIn = computed(() => !!accessToken.value);

  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBaseUrl;

  const registerEmail = ref('');
  const registerPage = ref(1);
  const registerPassword = ref('');

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
    if (!email || !password) return false;

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

  const getSignUpCode = async (email: string) => {
    if (!email) return false;

    const { data, error }: any = await useFetch('/auth/signup-code', {
      baseURL: apiBaseUrl,
      method: 'POST',
      body: { email },
    });

    if (data.value && !error.value) {
      registerEmail.value = email;
      registerPage.value = 2;
      return true;
    }
    return false;
  };

  const checkSignUpCode = async (signupCode: string) => {
    const email = registerEmail.value;
    if (!signupCode) return false;

    const { data, error }: any = await useFetch('/auth/verify-code', {
      baseURL: apiBaseUrl,
      method: 'POST',
      body: { signupCode, email },
    });

    if (data.value && !error.value) {
      registerPage.value = 3;
      return true;
    }
    return false;
  };

  const signUp = async (password: string) => {
    const email = registerEmail.value;
    if (!email || !password) return false;

    const { data, error }: any = await useFetch('/signup', {
      baseURL: apiBaseUrl,
      method: 'POST',
      body: { email, password },
    });

    if (data.value && !error.value) {
      console.log('success');
      accessToken.value = data.value.data.accessToken;
      return true;
    }
  };

  const setPassword = (newPassword: string) => {
    password.value = newPassword;
  };

  return {
    accessToken,
    isSignedIn,
    getSignUpCode,
    registerEmail,
    registerPage,
    checkSignUpCode,
    checkEmail,
    signIn,
    signOut,
  };
});
