import { Display } from '../../common/components/Display'
import { calculateTimeDifferenceInSeconds } from '../../utils/calculateTimeDifferenceInSeconds.js'
import { useEffect, useState } from 'react'

interface TimerCounter {
  start: string
  end?: string
}
export const TimerCounter = ({ start, end }: TimerCounter) => {
  const [timeDifference, setTimeDifference] = useState<number>(0)
  useEffect(() => {
    if (start == null) {
      return
    }
    const intervalId = setInterval(() => {
      const differenceInSeconds = calculateTimeDifferenceInSeconds(start, end)
      setTimeDifference(Math.round(differenceInSeconds))
    }, 1000)
    return () => clearInterval(intervalId)
  }, [start, end])

  return (
    <div className="minesCounter">
      <Display display={timeDifference} initValue="0" />
    </div>
  )
}
