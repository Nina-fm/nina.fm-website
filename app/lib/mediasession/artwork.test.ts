import { describe, expect, it } from 'vitest'
import { COVER_ARTWORK_SIZES, DEFAULT_ARTWORK_SIZE, getArtwork } from './artwork'

const ORIGIN = 'https://nina.fm'
const DEFAULT_SRC = `${ORIGIN}/artwork.png`

describe('getArtwork', () => {
  it('returns default artwork when filepath is undefined', () => {
    const result = getArtwork(undefined, ORIGIN)
    expect(result).toHaveLength(1)
    expect(result[0]?.src).toBe(DEFAULT_SRC)
    expect(result[0]?.sizes).toBe(DEFAULT_ARTWORK_SIZE)
  })

  it('returns default artwork when filepath is empty string', () => {
    const result = getArtwork('', ORIGIN)
    expect(result[0]?.src).toBe(DEFAULT_SRC)
  })

  it('returns default artwork when filepath is not a string', () => {
    const result = getArtwork(null, ORIGIN)
    expect(result[0]?.src).toBe(DEFAULT_SRC)
  })

  it('returns multi-size artwork for a valid cover URL', () => {
    const coverUrl = 'https://api.nina.fm/covers/mix.jpg'
    const result = getArtwork(coverUrl, ORIGIN)
    expect(result).toHaveLength(COVER_ARTWORK_SIZES.length)
    result.forEach((entry) => expect(entry.src).toBe(coverUrl))
  })

  it('all multi-size entries have distinct sizes', () => {
    const result = getArtwork('https://api.nina.fm/covers/mix.jpg', ORIGIN)
    const sizes = result.map((e) => e.sizes)
    expect(new Set(sizes).size).toBe(sizes.length)
  })

  it('infers image/jpeg mime type for .jpg', () => {
    const result = getArtwork('https://api.nina.fm/covers/mix.jpg', ORIGIN)
    result.forEach((entry) => expect(entry.type).toBe('image/jpeg'))
  })

  it('infers image/png mime type for .png', () => {
    const result = getArtwork('https://api.nina.fm/covers/mix.png', ORIGIN)
    result.forEach((entry) => expect(entry.type).toBe('image/png'))
  })

  it('fallbacks to image/png for unknown extension', () => {
    const result = getArtwork('https://api.nina.fm/covers/mix', ORIGIN)
    result.forEach((entry) => expect(entry.type).toBe('image/png'))
  })
})
