import { type Board } from '../../utils/generateMinesweeperGrid'
import { emoji } from '../../common/consts'
import { getRandomInt } from '../../utils/getRandomInt'

interface ObserverFaceProps {
  board: Board
}
export const ObserverFace = ({ board }: ObserverFaceProps) => {
  const initLoading = emoji.initLoading[getRandomInt(0, emoji.initLoading.length)]
  // const isLoading = emoji.isLoading[getRandomInt(0, emoji.isLoading.length)]
  const state = emoji.status[0]
  console.log('ObserverFace', board?.id)
  return <div className="observerFace">{board?.id ? state : initLoading}</div>
}
