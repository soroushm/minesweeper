import { useMutation, useQueryClient } from '@tanstack/react-query'
import client from '../../utils/api/client'
import { useBoard } from './useBoard'

export const useBoardMutation = () => {
  const { data: board } = useBoard()
  const config = {
    url: `/board/${board?.id}`,
    method: 'post',
  }
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data) => client.call({ data, ...config }),
    onSuccess: (data) => {
      queryClient.setQueryData(['board', board?.id || 'new'], (oldData) => {
        return {
          ...oldData,
          ...data,
        }
      })
      // queryClient.invalidateQueries(['board', board?.id])
    },
  })
}
