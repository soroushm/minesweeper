import { v7 } from 'uuid'
import {
  generateMinesweeperGrid,
  type Options as GenerateOptions,
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
    await this.db.addObj(board)
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
      throw new Error('Game is over')
    } else if (!board.start) {
      newBord.start = new Date().toISOString()
      newBord.field = generateMinesweeperGrid(board.options, position, actions)
    }
    //@todo win scenario

    const [revealed, flag] = actions
    const [selectedCell, selectedRow] = position
    if (revealed) {
      newBord.field = revealMinesweeperGrid(newBord.field, board.options, position)
      const isHitMine = newBord.field[selectedRow][selectedCell][0] === -1
      if (isHitMine) {
        newBord.end = new Date().toISOString()
      }
    } else if (flag !== null) {
      newBord.field[selectedRow][selectedCell][2] = flag
    }

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
