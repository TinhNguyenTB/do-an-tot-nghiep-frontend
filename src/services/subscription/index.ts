import axiosInstance from '@/libs/axiosInstance'
import { Subscription } from '@/services/subscription/type'
import { PageResponse, QueryParams } from '@/services/types'
import { useQuery } from '@tanstack/react-query'

export const SUBSCRIPTIONS_QUERY_KEY = `/api/subscriptions`

export const fetchSubscriptions = async (
  params: QueryParams
): Promise<PageResponse<Subscription>> => {
  const { data } = await axiosInstance<PageResponse<Subscription>>({
    url: SUBSCRIPTIONS_QUERY_KEY,
    method: 'GET',
    params
  })
  return data
}

export const useQuerySubscriptions = (params: QueryParams) => {
  return useQuery<PageResponse<Subscription>>({
    queryKey: [SUBSCRIPTIONS_QUERY_KEY, params],
    queryFn: () => fetchSubscriptions(params)
  })
}
