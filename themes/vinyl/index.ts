export const vinyl: ThemeExt = {
  key: "vinyl",
  name: "Vinyl",
  description: "The vinyl Nina theme",
  definition: {
    dark: false,
    colors: {
      primary: "#FFB300",
    },
  },
}

export const vinylDark: ThemeExt = {
  ...vinyl,
  definition: {
    ...vinyl.definition,
    dark: true,
  },
}
