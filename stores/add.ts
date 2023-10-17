import { useAuthStore } from './auth';

export const useAddStore = defineStore('add', () => {
  const authStore = useAuthStore();
  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBaseUrl;

  const addLink = async (url: string) => {
    console.log(url);
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

  return {
    addLink,
  };
});
