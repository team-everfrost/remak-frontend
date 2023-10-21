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

export const useDocumentStore = defineStore(
  'document',
  () => {
    const authStore = useAuthStore();

    const documents = ref<Document[]>([]);
    const endOfDocuments = ref(false);

    const getDocuments = computed(() => () => {
      return documents.value;
    });

    const isEndOfDocuments = computed(() => () => {
      return endOfDocuments.value;
    });

    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBaseUrl;

    const cleanFetch = async () => {
      documents.value = [];
      endOfDocuments.value = false;
      return await fetchDocuments();
    };

    const fetchCached = async () => {
      if (documents.value.length > 0) return documents.value;

      return await cleanFetch();
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
        if (data.value.data.length < 20) endOfDocuments.value = true;
        return data.value.data;
      }

      return false;
    };

    /* 디테일 및 파일 다운로드 */

    const fetchDocumentDetail = async (docId: string) => {
      if (!authStore.isSignedIn) return false;

      const { data, error }: any = await useFetch(`/document/${docId}`, {
        baseURL: apiBaseUrl,
        method: 'GET',
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

    const fetchFileDownloadUrl = async (docId: string) => {
      if (!authStore.isSignedIn) return false;

      const { data, error }: any = await useFetch(`/document/file/${docId}`, {
        baseURL: apiBaseUrl,
        method: 'GET',
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

    const deleteDocument = async (docId: string) => {
      if (!authStore.isSignedIn) return false;

      const { data, error }: any = await useFetch(`/document/${docId}`, {
        baseURL: apiBaseUrl,
        method: 'DELETE',
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
      documents,
      getDocuments,
      isEndOfDocuments,
      cleanFetch,
      fetchCached,
      fetchMore,
      fetchDocumentDetail,
      fetchFileDownloadUrl,
      deleteDocument,
    };
  },
  {
    persist: {
      storage: persistedState.sessionStorage,
    },
  },
);
