import axiosInstance from '@/libs/axiosInstance'
import { Subscription, SubscriptionFormValues } from '@/services/subscription/type'
import { BaseResponse, PageResponse, QueryParams } from '@/services/types'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

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

export const createSubscription = async (body: SubscriptionFormValues) => {
  const { data } = await axiosInstance<BaseResponse<Subscription>>({
    url: SUBSCRIPTIONS_QUERY_KEY,
    method: 'POST',
    data: body
  })
  return data
}

export const fetchSubscriptionById = async (id: string) => {
  const { data } = await axiosInstance<BaseResponse<Subscription>>({
    url: `${SUBSCRIPTIONS_QUERY_KEY}/${id}`,
    method: 'GET'
  })
  return data
}

type SubscriptionQueryOptions = Omit<
  UseQueryOptions<BaseResponse<Subscription>, Error>,
  'queryKey' | 'queryFn'
>

export const useQuerySubscriptionById = (id: string, options?: SubscriptionQueryOptions) => {
  return useQuery<BaseResponse<Subscription>>({
    queryKey: [SUBSCRIPTIONS_QUERY_KEY, id],
    queryFn: () => fetchSubscriptionById(id),
    ...options
  })
}

export const updateSubscription = async (body: SubscriptionFormValues & { id: string }) => {
  const { id, ...requestBody } = body
  const { data } = await axiosInstance<BaseResponse<Subscription>>({
    url: `${SUBSCRIPTIONS_QUERY_KEY}/${body.id}`,
    method: 'PATCH',
    data: requestBody
  })
  return data
}
