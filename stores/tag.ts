import { useAuthStore } from './auth';

export const useTagStore = defineStore('tag', () => {
  const authStore = useAuthStore();
  const endOfTags = ref(false);
  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBaseUrl;
  const isTagExists = ref(false);

  const tags = ref([
    {
      name: '',
      count: 0,
    },
  ]);

  const initalFetch = async () => {
    tags.value = [];
    return await fetchTags();
  };

  const fetchTags = async (query?: string, limit?: number, offset?: number) => {
    if (!authStore.isSignedIn) return false;
    if (endOfTags.value) return false;

    const { data, error }: any = await useFetch('/tag', {
      baseURL: apiBaseUrl,
      method: 'GET',
      params: { query, limit, offset },
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });

    if (data.value && !error.value) {
      if (query === undefined) {
        tags.value.push(...data.value.data);
        isTagExists.value = data.value.data.length > 0;
      } else {
        tags.value = data.value.data;
      }
      return true;
    }

    if (!error.value && data.value.data.length === 0) {
      endOfTags.value = true;
      return true;
    }

    return false;
  };

  const getTags = computed(() => () => {
    return tags.value;
  });

  return {
    tags,
    endOfTags,
    fetchTags,
    getTags,
    initalFetch,
    isTagExists,
  };
});
