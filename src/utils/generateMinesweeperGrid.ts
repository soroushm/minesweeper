import { getRandomInt } from './getRandomInt'
interface Options {
  height: number
  width: number
  mines: number
}
export const generateMinesweeperGrid = ({ width, height, mines }: Options) => {
  // Create the grid initialized with zeros
  const grid: number[][] = Array.from({ length: height }, () =>
    Array(width).fill(0),
  )

  // Function to get random integer between min and max (inclusive)

  // Place mines
  let minesPlaced = 0
  while (minesPlaced < mines) {
    const row = getRandomInt(0, height - 1)
    const col = getRandomInt(0, width - 1)

    if (grid[row][col] !== -1) {
      // Ensure we don't place more than one mine in a cell
      grid[row][col] = -1
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
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (grid[row][col] === -1) continue // Skip mines

      // Count mines in adjacent cells
      let mineCount = 0
      for (const [dx, dy] of directions) {
        const selectedRow = row + dx
        const selectedCol = col + dy

        if (
          selectedRow >= 0 &&
          selectedRow < height &&
          selectedCol >= 0 &&
          selectedCol < width
        ) {
          if (grid[selectedRow][selectedCol] === -1) {
            mineCount++
          }
        }
      }
      grid[row][col] = mineCount
    }
  }

  return grid
}
