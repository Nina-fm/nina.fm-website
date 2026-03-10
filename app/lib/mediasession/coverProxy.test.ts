import { describe, expect, it } from 'vitest'
import { toCoverProxyUrl } from './coverProxy'

const API_URL = 'https://api.nina.fm'

describe('toCoverProxyUrl', () => {
  it('should transform an API cover URL into a local proxy path', () => {
    const result = toCoverProxyUrl('https://api.nina.fm/covers/abc.jpg', API_URL)
    expect(result).toBe('/api/cover/covers/abc.jpg')
  })

  it('should handle API URL with trailing slash', () => {
    const result = toCoverProxyUrl('https://api.nina.fm/covers/abc.jpg', 'https://api.nina.fm/')
    expect(result).toBe('/api/cover/covers/abc.jpg')
  })

  it('should handle nested paths', () => {
    const result = toCoverProxyUrl('https://api.nina.fm/uploads/covers/mix-2024.png', API_URL)
    expect(result).toBe('/api/cover/uploads/covers/mix-2024.png')
  })

  it('should pass through a URL that does not match the API domain', () => {
    const url = 'https://cdn.example.com/cover.jpg'
    expect(toCoverProxyUrl(url, API_URL)).toBe(url)
  })

  it('should return undefined as-is', () => {
    expect(toCoverProxyUrl(undefined, API_URL)).toBeUndefined()
  })

  it('should return empty string as-is', () => {
    expect(toCoverProxyUrl('', API_URL)).toBe('')
  })

  it('should return null as-is', () => {
    expect(toCoverProxyUrl(null, API_URL)).toBeNull()
  })

  it('should return a non-string value as-is', () => {
    expect(toCoverProxyUrl(42, API_URL)).toBe(42)
  })
})
