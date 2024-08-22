import { Row } from './Row.jsx'

export const MineField = ({ data }) => {
  const { field } = data
  return (
    <div className="field">
      {field?.map((row, y) => (
        <Row kay={y} cells={row} y={y} />
      ))}
    </div>
  )
}
