import './board.css'
import { MineField } from './MineField'
import { MinesCounter } from './MinesCounter'
import { TimerCounter } from './TimerCounter'
import { useBoard } from '../../common/hooks/useBoard'
import { ObserverFace } from './ObserverFace'

export const Board = () => {
  const { data } = useBoard()
  return (
    <div className="board">
      <div className="header">
        <MinesCounter />
        <ObserverFace board={data} />
        <TimerCounter start={data?.start} end={data?.end} />
      </div>
      <MineField key={data?.id} data={data || {}} />
    </div>
  )
}
