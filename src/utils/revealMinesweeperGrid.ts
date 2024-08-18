import { Field, Options, Position } from './generateMinesweeperGrid.ts'
import { directions } from './consts.ts'

export const revealMinesweeperGrid = (field: Field, options: Options, [x, y]: Position): Field => {
  const cell = Number(x)
  const row = Number(y)
  // Ensure the coordinates are within bounds
  if (row < 0 || row >= options.rows || cell < 0 || cell >= options.cells) {
    throw new Error('Invalid cell coordinates')
  }

  const cellData = field[row][cell]

  // If the cell is already revealed or flagged, do nothing
  if (cellData[1] || cellData[2]) {
    return field
  }

  // Reveal the cell
  field[row][cell][1] = true

  // If the cell is a mine, reveal the mine and end the game
  if (cellData[0] === -1) {
    throw new Error('Game Over! You hit a mine!')
  }

  // If the cell has 0 mine around, recursively reveal around cells
  if (cellData[0] === 0) {
    for (const [dx, dy] of directions) {
      const selectedRow = row + dx
      const selectedCell = cell + dy

      if (
        selectedRow >= 0 &&
        selectedRow < options.rows &&
        selectedCell >= 0 &&
        selectedCell < options.cells
      ) {
        field = revealMinesweeperGrid(field, options, [selectedCell, selectedRow])
      }
    }
  }

  return field
}
