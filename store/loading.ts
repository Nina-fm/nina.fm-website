import { defineStore, storeToRefs } from "pinia";

export const useLoadingStore = defineStore("loading", () => {
  const loading = ref<boolean>(false);
  const isLoading = computed<boolean>(() => loading.value );

  const toggleLoading = () => {
    loading.value = !loading.value;
  };

  const loadingOn = () => {
    loading.value = true;
  };

  const loadingOff = () => {
    loading.value = false;
  };

  return {
    isLoading,
    toggleLoading,
    loadingOff,
    loadingOn,
  };
});
