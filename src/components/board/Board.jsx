import './board.css'
import { MineField } from './MineField'
import { MinesCounter } from './MinesCounter'
import { TimerCounter } from './TimerCounter'
import { useCustomQuery } from '../../common/hooks/useCustomQuery'

function Observer() {
  return null
}

export const Board = () => {
  const config = {
    url: '/board/new',
    method: 'post',
    data: {
      cells: 9,
      rows: 9,
      mines: 10,
    },
  }
  const query = useCustomQuery({
    queryKey: ['board'],
    config,
  })
  return (
    <div className="board">
      <div className="header">
        <MinesCounter />
        <Observer />
        <TimerCounter />
      </div>
      <MineField key={query?.data?.id} field={query?.data?.field} />
    </div>
  )
}
