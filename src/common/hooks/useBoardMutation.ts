import { useMutation, useQueryClient } from '@tanstack/react-query'
import client from '../../utils/api/client'
import { useBoard } from './useBoard'
import { type Board } from '../../utils/generateMinesweeperGrid'

export const useBoardMutation = () => {
  const { data: board } = useBoard()
  const config = {
    url: `/board/${board?.id}`,
    method: 'post',
  }
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data) => client.call<Board>({ data, ...config }),
    onSuccess: (data) => {
      queryClient.setQueryData<Board>(['board', board?.id || 'new'], (oldData) => {
        return {
          ...oldData,
          ...data,
        }
      })
      // queryClient.invalidateQueries(['board', board?.id])
    },
  })
}
