import './display.css'
import { SevenSegment } from './SevenSegment'

interface Display {
  digits: string | number
  max?: number
}
export const Display = ({ digits, max = 3 }: Display) => {
  const value = typeof digits === 'string' ? digits : digits?.toString() || ''
  //@todo left pad is required
  return (
    <div className="display">
      {value
        .split('')
        .map(
          (digit, index) => index < max && <SevenSegment key={`${digit}:${index}`} digit={digit} />,
        )}
    </div>
  )
}
