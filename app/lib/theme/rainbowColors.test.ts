import { describe, expect, it } from 'vitest'
import { basicColors, flashyColors, psychedelicColors } from './rainbowColors'

describe('rainbowColors', () => {
  it('basicColors is a non-empty array of strings', () => {
    expect(basicColors.length).toBeGreaterThan(0)
    basicColors.forEach((c) => expect(typeof c).toBe('string'))
  })

  it('psychedelicColors is a non-empty array of strings', () => {
    expect(psychedelicColors.length).toBeGreaterThan(0)
    psychedelicColors.forEach((c) => expect(typeof c).toBe('string'))
  })

  it('flashyColors is a non-empty array of strings', () => {
    expect(flashyColors.length).toBeGreaterThan(0)
    flashyColors.forEach((c) => expect(typeof c).toBe('string'))
  })

  it('all palettes are distinct', () => {
    expect(basicColors).not.toEqual(psychedelicColors)
    expect(basicColors).not.toEqual(flashyColors)
    expect(psychedelicColors).not.toEqual(flashyColors)
  })
})
