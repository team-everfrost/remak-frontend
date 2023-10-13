import { useAuthStore } from './auth';

export const useDocumentStore = defineStore('document', () => {
  const authStore = useAuthStore();

  const documents = ref([
    {
      docId: '',
      title: '',
      type: '',
      content: '',
      summary: '',
      status: '',
      thumbnailUrl: '',
      createdAt: '',
      updatedAt: '',
      tags: [],
    },
  ]);

  const getDocuments = computed(() => () => {
    return documents.value;
  });

  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBaseUrl;

  const fetchDocuments = async (
    cursor?: string,
    docId?: string,
    limit?: number,
  ) => {
    if (!authStore.isSignedIn) return false;
    if (!cursor) documents.value = [];

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
    return false;
  };

  return { getDocuments, fetchDocuments };
});
