import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { useAppStore } from '~/stores/app'
import { useMetadataStoreRefs } from '~/stores/metadata'

export const usePeakThemeStore = defineStore('peakTheme', () => {
  const { isMixtape } = useMetadataStoreRefs()
  const { setClasses } = useAppStore()
  const isDetailsOpen = ref<boolean>(false)
  const isContentOpen = ref<boolean>(false)

  const openDetails = () => {
    isDetailsOpen.value = true
    isContentOpen.value = false
    setClasses({ details: true, content: false })
  }
  const closeDetails = () => {
    isDetailsOpen.value = false
    setClasses({ details: false })
  }
  const toggleDetails = () => (isDetailsOpen.value ? closeDetails() : openDetails())

  const openContent = () => {
    isContentOpen.value = true
    isDetailsOpen.value = false
    setClasses({ content: true, details: false })
  }
  const closeContent = () => {
    isContentOpen.value = false
    setClasses({ content: false })
  }
  const toggleContent = () => (isContentOpen.value ? closeContent() : openContent())

  watch(isMixtape, (value) => {
    if (!value) closeDetails()
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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import.meta.hot.accept(acceptHMRUpdate(usePeakThemeStore, import.meta.hot))
}
