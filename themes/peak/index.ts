export const peak: ThemeExt = {
  key: "peak",
  name: "Peak",
  description: "The Nina Peak",
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

export const peakDark: ThemeExt = {
  ...peak,
  definition: {
    ...peak.definition,
    dark: true,
  },
}
