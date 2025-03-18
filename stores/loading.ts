import { acceptHMRUpdate, defineStore, storeToRefs } from "pinia";
import { useAudioStoreRefs } from "./audio";

export const useLoadingStore = defineStore("loading", () => {
  const { isLoading: isAudioLoading } = useAudioStoreRefs();
  const loading = ref<boolean>(false);
  const isLoading = computed<boolean>(
    () => loading.value || isAudioLoading.value
  );

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

export const useLoadingStoreRefs = () => storeToRefs(useLoadingStore());

if (import.meta.hot) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import.meta.hot.accept(acceptHMRUpdate(useLoadingStore, import.meta.hot));
}
