import { useCallback } from 'react'

export const Cell = ({ cell: [value, isRevealed, isFlagged], position }) => {
  const onclick = useCallback(
    (event, hasRevealed = false, hasFlagged = false) => {
      event.preventDefault()
      if (isRevealed || (isFlagged && isFlagged === hasFlagged)) {
        return
      }
      const actions = [hasRevealed, hasFlagged]
      console.log('click', position, actions)
      const postData = {
        position: [position.x, position.y],
        actions,
      }
      fetch('http://localhost:5173/board/01916301-64b1-788c-b230-872404d5bbce', {
        method: 'POST', // Specify the HTTP method
        headers: {
          'Content-Type': 'application/json', // Indicate that we're sending JSON data
        },
        body: JSON.stringify(postData), // Convert the data to a JSON string
      })
    },
    [isRevealed, isFlagged, position],
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
