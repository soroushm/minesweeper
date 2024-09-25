import { useCallback, useState } from 'react'
import { useBoardMutation } from '../../common/hooks/useBoardMutation'

export const Cell = ({ cell: [value, isRevealed, isFlagged], position }) => {
  const { mutate } = useBoardMutation()
  const [pressTimer, setPressTimer] = useState(null)

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

  const handleTouchStart = (event) => {
    // Set a timer for the long press (right-click equivalent on mobile)
    const timerId = setTimeout(() => {
      onclick(event, isRevealed, !isFlagged)
    }, 800) // Long press duration
    setPressTimer(timerId)
  }

  const handleTouchEnd = () => {
    clearTimeout(pressTimer)
    setPressTimer(null)
  }

  const isMine = value === -1
  let val = ''
  if (isMine && isFlagged) {
    val = '🏳️'
  } else if (isFlagged) {
    val = '🚩'
  } else if (isMine) {
    val = isRevealed ? '💥' : '💣'
  } else if (value > 0) {
    val = value
  }

  return (
    <div
      className={`cell ${(isRevealed || isMine) && 'revealed'} cell-${value}`}
      onClick={(event) => onclick(event, true, isFlagged)}
      onContextMenu={(event) => onclick(event, isRevealed, !isFlagged)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {val}
    </div>
  )
}
