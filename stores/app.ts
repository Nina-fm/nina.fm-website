import { defineStore } from "pinia"

export const useAppStore = defineStore("app", () => {
  const { isMuted } = useAudioStoreRefs()
  const { themeVariant } = useThemeStoreRefs()
  const detailsOpen = ref<boolean>(false)

  const classes = computed(() => ({
    dark: !!themeVariant.value.definition?.dark,
    muted: isMuted.value,
    details: !!detailsOpen.value,
  }))

  const toggleDetails = () => (detailsOpen.value = !detailsOpen.value)

  return {
    classes,
    detailsOpen,
    toggleDetails,
  }
})

export const useAppStoreRefs = () => storeToRefs(useAppStore())

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}
