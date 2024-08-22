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
  options = {},
  client = defaultClient,
}: UseCustomQueryParams): UseQueryResult<T> => {
  return useQuery({
    ...options,
    queryKey: [
      ...queryKey,
      config,
      // client.host (if needed)
    ],
    queryFn: async (): Promise<T> => client.call<T>({ ...config }),
  })
}
