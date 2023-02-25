import { defineStore } from "pinia"

export const useAppStore = defineStore("app", () => {
  const { isMuted } = useAudioStoreRefs()
  const { themeVariant } = useThemeStoreRefs()
  const { isFullscreen, toggle: toggleFullscreen } = useFullscreen()
  const detailsOpen = ref<boolean>(false)
  const additionalClasses = ref<Obj>({})

  const classes = computed(() => ({
    ...additionalClasses.value,
    dark: !!themeVariant.value.definition?.dark,
    muted: isMuted.value,
    details: !!detailsOpen.value,
  }))

  const toggleDetails = () => (detailsOpen.value = !detailsOpen.value)

  const setClasses = (classes: Obj) => {
    additionalClasses.value = {
      ...additionalClasses.value,
      ...classes,
    }
  }

  return {
    classes,
    detailsOpen,
    toggleDetails,
    isFullscreen,
    toggleFullscreen,
    setClasses,
  }
})

export const useAppStoreRefs = () => storeToRefs(useAppStore())

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}
