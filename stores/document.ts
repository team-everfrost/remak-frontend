import { useAuthStore } from './auth';

export const useDocumentStore = defineStore('document', () => {
  const authStore = useAuthStore();

  const documents = ref([
    {
      docId: '',
      title: '',
      type: '',
      url: '',
      content: '',
      summary: '',
      status: '',
      thumbnailUrl: '',
      createdAt: '',
      updatedAt: '',
      tags: [],
    },
  ]);
  const endOfDocuments = ref(false);

  const getDocuments = computed(() => () => {
    return documents.value;
  });

  const getEndOfDocuments = computed(() => () => {
    return endOfDocuments.value;
  });

  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBaseUrl;

  const initialFetch = async () => {
    documents.value = [];
    return await fetchDocuments();
  };

  const fetchMore = async () => {
    const cursor = documents.value[documents.value.length - 1].updatedAt;
    const docId = documents.value[documents.value.length - 1].docId;
    const limit = 20;
    return await fetchDocuments(cursor, docId, limit);
  };

  const fetchDocuments = async (
    cursor?: string,
    docId?: string,
    limit?: number,
  ) => {
    if (!authStore.isSignedIn) return false;
    if (endOfDocuments.value) return false;

    const { data, error }: any = await useFetch('/document', {
      baseURL: apiBaseUrl,
      method: 'GET',
      params: { cursor, 'doc-id': docId, limit },
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });

    if (data.value && !error.value) {
      documents.value.push(...data.value.data);
      return true;
    }

    if (!error.value && data.value.data.length === 0) {
      endOfDocuments.value = true;
      return true;
    }

    return false;
  };

  return { getDocuments, getEndOfDocuments, initialFetch, fetchMore };
});
