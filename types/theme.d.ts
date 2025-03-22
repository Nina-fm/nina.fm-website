import type { themes } from '../themes/index'

declare global {
  type ThemeKey = keyof typeof themes

  type MixBlendMode =
    | 'mix-blend-normal'
    | 'mix-blend-multiply'
    | 'mix-blend-screen'
    | 'mix-blend-overlay'
    | 'mix-blend-darken'
    | 'mix-blend-lighten'
    | 'mix-blend-color-dodge'
    | 'mix-blend-color-burn'
    | 'mix-blend-difference'
    | 'mix-blend-exclusion'
    | 'mix-blend-hue'
    | 'mix-blend-saturation'
    | 'mix-blend-color'
    | 'mix-blend-luminosity'

  interface ThemeOptions {
    darkMode?: boolean
    rainbow?: {
      class?: MixBlendMode
      colors?: string[]
      duration?: number
    }
  }

  interface Theme {
    key: ThemeKey
    name?: string
    description?: string
    icon?: string
    public?: boolean
    options?: ThemeOptions
  }
}

export {}
