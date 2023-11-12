import { useAuthStore } from './auth';

interface Document {
  docId: string;
  title: string;
  type: string;
  url: string;
  content: string;
  summary: string;
  status: string;
  thumbnailUrl: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export const useSearchStore = defineStore(
  'search',
  () => {
    const authStore = useAuthStore();

    const documents = ref<Document[]>([]);
    const endOfDocuments = ref(false);
    const searchHistory = ref<string[]>([]);

    const getDocuments = computed(() => () => {
      return documents.value;
    });

    const isEndOfDocuments = computed(() => () => {
      return endOfDocuments.value;
    });

    const getSearchHistory = computed(() => () => {
      return searchHistory.value;
    });

    const addSearchHistory = (query: string) => {
      const maxHistory = 20;
      if (searchHistory.value.includes(query)) return;
      searchHistory.value.push(query);
      if (searchHistory.value.length > maxHistory) searchHistory.value.shift();
    };

    const deleteSearchHistory = (query: string) => {
      const index = searchHistory.value.indexOf(query);
      if (index > -1) searchHistory.value.splice(index, 1);
    };

    const clearSearchHistory = () => {
      searchHistory.value = [];
    };

    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBaseUrl;

    function $reset() {
      documents.value = [];
      searchHistory.value = [];
      endOfDocuments.value = false;
    }

    const cleanTextSearch = async (query: string) => {
      documents.value = [];
      endOfDocuments.value = false;
      return await textSearch(query);
    };

    const textSearchMore = async (query: string) => {
      const offset = documents.value.length;
      const limit = 20;
      return await textSearch(query, limit, offset);
    };

    const textSearch = async (
      query: string,
      limit?: number,
      offset?: number,
    ) => {
      const cleanText = query.trim();
      if (!authStore.isSignedIn) return false;
      if (endOfDocuments.value) return false;

      const { data, error }: any = await useRemak('/search/text', {
        baseURL: apiBaseUrl,
        method: 'GET',
        params: { query: cleanText, limit, offset },
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      });

      if (data.value && !error.value) {
        documents.value.push(...data.value.data);
        if (data.value.data.length < 20) endOfDocuments.value = true;
        return data.value.data;
      }

      return false;
    };

    const hybridSearch = async (text: string) => {
      documents.value = [];
      endOfDocuments.value = false;

      const cleanText = text.trim();

      if (!authStore.isSignedIn) return false;

      const { data, error }: any = await useRemak('/search/hybrid', {
        baseURL: apiBaseUrl,
        method: 'GET',
        params: { query: cleanText },
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      });

      if (data.value && !error.value) {
        documents.value.push(...data.value.data);
        return data.value.data;
      }

      return false;
    };

    return {
      $reset,
      searchHistory,
      getDocuments,
      isEndOfDocuments,
      getSearchHistory,
      deleteSearchHistory,
      clearSearchHistory,
      addSearchHistory,
      cleanTextSearch,
      textSearchMore,
      hybridSearch,
    };
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  },
);
