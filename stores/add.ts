import axios from 'axios';
import { useAuthStore } from './auth';

export const useAddStore = defineStore('add', () => {
  const authStore = useAuthStore();
  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBaseUrl;

  const addLink = async (url: string) => {
    if (!authStore.isSignedIn) return false;
    if (!url) return false;
    const title = ref(' ');
    const content = ref(' ');
    const { data, error }: any = await useFetch('/document/webpage', {
      baseURL: apiBaseUrl,
      method: 'POST',
      body: { title, url, content },
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

  const fileUploadProgress = ref(0);

  const addFiles = async (files: FileList) => {
    if (!authStore.isSignedIn) return false;
    if (!files) return false;
    fileUploadProgress.value = 0;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const response = await axios({
        method: 'post',
        url: `${apiBaseUrl}/document/file`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authStore.accessToken}`,
        },
        onUploadProgress: (progressEvent) => {
          fileUploadProgress.value = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1),
          );
        },
      });

      if (response.status === 201) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const addMemo = async (content: string) => {
    if (!authStore.isSignedIn) return false;
    if (!content) return false;

    const { data, error }: any = await useFetch('/document/memo', {
      baseURL: apiBaseUrl,
      method: 'POST',
      body: { content },
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
    addLink,
    fileUploadProgress,
    addFiles,
    addMemo,
  };
});
