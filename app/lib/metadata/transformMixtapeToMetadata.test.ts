import { describe, expect, it } from 'vitest'
import { transformMixtapeToMetadata } from './transformMixtapeToMetadata'

const mockMixtape = {
  id: 'mix-1',
  name: 'Test Mix',
  slug: 'test-mix',
  year: 2024,
  coverUrl: 'https://example.com/cover.jpg',
  tracks: [
    { position: 1, artist: 'Artist A', title: 'Track A', startAt: '00:00:00' },
    { position: 2, artist: 'interlude', title: 'Interlude', startAt: '00:03:30' },
  ],
  djs: ['DJ One', 'DJ Two'],
  tags: ['Electronic', 'Deep House'],
  comment: null,
}

describe('transformMixtapeToMetadata', () => {
  it('returns null for null input', () => {
    expect(transformMixtapeToMetadata(null)).toBeNull()
  })

  it('maps id, name, year correctly', () => {
    const result = transformMixtapeToMetadata(mockMixtape)
    expect(result?.id).toBe('mix-1')
    expect(result?.name).toBe('Test Mix')
    expect(result?.year).toBe(2024)
  })

  it('formats DJs with &', () => {
    const result = transformMixtapeToMetadata(mockMixtape)
    expect(result?.authors_text).toBe('DJ One & DJ Two')
  })

  it('maps tracks with renamed fields', () => {
    const result = transformMixtapeToMetadata(mockMixtape)
    expect(result?.tracks).toHaveLength(2)
    expect(result?.tracks?.[0]).toMatchObject({
      position: 1,
      artist: 'Artist A',
      title: 'Track A',
      start_at: '00:00:00',
    })
  })

  it('maps cover_url from coverUrl', () => {
    const result = transformMixtapeToMetadata(mockMixtape)
    expect(result?.cover_url).toBe('https://example.com/cover.jpg')
  })

  it('sets cover_url to undefined when coverUrl is null', () => {
    const result = transformMixtapeToMetadata({ ...mockMixtape, coverUrl: null })
    expect(result?.cover_url).toBeUndefined()
  })

  it('maps tags with generated id and slug', () => {
    const result = transformMixtapeToMetadata(mockMixtape)
    expect(result?.tags?.[0]).toMatchObject({ id: 'tag-0', name: 'Electronic', slug: 'electronic' })
    expect(result?.tags?.[1]).toMatchObject({ id: 'tag-1', name: 'Deep House', slug: 'deep-house' })
  })
})
