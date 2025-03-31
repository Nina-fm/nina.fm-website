import { acceptHMRUpdate, defineStore } from 'pinia'

type ClsObj = ObjectOf<boolean>

const metaTitleRefreshTime = 10000

export const useAppStore = defineStore('app', () => {
  const config = useRuntimeConfig()
  const { muted, loading, locked, playing } = useAudioStoreRefs()
  const { liveQuery } = useMetadataStoreRefs()
  const { theme, themeOptions, isDarkModeActive, isRainbowMode } = useThemeStoreRefs()
  const metaTitle = ref<string>(config.public.siteTitle)
  const isMobile = ref<boolean>(false)
  const additionalClasses: ClsObj = reactive({})

  const classes = computed<ClsObj>(() => ({
    [`theme-${theme.value.key}`]: true,
    dark: !!themeOptions.value?.darkMode && isDarkModeActive.value,
    rainbow: isRainbowMode.value,
    muted: muted.value,
    loading: loading.value,
    locked: locked.value,
    playing: playing.value,
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
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}
