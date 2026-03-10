import { formatDjs } from '~/utils/formatDjs'

/**
 * Transforme la réponse de l'API Nina en format Metadata utilisé par le website
 */
export function transformMixtapeToMetadata(mixtape: MixtapeMetadataDto | MixtapeApiResponse | null): Metadata | null {
  if (!mixtape) return null

  return {
    id: mixtape.id,
    name: mixtape.name,
    year: mixtape.year,
    authors_text: formatDjs(mixtape.djs),
    tracks: mixtape.tracks.map((track) => ({
      artist: track.artist,
      title: track.title,
      position: track.position,
      start_at: track.startAt,
    })),
    cover_url: mixtape.coverUrl || undefined,
    tags: mixtape.tags.map((tagName, index) => ({
      id: `tag-${index}`,
      name: tagName,
      slug: tagName.toLowerCase().replace(/\s+/g, '-'),
    })),
  }
}
