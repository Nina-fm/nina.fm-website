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
    id: string
    name: string
    slug: string
    position?: number
  }

  interface Tag {
    id: string
    name: string
    slug: string
    color?: string
  }

  // Format Nina API (ce qui est renvoyé par /metadata)
  interface MixtapeApiResponse {
    id: string
    name: string
    slug: string
    year: number
    description?: string
    comment?: string
    tracksAsText?: string
    coverUrl?: string
    coverThumbnailUrl?: string
    djs: Author[]
    tags: Tag[]
    createdAt: string
    updatedAt: string
  }

  // Format utilisé dans le website (pour compatibilité avec les composants existants)
  interface Metadata {
    id: string
    name: string
    year?: number
    authors?: Author[]
    authors_text?: string
    tracks?: Track[]
    tracks_text?: string
    cover_url?: string
    tags?: Tag[]
  }
}
export { }

