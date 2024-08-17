export const Cell = ({ cell: [value, isRevealed] }) => {
  return <div className="cell">{!isRevealed ? '' : value < 0 ? '*' : value || ''}</div>
}
