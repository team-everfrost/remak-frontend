export const useAddStore = defineStore('add', () => {
  const addDialog = ref(1);

  return {
    addDialog,
  };
});
