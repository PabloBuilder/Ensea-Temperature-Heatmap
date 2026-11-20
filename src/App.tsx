import { useRef, useState } from 'react'
import { ArrowDownRight, ArrowRight, Building2, ChevronRight, Compass, FlaskConical, Layers, Map, MapPin, Minus, Plus, RotateCcw, SlidersHorizontal, Snowflake, Sun } from 'lucide-react'
import { FloorPlan } from './FloorPlan'
import { bands, buildings, demoFloor, demoRooms, rateRooms, recommend, sameFloor, scenario } from './model'
import type { Direction, FloorRef, RoomRating } from './model'

export default function App() {
  const [floor, setFloor] = useState<FloorRef>(demoFloor)
  const [equipment, setEquipment] = useState(false)
  const [direction, setDirection] = useState<Direction | null>(null)
  const [selectedRoom, setSelectedRoom] = useState<string>()
  const [zoom, setZoom] = useState(1)
  const mapHeading = useRef<HTMLHeadingElement>(null)
  const viewport = useRef<HTMLDivElement>(null)
  const activeBuilding = buildings.find(({ id }) => id === floor.buildingId)!
  const ratings = rateRooms(demoRooms, equipment, scenario)
  const hasPlan = sameFloor(floor, demoFloor)
  const results = direction ? recommend(ratings, direction, scenario) : null

  function openFloor(next: FloorRef, room?: string) {
    setFloor(next)
    setSelectedRoom(room)
    setZoom(1)
    if (viewport.current) viewport.current.scrollTo(0, 0)
  }

  function locate(room?: string) {
    openFloor(demoFloor, room)
    requestAnimationFrame(() => {
      mapHeading.current?.focus({ preventScroll: true })
      mapHeading.current?.scrollIntoView({ block: 'nearest' })
    })
  }

  function changeZoom(next: number) {
    const previous = viewport.current
    const centerX = previous ? (previous.scrollLeft + previous.clientWidth / 2) / previous.scrollWidth : .5
    const centerY = previous ? (previous.scrollTop + previous.clientHeight / 2) / previous.scrollHeight : .5
    const newZoom = Math.max(1, Math.min(2, next))
    setZoom(newZoom)
    requestAnimationFrame(() => {
      const target = viewport.current
      if (target) target.scrollTo(target.scrollWidth * centerX - target.clientWidth / 2, target.scrollHeight * centerY - target.clientHeight / 2)
    })
  }

  function renderResultGroup(entries: RoomRating[], optimal = false) {
    if (!entries.length) return null
    return (
      <div className="result-group">
        <p>{optimal ? 'Priorité équipement' : `${entries[0].band.label}${entries.length > 1 ? ' · ex æquo' : ''}`}</p>
        <div className="result-buttons">
          {entries.map(({ room, band }) => (
            <button type="button" key={room.id} onClick={() => locate(room.id)} aria-label={`Repérer ${room.id} sur le plan`}>
              <span className="swatch" style={{ background: band.fill }} />{room.id}<ArrowRight size={13} />
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <header className="site-header">
        <div className="shell topbar">
          <div className="wordmark">
            <img src={`${import.meta.env.BASE_URL}atlas.svg`} alt="" width="38" height="38" />
            <span>ENSEA<span className="brand-slash" aria-hidden="true">/</span><span className="brand-project">Atlas thermique</span></span>
          </div>
          <span className="demo-badge"><FlaskConical size={15} aria-hidden="true" /> Démonstration</span>
        </div>
      </header>

      <main className="shell">
        <section className="intro" aria-labelledby="page-title">
          <div>
            <div className="eyebrow"><MapPin size={15} aria-hidden="true" /> Campus ENSEA</div>
            <h1 id="page-title">Atlas thermique<span>.</span></h1>
            <p>Explorez les salles du campus, de la plus fraîche à la plus chaude.</p>
          </div>
          <div className="coverage" aria-label="Périmètre et couverture du prototype">
            <div><strong>{buildings.length}</strong><span>Bâtiments</span></div>
            <div><strong>{buildings.reduce((sum, building) => sum + building.levels.length, 0)}</strong><span>Niveaux prévus</span></div>
            <div><strong>1</strong><span>Plan de démo</span></div>
          </div>
        </section>

        <div className="dashboard">
          <section className="panel explorer" aria-labelledby="explore-title">
            <h2 id="explore-title"><Layers size={18} aria-hidden="true" /> Explorer le campus</h2>
            <p className="support">Choisissez un bâtiment puis un niveau.</p>
            <div className="building-list" role="group" aria-label="Bâtiments">
              {buildings.map(({ id }) => {
                const selected = floor.buildingId === id
                const preview = demoFloor.buildingId === id
                const firstLevel = buildings.find((item) => item.id === id)!.levels[0]
                return (
                  <button className={`building ${selected ? 'selected' : ''}`} type="button" key={id} aria-pressed={selected} onClick={() => openFloor({ buildingId: id, level: preview ? demoFloor.level : firstLevel })}>
                    <span className={`building-thumbnail ${preview ? 'has-preview' : ''}`}>
                      {preview ? <FloorPlan ratings={ratings} compact /> : <Building2 size={19} strokeWidth={1.45} aria-hidden="true" />}
                    </span>
                    <span className="building-text"><strong>Bâtiment {id}</strong><small>{preview ? `Aperçu · niveau ${demoFloor.level}` : 'Aucun plan disponible'}</small></span>
                    <ChevronRight className="building-arrow" size={16} aria-hidden="true" />
                  </button>
                )
              })}
            </div>
            <div className="levels">
              <p className="field-label" id="levels-label">Niveaux du bâtiment {activeBuilding.id}</p>
              <div className="level-buttons" role="group" aria-labelledby="levels-label">
                {activeBuilding.levels.map((level) => {
                  const available = sameFloor({ buildingId: activeBuilding.id, level }, demoFloor)
                  const selected = floor.level === level
                  return <button key={level} type="button" aria-pressed={selected} aria-label={`Niveau ${level}${available ? ', plan de démonstration' : ', plan non renseigné'}`} onClick={() => openFloor({ buildingId: activeBuilding.id, level })}>{level}{available && <span className="level-dot" aria-hidden="true" />}</button>
                })}
              </div>
            </div>
          </section>

          <section className="panel map-card" aria-labelledby="map-title">
            <div className="map-header">
              <div>
                <div className="map-kicker"><Map size={14} aria-hidden="true" /> Plan thermique</div>
                <h2 id="map-title" ref={mapHeading} tabIndex={-1}>Bâtiment {floor.buildingId}<span className="title-dot" aria-hidden="true">·</span><span className="title-level">Niveau {floor.level}</span></h2>
              </div>
              <button type="button" className="equipment-toggle" role="switch" aria-checked={equipment} onClick={() => setEquipment(!equipment)} aria-describedby="mode-detail">
                <SlidersHorizontal size={15} aria-hidden="true" /> Avec équipements <span className="switch-track" aria-hidden="true" />
              </button>
            </div>
            <p className="mode-detail" id="mode-detail">{equipment ? 'Scénario fictif : climatisation en fonctionnement.' : 'Classement hors effet du chauffage et de la climatisation.'}</p>

            <div className={`map-frame ${hasPlan ? '' : 'map-frame-empty'}`}>
              {hasPlan ? <>
                <div className="map-tag"><span /> {selectedRoom ? `Salle repérée : ${selectedRoom}` : `${ratings.length} salles fictives`}</div>
                <div className="north-mark" aria-hidden="true"><b>N</b><svg viewBox="0 0 26 30" width="23" height="28"><path d="M13 2 23 26 13 20 3 26Z" fill="#f9faf5" stroke="#346059" strokeWidth="1.4" /><path d="M13 2v18L3 26Z" fill="#346059" /></svg></div>
                <div className="plan-viewport" ref={viewport} aria-label="Zone du plan" tabIndex={zoom > 1 ? 0 : undefined}>
                  <div className="plan-stage" style={{ width: `${zoom * 100}%`, height: `${zoom * 100}%` }}><FloorPlan ratings={ratings} selectedRoom={selectedRoom} /></div>
                </div>
                <div className="plan-note">Schématique · non à l’échelle</div>
                <div className="zoom-controls" role="group" aria-label="Zoom du plan">
                  <button type="button" aria-label="Zoomer" title="Zoomer" disabled={zoom >= 2} onClick={() => changeZoom(zoom + .25)}><Plus size={16} /></button>
                  <button type="button" aria-label="Dézoomer" title="Dézoomer" disabled={zoom <= 1} onClick={() => changeZoom(zoom - .25)}><Minus size={16} /></button>
                  <button type="button" aria-label="Réinitialiser le zoom" title="Réinitialiser le zoom" disabled={zoom <= 1} onClick={() => changeZoom(1)}><RotateCcw size={14} /></button>
                </div>
              </> : <div className="empty-state">
                <span className="empty-icon"><Map size={25} strokeWidth={1.55} aria-hidden="true" /></span>
                <h3>Plan non renseigné</h3>
                <p>Ce niveau n’a pas encore de plan. Seul le niveau {demoFloor.level} du bâtiment {demoFloor.buildingId} est illustré dans la démonstration.</p>
                <button type="button" onClick={() => locate()}>Voir le plan de démo <ArrowRight size={16} /></button>
              </div>}
            </div>

            <div className="legend" aria-label="Échelle thermique commune">
              <div className="legend-label"><strong>Échelle thermique</strong><span>Classement relatif</span></div>
              <ol className="legend-bands">
                {bands.map(({ id, fill, label }) => <li key={id}><span style={{ background: fill }} /><span>{label}</span></li>)}
              </ol>
            </div>
            {hasPlan && equipment && <div className="optimal-note"><Snowflake size={15} aria-hidden="true" /> Flocon : salle prioritaire pour trouver du frais dans ce scénario.</div>}
          </section>

          <section className="panel finder" aria-labelledby="find-title">
            <h2 id="find-title"><Compass size={18} aria-hidden="true" /> Trouver une salle</h2>
            <p className="support">Comparez les salles du plan de démo.</p>
            <div className="find-buttons" role="group" aria-label="Confort recherché">
              <button type="button" className="find-cool" aria-pressed={direction === 'cool'} onClick={() => { setDirection(direction === 'cool' ? null : 'cool'); setSelectedRoom(undefined) }}><Snowflake size={16} aria-hidden="true" /> Du frais</button>
              <button type="button" className="find-warm" aria-pressed={direction === 'warm'} onClick={() => { setDirection(direction === 'warm' ? null : 'warm'); setSelectedRoom(undefined) }}><Sun size={16} aria-hidden="true" /> Du chaud</button>
            </div>
            <div aria-live="polite">
              {results && <div className="results">
                <p className="result-location">Bâtiment {demoFloor.buildingId} · Niveau {demoFloor.level}</p>
                {renderResultGroup(results.optimal, true)}
                {renderResultGroup(results.passive)}
                {!results.optimal.length && !results.passive.length && <p>Aucune salle dans ce mode.</p>}
                <p className="result-note">L’accès et l’occupation ne sont pas vérifiés.</p>
              </div>}
            </div>
          </section>
        </div>

        <footer className="footer">
          <p><FlaskConical size={16} aria-hidden="true" /><span><strong>Données fictives.</strong> Ni mesure de température, ni classement validé.</span></p>
          <span className="footer-weather"><ArrowDownRight size={14} aria-hidden="true" /> Pas de météo en direct</span>
        </footer>
      </main>
    </>
  )
}
