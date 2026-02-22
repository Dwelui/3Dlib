import { expect, test } from 'vitest'
import Color from '../../src/Color.js'

test('Color defaults', () => {
    const color = new Color()
    expect(color.r).toBe(0)
    expect(color.g).toBe(0)
    expect(color.b).toBe(0)
    expect(color.a).toBe(255)
})

test('adds 1 + 2 to equal 3', () => {
    expect(2 + 2).toBe(4)
})
