import { defineStore, storeToRefs } from "pinia"

export const useLoadingStore = defineStore("loading", () => {
  const { isLoading: isAudioLoading } = useAudioStoreRefs()
  const loading = ref<boolean>(false)
  const isLoading = computed<boolean>(() => loading.value || isAudioLoading.value)

  const toggleLoading = () => {
    loading.value = !loading.value
  }

  const loadingOn = () => {
    loading.value = true
  }

  const loadingOff = () => {
    loading.value = false
  }

  return {
    isLoading,
    toggleLoading,
    loadingOff,
    loadingOn,
  }
})

export const useLoadingStoreRefs = () => storeToRefs(useLoadingStore())

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLoadingStore, import.meta.hot))
}
