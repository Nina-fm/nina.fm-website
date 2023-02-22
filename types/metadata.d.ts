declare global {
  interface Track {
    artist: string | null
    title: string | null
    [key: string]: unknown
  }
}
export {}
