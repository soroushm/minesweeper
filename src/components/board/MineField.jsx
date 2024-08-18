import { Row } from './Row.jsx'

export const MineField = ({ field: rows }) => {
  return (
    <div className="field">
      {rows?.map((row, y) => (
        <Row kay={y} cells={row} y={y} />
      ))}
    </div>
  )
}
