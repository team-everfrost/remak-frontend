import { useAuthStore } from './auth';

export const useRegisterStore = defineStore('register', () => {
  const registerEmail = ref('');
  const registerPage = ref(1);
  const registerPassword = ref('');

  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBaseUrl;
  const authStore = useAuthStore();

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

  const checkSignUpCode = async (code: string) => {
    const email = registerEmail.value;
    if (!code) return false;

    const { data, error }: any = await useFetch('/auth/verify-code', {
      baseURL: apiBaseUrl,
      method: 'POST',
      body: { code, email },
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

    if (password !== registerPassword.value) {
      return false;
    }

    const { data, error }: any = await useFetch('/auth/local/signup', {
      baseURL: apiBaseUrl,
      method: 'POST',
      body: { email, password },
    });

    if (data.value && !error.value) {
      authStore.setAccessToken(data.value.data.accessToken);
      return true;
    }
    return false;
  };

  function setPassword(newPassword: string) {
    registerPassword.value = newPassword;
    registerPage.value = 4;
  }
  return {
    registerEmail,
    registerPage,
    registerPassword,
    checkEmail,
    getSignUpCode,
    checkSignUpCode,
    signUp,
    setPassword,
  };
});
