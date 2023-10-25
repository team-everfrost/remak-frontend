import { useAuthStore } from './auth';

export const useTagStore = defineStore('tag', () => {
  const authStore = useAuthStore();
  const endOfTags = ref(false);
  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBaseUrl;
  const isTagExists = ref(false);

  const isEndOfTags = computed(() => () => {
    return endOfTags.value;
  });

  const tags = ref([
    {
      name: '',
      count: 0,
    },
  ]);

  const initalFetch = async () => {
    tags.value = [];
    return await fetchTags(false);
  };

  const fetchTagsMore = async (query?: string) => {
    const offset = tags.value.length;
    const limit = 20;
    return await fetchTags(true, query, limit, offset);
  };

  const fetchTags = async (
    isMoreData: boolean,
    query?: string,
    limit?: number,
    offset?: number,
  ) => {
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
      } else if (isMoreData) {
        tags.value.push(...data.value.data);
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

  // 태그 디테일 자료 가져오기
  const fetchTagDetail = async (
    tagName: string,
    cursor?: string,
    docid?: string,
    limit?: number,
  ) => {
    if (!authStore.isSignedIn) return false;

    const { data, error }: any = await useFetch('/document/search/tag', {
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
    tags,
    endOfTags,
    fetchTags,
    getTags,
    initalFetch,
    isTagExists,
    fetchTagDetail,
    fetchTagsMore,
    isEndOfTags,
  };
});
