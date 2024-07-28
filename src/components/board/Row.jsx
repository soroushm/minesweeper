import { Cell } from './Cell.jsx'
export const Row = ({ cells }) => {
  return (
    <div className="row">
      {cells.map((cell, key) => (
        <Cell key={key} cell={cell} />
      ))}
    </div>
  )
}
