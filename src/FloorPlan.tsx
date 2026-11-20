import { useId } from 'react'
import type { RoomRating } from './model'

// Drawing coordinates are schematic only. The model never reads this geometry.
export const planRooms = [
  { id: 'A101', x: 54, y: 85, w: 110, h: 82 },
  { id: 'A102', x: 164, y: 66, w: 116, h: 101 },
  { id: 'A103', x: 280, y: 66, w: 107, h: 101 },
  { id: 'A104', x: 387, y: 66, w: 126, h: 101 },
  { id: 'A105', x: 513, y: 43, w: 153, h: 124 },
  { id: 'A106', x: 54, y: 202, w: 110, h: 84 },
  { id: 'A107', x: 164, y: 202, w: 116, h: 102 },
  { id: 'A108', x: 280, y: 202, w: 107, h: 102 },
  { id: 'A109', x: 432, y: 202, w: 81, h: 83 },
  { id: 'A110', x: 513, y: 202, w: 153, h: 83 },
]

const outline = 'M54 85H164V66H513V43H666V285H432V304H164V286H54Z'

export function FloorPlan({ ratings, compact = false, selectedRoom }: {
  ratings: RoomRating[]
  compact?: boolean
  selectedRoom?: string
}) {
  const titleId = useId()
  const descriptionId = useId()
  const byId = new Map(ratings.map((item) => [item.room.id, item]))
  return (
    <svg className={compact ? 'mini-plan' : 'floor-plan'} viewBox={compact ? '42 33 638 282' : '0 0 720 344'}
      aria-hidden={compact || undefined} aria-labelledby={compact ? undefined : `${titleId} ${descriptionId}`} role={compact ? undefined : 'img'}>
      {!compact && <>
        <title id={titleId}>Plan schématique de l’étage de démonstration</title>
        <desc id={descriptionId}>{ratings.map(({ room, band, optimal }) => `${room.id} : ${optimal ? 'optimale avec équipement' : band.label}`).join(' ; ')}.{selectedRoom ? ` Salle repérée : ${selectedRoom}.` : ''}</desc>
      </>}
      <path d={outline} transform={compact ? undefined : 'translate(1 4)'} fill={compact ? '#faf9f4' : '#dfe5de'} />
      <path d={outline} fill="#fcfcf7" />
      <path d="M54 167H666V202H54Z M387 202H432V304H387Z" fill="#edf0e8" />
      {planRooms.map(({ id, x, y, w, h }) => {
        const item = byId.get(id)
        const selected = selectedRoom === id
        const top = y < 167
        const door = top ? y + h : y
        const facade = top ? y : y + h
        return (
          <g key={id}>
            <rect x={x} y={y} width={w} height={h} fill={item?.band.fill ?? '#dbded5'} stroke="#526563" strokeWidth={compact ? 3.5 : 1.65} />
            {!compact && <>
              <path d={`M${x + w * .22} ${facade}h${w * .56}`} stroke="#fdfcf5" strokeWidth="3.8" />
              <path d={`M${x + w * .22} ${facade}h${w * .56}`} stroke="#536d6b" strokeWidth=".85" />
              <path d={`M${x + 13} ${door}h13`} stroke="#edf0e8" strokeWidth="3" />
              <path d={`M${x + 13} ${door}v${top ? -13 : 13}q13 0 13 ${top ? 13 : -13}`} stroke="#526563" strokeWidth=".8" fill="none" />
              <text x={x + w / 2} y={y + h / 2 + 1} textAnchor="middle" dominantBaseline="middle" fill={item?.band.ink ?? '#455951'} className="room-label">{id}</text>
              {item?.optimal && <g transform={`translate(${x + w - 16} ${y + 16})`}>
                <circle r="8.5" fill="#174b53" />
                <path d="M0-4V4M-3.5-2L3.5 2M-3.5 2L3.5-2" stroke="#fff" strokeWidth="1.15" strokeLinecap="round" />
              </g>}
              {selected && <>
                <rect x={x + 4} y={y + 4} width={w - 8} height={h - 8} fill="none" stroke="#fffdf7" strokeWidth="6" rx="2" />
                <rect x={x + 4} y={y + 4} width={w - 8} height={h - 8} fill="none" stroke="#193e37" strokeWidth="3" rx="2" />
              </>}
            </>}
          </g>
        )
      })}
      <path d={outline} stroke="#526563" strokeWidth={compact ? 4 : 1.8} fill="none" />
      {!compact && <>
        <path d="M396 237h27m-27 5h27m-27 5h27m-27 5h27m-27 5h27m-27 5h27m-27 5h27m-27 5h27" stroke="#94a49b" fill="none" />
        <path d="M409.5 275v-40m-3 4 3-4 3 4" stroke="#536d6b" fill="none" />
        <text x="361" y="188" textAnchor="middle" fill="#65756f" className="corridor-label">Circulation</text>
        <path d="M72 185h22m-18-4-4 4 4 4M643 185h-23m19-4 4 4-4 4" fill="none" stroke="#71827b" strokeWidth="1.2" />
      </>}
    </svg>
  )
}
