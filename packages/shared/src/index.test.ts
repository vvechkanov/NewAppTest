import { describe, it, expect } from 'vitest'
import { GameSchema } from './index'

describe('GameSchema', () => {
  it('parses valid data', () => {
    const data = { id: '1', name: 'D&D', gmName: 'Alice', players: ['Bob'] }
    expect(GameSchema.parse(data)).toEqual(data)
  })
})
