import { Field, Options, Position } from './generateMinesweeperGrid.ts'
import { processNeighboringCells } from './processNeighboringCells.ts'

export const revealMinesweeperGrid = (field: Field, options: Options, [x, y]: Position): Field => {
  const cell = Number(x)
  const row = Number(y)
  // Ensure the coordinates are within bounds
  if (row < 0 || row >= options.rows || cell < 0 || cell >= options.cells) {
    throw new Error('Invalid cell coordinates')
  }

  const cellData = field[row][cell]

  // If the cell is already revealed, do nothing
  if (cellData[1]) {
    return field
  }

  // Reveal the cell
  field[row][cell][1] = true

  // If the cell is a mine, reveal the mine and end the game
  if (cellData[0] === -1) {
    //@todo handle end scenario
    throw new Error('Game Over! You hit a mine!')
  }

  // If the cell has 0 mine around, recursively reveal around cells
  if (cellData[0] === 0) {
    processNeighboringCells([cell, row], options, ([selectedCell, selectedRow]) => {
      field = revealMinesweeperGrid(field, options, [selectedCell, selectedRow])
    })
  }

  return field
}
