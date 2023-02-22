import { themes, themesWithVariants } from "../themes"

export const useThemeStore = defineStore("theme", () => {
  const { isNight } = useDaylightStoreRefs()
  const themeNames = Object.keys(themes) as ThemeKey[]
  const themeVariantsNames = Object.keys(themesWithVariants) as ThemeVariantKey[]
  const current = useCookie<ThemeKey>("ninafm-user-theme", { default: () => "peak" })
  const currentVariant = computed<ThemeVariantKey>(() => `${current.value}${isNight.value ? "Dark" : ""}`)
  const theme = computed(() => themes[current.value])
  const themeVariant = computed(() => themesWithVariants[currentVariant.value])

  const switchTheme = (key: ThemeKey) => {
    current.value = key
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
    switchTheme,
  }
})

export const useThemeStoreRefs = () => storeToRefs(useThemeStore())

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useThemeStore, import.meta.hot))
}
