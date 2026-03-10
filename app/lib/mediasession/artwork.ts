import mime from 'mime'

export const DEFAULT_ARTWORK_FILENAME = '/artwork.png'
export const DEFAULT_ARTWORK_SIZE = '1024x1024'
export const COVER_ARTWORK_SIZES = ['96x96', '128x128', '192x192', '256x256', '384x384', '512x512']

/**
 * Retourne un tableau d'artwork MediaSession avec plusieurs tailles déclarées.
 * Les head units (voiture, etc.) sélectionnent la taille la plus adaptée.
 * Pour les covers de taille inconnue, on déclare plusieurs entrées
 * pointant vers la même URL — c'est la pratique recommandée MediaSession.
 *
 * @param filepath - URL de la cover (optionnelle, fallback sur artwork.png)
 * @param origin   - window.location.origin, passé explicitement pour la testabilité
 */
export function getArtwork(filepath: unknown, origin: string): MediaImage[] {
  const defaultArtwork = `${origin}${DEFAULT_ARTWORK_FILENAME}`
  const raw = typeof filepath === 'string' && filepath ? filepath : defaultArtwork
  const src = raw.startsWith('/') ? `${origin}${raw}` : raw
  const isDefault = src === defaultArtwork
  const type = mime.getType(src) || 'image/png'

  if (isDefault) {
    return [{ src, sizes: DEFAULT_ARTWORK_SIZE, type }]
  }

  return COVER_ARTWORK_SIZES.map((sizes) => ({ src, sizes, type }))
}
