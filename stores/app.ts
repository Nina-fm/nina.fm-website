/* eslint-disable @typescript-eslint/no-empty-function */
import { acceptHMRUpdate, defineStore } from "pinia"

type ClsObj = ObjectOf<boolean>

export const useAppStore = defineStore("app", () => {
  const { isMuted, isLoading, isLocked, isPlaying } = useAudioStoreRefs()
  const { themeVariant } = useThemeStoreRefs()

  const isMobile = ref<boolean>(false)
  const additionalClasses: ClsObj = reactive({})

  const classes = computed<ClsObj>(() => ({
    dark: !!themeVariant.value.definition?.dark,
    muted: isMuted.value,
    loading: isLoading.value,
    locked: isLocked.value,
    playing: isPlaying.value,
    mobile: isMobile.value,
    ...additionalClasses,
  }))

  const setClasses = (cls: ClsObj) => {
    Object.assign(additionalClasses, cls)
  }

  onNuxtReady(() => {
    isMobile.value = typeof window.orientation !== "undefined" || navigator.userAgent.indexOf("IEMobile") !== -1
  })

  return {
    classes,
    setClasses,
    isMobile,
  }
})

export const useAppStoreRefs = () => storeToRefs(useAppStore())

if (import.meta.hot) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}
