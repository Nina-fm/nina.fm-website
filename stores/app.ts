import { acceptHMRUpdate, defineStore } from 'pinia'

type ClsObj = ObjectOf<boolean>

const metaTitleRefreshTime = 10000

export const useAppStore = defineStore('app', () => {
  const config = useRuntimeConfig()
  const { isMuted, isLoading, isLocked, isPlaying } = useAudioStoreRefs()
  const { liveQuery } = useMetadataStoreRefs()
  const { theme, themeOptions, isDarkModeActive, isRainbowMode } = useThemeStoreRefs()
  const metaTitle = ref<string>(config.public.siteTitle)
  const isMobile = ref<boolean>(false)
  const additionalClasses: ClsObj = reactive({})

  const classes = computed<ClsObj>(() => ({
    [`theme-${theme.value.key}`]: true,
    dark: !!themeOptions.value?.darkMode && isDarkModeActive.value,
    muted: isMuted.value,
    loading: isLoading.value,
    locked: isLocked.value,
    playing: isPlaying.value,
    mobile: isMobile.value,
    rainbow: isRainbowMode.value,
    ...additionalClasses,
  }))

  const setClasses = (cls: ClsObj) => {
    Object.assign(additionalClasses, cls)
  }

  const updateMetaTitle = () => {
    if (!liveQuery.value?.name) return config.public.siteTitle

    metaTitle.value =
      metaTitle.value === config.public.siteTitle
        ? `${liveQuery.value?.name} - ${liveQuery.value?.authors}`
        : config.public.siteTitle
  }

  const setBodyClasses = () => {
    document.body.className = cn(classes.value)
  }

  watch(
    () => classes.value,
    () => {
      setBodyClasses()
    },
  )

  onNuxtReady(() => {
    setInterval(updateMetaTitle, metaTitleRefreshTime)
    setBodyClasses()
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
