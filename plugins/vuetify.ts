import "vuetify/styles"

import * as components from "vuetify/components"
import * as directives from "vuetify/directives"

import { createVuetify } from "vuetify"
import { fr } from "vuetify/locale"

export default defineNuxtPlugin((nuxtApp) => {
  const { current } = useThemeStoreRefs()
  const { themesWithVariants } = useThemeStore()

  const vuetify = createVuetify({
    locale: {
      locale: "fr",
      messages: { fr },
    },
    theme: {
      defaultTheme: current.value,
      themes: {
        ...Object.entries(themesWithVariants).reduce(
          (res, [name, t]) => ({
            ...res,
            [name]: t.definition,
          }),
          {}
        ),
      },
    },
    components: {
      ...components,
    },
    directives,
    defaults: {
      VInput: {
        variant: "outlined",
        hideDetails: "auto",
      },
      VField: {
        variant: "outlined",
        hideDetails: "auto",
      },
      VTextField: {
        variant: "outlined",
        hideDetails: "auto",
      },
      VTextarea: {
        variant: "outlined",
        hideDetails: "auto",
      },
      VSelect: {
        variant: "outlined",
        hideDetails: "auto",
      },
      VAutocomplete: {
        variant: "outlined",
        hideDetails: "auto",
      },
      VCombobox: {
        variant: "outlined",
        hideDetails: "auto",
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
