declare global {
  interface TrackBase {
    artist: string | null
    title: string | null
    [key: string]: unknown
  }

  interface Track extends TrackBase {
    id: number
    position: number
    start_at: number
  }

  interface Author {
    id: number
    name: string
    avatar?: string
    avatar_url?: string
    position?: number
  }

  interface Tag {
    id: number
    name: string
  }

  interface Metadata {
    id: number
    name: string
    year?: number
    authors?: Author[]
    authors_text?: string
    tracks?: Track[]
    tracks_text?: string
    cover?: string
    cover_url?: string
    tags?: Tag[]
  }
}
export {}
