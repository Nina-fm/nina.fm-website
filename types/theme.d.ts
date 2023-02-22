import { ThemeDefinition, VuetifyOptions } from "vuetify"
import { themes, themesWithVariants } from "../themes/index"

declare global {
  type ThemeKey = keyof typeof themes
  type ThemeVariantKey = keyof typeof themesWithVariants

  interface Theme {
    key: ThemeKey
    name?: string
    description?: string
  }

  interface ThemeExt extends Theme {
    definition?: ThemeDefinition
    options?: VuetifyOptions
  }
}

export {}
