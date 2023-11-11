export const useUiStore = defineStore(
  'ui',
  () => {
    const sidebarFolded = ref(false);

    const $reset = () => {
      sidebarFolded.value = false;
    };

    const setSidebarFolded = (folded: boolean) => {
      sidebarFolded.value = folded;
    };

    return {
      sidebarFolded,
      $reset,
      setSidebarFolded,
    };
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  },
);
