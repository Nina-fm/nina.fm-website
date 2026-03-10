import { describe, expect, it } from 'vitest'
import { cycleDarkMode, getNextInCycle } from './cycling'

describe('getNextInCycle', () => {
  it('should return undefined when array is empty', () => {
    expect(getNextInCycle([], 'a')).toBeUndefined()
  })

  it('should return the only item when array has a single element', () => {
    expect(getNextInCycle(['a'], 'a')).toBe('a')
  })

  it('should return next item when current is not last', () => {
    expect(getNextInCycle(['a', 'b', 'c'], 'a')).toBe('b')
    expect(getNextInCycle(['a', 'b', 'c'], 'b')).toBe('c')
  })

  it('should wrap around to first item when current is last', () => {
    expect(getNextInCycle(['a', 'b', 'c'], 'c')).toBe('a')
  })

  it('should return first item when current is not in the array', () => {
    expect(getNextInCycle(['a', 'b', 'c'], 'x' as 'a')).toBe('a')
  })
})

describe('cycleDarkMode', () => {
  it("should return true when current is 'auto'", () => {
    expect(cycleDarkMode('auto')).toBe(true)
  })

  it('should return false when current is true', () => {
    expect(cycleDarkMode(true)).toBe(false)
  })

  it("should return 'auto' when current is false", () => {
    expect(cycleDarkMode(false)).toBe('auto')
  })

  it('should complete a full cycle through all states', () => {
    const result = [cycleDarkMode('auto'), cycleDarkMode(true), cycleDarkMode(false)]
    expect(result).toEqual([true, false, 'auto'])
  })
})
