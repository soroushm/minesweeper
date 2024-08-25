import './board.css'
import { MineField } from './MineField'
import { MinesCounter } from './MinesCounter'
import { TimerCounter } from './TimerCounter'
import { useBoard } from '../../common/hooks/useBoard'

function Observer() {
  return null
}

export const Board = () => {
  const { data } = useBoard()
  return (
    <div className="board">
      <div className="header">
        <MinesCounter />
        <Observer />
        <TimerCounter start={data?.start} end={data?.end} />
      </div>
      <MineField key={data?.id} data={data || {}} />
    </div>
  )
}
