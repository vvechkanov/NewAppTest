import { describe, it, expect } from 'vitest'
import { GameSchema } from './index'

describe('GameSchema', () => {
  it('parses valid data', () => {
    const data = {
      id: '1',
      name: 'D&D',
      gmId: null,
      gmName: 'Alice',
      players: ['Bob'],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    }
    expect(GameSchema.parse(data)).toEqual(data)
  })
})
