import { Pinia, Store, getActivePinia } from 'pinia';

export const useResetPersistStore = defineStore('reset-persist', () => {
  function $reset() {}

  const resetPersist = () => {
    localStorage.clear();
    sessionStorage.clear();

    // 열려있는 모든 스토어 리셋
    const resetStores = $ResetPinia();
    resetStores.all();
  };

  interface ExtendedPinia extends Pinia {
    _s: Map<string, Store>;
  }
  const $ResetPinia = (): Record<string | 'all', () => void> => {
    const pinia = getActivePinia() as ExtendedPinia;

    const resetStores: Record<string, () => void> = {};

    pinia._s.forEach((store, name) => {
      resetStores[name] = () => store.$reset();
    });

    resetStores.all = () => pinia._s.forEach((store) => store.$reset());
    return resetStores;
  };

  return {
    $reset,
    resetPersist,
  };
});
