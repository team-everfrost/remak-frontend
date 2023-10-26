import { useAuthStore } from './auth';

export const useAccountStore = defineStore('account', () => {
  const authStore = useAuthStore();

  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBaseUrl;
  const userInfo = ref({
    email: '',
    name: '',
    imageUrl: '',
    role: '',
  });
  const resetPage = ref(1);
  const newPassword = ref('');

  function $reset() {
    userInfo.value = {
      email: '',
      name: '',
      imageUrl: '',
      role: '',
    };
    resetPage.value = 1;
    newPassword.value = '';
  }

  const getUserInfo = computed(() => () => {
    return userInfo.value;
  });

  function setPassword(password: string) {
    newPassword.value = password;
    resetPage.value = 3;
  }

  const fetchUserInfo = async () => {
    const { data, error }: any = await useFetch('/user', {
      baseURL: apiBaseUrl,
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });
    if (data.value && !error.value) {
      userInfo.value = data.value.data;
      return true;
    }
    return false;
  };

  const getUsageSize = async () => {
    const { data, error }: any = await useFetch('/user/storage/usage', {
      baseURL: apiBaseUrl,
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });
    if (data.value && !error.value) {
      return data.value.data;
    }
    return 0.0;
  };

  const getStorageSize = async () => {
    const { data, error }: any = await useFetch('/user/storage/size', {
      baseURL: apiBaseUrl,
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });
    if (data.value && !error.value) {
      return data.value.data;
    }
    return 0.0;
  };

  const resetCode = async (email: string) => {
    userInfo.value.email = email;
    const { data, error }: any = await useFetch('/auth/reset-code', {
      baseURL: apiBaseUrl,
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${authStore.accessToken}`,
      },
      body: {
        email,
      },
    });
    if (data.value && !error.value) {
      return true;
    }
    return false;
  };

  const verifyResetCode = async (code: string, email: string) => {
    const { data, error }: any = await useFetch('/auth/verify-reset-code', {
      baseURL: apiBaseUrl,
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${authStore.accessToken}`,
      },
      body: {
        code,
        email,
      },
    });
    if (data.value && !error.value) {
      return true;
    }
    return false;
  };

  const resetPassword = async (password: string) => {
    const prePassword = newPassword.value;
    if (prePassword !== password) {
      return false;
    }
    const email = userInfo.value.email;
    const { data, error }: any = await useFetch('/auth/reset-password', {
      baseURL: apiBaseUrl,
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${authStore.accessToken}`,
      },
      body: {
        email,
        password,
      },
    });
    if (data.value && !error.value) {
      return true;
    }
    return false;
  };

  const getWithDrawCode = async () => {
    const { data, error }: any = await useFetch('/auth/withdraw-code', {
      baseURL: apiBaseUrl,
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });
    if (data.value && !error.value) {
      return true;
    }
    return false;
  };

  const checkWithDrawCode = async (code: string) => {
    const { data, error }: any = await useFetch('/auth/verify-withdraw-code', {
      baseURL: apiBaseUrl,
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${authStore.accessToken}`,
      },
      body: {
        code,
      },
    });
    if (data.value && !error.value) {
      return true;
    }
    return false;
  };

  const withDraw = async () => {
    const { data, error }: any = await useFetch('/auth/withdraw', {
      baseURL: apiBaseUrl,
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });
    if (data.value && !error.value) {
      return true;
    }
    return false;
  };
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

  return {
    $reset,
    getUserInfo,
    userInfo,
    resetPage,
    fetchUserInfo,
    getUsageSize,
    getStorageSize,
    resetCode,
    verifyResetCode,
    setPassword,
    resetPassword,
    getWithDrawCode,
    checkWithDrawCode,
    withDraw,
    checkEmail,
  };
});
