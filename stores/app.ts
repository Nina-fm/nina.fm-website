/* eslint-disable @typescript-eslint/no-empty-function */
import { defineStore } from "pinia"

type ClsObj = ObjectOf<boolean>

export const useAppStore = defineStore("app", () => {
  const { isMuted, isLoading, isLocked, isPlaying } = useAudioStoreRefs()
  const { themeVariant } = useThemeStoreRefs()

  const additionalClasses: ClsObj = reactive({})

  const classes = computed<ClsObj>(() => ({
    dark: !!themeVariant.value.definition?.dark,
    muted: isMuted.value,
    loading: isLoading.value,
    locked: isLocked.value,
    playing: isPlaying.value,
    ...additionalClasses,
  }))

  const setClasses = (cls: ClsObj) => {
    Object.assign(additionalClasses, cls)
  }

  return {
    classes,
    setClasses,
  }
})

export const useAppStoreRefs = () => storeToRefs(useAppStore())

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}
