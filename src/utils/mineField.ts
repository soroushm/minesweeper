import { v7 } from 'uuid'
import {
  generateMinesweeperGrid,
  type Options as GenerateOptions,
  type Field,
  type Cell,
  type Position,
  type Actions,
} from './generateMinesweeperGrid.ts'
import { IndexedDB } from '../service/db/IndexedDB.ts'
import { transformCellForClient } from './transformFieldForClient.ts'
import { isEmpty } from './isEmpty.ts'
import { revealMinesweeperGrid } from './revealMinesweeperGrid.ts'

export interface Board {
  id: string
  options: GenerateOptions
  field: Field
  start: string | null
}
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
    }
    const result = await this.db.addObj(board)
    console.log('res', result, board)
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
    const row = Number(position[0])
    const cell = Number(position[1])
    if (!board.start) {
      newBord.start = new Date().toISOString()
      newBord.field = generateMinesweeperGrid(board.options, position, actions)
      return newBord
    } else {
      //@todo handle actions
      newBord.field = revealMinesweeperGrid(newBord.field, board.options, [cell, row])
    }

    await this.db.updateObj(newBord)
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
