import { useAuthStore } from './auth';

export const useCollectionStore = defineStore('collection', () => {
  const authStore = useAuthStore();
  const endOfCollections = ref(false);
  const config = useRuntimeConfig();

  const apiBaseUrl = config.public.apiBaseUrl;

  const collections = ref([]);

  const initalFetch = async () => {
    collections.value = [];
    return await fetchCollections();
  };

  const fetchCollections = async (offset?: number, limit?: number) => {
    if (!authStore.isSignedIn) return false;
    if (endOfCollections.value) return false;

    const { data, error }: any = await useFetch('/collection', {
      baseURL: apiBaseUrl,
      method: 'GET',
      params: { offset, limit },
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });

    if (data.value && !error.value) {
      collections.value.push(...data.value.data);
      return true;
    }

    if (!error.value && data.value.data.length === 0) {
      endOfCollections.value = true;
      return true;
    }

    return false;
  };

  const getCollections = computed(() => () => {
    return collections.value;
  });

  return {
    collections,
    endOfCollections,
    fetchCollections,
    getCollections,
    initalFetch,
  };
});
