import { describe, expect, it } from 'vitest'
import { interludeWords, isInterlude } from './isInterlude'

describe('isInterlude', () => {
  it('returns false when artist is null', () => {
    expect(isInterlude({ artist: null })).toBe(false)
  })

  it('returns false for a regular artist name', () => {
    expect(isInterlude({ artist: 'Daft Punk' })).toBe(false)
  })

  it.each(interludeWords)('returns true for keyword "%s"', (word) => {
    expect(isInterlude({ artist: word })).toBe(true)
  })

  it('is case-insensitive', () => {
    expect(isInterlude({ artist: 'INTERLUDE' })).toBe(true)
    expect(isInterlude({ artist: 'Intro' })).toBe(true)
    expect(isInterlude({ artist: 'JINGLE' })).toBe(true)
  })

  it('returns false for partial matches', () => {
    expect(isInterlude({ artist: 'interlude feat. DJ' })).toBe(false)
  })
})
