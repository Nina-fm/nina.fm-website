import { acceptHMRUpdate, defineStore } from "pinia"
import { themes, themesWithVariants } from "../themes"

export const useThemeStore = defineStore("theme", () => {
  const route = useRoute()
  const { isNight } = useDaylightStoreRefs()
  const themeNames = Object.keys(themes) as ThemeKey[]
  const themeVariantsNames = Object.keys(themesWithVariants) as ThemeVariantKey[]
  const darkMode = useCookie<boolean | "auto">("ninafm-user-darkMode", { default: () => "auto" })
  const isDarkModeActive = computed(() => (isNight.value && !!darkMode.value) || darkMode.value === true)
  const isRainbowMode = useCookie("ninafm-user-rainbowMode", { default: () => false })
  const { isFullscreen, toggle: toggleFs } = useFullscreen()
  const current = useCookie<ThemeKey>("ninafm-user-theme", { default: () => "peak" })
  const currentVariant = computed<ThemeVariantKey>(() => `${current.value}${isDarkModeActive.value ? "Dark" : ""}`)
  const theme = computed(() => themes[current.value])
  const themeVariant = computed(() => themesWithVariants[currentVariant.value])
  const publicThemes = computed<ThemeKey[]>(() => themeNames.filter((t): t is ThemeKey => t !== "base"))

  const switchTheme = (key: ThemeKey) => {
    current.value = key
  }

  const toggleTheme = () => {
    const index = publicThemes.value.indexOf(current.value)
    const next = index >= publicThemes.value.length - 1 ? 0 : index + 1
    switchTheme(publicThemes.value[next])
  }

  const toggleDarkMode = () => {
    if (darkMode.value === "auto") darkMode.value = true
    else if (darkMode.value === true) darkMode.value = false
    else darkMode.value = "auto"
  }

  const toggleRainbowMode = () => (isRainbowMode.value = !isRainbowMode.value)

  const toggleFullscreen = async () => await toggleFs()

  onNuxtReady(() => {
    if (route?.query?.theme && route?.query?.theme !== current.value) {
      switchTheme(route?.query?.theme as ThemeKey)
    }
  })

  return {
    themes,
    themesWithVariants,
    themeNames,
    publicThemes,
    themeVariantsNames,
    current,
    currentVariant,
    theme,
    themeVariant,
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
