export const base: ThemeExt = {
  key: "base",
  name: "Base",
  description: "The base Nina theme",
  definition: {
    dark: false,
    colors: {
      primary: "#878787",
      error: "#B00020",
      info: "#2196F3",
      success: "#4CAF50",
      warning: "#FB8C00",
    },
  },
}

export const baseDark: ThemeExt = {
  ...base,
  definition: {
    ...base.definition,
    dark: true,
  },
}
