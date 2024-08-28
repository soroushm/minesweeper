import { Row } from './Row.jsx'

export const MineField = ({ data }) => {
  const { field, id } = data
  return (
    <div className="field">
      {field?.map((row, y) => (
        <Row kay={`${id}:${y}`} cells={row} y={y} />
      ))}
    </div>
  )
}
