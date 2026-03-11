import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { useAppStore } from '~/stores/app'
import { useMetadataStoreRefs } from '~/stores/metadata'

export const useVinylThemeStore = defineStore('vinylTheme', () => {
  const { isMixtape } = useMetadataStoreRefs()
  const { setClasses } = useAppStore()
  const isDetailsOpen = ref<boolean>(false)
  const isJaquetteTurnedBack = ref<boolean>(false)
  const isContentOpen = ref<boolean>(false)

  const openDetails = () => {
    isDetailsOpen.value = true
    setClasses({ details: true })
  }
  const closeDetails = () => {
    isDetailsOpen.value = false
    setClasses({ details: false })
  }
  const toggleDetails = () => (isDetailsOpen.value ? closeDetails() : openDetails())

  const openContent = () => {
    isContentOpen.value = true
    setClasses({ content: true })
  }
  const closeContent = () => {
    isContentOpen.value = false
    setClasses({ content: false })
  }
  const toggleContent = () => (isContentOpen.value ? closeContent() : openContent())

  const toggleJaquette = () => (isJaquetteTurnedBack.value = !isJaquetteTurnedBack.value)

  watch(isMixtape, (value) => {
    if (!value) closeDetails()
  })

  return {
    // Refs
    isMixtape,
    isDetailsOpen,
    isContentOpen,
    isJaquetteTurnedBack,
    // Methods
    toggleDetails,
    openDetails,
    closeDetails,
    toggleJaquette,
    toggleContent,
    openContent,
    closeContent,
  }
})

export const useVinylThemeStoreRefs = () => storeToRefs(useVinylThemeStore())

if (import.meta.hot) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import.meta.hot.accept(acceptHMRUpdate(useVinylThemeStore, import.meta.hot))
}
