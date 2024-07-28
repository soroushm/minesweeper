export const Cell = ({ cell }) => {
  return <div className="cell">{cell < 0 ? '*' : cell || ''}</div>
}
