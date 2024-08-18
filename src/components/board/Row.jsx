import { Cell } from './Cell.jsx'
export const Row = ({ cells, y }) => {
  return (
    <div className="row">
      {cells.map((cell, x) => (
        <Cell key={`${y}:${x}`} cell={cell} position={{ x, y }} />
      ))}
    </div>
  )
}
