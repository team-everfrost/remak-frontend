import { useAuthStore } from './auth';

export const useAccountStore = defineStore('account', () => {
  const authStore = useAuthStore();

  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBaseUrl;
  const userInfo = ref({
    uid: '',
    email: '',
    name: '',
    imageUrl: '',
    role: '',
    createdAt: '',
    updatedAt: '',
  });

  const getUserInfo = computed(() => () => {
    return userInfo.value;
  });

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

  return {
    getUserInfo,
    userInfo,
    fetchUserInfo,
    getUsageSize,
    getStorageSize,
  };
});
