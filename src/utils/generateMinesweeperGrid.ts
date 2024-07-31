import { getRandomInt } from './getRandomInt'
export interface Options {
  rows: number
  cells: number
  mines: number
}
export const generateMinesweeperGrid = ({
  cells = 9,
  rows = 9,
  mines = 8,
}: Options) => {
  // Create the grid initialized with zeros
  const grid: number[][] = Array.from({ length: rows }, () =>
    Array(cells).fill(0),
  )

  // Function to get random integer between min and max (inclusive)

  // Place mines
  let minesPlaced = 0
  while (minesPlaced < mines) {
    const row = getRandomInt(0, rows - 1)
    const cell = getRandomInt(0, cells - 1)

    if (grid[row][cell] !== -1) {
      // Ensure we don't place more than one mine in a cells
      grid[row][cell] = -1
      minesPlaced++
    }
  }

  // Directions for adjacent cells (8 directions)
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ]

  // Update counts around mines
  for (let row = 0; row < rows; row++) {
    for (let cell = 0; cell < cells; cell++) {
      if (grid[row][cell] === -1) continue // Skip mines

      // Count mines in adjacent cells
      let mineCount = 0
      for (const [dx, dy] of directions) {
        const selectedRow = row + dx
        const selectedCell = cell + dy

        if (
          selectedRow >= 0 &&
          selectedRow < rows &&
          selectedCell >= 0 &&
          selectedCell < cells
        ) {
          if (grid[selectedRow][selectedCell] === -1) {
            mineCount++
          }
        }
      }
      grid[row][cell] = mineCount
    }
  }

  return grid
}
