import { v7 } from 'uuid'
import {
  generateMinesweeperGrid,
  type Options as GenerateOptions,
  type Field,
  type Cell,
} from './generateMinesweeperGrid.ts'
import { IndexedDB } from '../service/db/IndexedDB.ts'
import { transformCellForClient } from './transformFieldForClient.ts'
import { isEmpty } from './isEmpty.ts'

export interface Board {
  id: string
  options: GenerateOptions
  field: Field
  start: Date | null
}
class MineField {
  private db = new IndexedDB<Board>('MinesweeperDB', 'minesweeperGrids')

  async newField(options: GenerateOptions) {
    const board = {
      id: v7(),
      options,
      field: generateMinesweeperGrid(options),
      start: null,
    }
    const result = await this.db.addObj(board)
    console.log('res', result, board)
    return {
      ...board,
      field: board?.field.map((row) => row.map((cell) => transformCellForClient(cell))),
    }
  }

  async revieald({ id, row, cell }: { id: string; row: string; cell: string }) {
    const board = await this.db.getObj(id)

    if (!board.start) {
      //
    }
    // some action
    const changes: Cell[] = []
    const newBord = board
    await this.db.updateObj(newBord)
    return changes
  }

  async getBoard(id: string) {
    const board = await this.db.getObj(id)
    if (isEmpty(board)) {
      return {}
    }
    return {
      ...board,
      field: board?.field.map((row) => row.map((cell) => transformCellForClient(cell))),
    }
  }
}

export default new MineField()
