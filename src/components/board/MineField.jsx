import { Row } from './Row.jsx'

export const MineField = ({ field: rows }) => {
  return (
    <div className="field">
      {rows?.map((row, key) => (
        <Row kay={key} cells={row} rowIndex={key} />
      ))}
    </div>
  )
}
