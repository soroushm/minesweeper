import { getRandomInt } from './getRandomInt'
import { directions } from './consts'
export interface Options {
  rows: number
  cells: number
  mines: number
}
export type Cell = [number, boolean]
export type Field = Array<Array<Cell>>

export const generateMinesweeperGrid = ({ cells = 9, rows = 9, mines = 8 }: Options) => {
  // Create the grid initialized with [zeros, false]
  const field: Field = Array.from({ length: rows }, () => {
    return Array.from({ length: cells }, () => [0, false])
  })

  // Place mines
  let minesPlaced = 0
  while (minesPlaced < mines) {
    const row = getRandomInt(0, rows - 1)
    const cell = getRandomInt(0, cells - 1)

    if (field[row][cell][0] !== -1) {
      // Ensure we don't place more than one mine in a cells
      field[row][cell][0] = -1
      minesPlaced++
    }
  }

  // Update counts around mines
  for (let row = 0; row < rows; row++) {
    for (let cell = 0; cell < cells; cell++) {
      if (field[row][cell][0] === -1) continue // Skip mines

      // Count mines in adjacent cells
      let mineCount = 0
      for (const [dx, dy] of directions) {
        const selectedRow = row + dx
        const selectedCell = cell + dy

        if (selectedRow >= 0 && selectedRow < rows && selectedCell >= 0 && selectedCell < cells) {
          if (field[selectedRow][selectedCell][0] === -1) {
            mineCount++
          }
        }
      }
      field[row][cell][0] = mineCount
    }
  }

  return field
}
