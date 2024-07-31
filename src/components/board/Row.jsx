import { Cell } from './Cell.jsx'
export const Row = ({ cells, rowIndex }) => {
  return (
    <div className="row">
      {cells.map((cell, key) => (
        <Cell key={`${key}:${rowIndex}`} cell={cell} />
      ))}
    </div>
  )
}
