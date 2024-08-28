import './board.css'
import { MineField } from './MineField'
import { MinesCounter } from './MinesCounter'
import { TimerCounter } from './TimerCounter'
import { useBoard } from '../../common/hooks/useBoard'
import { ObserverFace } from './ObserverFace'
import { generateMinesweeperGrid } from '../../utils/generateMinesweeperGrid'

export const Board = () => {
  const options = {
    cells: 9,
    rows: 9,
    mines: 10,
  }
  const { data, isFetched } = useBoard(options)
  const field = !isFetched && generateMinesweeperGrid(options)
  return (
    <div className="board">
      <div className="header">
        <MinesCounter />
        <ObserverFace board={data} />
        <TimerCounter start={data?.start} end={data?.end} />
      </div>
      <MineField key={data?.id || 'new'} data={isFetched ? data : { field, id: 'new' }} />
    </div>
  )
}
