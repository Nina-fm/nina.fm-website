export const vinyl: ThemeExt = {
  key: "vinyl",
  name: "Vinyl",
  description: "The vinyl Nina theme",
  definition: {
    dark: false,
  },
}

export const vinylDark: ThemeExt = {
  ...vinyl,
  definition: {
    ...vinyl.definition,
    dark: true,
  },
}
