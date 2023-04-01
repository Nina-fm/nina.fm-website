export const usePeakThemeStore = defineStore("peakTheme", () => {
  const { isMixtape } = useMetadataStoreRefs()
  const { setClasses } = useAppStore()
  const isDetailsOpen = ref<boolean>(false)
  const isContentOpen = ref<boolean>(false)

  const toggleDetails = () => (isDetailsOpen.value = !isDetailsOpen.value)
  const openDetails = () => (isDetailsOpen.value = true)
  const closeDetails = () => (isDetailsOpen.value = false)
  const toggleContent = () => (isContentOpen.value = !isContentOpen.value)
  const openContent = () => (isContentOpen.value = true)
  const closeContent = () => (isContentOpen.value = false)

  // Specific behaviors
  watch(isContentOpen, (value) => {
    if (value) isDetailsOpen.value = false
  })
  watch(isDetailsOpen, (value) => {
    if (value) isContentOpen.value = false
  })
  watch(isMixtape, (value) => {
    if (!value) isDetailsOpen.value = false
  })

  // Update app classes depending on refs
  watch(isContentOpen, (value) => {
    setClasses({ content: value })
  })
  watch(isDetailsOpen, (value) => {
    setClasses({ details: value })
  })

  return {
    // Refs
    isDetailsOpen,
    isContentOpen,
    // Methods
    toggleDetails,
    openDetails,
    closeDetails,
    toggleContent,
    openContent,
    closeContent,
  }
})

export const usePeakThemeStoreRefs = () => storeToRefs(usePeakThemeStore())

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePeakThemeStore, import.meta.hot))
}
