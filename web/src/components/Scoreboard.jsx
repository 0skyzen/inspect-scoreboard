import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Bubbles from './Bubbles.jsx'
import BoardFooter from './BoardFooter.jsx'

export default function Scoreboard({ config, payload, visible }) {
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(null)
  const containerRef = useRef(null)
  const total = payload.players?.length || 0

  // Re-measure only when the board opens or the viewport resizes — how many
  // bubbles fit depends on the container size, not on the player count. Tying
  // it to `total` made the whole grid re-measure (and flicker) on every refresh.
  useEffect(() => {
    setPerPage(null)
  }, [visible])

  // Reset to first page on open
  useEffect(() => {
    if (visible) setPage(0)
  }, [visible])

  // Measure how many bubbles fit after each render where perPage is unknown.
  useLayoutEffect(() => {
    if (perPage != null) return
    const container = containerRef.current
    if (!container) return
    const bubbles = container.querySelectorAll('.bubble')
    if (!bubbles.length) return

    const h = container.clientHeight
    let fits = 0
    for (let i = 0; i < bubbles.length; i++) {
      const b = bubbles[i]
      if (b.offsetTop + b.offsetHeight <= h + 2) fits++
      else break
    }
    setPerPage(Math.max(1, fits))
  })

  // Recompute on viewport resize
  useEffect(() => {
    const onResize = () => setPerPage(null)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const pageCount = perPage ? Math.max(1, Math.ceil(total / perPage)) : 1

  // Arrow keys still work for browser/dev previews.
  useEffect(() => {
    if (!visible) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setPage((p) => (p + 1) % pageCount)
      else if (e.key === 'ArrowLeft') setPage((p) => (p - 1 + pageCount) % pageCount)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [visible, pageCount])

  // Clamp page if pageCount shrinks
  useEffect(() => {
    if (page > pageCount - 1) setPage(pageCount - 1)
  }, [pageCount, page])

  return (
    <div className={`board ${visible ? 'in' : 'out'}`}>
      <div className="board-header">
        <div className="board-brand">
          <span className="board-logo">ID</span>
          <span className="board-title">{config.serverName}</span>
        </div>
      </div>

      <Bubbles
        ref={containerRef}
        config={config}
        payload={payload}
        page={page}
        perPage={perPage}
      />
      <BoardFooter
        config={config}
        total={payload.total ?? 0}
        max={payload.max ?? config.maxPlayers}
        page={page}
        pageCount={pageCount}
        onPage={setPage}
      />
    </div>
  )
}
