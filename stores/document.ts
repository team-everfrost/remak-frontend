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

  const reset = () => {
    documents.value = [];
  };

  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBaseUrl;

  const getDocument = async (
    cursor?: string,
    docId?: string,
    limit?: number,
  ) => {
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

  return { documents, reset, getDocument };
});
