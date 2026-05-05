import { forwardRef } from 'react'

const Bubbles = forwardRef(function Bubbles({ config, payload, page, perPage }, ref) {
  const players = payload.players || []

  if (!players.length) {
    return (
      <div ref={ref} className="bubbles bubbles--empty">
        {config.strings?.no_players ?? 'No players online'}
      </div>
    )
  }

  // perPage == null means we render everything for the first paint
  // so the parent can measure how many actually fit.
  const slice = perPage == null
    ? players
    : players.slice(page * perPage, page * perPage + perPage)

  return (
    <div ref={ref} className="bubbles">
      {slice.map((p) => (
        <div key={p.id} className="bubble">
          <span className="bubble__id">#{p.id}</span>
          <span className="bubble__name">{p.name}</span>
        </div>
      ))}
    </div>
  )
})

export default Bubbles
