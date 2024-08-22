import { useCallback } from 'react'
import { useBoardMutation } from '../../common/hooks/useBoardMutation'

export const Cell = ({ cell: [value, isRevealed, isFlagged], position }) => {
  const { mutate } = useBoardMutation()
  const onclick = useCallback(
    (event, hasRevealed = false, hasFlagged = false) => {
      event.preventDefault()
      if (isRevealed || (isFlagged && isFlagged === hasFlagged)) {
        return
      }
      const actions = [hasRevealed, hasFlagged]
      mutate({
        position: [position.x, position.y],
        actions,
      })
    },
    [isRevealed, isFlagged, position, mutate],
  )
  return (
    <div
      className={`cell ${isRevealed && 'revealed'}`}
      onClick={(event) => onclick(event, true, isFlagged)}
      onContextMenu={(event) => onclick(event, isRevealed, !isFlagged)}
    >
      {isRevealed ? value : value < 0 ? '*' : value || ''}
    </div>
  )
}
