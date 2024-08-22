import { getRandomInt } from './getRandomInt'
import { directions } from './consts'
import { toNumber } from './toNumber'

export type HasRevealed = boolean
export type HasFlag = boolean
export type MinesCount = number // -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
export type X = string | number
export type Y = string | number
export type Cell = [MinesCount, HasRevealed, HasFlag]
export type Field = Array<Array<Cell>>
export type Position = [X, Y]
export type Actions = [HasRevealed, HasFlag]
export interface Options {
  rows: number
  cells: number
  mines: number
}
export interface Board {
  id: string
  options: Options
  field: Field
  start: string | null
}

export const generateMinesweeperGrid = (
  { cells = 9, rows = 9, mines = 8 }: Options,
  [x, y]: Position | [] = [],
  [hasRevealed, hasFlag]: Actions | [] = [],
) => {
  // Create the grid initialized with [zeros, false]
  const field: Field = Array.from({ length: rows }, () => {
    return Array.from({ length: cells }, () => [0, false, false])
  })
  if (!x && !y) {
    return field
  }
  // Place mines
  let minesPlaced = 0
  while (minesPlaced < mines) {
    const row = getRandomInt(0, rows - 1)
    const cell = getRandomInt(0, cells - 1)
    const numX = toNumber(x)
    const numY = toNumber(y)
    const isSelectedCell = row === numX || cell === numY
    if (isSelectedCell) {
      if (hasRevealed) {
        field[row][cell][1] = true // revealed
      } else if (hasFlag) {
        field[row][cell][2] = true // flagged
      }
    }
    if (!isSelectedCell || field[row][cell][0] !== -1) {
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
          const isMine = field[selectedRow][selectedCell][0] === -1
          if (isMine) {
            mineCount++
          }
        }
      }
      field[row][cell][0] = mineCount
    }
  }

  return field
}
