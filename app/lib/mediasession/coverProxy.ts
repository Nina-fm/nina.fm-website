/**
 * Transforme une cover URL absolue de l'API en URL proxy locale.
 * Permet aux head units voiture (CarPlay, Android Auto…) d'accéder
 * aux artworks MediaSession via le domaine public du site.
 *
 * Ex: https://api.nina.fm/covers/abc.jpg → /api/cover/covers/abc.jpg
 *
 * @param coverUrl - URL de la cover (depuis les métadonnées API)
 * @param apiUrl   - URL de base de l'API (ex: https://api.nina.fm), passé explicitement pour la testabilité
 */
export function toCoverProxyUrl(coverUrl: unknown, apiUrl: string): unknown {
  if (typeof coverUrl !== 'string' || !coverUrl) return coverUrl
  const base = apiUrl.replace(/\/$/, '')
  if (!coverUrl.startsWith(base)) return coverUrl
  const path = coverUrl.slice(base.length).replace(/^\//, '')
  return `/api/cover/${path}`
}
