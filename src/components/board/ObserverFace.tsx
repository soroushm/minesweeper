import { type Board } from '../../utils/generateMinesweeperGrid.ts'

interface ObserverFaceProps {
  board: Board
}
export const ObserverFace = ({ board }: ObserverFaceProps) => {
  // 🙂 default
  // 😯 on revealed pending
  // 😵 on lose
  // 😎 on win
  // 😴 away
  // 🥱 +999 second from start
  // @todo add action and status
  console.log('ObserverFace', board?.id)
  return <div className="observerFace">🙂</div>
}
