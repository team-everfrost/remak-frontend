import { useAuthStore } from './auth';

export const useAddStore = defineStore('add', () => {
  const authStore = useAuthStore();
  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBaseUrl;

  const addLink = async (url: string) => {
    if (!authStore.isSignedIn) return false;
    if (!url) return false;
    const title = ref(' ');
    const content = ref(' ');
    const { data, error }: any = await useFetch('/document/webpage', {
      baseURL: apiBaseUrl,
      method: 'POST',
      body: { title, url, content },
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

  const addMemo = async (content: string) => {
    if (!authStore.isSignedIn) return false;
    if (!content) return false;

    const { data, error }: any = await useFetch('/document/memo', {
      baseURL: apiBaseUrl,
      method: 'POST',
      body: { content },
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

  return {
    addLink,
    addMemo,
  };
});
