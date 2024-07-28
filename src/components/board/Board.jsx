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
    url: '/Board',
    method: 'get',
  }
  const query = useCustomQuery({
    queryKey: ['index.ts'],
    config,
  })
  return (
    <div className="board">
      <div className="header">
        <MinesCounter />
        <Observer />
        <TimerCounter />
      </div>
      <MineField field={query?.data} />
    </div>
  )
}
