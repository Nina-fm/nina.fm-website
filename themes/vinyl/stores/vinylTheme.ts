export const useVinylThemeStore = defineStore("vinylTheme", () => {
  const { isMixtape } = useMetadataStoreRefs()
  const { setClasses } = useAppStore()
  const isDetailsOpen = ref<boolean>(false)

  const toggleDetails = () => (isDetailsOpen.value = !isDetailsOpen.value)
  const openDetails = () => (isDetailsOpen.value = true)
  const closeDetails = () => (isDetailsOpen.value = false)

  // Specific behaviors
  watch(isMixtape, (value) => {
    if (!value) isDetailsOpen.value = false
  })

  // Update app classes depending on refs
  watch(isDetailsOpen, (value) => {
    setClasses({ details: value })
  })

  return {
    // Refs
    isDetailsOpen,
    // Methods
    toggleDetails,
    openDetails,
    closeDetails,
  }
})

export const useVinylThemeStoreRefs = () => storeToRefs(useVinylThemeStore())

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useVinylThemeStore, import.meta.hot))
}
