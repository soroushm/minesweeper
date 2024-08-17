import { type Cell } from './generateMinesweeperGrid.ts'

// hide value if is not revealed
export const transformCellForClient = ([value, isRevealed, ...others]: Cell): Cell => [
  isRevealed ? value : 0,
  isRevealed,
  ...others,
]
