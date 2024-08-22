import { useEffect, useState } from 'react'
import { Options } from '../../utils/generateMinesweeperGrid.ts'
import { useBoardQuery } from './useBoardQuery.ts'

export const useBoard = (options: Options) => {
  const [id, setId] = useState<string | undefined>(undefined)

  const result = useBoardQuery(id, options)
  useEffect(() => {
    if (!id && result.data?.id) {
      setId(result.data.id)
    }
  }, [result.data?.id, id])

  return result
}
