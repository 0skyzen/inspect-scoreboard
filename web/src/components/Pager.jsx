export default function Pager({ page, pageCount, onPage }) {
  if (pageCount <= 1) return null
  return (
    <div className="pager" role="tablist" aria-label="Pages">
      {Array.from({ length: pageCount }).map((_, i) => (
        <button
          key={i}
          className={`pager__dot ${i === page ? 'is-active' : ''}`}
          onClick={() => onPage?.(i)}
          aria-label={`Page ${i + 1}`}
          aria-selected={i === page}
        />
      ))}
    </div>
  )
}
