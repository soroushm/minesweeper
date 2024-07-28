import './display.css'
import sevenSegment from '/src/assets/seven-segment.svg'

export const SevenSegment = () => {
  return (
    <div className="display">
      <img src={sevenSegment} className="seven-segment" />
      <img src={sevenSegment} className="seven-segment" />
      <img src={sevenSegment} className="seven-segment" />
    </div>
  )
}
