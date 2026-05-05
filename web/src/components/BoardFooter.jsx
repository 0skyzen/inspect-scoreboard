import Pager from './Pager.jsx'

export default function BoardFooter({ config, total, max, page, pageCount, onPrev, onNext }) {
  const link = config.discord || config.serverName
  return (
    <div className="board-footer">
      <Pager page={page} pageCount={pageCount} onPrev={onPrev} onNext={onNext} />
      <div className="board-footer__info">
        <span className="board-footer__discord">{link}</span>
        <span className="board-footer__sep">|</span>
        <span className="board-footer__count">
          <span className="board-footer__online">{total}</span>
          <span className="board-footer__divider">/</span>
          <span className="board-footer__max">{max}</span>
        </span>
      </div>
    </div>
  )
}
