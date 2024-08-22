import { useQuery, type UseQueryOptions, type UseQueryResult } from '@tanstack/react-query'
import defaultClient, { Client, type RequestConfig } from '../../utils/api/client'

interface UseCustomQueryParams {
  queryKey: Array<string | number>
  config: RequestConfig
  options?: Omit<UseQueryOptions, 'queryKey'>
  client?: Client
}

export const useCustomQuery: <T>({
  queryKey,
  config,
  options,
  client,
}: UseCustomQueryParams) => UseQueryResult<T> = <T>({
  queryKey,
  config = {},
  options = {
    staleTime: Infinity,
  },
  client = defaultClient,
}: UseCustomQueryParams): UseQueryResult<T> => {
  return useQuery({
    ...options,
    queryKey,
    queryFn: async (): Promise<T> => client.call<T>({ ...config }),
  })
}
