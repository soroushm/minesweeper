import { v7 } from 'uuid'
import {
  generateMinesweeperGrid,
  type Options as GenerateOptions,
  type Cell,
  type Position,
  type Actions,
  type Board,
} from './generateMinesweeperGrid'
import { IndexedDB } from '../service/db/IndexedDB'
import { transformCellForClient } from './transformFieldForClient'
import { isEmpty } from './isEmpty.ts'
import { revealMinesweeperGrid } from './revealMinesweeperGrid'

export interface Update {
  position: Position
  actions: Actions
}
interface Change {
  cell: Cell
  position: Position
}
class MineField {
  private db = new IndexedDB<Board>('MinesweeperDB', 'minesweeperGrids')

  async newField(options: GenerateOptions) {
    const board = {
      id: v7(),
      options,
      field: generateMinesweeperGrid(options),
      start: null,
      end: null,
    }
    const result = await this.db.addObj(board)
    return {
      ...board,
      field: board?.field.map((row) => row.map((cell) => transformCellForClient(cell))),
    }
  }

  async update(id: string, { position, actions }: Update) {
    const board = await this.db.getObj(id)
    const newBord = Object.assign({}, board)
    if (position[0] === undefined || position[1] === undefined) {
      throw new Error('Position is required')
    }
    if (board.end) {
      console.log('game over', position, actions, board, newBord)
      // @todo update board
      throw new Error('Game is over')
    } else if (!board.start) {
      newBord.start = new Date().toISOString()
      newBord.field = generateMinesweeperGrid(board.options, position, actions)
    }
    //@todo handle actions
    newBord.field = revealMinesweeperGrid(newBord.field, board.options, position)

    await this.db.updateObj(newBord)
    newBord.field = newBord?.field.map((row) => row.map((cell) => transformCellForClient(cell)))
    return newBord
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
