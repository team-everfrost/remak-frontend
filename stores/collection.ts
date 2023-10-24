import { useAuthStore } from './auth';

export const useCollectionStore = defineStore('collection', () => {
  const authStore = useAuthStore();
  const endOfCollections = ref(false);
  const config = useRuntimeConfig();

  const apiBaseUrl = config.public.apiBaseUrl;

  const collections = ref<
    {
      name: string;
      description: string;
      count: number;
    }[]
  >([]);

  function $reset() {
    collections.value = [];
    endOfCollections.value = false;
  }

  const getCollectionDescription = (name: string) => {
    const collection = collections.value.find((c) => c.name === name);
    return collection ? collection.description : '';
  };

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

  const createCollection = async (name: string, description: string) => {
    if (!authStore.isSignedIn) return false;
    if (name === '') return false;

    const { data, error }: any = await useFetch('/collection', {
      baseURL: apiBaseUrl,
      method: 'POST',
      body: { name, description },
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });

    if (data.value && !error.value) {
      initalFetch();
      return true;
    }
    return false;
  };

  const getCollections = computed(() => () => {
    return collections.value;
  });

  const addDocInCollection = async (
    collectionName: string,
    docIds: string[],
  ) => {
    if (!authStore.isSignedIn) return false;
    const name = collectionName;
    const { data, error }: any = await useFetch(`/collection/add/${name}`, {
      baseURL: apiBaseUrl,
      method: 'POST',
      body: { docIds },
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

  const fetchCollectionDetail = async (
    collectionName: string,
    cursor?: string,
    docid?: string,
    limit?: number,
  ) => {
    if (!authStore.isSignedIn) return false;

    const { data, error }: any = await useFetch('/document/search/collection', {
      baseURL: apiBaseUrl,
      method: 'GET',
      params: { collectionName, cursor, docid, limit },
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

  const editCollection = async (
    name: string,
    newName: string,
    description: string,
  ) => {
    if (!authStore.isSignedIn) return false;

    const { data, error }: any = await useFetch(`/collection/${name}`, {
      baseURL: apiBaseUrl,
      method: 'PATCH',
      body: { newName, description },
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

  const deleteDocuments = async (removedDocIds: string[], name: string) => {
    if (!authStore.isSignedIn) return false;

    const { data, error }: any = await useFetch(`/collection/${name}`, {
      baseURL: apiBaseUrl,
      method: 'PATCH',
      body: { removedDocIds },
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
    $reset,
    collections,
    endOfCollections,
    fetchCollections,
    getCollections,
    initalFetch,
    createCollection,
    addDocInCollection,
    getCollectionDescription,
    fetchCollectionDetail,
    editCollection,
    deleteDocuments,
  };
});
