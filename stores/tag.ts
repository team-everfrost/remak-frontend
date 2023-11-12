import { useAuthStore } from './auth';

export const useTagStore = defineStore(
  'tag',
  () => {
    const authStore = useAuthStore();
    const endOfTags = ref(false);
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBaseUrl;

    const isEndOfTags = computed(() => () => {
      return endOfTags.value;
    });

    const tags = ref<
      {
        name: string;
        count: number;
      }[]
    >([]);

    function $reset() {
      tags.value = [];
      endOfTags.value = false;
    }

    const cleanFetch = async (query?: string) => {
      tags.value = [];
      endOfTags.value = false;
      return await fetchTags(query);
    };

    const fetchMore = async (query?: string) => {
      const offset = tags.value.length;
      const limit = 20;
      return await fetchTags(query, limit, offset);
    };

    const fetchTags = async (
      query?: string,
      limit?: number,
      offset?: number,
    ) => {
      if (!authStore.isSignedIn) return false;
      if (endOfTags.value) return false;

      const { data, error }: any = await useRemak('/tag', {
        baseURL: apiBaseUrl,
        method: 'GET',
        params: { query, limit, offset },
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      });

      if (data.value && !error.value) {
        tags.value.push(...data.value.data);
        if (data.value.data.length < 20) endOfTags.value = true;
        return data.value.data;
      }

      return false;
    };

    const getTags = computed(() => () => {
      return tags.value;
    });

    const cleanFetchTagDetail = async (tagName: string) => {
      return await fetchTagDetail(tagName);
    };

    const fetchTagDetailMore = async (
      tagName: string,
      cursor?: string,
      docid?: string,
    ) => {
      return await fetchTagDetail(tagName, cursor, docid, 20);
    };

    // 태그 디테일 자료 가져오기
    const fetchTagDetail = async (
      tagName: string,
      cursor?: string,
      docid?: string,
      limit?: number,
    ) => {
      if (!authStore.isSignedIn) return false;

      const { data, error }: any = await useRemak('/document/search/tag', {
        baseURL: apiBaseUrl,
        method: 'GET',
        params: { tagName, cursor, docid, limit },
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      });

      if (data.value && !error.value) {
        return data.value.data;
      }
      return false;
    };

    return {
      $reset,
      tags,
      endOfTags,
      fetchTags,
      getTags,
      cleanFetch,
      fetchMore,
      cleanFetchTagDetail,
      fetchTagDetailMore,
      isEndOfTags,
    };
  },
  {
    persist: {
      storage: persistedState.sessionStorage,
    },
  },
);
