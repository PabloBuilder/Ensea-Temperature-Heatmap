/// <reference types="vitest/globals" />
import { planRooms } from './FloorPlan'
import { buildings, demoFloor, demoRooms, rateRooms, recommend, sameFloor } from './model'

const roomIds = (results: ReturnType<typeof rateRooms>) => results.map(({ room }) => room.id)

describe('demonstration inventory', () => {
  it('exposes three buildings with four levels each and one demo plan', () => {
    expect(new Set(buildings.map(({ id }) => id)).size).toBe(3)
    const floors = buildings.flatMap(({ id, levels }) => {
      expect(new Set(levels).size).toBe(4)
      return levels.map((level) => ({ buildingId: id, level }))
    })
    expect(floors.filter((floor) => sameFloor(floor, demoFloor))).toHaveLength(1)
  })

  it('matches data to SVG rooms bijectively by identifier', () => {
    const dataIds = demoRooms.map(({ id }) => id)
    const shapeIds = planRooms.map(({ id }) => id)
    expect(new Set(dataIds).size).toBe(dataIds.length)
    expect([...shapeIds].sort()).toEqual([...dataIds].sort())
  })
})

describe('demo band display', () => {
  it('retains the assigned bands with equipment disabled', () => {
    const ratings = rateRooms(demoRooms, false, 'cooling')
    expect(ratings.every(({ room, band, optimal }) => room.band === band.id && !optimal)).toBe(true)
  })

  it('treats only rooms with relevant operating equipment as optimal', () => {
    const ratings = rateRooms(demoRooms, true, 'cooling')
    expect(roomIds(ratings.filter(({ optimal }) => optimal))).toEqual(['A102', 'A108'])
    expect(ratings.filter(({ optimal }) => optimal).every(({ band }) => band.id === 'very-cool')).toBe(true)
    expect(ratings.filter(({ optimal }) => !optimal).every(({ band, room }) => band.id === room.band)).toBe(true)
    expect(rateRooms(demoRooms, true, 'heating').every(({ optimal, band }) => optimal && band.id === 'very-warm')).toBe(true)
  })
})

describe('demo recommendations', () => {
  it('groups equipment priority separately from passive matches', () => {
    const result = recommend(rateRooms(demoRooms, true, 'cooling'), 'cool', 'cooling')
    expect(roomIds(result.optimal)).toEqual(['A102', 'A108'])
    expect(roomIds(result.passive)).toEqual(['A101'])
  })

  it('preserves ties and excludes optimally cooled rooms from warm results', () => {
    const result = recommend(rateRooms(demoRooms, true, 'cooling'), 'warm', 'cooling')
    expect(result.optimal).toEqual([])
    expect(roomIds(result.passive)).toEqual(['A105', 'A109'])
  })

  it('returns an empty result when all rooms are heated but cool is requested', () => {
    expect(recommend(rateRooms(demoRooms, true, 'heating'), 'cool', 'heating')).toEqual({ optimal: [], passive: [] })
  })
})
