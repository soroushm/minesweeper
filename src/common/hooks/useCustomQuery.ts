import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query'
import defaultClient, {
  Client,
  type RequestConfig,
} from '../../utils/api/client'

interface UseCustomQueryParams {
  queryKey: Array<string | number>
  config: RequestConfig
  options?: Omit<UseQueryOptions, 'queryKey' | 'queryFn'>
  client?: Client
}

export const useCustomQuery = ({
  queryKey,
  config = {},
  options = {},
  client = defaultClient,
}: UseCustomQueryParams): UseQueryResult => {
  return useQuery({
    ...options,
    queryKey: [
      ...queryKey,
      config,
      // client.host (if needed)
    ],
    queryFn: async () => client.call({ ...config }),
  })
}
