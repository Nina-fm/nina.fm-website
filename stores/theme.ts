import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { useFullscreen } from '~/composables/useFullscreen'
import { useDaylightStoreRefs } from '~/stores/daylight'
import { themes } from '../themes'

export const useThemeStore = defineStore('theme', () => {
  const route = useRoute()
  const { isNight } = useDaylightStoreRefs()
  const { isFullscreen, toggle: toggleFullscreen } = useFullscreen()

  const current = useCookie<ThemeKey>('ninafm-user-theme', { default: () => 'peak', watch: true })

  const darkMode = useCookie<boolean | 'auto'>('ninafm-user-darkMode', { default: () => 'auto', watch: true })
  const isDarkModeActive = computed(() => (isNight.value && !!darkMode.value) || darkMode.value === true)

  const isRainbowMode = useCookie('ninafm-user-rainbowMode', { default: () => false, watch: true })

  const theme = computed<Theme>(() => themes[current.value])
  const themeOptions = computed<ThemeOptions>(() => theme.value?.options ?? {})
  const publicThemesNames = computed<ThemeKey[]>(() =>
    Object.entries(themes)
      .filter(([_key, theme]) => theme.public)
      .map(([key]) => key as ThemeKey),
  )
  const publicThemes = computed(() => publicThemesNames.value.map((key) => themes[key]))
  const hasManyThemes = computed(() => publicThemes.value.length > 1)
  const nextTheme = computed(() => {
    const index = publicThemesNames.value.indexOf(current.value)
    const next = index >= publicThemes.value.length - 1 ? 0 : index + 1
    return publicThemes.value[next]
  })

  const switchTheme = (key: ThemeKey) => {
    current.value = key
  }

  const toggleTheme = () => {
    if (nextTheme.value) {
      switchTheme(nextTheme.value.key)
    }
  }

  const toggleDarkMode = () => {
    if (darkMode.value === 'auto') darkMode.value = true
    else if (darkMode.value === true) darkMode.value = false
    else darkMode.value = 'auto'
  }

  const toggleRainbowMode = () => (isRainbowMode.value = !isRainbowMode.value)

  const setBodyTheme = () => {
    document.body.dataset.theme = current.value
  }

  watch(current, setBodyTheme)

  onNuxtReady(() => {
    if (route?.query?.theme && route?.query?.theme !== current.value) {
      switchTheme(route?.query?.theme as ThemeKey)
    }
    setBodyTheme()
  })

  return {
    themes,
    publicThemesNames,
    publicThemes,
    hasManyThemes,
    current,
    theme,
    nextTheme,
    themeOptions,
    darkMode,
    isDarkModeActive,
    isRainbowMode,
    isFullscreen,
    switchTheme,
    toggleTheme,
    toggleDarkMode,
    toggleRainbowMode,
    toggleFullscreen,
  }
})

export const useThemeStoreRefs = () => storeToRefs(useThemeStore())

if (import.meta.hot) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import.meta.hot.accept(acceptHMRUpdate(useThemeStore, import.meta.hot))
}
