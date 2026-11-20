import data from './data/demo.json'

export const bands = [
  { id: 'very-cool', label: 'Très frais', fill: '#7fb4cc', ink: '#173c50' },
  { id: 'cool', label: 'Frais', fill: '#a3d4c3', ink: '#20463c' },
  { id: 'neutral', label: 'Tempéré', fill: '#e3e5ae', ink: '#494c27' },
  { id: 'warm', label: 'Chaud', fill: '#efc081', ink: '#5b3b1b' },
  { id: 'very-warm', label: 'Très chaud', fill: '#e59b86', ink: '#61362c' },
] as const

export type BandId = (typeof bands)[number]['id']
export type Season = 'cooling' | 'heating'
export type Direction = 'cool' | 'warm'
export type FloorRef = { buildingId: string; level: number }
export type Room = { id: string; band: BandId; cooling: boolean; heating: boolean }
export type RoomRating = { room: Room; band: (typeof bands)[number]; optimal: boolean }

export const buildings = data.buildings
export const demoFloor: FloorRef = data.floor

function parseSeason(value: string): Season {
  if (value !== 'cooling' && value !== 'heating') throw new Error('Invalid demo scenario')
  return value
}

export const scenario = parseSeason(data.scenario)

export const demoRooms: Room[] = data.rooms.map((room) => {
  const band = bands.find(({ id }) => id === room.band)
  if (!band) throw new Error(`Unknown demo band: ${room.band}`)
  return { ...room, band: band.id }
})

export function sameFloor(a: FloorRef, b: FloorRef): boolean {
  return a.buildingId === b.buildingId && a.level === b.level
}

// Demo bands are assigned in JSON; this applies the equipment priority, not a thermal formula.
export function rateRooms(rooms: Room[], withEquipment: boolean, season: Season): RoomRating[] {
  return rooms.map((room) => {
    const optimal = withEquipment && room[season]
    const passiveBand = bands.find(({ id }) => id === room.band)!
    return { room, optimal, band: optimal ? bands[season === 'cooling' ? 0 : 4] : passiveBand }
  })
}

// Group ties explicitly. Do not assign an ordering to rooms within any group.
export function recommend(ratings: RoomRating[], direction: Direction, season: Season) {
  const preferred = (direction === 'cool' && season === 'cooling') || (direction === 'warm' && season === 'heating')
  const optimal = preferred ? ratings.filter((entry) => entry.optimal) : []
  const passive = ratings.filter((entry) => !entry.optimal)
  const order = direction === 'cool' ? bands : [...bands].reverse()
  const bestBand = order.find((band) => passive.some((entry) => entry.band.id === band.id))
  return { optimal, passive: passive.filter((entry) => entry.band.id === bestBand?.id) }
}
