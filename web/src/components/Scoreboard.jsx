import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Bubbles from './Bubbles.jsx'
import BoardFooter from './BoardFooter.jsx'

export default function Scoreboard({ config, payload, visible }) {
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(null)
  const containerRef = useRef(null)
  const total = payload.players?.length || 0

  // Reset measurement on open / when player count changes
  useEffect(() => {
    setPerPage(null)
  }, [total, visible])

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

  // Arrow key navigation
  const pageCount = perPage ? Math.max(1, Math.ceil(total / perPage)) : 1
  useEffect(() => {
    if (!visible) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setPage((p) => Math.min(pageCount - 1, p + 1))
      else if (e.key === 'ArrowLeft') setPage((p) => Math.max(0, p - 1))
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
        onPrev={() => setPage((p) => Math.max(0, p - 1))}
        onNext={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
      />
    </div>
  )
}
