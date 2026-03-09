import { describe, expect, it } from 'vitest'
import { cycleDarkMode, getNextInCycle } from './cycling'

describe('getNextInCycle', () => {
  it('returns undefined for empty array', () => {
    expect(getNextInCycle([], 'a')).toBeUndefined()
  })

  it('returns the only item for single-element array', () => {
    expect(getNextInCycle(['a'], 'a')).toBe('a')
  })

  it('returns next item', () => {
    expect(getNextInCycle(['a', 'b', 'c'], 'a')).toBe('b')
    expect(getNextInCycle(['a', 'b', 'c'], 'b')).toBe('c')
  })

  it('wraps around to first item from last', () => {
    expect(getNextInCycle(['a', 'b', 'c'], 'c')).toBe('a')
  })

  it('returns first item when current is not in the array', () => {
    expect(getNextInCycle(['a', 'b', 'c'], 'x' as 'a')).toBe('a')
  })
})

describe('cycleDarkMode', () => {
  it("cycles 'auto' → true", () => {
    expect(cycleDarkMode('auto')).toBe(true)
  })

  it('cycles true → false', () => {
    expect(cycleDarkMode(true)).toBe(false)
  })

  it("cycles false → 'auto'", () => {
    expect(cycleDarkMode(false)).toBe('auto')
  })

  it('completes a full cycle', () => {
    const result = [cycleDarkMode('auto'), cycleDarkMode(true), cycleDarkMode(false)]
    expect(result).toEqual([true, false, 'auto'])
  })
})
