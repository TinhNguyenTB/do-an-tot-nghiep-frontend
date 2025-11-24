import axiosInstance from '@/libs/axiosInstance'
import { Subscription } from '@/services/subscription/type'
import { PageResponse, QueryParams } from '@/services/types'
import { useQuery } from '@tanstack/react-query'

export const fetchSubscriptions = async (
  params: QueryParams
): Promise<PageResponse<Subscription>> => {
  const { data } = await axiosInstance<PageResponse<Subscription>>({
    url: `/api/subscriptions`,
    method: 'GET',
    params: params
  })
  return data
}

export const useQuerySubscriptions = (params: QueryParams) => {
  return useQuery<PageResponse<Subscription>>({
    queryKey: ['/api/v1/users', params],
    queryFn: () => fetchSubscriptions(params)
  })
}
