import { useEffect, useState } from 'react'
import { Options } from '../../utils/generateMinesweeperGrid.ts'
import { useBoardQuery } from './useBoardQuery.ts'

export const useBoard = (options?: Options) => {
  const [id, setId] = useState<string>('new')

  const result = useBoardQuery(id, options)
  useEffect(() => {
    if (!result.isFetched) {
      return
    }
    if (result?.data?.id && id !== result?.data?.id) {
      setId(result.data.id)
    }
  }, [result?.data?.id, result.isFetched])

  return result
}
