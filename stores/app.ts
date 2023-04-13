/* eslint-disable @typescript-eslint/no-empty-function */
import { acceptHMRUpdate, defineStore } from "pinia"

type ClsObj = ObjectOf<boolean>

const metaTitleRefreshTime = 10000

export const useAppStore = defineStore("app", () => {
  const config = useRuntimeConfig()
  const { isMuted, isLoading, isLocked, isPlaying } = useAudioStoreRefs()
  const { liveQuery } = useMetadataStoreRefs()
  const { themeVariant } = useThemeStoreRefs()
  const metaTitle = ref<string>(config.public.siteTitle)
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

  const updateMetaTitle = () => {
    if (!liveQuery.value?.name) return config.public.siteTitle

    const title =
      metaTitle.value === config.public.siteTitle
        ? `${liveQuery.value?.name} - ${liveQuery.value?.authors}`
        : config.public.siteTitle

    console.log("updateMetaTitle", title)
    metaTitle.value = title
  }

  onNuxtReady(() => {
    setInterval(updateMetaTitle, metaTitleRefreshTime)
  })

  return {
    classes,
    setClasses,
    isMobile,
    metaTitle,
  }
})

export const useAppStoreRefs = () => storeToRefs(useAppStore())

if (import.meta.hot) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}
