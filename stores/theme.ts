import { themes, themesWithVariants } from "../themes"

export const useThemeStore = defineStore("theme", () => {
  const { isNight } = useDaylightStoreRefs()
  const themeNames = Object.keys(themes) as ThemeKey[]
  const themeVariantsNames = Object.keys(themesWithVariants) as ThemeVariantKey[]
  const darkMode = useCookie<boolean | "auto">("ninafm-user-darkMode", { default: () => "auto" })
  const isDarkModeActive = computed(() => isNight.value && (darkMode.value === "auto" || darkMode.value === true))
  const current = useCookie<ThemeKey>("ninafm-user-theme", { default: () => "peak" })
  const currentVariant = computed<ThemeVariantKey>(() => `${current.value}${isDarkModeActive.value ? "Dark" : ""}`)
  const theme = computed(() => themes[current.value])
  const themeVariant = computed(() => themesWithVariants[currentVariant.value])

  const switchTheme = (key: ThemeKey) => {
    current.value = key
  }

  watch(
    () => darkMode,
    (value) => {
      console.log("darkMode cookie changed", value)
    }
  )
  console.log("darkMode cookie", darkMode.value)

  const toggleDarkMode = () => {
    if (darkMode.value === "auto") darkMode.value = true
    else if (darkMode.value === true) darkMode.value = false
    else darkMode.value = "auto"
  }

  return {
    themes,
    themesWithVariants,
    themeNames,
    themeVariantsNames,
    current,
    currentVariant,
    theme,
    themeVariant,
    darkMode,
    isDarkModeActive,
    switchTheme,
    toggleDarkMode,
  }
})

export const useThemeStoreRefs = () => storeToRefs(useThemeStore())

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useThemeStore, import.meta.hot))
}
