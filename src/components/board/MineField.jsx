import { Row } from './Row.jsx'

export const MineField = ({ field }) => {
  return (
    <div className="field">
      {field?.rows?.map((row, key) => (
        <Row kay={key} cells={row} rowIndex={key} />
      ))}
    </div>
  )
}
