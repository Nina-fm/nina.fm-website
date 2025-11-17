/**
 * Transforme la réponse de l'API Nina en format Metadata utilisé par le website
 */
export function transformMixtapeToMetadata(mixtape: MixtapeApiResponse | null): Metadata | null {
  if (!mixtape) return null

  return {
    id: mixtape.id,
    name: mixtape.name,
    year: mixtape.year,
    authors: mixtape.djs,
    authors_text: mixtape.djs.map((dj) => dj.name).join(', '),
    tracks_text: mixtape.tracksAsText || '',
    cover_url: mixtape.coverUrl,
    tags: mixtape.tags,
  }
}
