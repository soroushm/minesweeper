import { getRandomInt } from './getRandomInt'
import { directions } from './consts'
export interface Options {
  rows: number
  cells: number
  mines: number
}
export const generateMinesweeperGrid = ({ cells = 9, rows = 9, mines = 8 }: Options) => {
  // Create the grid initialized with [zeros, false]
  const grid: Array<Array<[number, boolean]>> = Array.from({ length: rows }, () => {
    return Array.from({ length: cells }, () => [0, false])
  })

  // Function to get random integer between min and max (inclusive)

  // Place mines
  let minesPlaced = 0
  while (minesPlaced < mines) {
    const row = getRandomInt(0, rows - 1)
    const cell = getRandomInt(0, cells - 1)

    if (grid[row][cell][0] !== -1) {
      // Ensure we don't place more than one mine in a cells
      grid[row][cell][0] = -1
      minesPlaced++
    }
  }

  // Update counts around mines
  for (let row = 0; row < rows; row++) {
    for (let cell = 0; cell < cells; cell++) {
      if (grid[row][cell][0] === -1) continue // Skip mines

      // Count mines in adjacent cells
      let mineCount = 0
      for (const [dx, dy] of directions) {
        const selectedRow = row + dx
        const selectedCell = cell + dy

        if (selectedRow >= 0 && selectedRow < rows && selectedCell >= 0 && selectedCell < cells) {
          if (grid[selectedRow][selectedCell][0] === -1) {
            mineCount++
          }
        }
      }
      grid[row][cell][0] = mineCount
    }
  }

  return grid
}
