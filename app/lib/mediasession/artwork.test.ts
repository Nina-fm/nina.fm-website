import { describe, expect, it } from 'vitest'
import { COVER_ARTWORK_SIZES, DEFAULT_ARTWORK_SIZE, getArtwork } from './artwork'

const ORIGIN = 'https://nina.fm'
const DEFAULT_SRC = `${ORIGIN}/artwork.png`

describe('getArtwork', () => {
  it('should return default artwork when filepath is undefined', () => {
    const result = getArtwork(undefined, ORIGIN)
    expect(result).toHaveLength(1)
    expect(result[0]?.src).toBe(DEFAULT_SRC)
    expect(result[0]?.sizes).toBe(DEFAULT_ARTWORK_SIZE)
  })

  it('should return default artwork when filepath is empty string', () => {
    const result = getArtwork('', ORIGIN)
    expect(result[0]?.src).toBe(DEFAULT_SRC)
  })

  it('should return default artwork when filepath is not a string', () => {
    const result = getArtwork(null, ORIGIN)
    expect(result[0]?.src).toBe(DEFAULT_SRC)
  })

  it('should return multi-size artwork when cover URL is valid', () => {
    const coverUrl = 'https://api.nina.fm/covers/mix.jpg'
    const result = getArtwork(coverUrl, ORIGIN)
    expect(result).toHaveLength(COVER_ARTWORK_SIZES.length)
    result.forEach((entry) => expect(entry.src).toBe(coverUrl))
  })

  it('should have distinct sizes for all multi-size entries', () => {
    const result = getArtwork('https://api.nina.fm/covers/mix.jpg', ORIGIN)
    const sizes = result.map((e) => e.sizes)
    expect(new Set(sizes).size).toBe(sizes.length)
  })

  it('should infer image/jpeg mime type when extension is .jpg', () => {
    const result = getArtwork('https://api.nina.fm/covers/mix.jpg', ORIGIN)
    result.forEach((entry) => expect(entry.type).toBe('image/jpeg'))
  })

  it('should infer image/png mime type when extension is .png', () => {
    const result = getArtwork('https://api.nina.fm/covers/mix.png', ORIGIN)
    result.forEach((entry) => expect(entry.type).toBe('image/png'))
  })

  it('should fallback to image/png when extension is unknown', () => {
    const result = getArtwork('https://api.nina.fm/covers/mix', ORIGIN)
    result.forEach((entry) => expect(entry.type).toBe('image/png'))
  })

  it('should resolve a relative URL to an absolute URL using origin', () => {
    const result = getArtwork('/api/cover/covers/mix.jpg', ORIGIN)
    expect(result).toHaveLength(COVER_ARTWORK_SIZES.length)
    result.forEach((entry) => expect(entry.src).toBe('https://nina.fm/api/cover/covers/mix.jpg'))
  })
})
