export default function Pager({ page, pageCount, onPrev, onNext }) {
  if (pageCount <= 1) return null
  return (
    <div className="pager">
      <button
        className={`pager__btn ${page === 0 ? 'is-disabled' : ''}`}
        onClick={onPrev}
        aria-label="Previous page"
      >
        &lsaquo;
      </button>
      <span className="pager__label">
        {page + 1} / {pageCount}
      </span>
      <button
        className={`pager__btn ${page >= pageCount - 1 ? 'is-disabled' : ''}`}
        onClick={onNext}
        aria-label="Next page"
      >
        &rsaquo;
      </button>
    </div>
  )
}
